(function() {
    'use strict';
    angular.module('userTaskModule')
        .factory('userDataFactory', userDataFactory);

    function userDataFactory($resource, appConfig) {
        return $resource(appConfig.baseApi+'user_data.php?email=:email', {},{});
    };
})();