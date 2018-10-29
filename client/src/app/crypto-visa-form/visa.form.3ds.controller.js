(function () {
    'use strict';

    angular.module('advancedform')
        .config(config)
        .controller('VisaCryptoCardForm3dsCtrl', VisaCryptoCardForm3dsCtrl);

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.crypto-3dscardform', {
                url: '/crypto-cardform-3ds/',
                views: {
                    'header@': {
                        templateUrl:''
                    },
                    '@': {
                        templateUrl: 'src/app/crypto-visa-form/visa.form.3ds.tpl.html',
                        controller: 'VisaCryptoCardForm3dsCtrl as detail'
                    },
                    'footer@': {
                        templateUrl: 'src/app/crypto-visa-form/footer.tpl.html',
                        controller: 'FooterCryptoCtrl as footer'
                    }
                }
            });
    }

    function VisaCryptoCardForm3dsCtrl($stateParams, $state, $scope, locationService, userCards, payment,
                                 paymentParams, currencies, frameMessage, $rootScope, $timeout, eventService) {
        var detail = this,
            fieldsValues = {};

        var formValues = {
            card_cvv: {
                actual: '',
                previous: ''
            }
        };

        detail.showErrors = {
            card_cvv: false,
            card_holder: false,
            card_exp_year: false,
            card_exp_month: false,
            card_number: false
        };

        detail.cardProcessingErrors = [];
        detail.rangeLimits = {};
        detail.formFields = [];
        detail.crypto_amount = locationService.getURLParameter('amount');
        detail.color = locationService.getURLParameter('color');

        detail.payParams = paymentParams.get();
        detail.payParams.type = locationService.getURLParameter('purchase_type') === 'exchange' ?
            'crypto_purchase_exchange' : 'crypto_purchase';
        detail.payParams.ticker = locationService.getURLParameter('ticker');
        detail.payParams.commission = locationService.getURLParameter('commission');
        detail.payParams.useTokenForCommission = locationService.getURLParameter('use_token_for_commission') ?
            true : false;




        $scope.stateParams = $stateParams;
        $scope.fields = {};

        // Add class to container element
        $rootScope.containerClasses.push('wide-page');

        init();

        detail.removeError = function (name) {
            detail.showErrors[name] = false;
            detail.errorDate = '';
        };

        detail.fieldFocus = function (name) {
            detail[name + '_focused'] = true;
            formValues[name].previous = $scope.card[name] ? $scope.card[name] : '';
        };

        detail.fieldBlur = function (name, eventName) {
            detail[name + '_focused'] = false;
            formValues[name].actual = $scope.card[name] ? $scope.card[name] : '';
        };

        detail.eventBack = function () {
            frameMessage.send('close');
        };

        detail.pay = function () {

            _.each(detail.showErrors, function (o, k) {
                detail.showErrors[k] = true;
            });

            if ($scope.aform.$valid) {
                detail.formHasErrors = false;
                detail.payIsProcessing = true;

                payment.process(detail.payParams, $scope.card).then(function (res) {
                    eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'post'}, res.config.timeDiff)
                    if (res.data.isSuccessful) {
                        var url = res.data.data.redirect.url;

                        if (url.indexOf('iqoption.com') > -1 || url.indexOf('mobbtech.com') > -1 ) {

                            if (url.indexOf('failed') > -1) {
                                return frameMessage.send('goToPaymentStatus');
                            }
                            if (url.indexOf('success') > -1) {
                                return frameMessage.send('goToPaymentStatus');
                            }

                            takePaymentStatus(res.data.data.redirect);

                        } else {
                            takePaymentStatus(res.data.data.redirect);
                        }

                    } else {
                        frameMessage.send('goToPaymentStatus');
                    }

                }, function(reject) {
                    eventService.sendApiMetrics(0, {api_name: reject.config.url, type: 'post'}, reject.config.timeDiff)
                })
            }
        };

        function init() {

            userCards.get().then(function (res) {
                var card_id = Number(locationService.getURLParameter('card_id'));
                var recurrent_card = _.find(res.data.data, {'card_id': card_id});

                detail.payParams.recurrent_card = _.pick(recurrent_card,['card_number', 'expiry_date','card_holder','card_id']);;
                detail.payParams.payment_method = recurrent_card.payment_method_3ds_id;

                $scope.card = {
                    card_cvv: '',
                    card_id: card_id
                };

                $scope.card_recurrent = {
                    card_number: detail.payParams.recurrent_card.card_number,
                    card_exp_month: detail.payParams.recurrent_card.expiry_date.split('/')[0],
                    card_exp_year: detail.payParams.recurrent_card.expiry_date.split('/')[1],
                    card_holder: detail.payParams.recurrent_card.card_holder
                }


                currencies.get().then(function (res) {
                    detail.currencies = res.data.data;
                    detail.currency = _.find(res.data.data, {'name': detail.payParams.currency});
                });

            });
        }

        function takePaymentStatus(url){
            $timeout(function () {
                $rootScope.loading = true;
            }, 500);

            frameMessage.send('openUrl', url);
        }


    }

})();