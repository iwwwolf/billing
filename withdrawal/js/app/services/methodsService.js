(function () {
    'use strict';

    app.factory('methodsService', [
        'WITHDRAWAL_VALIDATION_MESSAGES',
        'WITHDRAWAL_WARNING_MESSAGES',
        'BILLING_WITHDRAWAL_PAYSYSTEMS',
        'withdrawalSharedData',
        'aloGatewayService',
        'ecommpayService',
        'userService',
        'httpService',
        '$rootScope',
        '$translate',
        '$timeout',
        '$filter',
        '$http',
        '$q',
        'getUserCards',
        'featuresStorage',
        'UseWebSocket',
        'documentStatus',
        'eventService',
        'utilService',
        'socketBalance',
        methodsService
    ]);

    function methodsService(WITHDRAWAL_VALIDATION_MESSAGES, WITHDRAWAL_WARNING_MESSAGES, BILLING_WITHDRAWAL_PAYSYSTEMS,
                            withdrawalSharedData, aloGatewayService, ecommpayService, userService, httpService,
                            $rootScope, $translate, $timeout, $filter, $http, $q, getUserCards, featuresStorage,
                            UseWebSocket, documentStatus, eventService, utilService, socketBalance) {

        var serviceData = {
                requestAmount: {},
                warningMessages: {},
                cardsVerification: {
                    skip: false,
                    warning: false,
                    cardsList: [],
                    allVerified: true
                },
                validationMessages: {}
            },
            countries = [];

        return {
            init: init,
            getCards: getCards,
            loadCardsFromCore: loadCardsFromCore,
            withdrawal: withdrawal,
            getMethodByPaysystem: getMethodByPaysystem,
            withdrawalCard: withdrawalCard
        };
        //translate.use($rootScope)

        // ---
        // PUBLIC METHODS.
        // ---

        function init(isCacheFlush) {

            return userService.getUserData(isCacheFlush).then(function(result) {
                eventService.identifyUser(result.profile.user_id, $.cookie('platform'));
                eventService.sendApiMetrics(1, {api_name: 'root./api/getprofile', type: 'get'}, result._config.timeDiff);
                _applyUserData(result);

                return $q.all([
                    _loadCards(),
                    _loadMethods(),
                    $translate.use($rootScope.appConfig.locale),
                    _getVerificationCards(),
                    _getDocumentsStatus(),
                    socketBalance.get()
                ]).then(function (data) {
                    _applyCards(data[0]);
                    _applyMethods(data[1]);
                    _calculateCardsBalance();
                    _calculateRequestAmountTotal();
                    _calculateOtherBalance(data[5]);
                    _translateWarningMessages();
                    _applyCardsVerification(data[3]);
                    _applyDocumentsStatuses(data[4]);

                    return serviceData;
                });
            });
        }

        function withdrawalCard(data) {

                var config = {
                    data: data,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Session-Id': $rootScope.appConfig.sessionId
                    },
                    url: '/api/external/withdrawal'
                };

                return $http(config).then(
                    function (response) {
                        eventService.sendApiMetrics(1, {api_name: response.config.url, type: 'post'}, response.config.timeDiff);

                        if (response.data) {
                            withdrawalSharedData.requestCount += 1;
                            return data.amount;
                        } else {
                            return $q.reject(response.data.message && response.data.message.length ? response.data.message[0] : '');
                        }
                    },
                    function (response) {
                        eventService.sendApiMetrics(0, {api_name: response.config.url, type: 'post'}, response.config.timeDiff);
                        return response;
                    }
                );
        }

        function withdrawal(data) {

            data.payout_method_id = data.payment_method_id;

            var config = {
                data: data,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Id': $rootScope.appConfig.sessionId
                },
                url: '/api/external/withdrawal/payout'
            };


            return $http(config).then(
                function (response) {
                    eventService.sendApiMetrics(1, {api_name: response.config.url, type: 'post'}, response.config.timeDiff);
                    if (response.data) {
                        withdrawalSharedData.requestCount += 1;
                        return data.amount;
                    } else {
                        return $q.reject(response.data.message && response.data.message.length ? response.data.message[0] : '');
                    }
                },
                function (response) {
                    var error = response.data.message || 'unknown_error_support';
                    var errorMessage = $filter('translate')('front.' + error);
                    eventService.sendApiMetrics(0, {api_name: response.config.url, type: 'post'}, response.config.timeDiff);
                    return $q.reject(errorMessage);
                }
            );
        }

        function getCards() {
            return serviceData.cards ? serviceData.cards : _loadCards();
        }

        function getMethodByPaysystem(paysystem) {
            var foundMethod = false;
            angular.forEach(serviceData.methods, function (method) {
                if (paysystem === method.paysystem) {
                    foundMethod = method;
                }
            });
            return foundMethod;
        }

        function loadCardsFromCore() {
            var httpConfig = {
                url: $rootScope.appConfig.iqoptionUrl + '/api/billing/get-all-cards',
                withCredentials: true,
                method: 'get'
            };
            return $q.resolve({"cards":[],"_config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"url":"http://build40515.sandbox3.mobbtech.com/api/billing/get-all-cards","withCredentials":true,"headers":{"Accept":"application/json, text/plain, */*"},"requestTimestamp":1540473296837,"responseTimestamp":1540473297524,"timeDiff":687}});

            // return httpService(httpConfig).then(function(response) {
            //     eventService.sendApiMetrics(1, {api_name: 'root./api/billing/get-all-cards', type: 'get'}, response._config.timeDiff);
            // })
        }

        // ---
        // PRIVATE METHODS.
        // ---

        function _calculateRequestAmountTotal() {
            serviceData.requestAmount.total = serviceData.requestAmount.other + serviceData.requestAmount.cards;
        }

        function _calculateCardsBalance() {
            var cardsBalance = 0;
            angular.forEach(serviceData.cards, function (card) {
                cardsBalance += card.refund_amount;
            });
            serviceData.cardsBalance = cardsBalance;
        }

        function _calculateCardsAmount(cardsRequest) {
            var requestAmountCards = 0;

            angular.forEach(cardsRequest, function (cardRequest) {
                angular.forEach(serviceData.cards, function (card) {
                    if (card.id === cardRequest.id) {
                        card.refund_amount -= -cardRequest.amount;
                    }
                    card.refund_amount = card.refund_amount > 0 ? card.refund_amount : 0;
                });
                requestAmountCards += -cardRequest.amount;
            });

            serviceData.requestAmount.cards = requestAmountCards;
        }

        function _calculateOtherBalance(balance) {
            serviceData.balance = utilService.toFixed(balance.amount - serviceData.requestAmount.total, 2);
        }

        function _applyMethods(data) {
            // Create withdrawal methods object
            var methods = [], bankTransfer, webmoney = [];

            // Normalize methods data
            angular.forEach(data.methods, function (method) {
                method.status = 'ready';
                method.avalible = false;
                method.active = false;
                method.withdraw = {};
                method.cardMethod = method.paysystem === BILLING_WITHDRAWAL_PAYSYSTEMS.BANK_CARD ? true : false;

                var fields = [];

                // Normalize method fields
                angular.forEach(method.fields, function (field) {
                    field.filter = field.filter || 'text';
                    field.maxLength = field.maxLength || 200;
                    field.id = method.css_name + '-' + field.name;

                    // Sort fields
                    if (field.name === 'amount') {
                        field.filter = 'amount';

                        // Set amount field first
                        fields.unshift(field);
                    } else {
                        fields.push(field);
                    }

                    if (field.regexp && !/^\^(.*)\$$/.test(field.regexp)) {
                        field.regexp = '^' + field.regexp + '$';
                    }

                    if (method.placeholders && method.placeholders[field.name]) {
                        field.placeholder = method.placeholders[field.name];
                    } else {
                        field.placeholder = '';
                    }
                    // Set custom field filters
                    if (method.paysystem === BILLING_WITHDRAWAL_PAYSYSTEMS.QIWI && field.name === 'account') {
                        field.filter = 'phone';

                    }

                    if (method.paysystem === BILLING_WITHDRAWAL_PAYSYSTEMS.SKRILL && field.name === 'account') {
                        field.filter = 'email';

                    }

                    if (method.paysystem === BILLING_WITHDRAWAL_PAYSYSTEMS.ADVCASH && field.name === 'walletId') {
                        field.filter = 'clearSpaces';
                    }

                    if (method.paysystem === BILLING_WITHDRAWAL_PAYSYSTEMS.BANK_TRANSFER) {
                        if (field.name === 'bankCountry') {
                            var country = countries.filter(function (country) {
                                return country.id === serviceData.profile.country_id;
                            });
                            country = angular.isArray(country) && country.length ? country[0] : {};
                            field.placeholder = $filter('translate')('front.select country');
                            field.regexp = '^\\d+$';
                            field.select = {
                                value: 'id',
                                label: 'name',
                                items: countries,
                                onSelect: selectItem,
                                model: {
                                    id: country.id || '',
                                    name: country.name || ''
                                }
                            };
                            method.withdraw[field.name] = country.id;
                        } else if (field.name === 'bankINN' || field.name === 'bankCorrespondentAccount') {
                            field.required = 1;
                            field.depends = function (model) {
                                return model && model['bankCountry'] && model['bankCountry'] === 165;
                            };
                        }
                    }

                    if (method.paysystem === BILLING_WITHDRAWAL_PAYSYSTEMS.ALOGATEWAY_CUP) {
                        if (field.name === 'bank_province_code') {
                            field.placeholder = $filter('translate')('front.select province');
                            field.regexp = '^\\d+$';
                            field.select = {
                                value: 'id',
                                label: 'name',
                                onSelect: function (method, field) {
                                    selectItem(method, field);

                                    if (field.select.model && field.select.model.cities) {
                                        angular.forEach(method.fields, function (f) {
                                            if (f.name === 'bank_city_code') {
                                                f.select.items = aloGatewayService.getCities(field.select.model.cities);
                                                method.withdraw[f.name] = undefined;
                                                f.select.model = undefined;
                                            }
                                        });
                                    }

                                    if (method.form.$submitted) {
                                        $timeout(function () {
                                            method.form.$validate();
                                        }, 100);
                                    }
                                },
                                items: aloGatewayService.getProvinces()
                            };
                        } else if (field.name === 'bank_city_code') {
                            field.placeholder = $filter('translate')('front.select city');
                            field.regexp = '^\\d+$';
                            field.select = {
                                items: [],
                                value: 'id',
                                label: 'name',
                                onSelect: selectItem
                            };
                            field.depends = function (model) {
                                return model && model['bank_province_code'];
                            };
                        } else if (field.name === 'bank_code') {
                            field.placeholder = $filter('translate')('front.select bank');
                            field.regexp = '^[A-Z]{3,}$';
                            field.select = {
                                value: 'code',
                                label: 'name',
                                onSelect: selectItem,
                                items: aloGatewayService.getBanks()
                            };
                        } else if (field.name === 'customer_name') {
                            field.maxLength = 5;
                        } else if (field.name === 'bank_account_number') {
                            field.maxLength = 20;
                        }
                    }

                    if (method.paysystem === BILLING_WITHDRAWAL_PAYSYSTEMS.ECOMMPAY_CUP) {
                        if (field.name === 'bank_province') {
                            field.placeholder = $filter('translate')('front.select province');
                            //field.regexp = '^\\d+$';
                            field.select = {
                                value: 'id',
                                label: 'name',
                                onSelect: function (method, field) {
                                    method.withdraw[field.name] = aloGatewayService.getProvince(field.select.model[field.select.value], 'zh_CN').name;

                                    $timeout(function () {
                                        method.form[field.name].$validate();
                                        method.form.$validate(field.name);
                                    });

                                    if (field.select.model && field.select.model.cities) {
                                        angular.forEach(method.fields, function (f) {
                                            if (f.name === 'bank_city') {
                                                f.select.items = aloGatewayService.getCities(field.select.model.cities);
                                                method.withdraw[f.name] = undefined;
                                                f.select.model = undefined;
                                            }
                                        });
                                    }

                                    if (method.form.$submitted) {
                                        $timeout(function () {
                                            method.form.$validate();
                                        }, 100);
                                    }
                                },
                                items: aloGatewayService.getProvinces()
                            };
                        } else if (field.name === 'bank_city') {
                            field.placeholder = $filter('translate')('front.select city');
                            //field.regexp = '^\\d+$';
                            field.select = {
                                items: [],
                                value: 'id',
                                label: 'name',
                                onSelect: function () {
                                    method.withdraw[field.name] = aloGatewayService.getCity(field.select.model[field.select.value], 'zh_CN').name;
                                    $timeout(function () {
                                        method.form[field.name].$validate();
                                        method.form.$validate(field.name);
                                    });
                                }
                            };
                            field.depends = function (model) {
                                return model && model['bank_province'];
                            };
                        } else if (field.name === 'bank_code') {
                            field.placeholder = $filter('translate')('front.select bank');
                            field.regexp = '^[A-Z]{3,}$';
                            field.select = {
                                value: 'code',
                                label: 'name',
                                onSelect: selectItem,
                                items: ecommpayService.getBanks()
                            };
                        } else if (field.name === 'customer_name') {
                            field.maxLength = 5;
                        } else if (field.name === 'bank_account_number') {
                            field.maxLength = 20;
                        }
                    }
                });
                method.fields = fields;

                // Sort withdrawal methods
                switch (method.paysystem) {
                    case BILLING_WITHDRAWAL_PAYSYSTEMS.BANK_CARD:
                        method.css_name = 'visa-mastercard';
                        methods.unshift(method);
                        break;
                    case BILLING_WITHDRAWAL_PAYSYSTEMS.ALOGATEWAY_CUP:
                    case BILLING_WITHDRAWAL_PAYSYSTEMS.ECOMMPAY_CUP:
                        method.css_name = 'unionpay';
                        methods.push(method);
                        break;
                    case BILLING_WITHDRAWAL_PAYSYSTEMS.PAYPAL:
                        method.css_name = 'paypal';
                        methods.push(method);
                        break;
                    case BILLING_WITHDRAWAL_PAYSYSTEMS.BANK_TRANSFER:
                        bankTransfer = method;
                        break;
                    case BILLING_WITHDRAWAL_PAYSYSTEMS.WEBMONEY:
                        webmoney.push(method);
                        break;
                    default:
                        methods.push(method);
                }
            });

            if (!_.isEmpty(webmoney)) {
                webmoney.forEach(function (method) {
                    methods.push(method);
                })
            }
            if (bankTransfer) {
                methods.push(bankTransfer);
            }
            // Apply methods data
            serviceData.methods = methods;
            data.request_amount = data.request_amount || {
                    "cards": [],
                    "other": 0
                };
            serviceData.requestAmount.other = -data.request_amount.other;
            _calculateCardsAmount(data.request_amount.cards);
        }

        function selectItem(method, field) {
            method.withdraw[field.name] = field.select.model[field.select.value];
            $timeout(function () {
                method.form[field.name].$validate();
                method.form.$validate(field.name);
            });
        }

        function _applyCards(data, profile) {
            var cards = data.cards;
            // Sort cards by id
            cards.sort(function (a, b) {
                return a.id > b.id;
            });
            // Normalize cards data
            angular.forEach(cards, function (card) {
                card.status = 'ready';
                card.withdrawAmount = {};
                card.number = card.number.substr(0, 4) + ' ' + card.number.substr(4, 2) + '<span class="stars">•• ••••</span> ' + card.number.substr(card.number.length - 4);
                if (card.refund_amount > serviceData.profile.balance) {
                    card.refund_amount = serviceData.profile.balance;
                }
            });
            // Save cards data
            serviceData.cards = cards;
        }

        function _applyUserData(user) {
            countries = user.country;
            serviceData.profile = user.profile;
            serviceData.withdrawMin = user.profile.money.withdraw.min;
            serviceData.profile.currency_position = user.profile.mask.indexOf('%s') === 0 ? 'right' : 'left';

            var withdrawMinAmount = $filter('money')(serviceData.withdrawMin, {
                currency: serviceData.profile.currency,
                removeZeros: true
            });

        }

        function _translateWarningMessages() {
            // Translate withdrawal warning messages
            angular.forEach(WITHDRAWAL_WARNING_MESSAGES, function (message, key) {
                serviceData.warningMessages[key] = $filter('translate')(message);
            });
        }

        function _applyCardsVerification(cardsList) {
            if (!cardsList || !cardsList.length) {
                return;
            }

            const allVerified = cardsList.every(function (card) {
                return card.status === 'verified';
            });

            serviceData.cardsVerification.cardsList = cardsList;
            serviceData.cardsVerification.allVerified = allVerified;
        }

        function _applyDocumentsStatuses(statuses) {
            serviceData.documentsStatus = statuses;
        }

        function _loadCards() {
            return $q.resolve({"cards":[{"id":1,"expiry":"10/20","is_oct_enabled":null,"number":"400000...0002","owner":"EWWOPDJ EWO","refund_amount":100,"non_trusted_amount":0,"iqoption_payment_method_id":null,"hold":0,"iso_code":"USD","balance_type_id":1,"type":"visa"},{"id":2,"expiry":"12/21","is_oct_enabled":null,"number":"400000...0002","owner":"FVFRGV","refund_amount":100,"non_trusted_amount":100,"iqoption_payment_method_id":null,"hold":0,"iso_code":"USD","balance_type_id":1,"type":"visa"},{"id":3,"expiry":"12/20","is_oct_enabled":null,"number":"400000...0002","owner":"TEST BILLING","refund_amount":200,"non_trusted_amount":200,"iqoption_payment_method_id":null,"hold":0,"iso_code":"USD","balance_type_id":1,"type":"visa"}]});
            return getUserCards.get().then(function(response) {
                return response;
            })
        }

        function _getVerificationCards() {

            return UseWebSocket.getCardsStatus().then(function (result) {
                eventService.sendApiMetrics(1, {api_name: 'socket.get-verify-card-status'}, result.timeDiff);
                return result;
            }).catch(function (err) {
                $q.resolve({});
            })

            // return $rootScope.getFeatures.then(function () {
            //     var cardsFeature = featuresStorage.getFeature('cards-verification');
            //
            //     if (cardsFeature !== 'enabled') {
            //         return $q.resolve([]);
            //     }
            //
            //
            // })
        }

        function _getDocumentsStatus() {
            return documentStatus.getDocumentStatus()
                .then(function(result){
                    if (result) return result.data;
                    return {};
                })
        }

        function _loadMethods() {
            var response = {"data":{"isSuccessful":true,"message":[],"result":{"methods":[{"id":75,"name":"Skrill","commission":0,"commissions":[{"EUR":{"percent":0,"min":0,"max":0,"fixed":0}}],"comment":"","fields":[{"name":"account","lang_key":"E-mail","front_key":"front.email","type":"text","regexp":"([a-zA-Z0-9\\_\\-\\+\\.]{1,})\\@([a-zA-Z0-9\\_\\-\\.]{1,})\\.[A-Za-z]{1,}","maxLength":255,"required":true,"placeholder":""},{"name":"amount","lang_key":"Сумма","front_key":"front.amount","type":"text","regexp":"\\d+|\\d+\\.\\d{1,2}","maxLength":255,"required":true,"placeholder":""}],"css_name":"skrill","limits_by_currencies":{"EUR":0},"limits":[{"id":3,"name":"JPY","min":0,"max":0},{"id":11,"name":"CNY","min":14,"max":10000000},{"id":4,"name":"RUB","min":60,"max":10000000},{"id":1,"name":"EUR","min":2.2,"max":95000},{"id":2,"name":"GBP","min":2,"max":1000000},{"id":6,"name":"BRL","min":4,"max":1000000},{"id":7,"name":"IDR","min":20000,"max":100000000},{"id":8,"name":"MYR","min":8,"max":3000000},{"id":10,"name":"TRY","min":14,"max":2000000},{"id":9,"name":"VND","min":40000,"max":200000000},{"id":5,"name":"USD","min":3.5,"max":90000}],"currency":{"1":"EUR"},"placeholders":{"account":"","amount":""},"paysystem":"skrill"},{"id":76,"name":"Neteller","commission":0,"commissions":[{"RUB":{"percent":0,"min":0,"max":0,"fixed":0}},{"EUR":{"percent":0,"min":0,"max":0,"fixed":0}},{"GBP":{"percent":0,"min":0,"max":0,"fixed":0}},{"USD":{"percent":0,"min":0,"max":0,"fixed":0}}],"comment":"","fields":[{"name":"account","lang_key":"Счет","front_key":"front.account","type":"text","regexp":"([a-zA-Z0-9\\_\\-\\+\\.]{1,})\\@([a-zA-Z0-9\\_\\-\\.]{1,})\\.[A-Za-z]{1,}","maxLength":255,"required":true,"placeholder":""},{"name":"amount","lang_key":"Сумма","front_key":"front.amount","type":"text","regexp":"\\d+|\\d+\\.\\d{1,2}","maxLength":255,"required":true,"placeholder":""}],"css_name":"neteller","limits_by_currencies":{"EUR":0,"GBP":0,"RUB":0,"USD":0},"limits":[{"id":3,"name":"JPY","min":0,"max":0},{"id":11,"name":"CNY","min":14,"max":10000000},{"id":4,"name":"RUB","min":60,"max":1000000},{"id":1,"name":"EUR","min":3,"max":10000},{"id":2,"name":"GBP","min":2,"max":1000000},{"id":6,"name":"BRL","min":4,"max":1000000},{"id":7,"name":"IDR","min":20000,"max":10000000000},{"id":8,"name":"MYR","min":8,"max":3000000},{"id":10,"name":"TRY","min":4,"max":2000000},{"id":9,"name":"VND","min":40000,"max":2000000000000},{"id":5,"name":"USD","min":3.5,"max":10001}],"currency":{"1":"EUR","2":"GBP","4":"RUB","5":"USD"},"placeholders":{"account":"","amount":""},"paysystem":"neteller"},{"id":78,"name":"Webmoney","commission":0,"commissions":[{"RUB":{"percent":0,"min":0,"max":0,"fixed":0}}],"comment":"","fields":[{"name":"account","lang_key":"Номер кошелька","front_key":"front.account wmr","type":"text","regexp":"R[0-9]{12}","maxLength":255,"required":true,"placeholder":"R123456789012"},{"name":"amount","lang_key":"Сумма","front_key":"front.amount","type":"text","regexp":"\\d+|\\d+\\.\\d{1,2}","maxLength":255,"required":true,"placeholder":"300"}],"css_name":"webmoney-wmr","limits_by_currencies":{"RUB":0},"limits":[{"id":3,"name":"JPY","min":0,"max":0},{"id":11,"name":"CNY","min":14,"max":10000000},{"id":4,"name":"RUB","min":60,"max":10000000},{"id":1,"name":"EUR","min":2.2,"max":95000},{"id":2,"name":"GBP","min":2,"max":1000000},{"id":6,"name":"BRL","min":4,"max":1000000},{"id":7,"name":"IDR","min":20000,"max":10000000000},{"id":8,"name":"MYR","min":8,"max":3000000},{"id":10,"name":"TRY","min":4,"max":2000000},{"id":9,"name":"VND","min":40000,"max":2000000000000},{"id":5,"name":"USD","min":3.5,"max":90000}],"currency":{"4":"RUB"},"placeholders":{"account":"R123456789012","amount":"300"},"paysystem":"webmoney"},{"id":79,"name":"Webmoney","commission":0,"commissions":[{"USD":{"percent":0,"min":0,"max":0,"fixed":0}}],"comment":"","fields":[{"name":"account","lang_key":"Номер кошелька","front_key":"front.account wmz","type":"text","regexp":"Z[0-9]{12}","maxLength":255,"required":true,"placeholder":"Z123456789012"},{"name":"amount","lang_key":"Сумма","front_key":"front.amount","type":"text","regexp":"\\d+|\\d+\\.\\d{1,2}","maxLength":255,"required":true,"placeholder":"300"}],"css_name":"webmoney-wmz","limits_by_currencies":{"USD":0},"limits":[{"id":3,"name":"JPY","min":0,"max":0},{"id":11,"name":"CNY","min":14,"max":10000000},{"id":4,"name":"RUB","min":60,"max":10000000},{"id":1,"name":"EUR","min":2.2,"max":95000},{"id":2,"name":"GBP","min":2,"max":1000000},{"id":6,"name":"BRL","min":4,"max":1000000},{"id":7,"name":"IDR","min":20000,"max":10000000000},{"id":8,"name":"MYR","min":8,"max":3000000},{"id":10,"name":"TRY","min":4,"max":2000000},{"id":9,"name":"VND","min":40000,"max":2000000000000},{"id":5,"name":"USD","min":3.5,"max":90000}],"currency":{"5":"USD"},"placeholders":{"account":"Z123456789012","amount":"300"},"paysystem":"webmoney"},{"id":80,"name":"Webmoney","commission":0,"commissions":[{"EUR":{"percent":0,"min":0,"max":0,"fixed":0}}],"comment":"","fields":[{"name":"account","lang_key":"Номер кошелька","front_key":"front.account wmz","type":"text","regexp":"E[0-9]{12}","maxLength":255,"required":true,"placeholder":"E123456789012"},{"name":"amount","lang_key":"Сумма","front_key":"front.amount","type":"text","regexp":"\\d+|\\d+\\.\\d{1,2}","maxLength":255,"required":true,"placeholder":""}],"css_name":"webmoney-wme","limits_by_currencies":{"EUR":0},"limits":[{"id":3,"name":"JPY","min":0,"max":0},{"id":11,"name":"CNY","min":14,"max":10000000},{"id":4,"name":"RUB","min":60,"max":10000000},{"id":1,"name":"EUR","min":2.2,"max":95000},{"id":2,"name":"GBP","min":2,"max":1000000},{"id":6,"name":"BRL","min":4,"max":1000000},{"id":7,"name":"IDR","min":20000,"max":10000000000},{"id":8,"name":"MYR","min":8,"max":3000000},{"id":10,"name":"TRY","min":4,"max":2000000},{"id":9,"name":"VND","min":40000,"max":2000000000000},{"id":5,"name":"USD","min":3.5,"max":90000}],"currency":{"1":"EUR"},"placeholders":{"account":"E123456789012","amount":""},"paysystem":"webmoney"},{"id":1005,"name":"Bank transfer","commission":31,"commissions":[{"JPY":{"percent":0,"min":0,"max":0,"fixed":0}},{"INR":{"percent":0,"min":0,"max":0,"fixed":2268.06}},{"CNY":{"percent":0,"min":0,"max":0,"fixed":215.28}},{"RUB":{"percent":0,"min":0,"max":0,"fixed":2024.27}},{"THB":{"percent":0,"min":0,"max":0,"fixed":1020.2}},{"EUR":{"percent":0,"min":0,"max":0,"fixed":27.22}},{"GBP":{"percent":0,"min":0,"max":0,"fixed":24.02}},{"BRL":{"percent":0,"min":0,"max":0,"fixed":114.86}},{"IDR":{"percent":0,"min":0,"max":0,"fixed":471088.7}},{"MYR":{"percent":0,"min":0,"max":0,"fixed":129.16}},{"TRY":{"percent":0,"min":0,"max":0,"fixed":176.9}},{"VND":{"percent":0,"min":0,"max":0,"fixed":687591.09}},{"USD":{"percent":0,"min":0,"max":0,"fixed":31}}],"comment":"","fields":[{"name":"amount","lang_key":"Сумма","front_key":"front.amount","type":"text","regexp":"\\d+|\\d+\\.\\d{1,2}","maxLength":255,"required":false,"placeholder":""},{"name":"clientName","lang_key":"Имя клиента","front_key":"front.client name","type":"text","regexp":"([^\\x00-\\x7F]|[a-zA-Z\\.\\-\\s]){2,255}","maxLength":255,"required":true,"placeholder":""},{"name":"clientAddress","lang_key":"Адрес проживания","front_key":"front.client address","type":"text","regexp":".{5,255}","maxLength":255,"required":true,"placeholder":""},{"name":"bankName","lang_key":"Название банка","front_key":"front.bank name","type":"text","regexp":".{3,255}","maxLength":255,"required":true,"placeholder":""},{"name":"bankAddress","lang_key":"Адрес банка","front_key":"front.bank address","type":"text","regexp":".{10,255}","maxLength":255,"required":true,"placeholder":""},{"name":"bankSwiftCode","lang_key":"SWIFT (БИК)","front_key":"front.bank SWIFT (BIC)","type":"text","regexp":"[a-zA-Z0-9]{8,11}","maxLength":255,"required":true,"placeholder":""},{"name":"bankAccountNumber","lang_key":"Номер банковского счета (IBAN)","front_key":"front.bank account number (IBAN)","type":"text","regexp":"[a-zA-Z0-9]{5,34}","maxLength":255,"required":true,"placeholder":""},{"name":"bankINN","lang_key":"ИНН клиента","front_key":"front.client TIN (INN)","type":"text","regexp":"[0-9]{10,12}","maxLength":255,"required":false,"placeholder":""}],"css_name":"bank-transfer","limits_by_currencies":{"EUR":0,"GBP":0,"RUB":0,"USD":0},"limits":[{"id":3,"name":"JPY","min":0,"max":0},{"id":11,"name":"CNY","min":14,"max":10000000},{"id":4,"name":"RUB","min":60,"max":10000000},{"id":1,"name":"EUR","min":2.2,"max":95000},{"id":2,"name":"GBP","min":2,"max":1000000},{"id":6,"name":"BRL","min":4,"max":1000000},{"id":7,"name":"IDR","min":20000,"max":10000000000},{"id":8,"name":"MYR","min":8,"max":3000000},{"id":10,"name":"TRY","min":4,"max":2000000},{"id":9,"name":"VND","min":40000,"max":2000000000000},{"id":5,"name":"USD","min":3.5,"max":90000}],"currency":{"1":"EUR","2":"GBP","4":"RUB","5":"USD"},"placeholders":{"amount":"","clientName":"","clientAddress":"","bankName":"","bankAddress":"","bankSwiftCode":"","bankAccountNumber":"","bankINN":""},"paysystem":"bank_transfer"},{"id":1000,"name":"Visa/MasterCard","commission":0,"commissions":[{"EUR":{"percent":0,"min":0,"max":0,"fixed":0}},{"USD":{"percent":0,"min":0,"max":0,"fixed":0}}],"comment":"","fields":[],"css_name":"Visa-mastercard","limits_by_currencies":{"EUR":0,"USD":0},"limits":[{"id":3,"name":"JPY","min":0,"max":0},{"id":11,"name":"CNY","min":14,"max":10000000},{"id":4,"name":"RUB","min":60,"max":10000000},{"id":1,"name":"EUR","min":3.5,"max":90000},{"id":2,"name":"GBP","min":2,"max":1000000},{"id":6,"name":"BRL","min":4,"max":1000000},{"id":7,"name":"IDR","min":20000,"max":100000000},{"id":8,"name":"MYR","min":8,"max":3000000},{"id":10,"name":"TRY","min":4,"max":2000000},{"id":9,"name":"VND","min":40000,"max":200000000},{"id":5,"name":"USD","min":3.5,"max":90000}],"currency":{"1":"EUR","5":"USD"},"placeholders":[],"paysystem":"bank_card"}]}},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"url":"/api/external/payout/methods","data":"","headers":{"Content-Type":"application/json","Session-Id":null,"Accept":"application/json, text/plain, */*"},"requestTimestamp":1540473180737,"responseTimestamp":1540473181163,"timeDiff":426},"statusText":"OK"};
            var result = response.data.result;

            extendWithCommission(result);
            extendWithLimits(result);
            return $q.resolve(result);

            // return $http({
            //     method: 'GET',
            //     url: '/api/external/payout/methods',
            //     data: '',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Session-Id': $rootScope.appConfig.sessionId
            //     }
            // }).then(function (res) {
            //     console.log(JSON.stringify(res));
            //     eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'get'}, res.config.timeDiff);
            //     var result = res.data.result;
            //
            //     extendWithCommission(result);
            //     extendWithLimits(result);
            //     return result;
            // },
            // function(err) {
            //     eventService.sendApiMetrics(0, {api_name: err.config.url, type: 'get'}, err.config.timeDiff);
            // });
        }

        function extendWithCommission (result) {
            _.each(result.methods, function (method) {
                var commissionsByCurrencyArray = [];

                angular.forEach(method.commissions, function (commission) {
                    commissionsByCurrencyArray [Object.keys(commission)] = commission[Object.keys(commission)];
                });
                method.commissionByCurrency = commissionsByCurrencyArray;
                method.value = method.id;
            });

            return result;
        }

        function extendWithLimits (result) {
            _.each(result.methods, function(method) {
                var limits = [];
                _.each(method.limits, function(limit) {
                   limits[limit.name] = limit;
                })
                method.limitsFormat = limits;
                method.currentLimit = method.limitsFormat[serviceData.profile.currency]?
                    method.limitsFormat[serviceData.profile.currency]:
                    serviceData.profile.money.withdraw;
            });

            return result;
        }

    }

})();
