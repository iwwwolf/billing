(function () {
    'use strict';


    angular.module('common.services.data')
        .factory('currencies', function ($http, $q) {

            var data;


            function get(kycLimit) {
                return data ? $q.resolve(data) : getCurrencies(kycLimit);
            }


            function getCurrencies(kycLimit) {
                var url = '/external/cashbox/currencies';

                if (kycLimit === 'enabled') {
                    url += '?withKycLimit=true'
                }
                data = {"data":{"isSuccessful":true,"errors":[],"message":"","data":[{"id":5,"name":"USD","symbol":"$","mask":"$%s","min_dep":10,"max_dep":1000000,"iqoption_id":5,"min_withdrawal":3500000,"max_withdrawal":90000000000}]},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"jsonpCallbackParam":"callback","url":"/external/cashbox/currencies","headers":{"Accept":"application/json, text/plain, */*"},"params":{},"requestTimestamp":1540463852392,"withCredentials":true,"responseTimestamp":1540463852902,"timeDiff":510},"statusText":"OK"};
                return $q.resolve(data);
                return $http.get(url).then(function (res) {

                    data = res;
                    return res;
                })
            }

            return {
                get: get,
                getCurrencies: getCurrencies
            }
        });
})();
