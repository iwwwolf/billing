(function () {
    'use strict';


    angular.module('common.services.data')
        .value('CURRENCIES_TO_FILTER', [
            'ETH', 'BTC'
        ])
        .factory('cryptoPaymentMethods', function ($http, $q, $rootScope, eventService, CURRENCIES_TO_FILTER) {

            var data,
                currentMethod = {};


            function get(removeFilter) {
                return data ? $q.resolve(data) : getMethods(removeFilter);
            }


            function getMethods(removeFilter) {

                return $http({
                    method: 'GET',
                    url: ' /api/external/crypto/methods/payment',
                    data:{},
                    headers: {
                        'Session-id': $rootScope.sess_id,
                        'Content-Type' : 'application/json'
                    }
                }).then(function(res){
                    eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'get'}, res.config.timeDiff);
                    data = removeFilter === 'enabled' ? res.data : filterMethods(res.data);
                    return data;
                }, function(reject) {
                    eventService.sendApiMetrics(0, {api_name: reject.config.url, type: 'get'}, reject.config.timeDiff);
                })
            }

            function filterMethods (res) {
                return _.filter(res, function (v) {return !_.includes(CURRENCIES_TO_FILTER, v.currency)} );
            }

            return {
                get: get,
                getMethods: getMethods
            }
        });
})();
