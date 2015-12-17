(function() {
    'use strict';
    angular.module('userTaskModule')
        .factory('allTaskFactory', allTaskFactory);

    function allTaskFactory($resource, appConfig) {
        return $resource(appConfig.baseApi+'allTask.php?email=:email', {},{});
    };
})();