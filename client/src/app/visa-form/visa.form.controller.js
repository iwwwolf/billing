(function () {
    'use strict';

    angular.module('advancedform')
        .config(config)
        .controller('VisaCardFormCtrl', VisaCardFormCtrl);

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.cashbox.cardform', {
                url: 'cardform/?param',
                views: {
                    '@': {
                        templateUrl: 'src/app/visa-form/visa.form.tpl.html',
                        controller: 'VisaCardFormCtrl as detail'
                    }
                }
            });
    }

    function VisaCardFormCtrl(paymentMethods, $state, $scope, $timeout, $httpParamSerializer, payment,
                              paymentParams, currencies, eventService, userCards) {
        var detail = this,
            fieldsValues = {};

        detail.method = paymentMethods.currentMethod;
        detail.showErrors = {
            card_cvv: false,
            card_holder: false,
            card_exp_year: false,
            card_exp_month: false,
            card_number: false
        };
        detail.cardProcessingErrors = [];
        detail.rangeLimits = {};
        detail.cardType = 'default';
        $scope.fields = {};
        $scope.card ={};

        var formValues = {
            card_number:{
                actual:'',
                previous:''
            },
            card_exp_month:{
                actual:'',
                previous:''
            },
            card_exp_year:{
                actual:'',
                previous:''
            },
            card_holder:{
                actual:'',
                previous:''
            },
            card_cvv:{
                actual:'',
                previous:''
            }
        };

        if (!detail.method.extra_params) {
            $state.go('root.cashbox');
            return;
        }

        eventService.send('screen_opened', 'deposit-by-card');

        detail.formFields = [];
        detail.payParams = paymentParams.get();

        currencies.get().then(function (res) {
            detail.currencies = res.data.data;
            detail.currency = _.find(res.data.data, {'name': detail.payParams.currency});
        });

        getFields();

        setLimits();

        detail.removeError = function (name) {
            detail.showErrors[name] = false;
            detail.errorDate = '';
        };

        detail.backToCashboxEvent = function () {
            eventService.send('button_pressed', 'deposit-by-card_back');
        };

        detail.fieldFocus = function(name){
            detail[name + '_focused'] = true;
            formValues[name].previous = $scope.card[name] ? $scope.card[name] : '';
        };

        detail.fieldBlur = function(name, eventName){
            detail[name + '_focused'] = false;
            formValues[name].actual = $scope.card[name] ? $scope.card[name] : '';

            if (formValues[name].actual !== formValues[name].previous) {
                eventService.send('text_changed', eventName);
            }
        };

        detail.setCardType = function(number) {
            detail.cardType = userCards.getCreditCardType(number);
        };

        detail.pay = function () {
            _.each(detail.showErrors, function (o, k) {
                detail.showErrors[k] = true;
            });

            if ($scope.aform.$valid) {
                detail.formHasErrors = false;
                detail.payIsProcessing = true;
                eventService.send('button_pressed', 'deposit-by-card_pay');

                payment.process(detail.payParams, $scope.card).then(function (res) {

                    eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'post'}, res.config.timeDiff)
                        .finally(function() {
                            if (res.data.isSuccessful) {
                                payment.redirect(res.data);
                            }
                            else {
                                if (!_.isEmpty(res.data.errors)) {
                                    if(res.data.errors.validation.extra_params.card_exp_month){
                                        detail.payIsProcessing = false;
                                        detail.errorDate = res.data.errors.validation.extra_params.card_exp_month[0];
                                    } else
                                    if(res.data.errors.validation.extra_params.card_number){
                                        detail.payIsProcessing = false;
                                        detail.cardProcessingErrors=[];
                                        detail.formHasErrors = true;
                                        _.each(res.data.errors.validation.extra_params.card_number, function(k,v){
                                            detail.cardProcessingErrors.push(k);
                                        })
                                    } else
                                    if (res.data.errors &&
                                        res.data.errors.validation.params &&
                                        res.data.errors.validation.params.amount) {
                                        detail.payIsProcessing = false;
                                        detail.cardProcessingErrors=[];
                                        detail.formHasErrors = true;
                                        _.each(res.data.errors.validation.params.amount, function(k,v){
                                            detail.cardProcessingErrors.push(k);
                                        });
                                    } else {
                                        payment.failredirect(res.data);
                                    }

                                } else {
                                    payment.failredirect(res.data);
                                }
                            }
                        });

                }, function (err) {
                    eventService.sendApiMetrics(0, {api_name: '/external/cashbox/pay', type: 'post'}, null)
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


    }

})();
