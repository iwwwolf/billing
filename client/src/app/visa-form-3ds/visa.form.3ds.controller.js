(function () {
    'use strict';

    angular.module('advancedform')
        .config(config)
        .controller('VisaCardForm3dsCtrl', VisaCardForm3dsCtrl);

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.cashbox.cardform-3ds', {
                url: 'cardform-3ds/',
                views: {
                    '@': {
                        templateUrl: 'src/app/visa-form-3ds/visa.form.3ds.tpl.html',
                        controller: 'VisaCardForm3dsCtrl as detail'
                    }
                }
            });
    }

    function VisaCardForm3dsCtrl(paymentMethods, $stateParams, $state, $scope, $timeout, $httpParamSerializer, payment,
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
        //detail.cardType = 'default';
        detail.formFields = [];
        detail.payParams = paymentParams.get();
        detail.cardType = userCards.getCreditCardType(detail.payParams.recurrent_card.name);

        if (_.isEmpty(detail.payParams)) {
            $state.go('root.cashbox');
            return;
        }

        $scope.stateParams = $stateParams;
        $scope.fields = {};
        $scope.card = {
            card_cvv: '',
            card_id: detail.payParams.recurrent_card.card_id
        };

        var formValues = {
            card_cvv: {
                actual: '',
                previous: ''
            }
        };


        eventService.send('screen_opened', 'deposit-by-card');

        currencies.get().then(function (res) {
            detail.currencies = res.data.data;
            detail.currency = _.find(res.data.data, {'name': detail.payParams.currency});
        });

        $scope.card_recurrent = {
            card_number: detail.payParams.recurrent_card.name,
            card_exp_month: detail.payParams.recurrent_card.expiry_date.split('/')[0],
            card_exp_year: detail.payParams.recurrent_card.expiry_date.split('/')[1],
            card_holder: detail.payParams.recurrent_card.card_holder
        }

        detail.removeError = function (name) {
            detail.showErrors[name] = false;
            detail.errorDate = '';
        };

        detail.backToCashboxEvent = function () {
            eventService.send('button_pressed', 'deposit-by-card_back');
        };

        detail.fieldFocus = function (name) {
            detail[name + '_focused'] = true;
            formValues[name].previous = $scope.card[name] ? $scope.card[name] : '';
        };

        detail.fieldBlur = function (name, eventName) {
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
                detail.formHasErrors = false;
                detail.payIsProcessing = true;
                eventService.send('button_pressed', 'deposit-by-card_pay');

                payment.process(detail.payParams, $scope.card).then(function (res) {
                    if (res.data.isSuccessful) {
                        eventService.sendApiMetrics(1, {api_name: res.config.url, type: 'post'}, res.config.timeDiff)
                        payment.redirect(res.data);
                    }
                    else {
                        payment.failredirect(res.data);
                    }

                }, function(reject){
                    eventService.sendApiMetrics(0, {api_name: reject.config.url, type: 'post'}, reject.config.timeDiff)
                })
            }
        };


    }

})();
