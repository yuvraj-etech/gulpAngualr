(function() {
    'use strict';
    angular.module('userTaskModule')
        .factory('registrationFactory', registrationFactory);

    function registrationFactory($resource, appConfig) {
        return $resource(appConfig.baseApi+'registration.php?name=:name&email=:email&password=:password', {},{});
    };
})();