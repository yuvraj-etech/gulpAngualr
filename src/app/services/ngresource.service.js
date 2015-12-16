(function() {
    'use strict';
    angular.module('userTaskModule')
        .factory('resourseService', resourseService);

    function resourseService($resource, appConfig) {
        return {
            api: function(api, phpData) {

                var baseApi = appConfig.baseApi;
                return $resource(baseApi + api, {}, {
                    userMethod: {
                        isArray: 'true',
                        params: phpData
                    }
                });
            }
        }
    }
})();