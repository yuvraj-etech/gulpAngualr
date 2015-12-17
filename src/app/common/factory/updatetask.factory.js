(function() {
    'use strict';
    angular.module('userTaskModule')
        .factory('updateTaskFactory', updateTaskFactory);

    function updateTaskFactory($resource, appConfig) {
        return $resource(appConfig.baseApi+'updateTask.php?taskId=:taskId&newTaskName=:newTaskName&newDueDate=:newDueDate&newTaskStatus=:newTaskStatus', {},{});
    };
})();