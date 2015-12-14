(function() {
    'use strict';

    angular.module('userTaskModule')
            .directive('leftMenu', function($document) {
                return {
                    restrict: 'A',
                    templateUrl: 'app/common/leftMenu.html',
                    link: function(scope, element, attrs) {
                    }
                }
            })
})();
