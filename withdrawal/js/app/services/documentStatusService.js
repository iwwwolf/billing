(function () {
    'use strict';


    app.factory('documentStatus', function ($http, $q, $rootScope, configurationService, eventService) {

        var data = {};


        function get() {
            return !_.isEmpty(data) ? $q.resolve(data) : getDocumentStatus();
        }

        function getDocumentStatus() {
            return configurationService.getConfiguration().then(function (configuration) {
                var url = configuration.data.result.user_verification_api;

                var config = {
                    method: 'get',
                    withCredentials: true,
                    url: url + '/api/kyc-documents-status/2.0'
                };

                data = {"data":{"isVerified":false,"documentsState":"NOT_UPLOADED"},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"withCredentials":true,"url":"http://user-verification.build40515.sandbox3.mobbtech.com/api/kyc-documents-status/2.0","headers":{"Accept":"application/json, text/plain, */*"},"requestTimestamp":1540473643600,"responseTimestamp":1540473648797,"timeDiff":5197},"statusText":"OK"};
                return $q.resolve(data);

                return $http(config).then(function (res) {
                    console.log(JSON.stringify(res));
                    eventService.sendApiMetrics(1, {api_name: 'user-verification./api/kyc-documents-status/2.0', type: 'get'}, res.config.timeDiff);
                    data = res;
                    return res;
                }, function (err) {
                    eventService.sendApiMetrics(0, {api_name: 'user-verification./api/kyc-documents-status/2.0', type: 'get'}, err.config.timeDiff);
                    $q.resolve({});
                })
            })
        }

        return {
            get: get,
            getDocumentStatus: getDocumentStatus
        }
    });
})();
