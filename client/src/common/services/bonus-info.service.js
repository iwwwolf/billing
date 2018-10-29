(function () {
    'use strict';


    angular.module('common.services.data')
        .factory('bonusInfo', function ($http, $q) {

            var data;


            function get() {
                return data ? $q.resolve(data) : getBonusInfo();
            }


            function getBonusInfo(bonus) {

                return $http({
                    method: 'POST',
                    url: '/external/bonus-code/info',
                    data: 'bonuscode[]=' + bonus,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (res) {
                    data = res;
                    return res;
                });

            }

            return {
                get: get,
                getBonusInfo: getBonusInfo
            }
        });
})();
