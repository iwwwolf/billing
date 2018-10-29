(function () {
    'use strict';


    angular.module('common.services.data')
        .factory('bonusTerms', function ($http, $q, $rootScope) {

            var data;


            function get() {
                return data ? $q.resolve(data) : getBonusTerms();
            }


            function getBonusTerms() {
                return $http.get('//' + $rootScope.iqOptionUrl + '/api/article/get/bonus-terms-and-conditions')
                    .then(function (res) {
                        console.log(JSON.stringify(res));
                        data = res;
                        return res;
                })
            }

            return {
                get: get,
                getBonusTerms: getBonusTerms
            }
        });
})();
