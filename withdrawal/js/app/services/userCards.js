(function () {
    'use strict';


    app.factory('getUserCards', function ($http, $q, $rootScope, eventService) {

        var data = {};


        function get() {
            return !_.isEmpty(data)? $q.resolve(data) : getCards();
        }

        function getCards() {
            return $http({
                method: 'GET',
                url: '/api/external/card',
                data: '',
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Id': $rootScope.appConfig.sessionId
                }
            }).then(function (res) {
                eventService.send('system', 'billing_api-call', 1, {api_name: res.config.url, type: 'get'}, res.config.timeDiff);
                _.each(res.data, function(card){
                    card.type = getCreditCardType(card.number);
                });
                data.cards = res.data;
                return data;
            }, function (err) {
                eventService.send('system', 'billing_api-call', 0, {api_name: err.config.url, type: 'get'}, err.config.timeDiff);
            });
        }


        function getCreditCardType(accountNumber) {

            var result = "unknown";

            if (/^5[1-5]/.test(accountNumber)) {
                result = "mastercard";
            }

            if(/^(5018|5020|5038|6304|6759|6761|6763)/.test(accountNumber)){
                result = "maestro";
            }

            else if (/^4/.test(accountNumber)) {
                result = "visa";
            }

            else if (/^3[47]/.test(accountNumber)) {
                result = "amex";
            }

            return result;
        }

        return {
            get: get,
            getCards: getCards
        }
    });
})();
