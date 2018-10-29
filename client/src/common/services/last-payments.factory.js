(function () {
    'use strict';


    angular.module('common.services.data')
        .factory('lastPayments', function ($http, $q) {

            var data;


            function get() {
                return data ? $q.resolve(data) : getLastPayments();
            }


            function getLastPayments() {
                data = {"data":{"isSuccessful":true,"errors":[],"message":"","data":[{"amount":100,"currency":{"id":5,"name":"USD","symbol":"$","mask":"$%s","min_dep":10,"max_dep":1000000,"iqoption_id":5,"min_withdrawal":3500000,"max_withdrawal":90000000000},"bonus_code":"","payment_method_id":56},{"amount":100,"currency":{"id":5,"name":"USD","symbol":"$","mask":"$%s","min_dep":10,"max_dep":1000000,"iqoption_id":5,"min_withdrawal":3500000,"max_withdrawal":90000000000},"bonus_code":"","payment_method_id":56},{"amount":100,"currency":{"id":5,"name":"USD","symbol":"$","mask":"$%s","min_dep":10,"max_dep":1000000,"iqoption_id":5,"min_withdrawal":3500000,"max_withdrawal":90000000000},"bonus_code":"","payment_method_id":56},{"amount":100,"currency":{"id":5,"name":"USD","symbol":"$","mask":"$%s","min_dep":10,"max_dep":1000000,"iqoption_id":5,"min_withdrawal":3500000,"max_withdrawal":90000000000},"bonus_code":"","payment_method_id":9},{"amount":100,"currency":{"id":5,"name":"USD","symbol":"$","mask":"$%s","min_dep":10,"max_dep":1000000,"iqoption_id":5,"min_withdrawal":3500000,"max_withdrawal":90000000000},"bonus_code":"","payment_method_id":56}]},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"jsonpCallbackParam":"callback","url":"/external/cashbox/last-payments","headers":{"Accept":"application/json, text/plain, */*"},"params":{},"requestTimestamp":1540464463834,"withCredentials":true,"responseTimestamp":1540464464107,"timeDiff":273},"statusText":"OK"};
                return $q.resolve(data);
                return $http.get('/external/cashbox/last-payments').then(function (res) {
                    data = res;
                    return res;
                })
            }

            return {
                get: get,
                getLastPayments: getLastPayments
            }
        });
})();
