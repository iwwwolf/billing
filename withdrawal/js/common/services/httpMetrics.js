(function () {
    'use strict';

    app.factory('httpMetrics', [
        '$q',
        httpMetrics
    ]);


    function httpMetrics($q) {
        return {
            request: function (config) {
                config.requestTimestamp = new Date().getTime();
                return config;
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