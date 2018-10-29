(function () {
    'use strict';


    angular.module('common.services.data')
        .factory('getDataFromSession', function ($http, $q, $rootScope) {

            var data;


            function get(kycLimit) {
                return data ? $q.resolve(data) : getDataFromSession(kycLimit);
            }


            function getDataFromSession(kycLimit) {
                var url = '/api/external/session';

                if (kycLimit === 'enabled') {
                    url += '?withKyc=true'
                }
                data = {"data":{"accept_language":"ru_RU","is_regulated":false,"status":0,"platform_id":15,"platform_version":null,"is_mobile":false,"aff_id":0,"aff_track":null,"country_name":"American Samoa","city":"","invoice":null,"user_id":7,"kyc":{"is_restricted":null}},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"jsonpCallbackParam":"callback","url":"/api/external/session","data":"","headers":{"Content-Type":"application/json","Session-Id":null,"Accept":"application/json, text/plain, */*"},"params":{},"requestTimestamp":1540464280419,"withCredentials":true,"responseTimestamp":1540464281221,"timeDiff":802},"statusText":"OK"};
                return $q.resolve(data);

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
                getDataFromSession: getDataFromSession
            }
        });
})();
