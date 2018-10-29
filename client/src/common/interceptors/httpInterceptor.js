(function () {
    'use strict';

    angular.module('common.interceptors.http', [])
        .factory('httpInterceptor', httpInterceptor);

    function httpInterceptor($q, $log, $rootScope) {
        return {
            request: function (config) {
                var strings = ['/external', '/api', '/v2/'];
                var requestToApi;

                if (!config.params) config.params = {};

                strings.forEach(function (arr) {
                    config.url.startsWith(arr) ? requestToApi = true : null;
                });

                if (requestToApi && $rootScope.sess_id) {
                    config.params.sess_id = $rootScope.sess_id;
                }

                config.requestTimestamp = new Date().getTime();

                return config;
            },

            requestError: function (rejection) {
                rejection.config.responseTimestamp = new Date().getTime();
                rejection.config.timeDiff = rejection.config.responseTimestamp - rejection.config.requestTimestamp;
                return $q.reject(rejection);
            },

            response: function (response) {
                response.config.responseTimestamp = new Date().getTime();
                response.config.timeDiff = response.config.responseTimestamp - response.config.requestTimestamp;
                return response;
            },

            responseError: function (rejection) {
                rejection.config.responseTimestamp = new Date().getTime();
                rejection.config.timeDiff = rejection.config.responseTimestamp - rejection.config.requestTimestamp;
                return $q.reject(rejection);
            }
        };
    }


})();
