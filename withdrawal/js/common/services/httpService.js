(function () {
    'use strict';

    app.factory('httpService', [
        '$http',
        '$q',
        httpService
    ]);

    function httpService($http, $q) {

        var _promises = [];

        return function (httpConfig) {
            var promise = _promises[httpConfig.url];

            if (promise) {
                return promise;
            }

            var deferred = $q.defer();

            _promises[httpConfig.url] = deferred.promise;

            $http(httpConfig).then(
                function (response) {
                    if (
                        response.data &&
                        response.data.isSuccessful &&
                        response.data.result !== null
                    ) {
                        response.data.result._config = response.config;
                        deferred.resolve(response.data.result);
                    } else {
                        if (response.data && response.data.message) {
                            console.error(response.data.message);
                        } else {
                            console.log("An unknown error occurred.");
                        }
                        deferred.reject(response.data.message);
                    }
                },
                function (error) {
                    console.error(error);
                    deferred.reject(error);
                }
            ).finally(function() {
                delete _promises[httpConfig.url];
            });

            return deferred.promise;
        };
    }
})();