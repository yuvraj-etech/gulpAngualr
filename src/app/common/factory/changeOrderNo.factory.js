(function() {
    'use strict';
    angular.module('userTaskModule')
        .factory('changeOrderNoFactory', changeOrderNoFactory);

    function changeOrderNoFactory($resource, appConfig) {
        return $resource(appConfig.baseApi+'changeOrderNo.php?taskId=:taskId&newOrderNo=:newOrderNo', {},{});
    };
})();