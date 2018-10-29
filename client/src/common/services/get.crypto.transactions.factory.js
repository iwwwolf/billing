(function () {
    'use strict';


    angular.module('common.services.data')
        .factory('getCryptoTransactions', function ($http, $q, $rootScope) {

            var data;


            function get() {
                return data ? $q.resolve(data) : getTransactions();
            }


            function getTransactions() {
                var url = '/api/external/crypto/payment/in_progress';

                return $http({
                    method: 'GET',
                    url: url,
                    data: '',
                    headers: {
                        'Content-Type': 'application/json',
                        'Session-Id': $rootScope.sess_id
                    }
                }).then(function (res) {
                    data = res;
                    return res;
                })
            }

            return {
                get: get,
                getTransactions: getTransactions
            }
        });
})();
