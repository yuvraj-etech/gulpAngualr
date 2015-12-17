(function() {
    'use strict';
    angular.module('userTaskModule')
            .controller('login_form', login_form);

    function login_form($scope, $http, $location, timeStorageService, ajaxRequest, $log, loginService, $state, loginFactory) {
        loginService.validUser();

        $scope.login = function() {
            var query = loginFactory.query({email:$scope.email, password:$scope.password});
                    query.$promise.then(function(data) {
                        $log.warn(data);
                        if (data[0] == 'Login Successfully') {
                    var time = 604800000;
                    $state.go('/dashboard');
                    var currentTime = Date.now();
                    var newTime = currentTime + time;
                    var userKey = 'email';
                    var userValue = $scope.email;
                    timeStorageService.set(userKey, userValue, newTime);
                } else {
                    $scope.error = data[0];
                    $state.go('/');
                }
                    });
        }
        ;
    }
})();