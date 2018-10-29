(function () {
    'use strict';


    angular.module('common.services.data')
        .factory('userFinance', function ($http, $q) {

            var data;


            function get() {
                return data ? $q.resolve(data) : getUserFinance();
            }


            function getUserFinance() {
                return $http.get('/external/user/finance').then(function (res) {
                    data = res;
                    return res;
                })
            }

            return {
                get: get,
                getUserFinance: getUserFinance
            }
        });
})();
