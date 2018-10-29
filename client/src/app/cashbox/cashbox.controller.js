(function () {
    'use strict';

    angular.module('cashbox', ['ngSanitize'])
        .config(config)
        .controller('CashboxCtrl', CashboxCtrl);

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.cashbox', {
                url: '/',
                views: {
                    '@': {
                        templateUrl: 'src/app/cashbox/cashbox.tpl.html',
                        controller: 'CashboxCtrl as cashbox',
                        resolve: {
                            userProfileData: function (userProfile, eventService, $cookies) {
                                return userProfile.get().then(function (res) {
                                    var platformId = $cookies.get('platform');
                                    eventService.identifyUser(res.data.result.user_id, platformId);
                                    eventService.sendApiMetrics(1, {api_name: 'root./api/getprofile', type: 'get'}, res.config.timeDiff);
                                    return res.data.result;
                                });
                            },
                            sessionData: function(getDataFromSession, featuresData, getFeatures, userFinanceData, eventService, userProfileData) {
                                var kycLimit = userFinanceData && userFinanceData.kyc_limited
                                    && getFeatures.getFeature('kyc-limit');

                                return getDataFromSession.get(kycLimit).then(function (res){
                                    eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'get'}, res.config.timeDiff);
                                    return res.data;
                                }, function(reject) {
                                    eventService.sendApiMetrics(0, {api_name: reject.config.url, type: 'get'}, reject.config.timeDiff);
                                })
                            },
                            methodCollection: function (paymentMethods, eventService, userProfileData) {
                                return paymentMethods.get().then(function (res) {
                                    eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'get'}, res.config.timeDiff);
                                    return res.data.data;
                                }, function(reject) {
                                    eventService.sendApiMetrics(0, {api_name: reject.config.url, type: 'get'}, reject.config.timeDiff);
                                });
                            },
                            depositCollection: function (deposits, eventService, userProfileData) {
                                return deposits.get().then(function (res) {
                                    eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'get'}, res.config.timeDiff);
                                    return res.data;
                                }, function(reject) {
                                    eventService.sendApiMetrics(0, {api_name: reject.config.url, type: 'get'}, reject.config.timeDiff);
                                });
                            },
                            userCardsCollection: function (userCards, eventService, userProfileData) {
                                return userCards.get().then(function (res) {
                                    eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'get'}, res.config.timeDiff);
                                    return res.data.data;
                                }, function(reject) {
                                    eventService.sendApiMetrics(0, {api_name: reject.config.url, type: 'get'}, reject.config.timeDiff);
                                });
                            },
                            lastPaymentsCollection: function(lastPayments, eventService, userProfileData) {
                                return lastPayments.get().then(function (res){
                                    eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'get'}, res.config.timeDiff);
                                    return res.data.data;
                                }, function(reject) {
                                    eventService.sendApiMetrics(0, {api_name: reject.config.url, type: 'get'}, reject.config.timeDiff);
                                })
                            },
                            featuresData: function(getFeatures, eventService, userProfileData) {
                                return getFeatures.get().then(function (res){
                                    if (res.config) {
                                        eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'get'}, res.config.timeDiff);
                                    }
                                    return res.data.features;
                                }, function(reject) {
                                    eventService.sendApiMetrics(0, {api_name: reject.config.url, type: 'get'}, reject.config.timeDiff);
                                    return {};
                                })
                            },
                            userFinanceData: function(userFinance, featuresData, getFeatures, $q, eventService, userProfileData) {
                                var kycLimit = getFeatures.getFeature('kyc-limit');

                                if (kycLimit === 'enabled') {
                                    return userFinance.get().then(function (res){
                                        eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'get'}, res.config.timeDiff);
                                        return res.data;
                                    }, function(reject) {
                                        eventService.sendApiMetrics(0, {api_name: reject.config.url, type: 'get'}, reject.config.timeDiff);
                                    })
                                } else {
                                    return $q.resolve();
                                }
                            },
                            currencyCollection: function (currencies, featuresData, getFeatures, userFinanceData, eventService, userProfileData) {
                                var kycLimit = userFinanceData && userFinanceData.kyc_limited
                                        && getFeatures.getFeature('kyc-limit');

                                return currencies.get(kycLimit).then(function (res) {
                                    eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'get'}, res.config.timeDiff);
                                    return res.data.data;
                                }, function(reject) {
                                    eventService.sendApiMetrics(0, {api_name: reject.config.url, type: 'get'}, reject.config.timeDiff);
                                });
                            }

                        }
                    }
                }
            });
    }

    /**
     * @name  HomeCtrl
     * @description Controller
     */
    function CashboxCtrl(currencyCollection, methodCollection, depositCollection, $timeout,
                         userCardsCollection, userProfileData, $filter, $scope, $uibModal,
                         cardService, bonusTerms, $sce, paymentMethods, $state, $rootScope, paymentParams, payment,
                         $httpParamSerializer, frameMessage, sessionData, eventService,
                         lastPaymentsCollection, getFeatures, userFinanceData) {

        var cashbox = this;

        //eventService.identifyUser(sessionData.user_id,sessionData.platform_id);
        eventService.send('screen_opened', 'deposit-page');
        $rootScope.htmlClasses = '';

        cashbox.currencies = currencyCollection;
        cashbox.methods = methodCollection;
        cashbox.deposits = depositCollection;
        cashbox.userProfile = userProfileData;
        cashbox.userCards = userCardsCollection;
        cashbox.sessionData = sessionData;
        cashbox.lastPayments = lastPaymentsCollection;
        cashbox.userFinance = userFinanceData;
        cashbox.kycLimit = getFeatures.getFeature('kyc-limit');
        cashbox.showCryptoWithdrawalWarning = getFeatures.getFeature('crypto-withdrawal-warning');
        cashbox.isRegulated = cashbox.userProfile.kyc.isRegulatedUser;
        cashbox.userNeedsToVerify = cashbox.isRegulated && (cashbox.userProfile.kyc.daysLeftToVerify === 0);
        cashbox.paymentController = {};
        cashbox.avalaibleDepLessThanMin = false;
        cashbox.userHasPayments = !_.isEmpty(cashbox.lastPayments);
        cashbox.needToAgreeWithTerms = cashbox.isRegulated && !cashbox.userHasPayments;
        cashbox.enabled3dsReccurent = getFeatures.getFeature('crypto-withdraw');
        cashbox.methodsOpened = false;

        frameMessage.send('showCountingInfo', false);

        cashbox.changeCurrency = function () {

            cashbox.currentCurrency = _.find(cashbox.currencies, function (o) {
                return o.name === cashbox.paymentController.currency;
            });

            if (cashbox.currentMethod) {
                checkLimits();
            }

            cashbox.paymentController.amount = initPopularAmount();
        };

        cashbox.setCurrencyEvent = function() {
            eventService.send('dropdown_changed', 'deposit-page_currency-changed', cashbox.currentCurrency.id );
        };

        cashbox.setPaymentMethodEvent = function() {
            eventService.send('dropdown_changed', 'deposit-page_payment-method-changed', cashbox.currentMethod.id );
        };

        cashbox.setLinkCardEvent = function(val) {
            var valueToSend = val ? 1 : 0;
            eventService.send('button_pressed', 'deposit-page_link-card', valueToSend);
        };

        cashbox.paymentPolicyEvent = function() {
            eventService.send('button_pressed', 'deposit-page_payment-policy');
        };

        cashbox.unlinkCardEvent = function() {
            eventService.send('button_pressed', 'deposit-page_unlink-card');
        };

        cashbox.setAmount = function (dep) {
            if(dep.amount !== cashbox.paymentController.amount) {
                cashbox.paymentController.amount = dep.amount;
                eventService.send('button_pressed', 'deposit-page_preset-picked', parseFloat(dep.amount));
            }
        };

        cashbox.changePaymentMethod = function (i) {
            if (!i) {
                cashbox.currentMethod = _.find(cashbox.methods, function (o) {
                    return o.id === cashbox.paymentController.method;
                });
            } else {
                cashbox.currentMethod = cashbox.methods[i];
            }

            if (cashbox.currentCurrency) {
                checkLimits();
            }

            checkAmountForLimits();

            if (cashbox.currentMethod.is_custom) {
                cashbox.refillWith3ds = cashbox.currentMethod.default_3ds;
            }
        };

        cashbox.getTotal = function (dep) {

            return $filter('money2')(dep.amount, cashbox.currentCurrency);
        };

        cashbox.getTotalAmount = function () {
            var obj = {
                amount: parseFloat(cashbox.paymentController.amount),
                bonus: cashbox.currentBonus
            };

            if (cashbox.paymentController.amount) return cashbox.getTotal(obj);
            return cashbox.currentCurrency ? $filter('money2')(0, cashbox.currentCurrency) : '';
        };


        cashbox.unlinkCard = function () {

            cashbox.unlinkCardEvent();

            frameMessage.send('showModal', {
                title: $filter('translate')('unlink card title'),
                content: '<p>' + $filter('translate')('unlink card text').replace('{ card }', cashbox.currentMethod.name) + '</p>',
                buttons: '<button data-close="true" class="btn btn-lg btn-default">' + $filter('translate')('cancel') + '</button>' +
                '<button data-action="processUnlinkCard" class="btn btn-lg btn-danger" style="width:56%">' + $filter('translate')('unlink card') + '</button>'
            });

            frameMessage.watch('processUnlinkCard', unlink);



            function unlink() {

                var filteredArray;

                frameMessage.send('showModal', {
                    title: $filter('translate')('unlink card title'),
                    content: '<p>' + $filter('translate')('unlink card text').replace('{ card }', cashbox.currentMethod.name) + '</p>',
                    buttons: '<button data-close="true" class="btn btn-lg btn-default">' + $filter('translate')('cancel') + '</button>' +
                    '<button data-action="processUnlinkCard" class="btn btn-lg btn-danger" style="width:56%" disabled>' + $filter('translate')('unlink card progress') + '</button>'
                });

                cardService.unlink(cashbox.currentMethod.card_id).then(function (res) {

                    frameMessage.send('showModal', {
                        title: $filter('translate')('card is unlinked'),
                        content: '<div style="text-align:center">' +
                        '<img src="'+ location.origin +'/images/cashbox/icon-success-circle.svg">' +
                        '<h4 style="margin-top:12xp;font-size:24px;color:#32ab51;font-weight:400;line-height:1.33;letter-spacing:-0.2px">' + $filter('translate')('card is unlinked title') + '</h4>' +
                        '<p style="margin-top:7xp">' + $filter('translate')('card is unlinked text') + '</p>' +
                        '</div>'
                    });

                    filteredArray = cashbox.methods.filter(function (m) {
                        return m.name != cashbox.currentMethod.name;
                    });

                    cashbox.methods = filteredArray;
                    cashbox.paymentController.method = cashbox.methods[0].id;
                    cashbox.changePaymentMethod();

                    $scope.state = 'unlinkIsOk';
                });
            }



            // $uibModal.open({
            //     keyboard: false,
            //     animation: true,
            //     backdrop: 'static',
            //     ariaLabelledBy: 'modal-title',
            //     ariaDescribedBy: 'modal-body',
            //     windowClass: 'new modal-withdrawal',
            //     controller: function ($scope) {
            //         $scope.state = 'default';
            //         $scope.card_name = cashbox.currentMethod.name;
            //         $scope.unlinkCard = function () {
            //             cardService.unlink(cashbox.currentMethod.card_id).then(function (res) {
            //                 var filteredArray;
            //
            //                 filteredArray = cashbox.methods.filter(function (m) {
            //                     return m.name != cashbox.currentMethod.name;
            //                 });
            //
            //                 cashbox.methods = filteredArray;
            //                 cashbox.paymentController.method = cashbox.methods[0].id;
            //                 cashbox.changePaymentMethod();
            //
            //                 $scope.state = 'unlinkIsOk';
            //             });
            //         }
            //     },
            //     templateUrl: 'src/common/modal/modal.unlink.tpl.html'
            // });

        };

        cashbox.cardIsLinkable = function () {
            if (cashbox.currentMethod &&
                cashbox.currentMethod.extra_params &&
                cashbox.currentMethod.extra_params.title === 'VisaMasterCardCashboxForm') {
                cashbox.paymentController.link_card_agree = true;
                return true;
            }
            cashbox.paymentController.link_card_agree = false;
            return false;
        };

        cashbox.bonusModal = function () {
            // $uibModal.open({
            //     keyboard: false,
            //     animation: true,
            //     backdrop: 'static',
            //     ariaLabelledBy: 'modal-title',
            //     ariaDescribedBy: 'modal-body',
            //     windowClass: 'new modal-bonus-terms',
            //     controller: function ($scope) {
            //         bonusTerms.get().then(function (res) {
            //             $scope.header = $sce.trustAsHtml(res.data.result.header);
            //             $scope.modalText = $sce.trustAsHtml(res.data.result.text);
            //         })
            //     },
            //     templateUrl: 'src/common/modal/bonus.terms.tpl.html'
            // });
            frameMessage.send('showBonusPolicy');
        };

        cashbox.terms = function () {
            bonusTerms.get();
        };

        cashbox.validateSum = function () {
            var minDep = cashbox.actualDeposits[cashbox.actualDeposits.length - 1];
            var minSum = cashbox.currentLimits.min;
            var maxSum = cashbox.currentLimits.minByKyc || cashbox.currentLimits.max;

            if (cashbox.paymentController.amount > maxSum) {
                cashbox.paymentController.amount = maxSum
            }
            if (!cashbox.paymentController.amount || cashbox.paymentController.amount < minSum) {
                cashbox.setAmount(minDep);
            }
        };

        cashbox.setPaymentMethod = function(method, index) {
            cashbox.paymentController.method = method.id;
            cashbox.changePaymentMethod(index);
            cashbox.setPaymentMethodEvent();
            cashbox.methodsOpened = false;
        };


        cashbox.focusAmountField = function() {
            cashbox.amountFocus = true;
            cashbox.amountSumOnFocus = cashbox.paymentController.amount;
        };

        cashbox.blurAmountField = function() {
            var valueToSend = Number(cashbox.paymentController.amount);
            cashbox.amountFocus = false;
            cashbox.validateSum();

            if (cashbox.amountSumOnFocus != valueToSend){
                eventService.send('text_changed', 'deposit-page_amount', valueToSend);
            }
        };

        cashbox.mouseOverVipEvent = function() {
            eventService.send('button_pressed', 'deposit-page_vip-info', 0);
        };

        cashbox.clickOnVipEvent = function() {
            eventService.send('button_pressed', 'deposit-page_vip-info', 1);
        };

        function checkLimits() {
            var realMin, realMax;

            var limitsSet = {
                min: cashbox.currentMethod.limits[cashbox.currentCurrency.name].min,
                max: cashbox.currentMethod.limits[cashbox.currentCurrency.name].max,
                min_dep: cashbox.currentCurrency.min_dep,
                max_dep: cashbox.currentCurrency.max_dep
            };

            if (limitsSet.min === 0) {
                realMin = limitsSet.min_dep;
            } else {
                realMin = Math.max(limitsSet.min_dep, limitsSet.min);
            }

            if (limitsSet.max === 0) {
                realMax = limitsSet.max_dep;
            } else {
                realMax = Math.min(limitsSet.max_dep, limitsSet.max);
            }

            cashbox.currentLimits = {
                min: realMin,
                max: realMax
            };

            if (cashbox.kycLimit === 'enabled' && cashbox.userFinance.kyc_limited) {
                cashbox.currentLimits.minByKyc = cashbox.currentLimits.max - cashbox.userFinance.success_sum;

                if (cashbox.currentLimits.minByKyc < cashbox.currentLimits.min) {
                    cashbox.avalaibleDepLessThanMin = true;
                }
            }

            setDeposits(cashbox.currentLimits);

        }

        function setDeposits(limits) {
            var length,
                depositsByCurrency = cashbox.deposits[cashbox.paymentController.currency],
                actualDeposits = [],
                vipSums = [];

            _.each(depositsByCurrency, function (dep) {
                dep.badge === 'vip' ? vipSums.push(dep.amount) : null;

                if (cashbox.currentLimits.minByKyc && dep.amount > cashbox.currentLimits.minByKyc) {
                    dep.disabled = true;
                }

                if (dep.amount <= limits.max && dep.amount >= limits.min) {
                    actualDeposits.push(dep);
                }
            });

            length = actualDeposits.length;

            if (length > 10) {
                actualDeposits = actualDeposits.slice( length - 11, length);
            }

            actualDeposits.length % 2 ? actualDeposits.splice(actualDeposits.length - 2, 1) : null;

            cashbox.minSumForVIP = Math.min.apply(null, vipSums);
            cashbox.actualDeposits = actualDeposits;
        }

        function setPaymentMethods() {
            if (!_.isEmpty(cashbox.userCards)) {
                _.each(cashbox.userCards, function (card) {
                    card.id = card.payment_method_id + card.card_id.toString();
                    card.name = card.card_number.replace(/X/g, '•').replace(/-/g, ' ');
                    card.is_custom = true;
                    card.icon_url_xs = card.card_icon_xs;
                    card.kyc_restricted = false;
                });
                cashbox.methods = _.concat(cashbox.userCards, cashbox.methods);
            }
            _.each(cashbox.methods, function(method){
                method.disabled = (cashbox.kycLimit === 'enabled' && method.kyc_restricted === true) ?
                    true : false;
            });


            if(cashbox.kycLimit === 'enabled' && cashbox.userFinance.kyc_limited) {
                $scope.cashbox.methods.sort(function(method) {
                    if (method.disabled) return 1;
                    else return -1;
                })
            }

        }


        function initPopularAmount() {
            var deposits = cashbox.deposits[cashbox.currentCurrency.name];

            var popularDep = _.find(deposits, function (dep) {
                return dep.badge === 'popular';
            }) || deposits[0];


            if (cashbox.currentLimits && popularDep && popularDep.amount < cashbox.currentLimits.min) {
                return cashbox.actualDeposits[$scope.cashbox.actualDeposits.length - 1].amount;
            }

            return popularDep.amount;
        }

        function checkAmountForLimits() {
            if (cashbox.paymentController.amount < cashbox.currentLimits.min) {
                cashbox.paymentController.amount = cashbox.actualDeposits[$scope.cashbox.actualDeposits.length - 1].amount;
            }
            if (cashbox.paymentController.amount > cashbox.currentLimits.max) {
                cashbox.paymentController.amount = cashbox.currentLimits.max;
            }
        }

        function initCurrency() {
            var userCurrency = _.find(cashbox.userProfile.balances, function (cur) {
                return cur.type === 1;
            });
            var currencyFound = _.find(cashbox.currencies, function (cur) {
                return cur.name === userCurrency.currency;
            });

            if (currencyFound) return currencyFound.name;
            return cashbox.currencies[0].name;
        }

        function restoreCurrency(name) {
            var currencyFound = _.find(cashbox.currencies, function (cur) {
                return cur.name === name;
            });
            if (currencyFound) return currencyFound.name;
            return initCurrency();
        }

        function restorePaymentMethod(payment_method) {
            var method_found = _.find(cashbox.methods, function (m) {
                return m.id === payment_method;
            });

            if (method_found) {
                return method_found.id;
            }
            return cashbox.methods[0].id;
        }

        function redirectToPay(res) {
            if (res.data.isSuccessful) {
                frameMessage.send('windowScrollTop');
                var paymentResult = res.data;
                eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'post'}, res.config.timeDiff)
                    .finally(function() {
                        payment.redirect(paymentResult);
                    });

            } else {

                if (res.data.errors &&
                    res.data.errors.validation &&
                    res.data.errors.validation.params &&
                    res.data.errors.validation.params.amount) {
                        cashbox.pageHasErrors = true;

                        cashbox.errorsOnPay = [];
                        _.each(res.data.errors.validation.params.amount, function(v,k){
                            cashbox.errorsOnPay.push(v);
                        });
                        cashbox.payIsProcessing = false;
                } else {
                    eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'post'}, res.config.timeDiff)
                        .finally(function() {
                            payment.failredirect(res.data);
                        })
                }

            }
        }

        function sendShowCountingInfo(pay_params) {

            var object_to_send = {
                payment_method_id: pay_params.payment_method,
                currency: pay_params.currency,
                deposit: pay_params.amount,
                total : pay_params.amount
            };

            frameMessage.send('showCountingInfo', object_to_send);
        }

        function cashboxToVisible() {
            cashbox.style = {
                opacity: 1
            };
        }

        function setAmountLimit() {
            if (cashbox.kycLimit === 'enabled' && cashbox.userFinance.kyc_limited) {
                cashbox.amountWithKycLimit = true;
            }
        }


        cashbox.goToPayment = function () {
            eventService.send('button_pressed', 'deposit-page_deposit');
            cashbox.pageHasErrors = false;

            var pay_params = {
                payment_method: cashbox.currentMethod.payment_method_id || cashbox.currentMethod.id,
                currency: cashbox.currentCurrency.name,
                amount: cashbox.paymentController.amount
            };

            if (cashbox.currentMethod.extra_params && cashbox.currentMethod.extra_params.title === 'VisaMasterCardCashboxForm') {
                pay_params.link_card_agree = cashbox.paymentController.link_card_agree;
            }

            frameMessage.send('saveUserSettings',{currencyId : cashbox.currentCurrency.iqoption_id});

            paymentParams.set(pay_params);
            paymentMethods.currentMethod = cashbox.currentMethod;

            if (!cashbox.currentMethod.extra_params && !cashbox.currentMethod.card_id) {
                cashbox.payIsProcessing = true;

                return payment.process(pay_params).then(function (res) {
                    redirectToPay(res);
                },function (reject) {
                    eventService.sendApiMetrics(0, {api_name: reject.config.url, type: 'post'}, reject.config.timeDiff);
                });
            }

            else {

                if (cashbox.currentMethod.is_custom && !cashbox.refillWith3ds) {
                    cashbox.payIsProcessing = true;
                    return payment.process(pay_params, {card_id: cashbox.currentMethod.card_id}).then(function (res) {
                        redirectToPay(res);
                    },function (reject) {
                        eventService.sendApiMetrics(0, {api_name: reject.config.url, type: 'post'}, reject.config.timeDiff);
                    })
                }

                cashbox.style = {
                    opacity: 0
                };

                sendShowCountingInfo(pay_params);

                if (!!(cashbox.currentMethod.is_custom && cashbox.refillWith3ds)) {
                    pay_params.recurrent_card = _.pick(cashbox.currentMethod,['name', 'expiry_date','card_holder','card_id']);
                    pay_params.payment_method = cashbox.currentMethod.payment_method_3ds_id;
                    paymentParams.set(pay_params);
                    return $state.go('root.cashbox.cardform-3ds', {recurrent: true});
                }

                if (cashbox.currentMethod.extra_params.title === "VisaMasterCardCashboxForm") {
                    return $state.go('root.cashbox.cardform');

                }

                if (cashbox.currentMethod.pay_system === "astropay_card") {
                    return $state.go('root.cashbox.astropayform');

                }

                $state.go('root.cashbox.detail', {param: 'param'});

            }

        };

        $timeout(function () {
            var restore_params = paymentParams.get();
            setAmountLimit();

            if (!restore_params) {
                cashbox.paymentController.currency = initCurrency();
                setPaymentMethods();
                cashbox.paymentController.method = cashbox.methods[0].id;
                cashbox.paymentController.link_card_agree = true;
                cashbox.changeCurrency();
                cashbox.changePaymentMethod();
                cashboxToVisible();

            } else {
                //if currency from restore object not found init with first available
                cashbox.paymentController.currency = restoreCurrency(restore_params.currency);

                if (restore_params.link_card_agree === false) {
                    cashbox.paymentController.link_card_agree = false;
                } else {
                    cashbox.paymentController.link_card_agree = true;
                }


                //merge methods with cards
                setPaymentMethods();

                //restore method
                cashbox.paymentController.method = restorePaymentMethod(restore_params.payment_method);

                //set current currency object
                cashbox.currentCurrency = _.find(cashbox.currencies, function (o) {
                    return o.name === cashbox.paymentController.currency;
                });
                cashbox.changeCurrency();
                cashbox.changePaymentMethod();

                //restore amount and validate it by limits
                if (restore_params.amount) {
                    cashbox.paymentController.amount = parseFloat(Number(restore_params.amount).toFixed(2));
                }
                else {
                    cashbox.paymentController.amount = initPopularAmount();
                }
                cashbox.validateSum();

                //UGLYHACK restore bonus after sum watcher
                $timeout(function () {
                    setDeposits(cashbox.currentLimits);

                    if (restore_params.process_payment) {
                        cashbox.goToPayment();
                    }
                    cashboxToVisible();

                }, 0);
            }

        });

    }

})();
