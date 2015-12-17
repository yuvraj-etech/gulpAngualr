(function() {
    'use strict';
    angular.module('userTaskModule')
            .controller('registration_form', registration_form);

    function registration_form($scope, $location, $http, ajaxRequest, $log, $state, resourseService, registrationFactory) {
        $scope.register = function() {
            var query = registrationFactory.query({name: $scope.name, email: $scope.email, password: $scope.password});
                    query.$promise.then(function(data) {
                       $log.debug(data[0]);
                        if (data[0] == 'User Email already register') {
                            $scope.error = 'User Email already register';
                            $state.go('/registration');
                        } else {
                            $state.go('/');
                            $scope.name = "";
                            $scope.email = "";
                            $scope.password = "";
                            $scope.c_password = "";
                        }
                    });
            // var query = resourseService.api('registration.php', {name: $scope.name, email: $scope.email, password: $scope.password}).userMethod();
            //         query.$promise.then(function(data) {
            //             $log.debug(data[0]);
            //             if (data[0] == 'User Email already register') {
            //                 $scope.error = 'User Email already register';
            //                 $state.go('/registration');
            //             } else {
            //                 $state.go('/');
            //                 $scope.name = "";
            //                 $scope.email = "";
            //                 $scope.password = "";
            //                 $scope.c_password = "";
            //             }
            //         });
        };
    }
    ;
})();