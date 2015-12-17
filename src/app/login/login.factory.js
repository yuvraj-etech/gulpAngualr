(function() {
    'use strict';
    angular.module('userTaskModule')
        .factory('loginFactory', loginFactory);

    function loginFactory($resource, appConfig) {
        return $resource(appConfig.baseApi+'login.php?email=:email&password=:password', {},{});
    };
})();