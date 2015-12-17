(function() {
    'use strict';
    angular.module('userTaskModule')
        .factory('deleteTaskFactory', deleteTaskFactory);

    function deleteTaskFactory($resource, appConfig) {
        return $resource(appConfig.baseApi+'deleteTask.php?taskId=:taskId', {},{});
    };
})();