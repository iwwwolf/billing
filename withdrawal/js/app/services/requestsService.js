
(function () {
    'use strict';

    app.factory('requestsService', [
        'withdrawalSharedData',
        'methodsService',
        'userService',
        '$rootScope',
        '$translate',
        '$filter',
        '$http',
        '$time',
        '$q',
        'eventService',
        requestsService
    ]);

    function requestsService(withdrawalSharedData, methodsService, userService, $rootScope,
                             $translate, $filter, $http, $time, $q, eventService) {
        var serviceData = {
            cards: {},
            profile: {},
            requests: [],
            itemsPerPage: 5,
            totalRequests: 0
        };

        return {
            init: init,
            getRequests: getRequests,
            cancelRequest: cancelRequest,
            setItemsPerPage: setItemsPerPage
        };

        function init() {
            return userService.getUserData().then(function(result) {
                eventService.identifyUser(result.profile.user_id, $.cookie('platform'));
                applyUserData(result);

                return $q.all([
                    methodsService.loadCardsFromCore(),
                    getRequests()
                ]).then(
                    function (data) {
                        applyCards(data[0]);
                        applyRequests(data[1]);
                        return serviceData;
                    }
                );
            })
        }

        function setItemsPerPage(itemsCount) {
            serviceData.itemsPerPage = typeof itemsCount === 'number' ? itemsCount : serviceData.itemsPerPage;
        }

        function cancelRequest(request) {

            var data = {
                id: request.billing_id
            };

            var config = {
                method: 'POST',
                withCredentials: true,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Id': $rootScope.appConfig.sessionId
                },
                url: '/api/external/payout/cancel'
            };
            return $http(config).then(
                function () {
                    return withdrawalSharedData.cancelRequestCount += 1;
                },
                function (response) {
                    var message = '';
                    if (response.data.message) {
                        var message = response.data.message instanceof Array ?  response.data.message[0] : response.data.message;
                        return $q.reject(message);
                    }
                    return $q.reject(message);
                }
            );
        }

        function getRequests(page) {
            page = typeof page === 'number' ? page - 1 : 0;

            var periodFrom = moment().add(-30, 'days').format('DD.MM.YYYY');
            var periodTo = moment().add(1, 'days').format('DD.MM.YYYY');
            var data =  {
                sort_field: 'o.created',
                period_from: periodFrom,
                p: page * serviceData.itemsPerPage,
                period_to: periodTo,
                type: 'withdraw',
                l: serviceData.itemsPerPage,
                sort_order: 0
            };

            var config = {
                method: 'POST',
                withCredentials: true,
                url: $rootScope.appConfig.iqoptionUrl + '/api/iostat/filter',
                transformRequest: function (data) {
                    return $.param(data);
                },
                data: data
            };

            return $q.resolve({"data":[],"total":0});

            return $q.all([
                $http(config),
                $translate.use($rootScope.appConfig.locale)
            ]).then(function (responseArray) {
                eventService.sendApiMetrics(1, {api_name: 'root.api/iostat/filter', type: 'post'}, responseArray[0].config.timeDiff);

                var data = responseArray[0].data;
                if (data && data.isSuccessful && data.result) {
                    var config = {
                        method: 'GET',
                        url: '/api/external/withdrawal/payout?session_id='+ $rootScope.appConfig.sessionId,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data:''
                    };
                    return $http(config).then(function(response){
                        eventService.sendApiMetrics(1, {api_name: '/api/external/withdrawal/payout', type: 'get'}, response.config.timeDiff);

                        var billing_operations = response.data;

                        _.each(billing_operations, function(billing_operation){
                            var operation_to_find = billing_operation.operation_id;

                            _.each(data.result.data, function(core_operation){
                               if (core_operation.op_id === operation_to_find) {
                                   core_operation.can_cancel = billing_operation.can_cancel;
                                   core_operation.billing_id = billing_operation.id;
                               }
                           });
                        });

                        data.result.data = normalizeRequestsData(data.result.data);
                        console.log(JSON.stringify(data.result));
                        return data.result;
                    }, function(response) {
                        eventService.sendApiMetrics(0, {api_name: '/api/external/withdrawal/payout', type: 'get'}, response.config.timeDiff);
                    });


                } else {
                    return $q.reject();
                }
            }, function(responseArray){
                eventService.sendApiMetrics(0, {api_name: 'root.api/iostat/filter', type: 'post'}, responseArray[0].config.timeDiff);
            });
        }

        function normalizeRequestsData(requests) {
            angular.forEach(requests, function (request) {
                if (!request.message || request.message === '') {
                    request.message = 'front.withdrawal no comment';
                }

                request.message = $filter('translate')(request.message).toString();

                if (request.message.length > 30) {
                    request.messageToggle = false;
                    request.messageShort = request.message.substr(0, 27) + '...';
                }

                request.date = moment($time.convert(request.created)).format('DD.MM.YYYY, HH:mm');

                request.currency = getRequestCurrency(request.payment_method_id);
            });
            return requests;
        }

        function applyUserData(user) {
            serviceData.profile = user.profile;
        }

        function applyCards(data) {
            if (data && data.cards) {
                angular.forEach(data.cards, function (card) {
                    serviceData.cards[card.id] = card;
                });
            }
        }

        function applyRequests(data) {
            serviceData.requests = normalizeRequestsData(data.data);
            serviceData.totalRequests = data.total;
        }

        function getRequestCurrency(id) {
            var currency;
            switch (id) {
                case 'OTN':
                    currency = 'OTN';
                    break;
                case 'Bitcoin':
                    currency = 'BTC';
                    break;
                default:
                    currency = serviceData.profile.currency;
            }
            return currency;
        }
    }
})();