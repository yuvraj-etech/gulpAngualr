(function() {
    'use strict';
    angular.module('userTaskModule')
            .controller('dashboard', dashboard);

    function dashboard($scope, timeStorageService, ajaxRequest, $log, $state, deleteSelectedTask) {
        var userObject = timeStorageService.get();
        if (angular.isUndefined(userObject) || userObject == null) {
            $log.warn('Please Login First');
            $state.go('/');
        } else {
            var email = userObject.email;
            ajaxRequest.send('user_data.php', {email: email}, 'POST').then(function(response) {
                $scope.userData = response;
            }, function(response) {
                $log.debug(response);
            });
            ajaxRequest.send('allTask.php', {email: email}, 'POST').then(function(response) {
                $scope.data = response;
            }, function(response) {
                $log.error(response);
            });
        }
        $scope.show = false;
        $scope.showLogout = function() {
            $scope.show = !$scope.show;
        };

        $scope.logout = function() {
            timeStorageService.remove('userLocalStorage');
        };
        $scope.deleteTask = function(data) {
            $scope.data.shift(data);
            ajaxRequest.send('deleteTask.php', {taskId: data.id}, 'POST').then(function(response) {
                $log.info(response);
            }, function(response) {
                $log.error(response);
            });
        };
        $scope.showEditRow = function(r) {
            if ($scope.active != r) {
                $scope.active = r;
                $scope.isFocused = r;
            }
            else {
                $scope.active = null;
                $scope.isFocused = null;
            }
        };
        $scope.saveEditTask = function(data) {
            $scope.active = null;
            ajaxRequest.send('updateTask.php', {taskId: data.id, newTaskName: data.task_name, newDueDate: data.due_date, newTaskStatus: data.task_status}, 'POST').then(function(response) {
                $scope.isFocused = false;
            }, function(response) {
                $log.error(response);
            });
        };
        $scope.addTask = function() {
            $scope.data.unshift({task_status: 'No', task_name: $scope.taskName, due_date: $scope.dueDate});
            var email = userObject.email;
            ajaxRequest.send('addTask.php', {taskName: $scope.taskName, dueDate: $scope.dueDate, userEmail: email}, 'POST').then(function(response) {
//                ajaxRequest.send('allTask.php', {email: email}, 'POST').then(function(response) {
//                    $scope.data = response;
//                }, function(response) {
//                    $log.error(response);
//                });
                $scope.taskName = "";
                $scope.dueDate = "";
            }, function(response) {
                $log.error(response);
            });
        }


        $scope.selection = [];
        $scope.index = [];
        $scope.selectedIds = function(taskId, index) {
            var idx = $scope.selection.indexOf(taskId);
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            }
            else {
                $scope.selection.push(taskId);
                $scope.index.push(index);
                $scope.deleteSelected = function() {
                    deleteSelectedTask.remove($scope.selection, $scope.index).then(function() {
                    },
                            function() {
                            },
                            function(index) {
                                $scope.data.splice(index, 1);
                            });
                }
            }
        }
        ;


        $scope.treeOptions = {
            accept: function(sourceNodeScope, destNodesScope, destIndex) {
                return true;
            },
            dropped: function(e) {
                var json = JSON.stringify(e.source.nodeScope.$parent.$modelValue);
                var parsed = JSON.parse(json);
                var arr = [];
                for (var x in parsed) {
                    arr.push(parsed[x]);
                }
                for (var i = 0; i < arr.length; i++) {
                    var taskId = arr[i].id;
                    ajaxRequest.send('changeOrderNo.php', {taskId: taskId, newOrderNo: i}, 'POST').then(function(response) {

                    }, function(response) {
                        $log.error(response);
                    });
                }
            }
        };



    }
    ;
})();