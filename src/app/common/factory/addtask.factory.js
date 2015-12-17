(function() {
    'use strict';
    angular.module('userTaskModule')
        .factory('addTaskFactory', addTaskFactory);

    function addTaskFactory($resource, appConfig) {
        return $resource(appConfig.baseApi+'addTask.php?taskName=:taskName&dueDate=:dueDate&userEmail=:userEmail', {},{});
    };
})();