(function () {
    'use strict';


    app.factory('configurationService', function ($http, $q, $rootScope, eventService) {

        var data = {};


        function get() {
            return !_.isEmpty(data) ? $q.resolve(data) : getConfiguration();
        }

        function getConfiguration() {
            data = {"data":{"isSuccessful":false,"message":[],"result":{"tc":null,"trading_cluster_websocket":{"protocol":"ws","host":"build40515.sandbox3.mobbtech.com","port":"80"},"trading_cluster_api":{"protocol":"http","host":"build40515.sandbox3.mobbtech.com","port":"80"},"user_verify_api":"http://verify.build40515.sandbox3.mobbtech.com","user_verification_api":"http://user-verification.build40515.sandbox3.mobbtech.com","event_api":"http://event.build40515.sandbox3.mobbtech.com","auth_api":"http://auth.build40515.sandbox3.mobbtech.com","avatars_api":null,"chat_api":null,"features_api":"http://features.build40515.sandbox3.mobbtech.com","financial_information_api":"http://fininfo.build40515.sandbox3.mobbtech.com","wallet_referral":"https://wallet-referral.build40515.sandbox3.mobbtech.com","gateway_api":"https://api.build40515.sandbox3.mobbtech.com","billing_api":"http://billing.build40515.sandbox3.mobbtech.com:8080"}},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"url":"http://build40515.sandbox3.mobbtech.com/api/configuration","headers":{"Accept":"application/json, text/plain, */*"},"requestTimestamp":1540473746147,"responseTimestamp":1540473751276,"timeDiff":5129},"statusText":"OK"};
            return $q.resolve(data);

            return $http({
                method: 'GET',
                url: $rootScope.appConfig.iqoptionUrl + '/api/configuration',
            }).then(function (res) {
                console.log(JSON.stringify(res));
                eventService.sendApiMetrics(1, {api_name: 'root./api/configuration', type: 'get'}, res.config.timeDiff);
                data = res;
                return res;
            },function(err) {
                eventService.sendApiMetrics(0, {api_name: 'root./api/configuration', type: 'get'}, err.config.timeDiff);
            });
        }

        return {
            get: get,
            getConfiguration: getConfiguration
        }
    });
})();
