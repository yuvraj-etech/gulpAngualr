(function() {
    'use strict';
    angular.module('userTaskModule')
        .controller('dashboard', dashboard);

    function dashboard($scope, timeStorageService, ajaxRequest, $log, $state, deleteSelectedTask, userDataFactory, allTaskFactory, deleteTaskFactory, updateTaskFactory, addTaskFactory, changeOrderNoFactory) {
        var userObject = timeStorageService.get();
        if (angular.isUndefined(userObject) || userObject == null) {
            $log.warn('Please Login First');
            $state.go('/');
        } else {
            var email = userObject.email;
            var query = userDataFactory.query({email: email});
            query.$promise.then(function(data) {
                $scope.userData = data;
            });
            var query1 = allTaskFactory.query({email: email});
            query1.$promise.then(function(data) {
                $scope.data = data;
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
            var query = deleteTaskFactory.query({taskId: data.id});
            query.$promise.then(function(data) {
                $log.info(data[0]);
            });
        };
        $scope.showEditRow = function(r) {
            if ($scope.active != r) {
                $scope.active = r;
                $scope.isFocused = r;
            } else {
                $scope.active = null;
                $scope.isFocused = null;
            }
        };
        $scope.saveEditTask = function(data) {
            $scope.active = null;
            var query = updateTaskFactory.query({taskId: data.id, newTaskName: data.task_name, newDueDate: data.due_date, newTaskStatus: data.task_status});
            query.$promise.then(function(data) {
                $log.info(data[0]);
                $scope.isFocused = false;
            });
        };
        $scope.addTask = function() {
            $scope.data.unshift({
                task_status: 'No',
                task_name: $scope.taskName,
                due_date: $scope.dueDate
            });
            var email = userObject.email;

            var query = addTaskFactory.query({taskName: $scope.taskName, dueDate: $scope.dueDate, userEmail: email});
            query.$promise.then(function(data) {
                $log.info(data[0]);
            });
        }


        $scope.selection = [];
        $scope.index = [];
        $scope.selectedIds = function(taskId, index) {
            var idx = $scope.selection.indexOf(taskId);
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            } else {
                $scope.selection.push(taskId);
                $scope.index.push(index);
                $scope.deleteSelected = function() {
                    deleteSelectedTask.remove($scope.selection, $scope.index).then(function() {},
                        function() {},
                        function(index) {
                            $scope.data.splice(index, 1);
                        });
                }
            }
        };


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

                    var query = changeOrderNoFactory.query({taskId: taskId, newOrderNo: i});
                    query.$promise.then(function(data) {
                    $log.info(data[0]);
            });
                }
            }
        };



    };
})();