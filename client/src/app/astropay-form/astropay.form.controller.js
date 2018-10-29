(function () {
    'use strict';

    angular.module('advancedform')
        .config(config)
        .controller('AstropayCardFormCtrl', AstropayCardFormCtrl)
        .constant('MONTHS', [1,2,3,4,5,6,7,8,9,10,11,12])

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.cashbox.astropayform', {
                url: 'astropay/',
                views: {
                    '@': {
                        templateUrl: 'src/app/astropay-form/astropay.form.tpl.html',
                        controller: 'AstropayCardFormCtrl as detail'
                    }
                }
            });
    }

    function AstropayCardFormCtrl(paymentMethods, $state, $scope, $timeout, $httpParamSerializer, payment,
                              paymentParams, currencies, eventService, userCards, MONTHS) {
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

        detail.formFields = [];
        detail.payParams = paymentParams.get();

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

        detail.pay = function () {
            _.each(detail.showErrors, function (o, k) {
                detail.showErrors[k] = true;
            });

            if ($scope.aform.$valid) {
                eventService.send('button_pressed', 'deposit-by-card_pay');

                detail.formHasErrors = false;
                detail.payIsProcessing = true;
                $scope.card.card_exp_month = minTwoDigits($scope.card.card_exp_month);
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
            detail.rangeLimits.monthMin = Math.min.apply(null, MONTHS);;
            detail.rangeLimits.monthMax = Math.max.apply(null, MONTHS);
            detail.rangeLimits.yearsMin = new Date().getFullYear();
            detail.rangeLimits.yearsMax = new Date().getFullYear() + 20;
        }

        function minTwoDigits(n) {
            return (n.length < 2 ? '0' : '') + n;
        }

        function init() {

            if (_.isEmpty(detail.method) || detail.method.pay_system !== 'astropay_card') {
                $state.go('root.cashbox');
                return;
            }

            eventService.send('screen_opened', 'deposit-by-card');

            currencies.get().then(function (res) {
                detail.currencies = res.data.data;
                detail.currency = _.find(res.data.data, {'name': detail.payParams.currency});
            });

            getFields();

            setLimits();

        }

        init();

    }

})();
