(function () {
    'use strict';

    angular.module('advancedform')
        .config(config)
        .controller('VisaCryptoCardFormCtrl', VisaCryptoCardFormCtrl);

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.crypto-cardform', {
                url: '/crypto-cardform/',
                views: {
                    'header@': {
                        templateUrl:'src/app/crypto-visa-form/header.tpl.html'
                    },
                    '@': {
                        templateUrl: 'src/app/crypto-visa-form/visa.form.tpl.html',
                        controller: 'VisaCryptoCardFormCtrl as detail'
                    },
                    'footer@': {
                        templateUrl: 'src/app/crypto-visa-form/footer.tpl.html',
                        controller: 'FooterCryptoCtrl as footer'
                    }
                }
            });
    }

    function VisaCryptoCardFormCtrl(paymentMethods, $state, $scope, $timeout, payment,
                              paymentParams, currencies, frameMessage, $http, $rootScope, locationService, eventService) {

        var detail = this;

        // Add class to container element
        $rootScope.containerClasses.push('wide-page');

        // Experiment implementation
        var experiment = locationService.getURLParameter('experiment');
        // Validate GET parameter of the experiment name
        if (
            window.location.pathname.indexOf('landing') > -1 &&
            experiment && typeof experiment === 'string' && experiment.length < 50
        ) {
            $rootScope.experiment = experiment;
            $rootScope.htmlClasses.push('experiment-' + experiment);
        }

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


        $scope.fields = {};
        $scope.card = {};
        $scope.state = $state;

        init();

        detail.removeError = function (name) {
            detail.showErrors[name] = false;
            detail.errorDate = '';
        };

        detail.fieldFocus = function (name) {
            detail[name + '_focused'] = true;
        };

        detail.fieldBlur = function (name, eventName) {
            detail[name + '_focused'] = false;
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

                    }
                    else {
                        if (!_.isEmpty(res.data.errors)) {
                            if(res.data.errors.validation.extra_params.card_exp_month){
                                detail.payIsProcessing = false;
                                detail.errorDate = res.data.errors.validation.extra_params.card_exp_month[0];
                            } else
                            if(res.data.errors.validation.extra_params.card_number){
                                setFormErrors();
                                _.each(res.data.errors.validation.extra_params.card_number, function(k,v){
                                    detail.cardProcessingErrors.push(k);
                                })
                            } else
                            if (res.data.errors &&
                                res.data.errors.validation.params &&
                                res.data.errors.validation.params.amount) {
                                setFormErrors();
                                    _.each(res.data.errors.validation.params.amount, function(k,v){
                                        detail.cardProcessingErrors.push(k);
                                    });
                            } else {
                                frameMessage.send('goToPaymentStatus');
                            }

                        } else {
                            frameMessage.send('goToPaymentStatus');
                        }
                    }

                })
            }
        };

        function getFields() {
            _.each(detail.method.extra_params.properties, function (param, key) {
                var obj = param;
                obj.name = key;
                detail.formFields.push(obj);
            });
        }

        function setLimits() {
            var monthArray = detail.method.extra_params.properties.card_exp_month.type.enum;
            var yearsArray = detail.method.extra_params.properties.card_exp_year.type.enum.filter(function (n) {
                return n.toString().length === 2;
            });

            detail.rangeLimits.monthMin = Math.min.apply(null, monthArray);
            detail.rangeLimits.monthMax = Math.max.apply(null, monthArray);
            detail.rangeLimits.yearsMin = Math.min.apply(null, yearsArray);
            detail.rangeLimits.yearsMax = Math.max.apply(null, yearsArray);
        }

        function init() {
            paymentMethods.get().then(function(res){
                detail.method = _.find(res.data.data, {'cashbox_css_class': 'visa-mastercard'});
                detail.payParams.payment_method = detail.method.id;
                getFields();
                setLimits();
                currencies.getCurrencies().then(function (res) {
                    detail.currencies = res.data.data;
                    if (!detail.payParams.currency) {
                        detail.payParams.currency = 'USD';
                    }

                    detail.currency = _.find(res.data.data, {'name': detail.payParams.currency});
                });

            });

        }

        function setFormErrors() {
            detail.payIsProcessing = false;
            detail.cardProcessingErrors=[];
            detail.formHasErrors = true;
        }

        function takePaymentStatus(url){
            $timeout(function () {
                $rootScope.loading = true;
            }, 500);

            frameMessage.send('openUrl', url);
        }

    }

})();