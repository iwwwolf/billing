(function () {
    'use strict';

    angular.module('advancedform', ['ngSanitize'])
        .config(config)
        .controller('AdvancedFormCtrl', AdvancedFormCtrl);

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.cashbox.detail', {
                url: 'detail/?param',
                views: {
                    '@': {
                        templateUrl: 'src/app/advanced-form/advanced.form.tpl.html',
                        controller: 'AdvancedFormCtrl as detail'
                    }
                },
                resolve: {
                    userProfileData: function (userProfile) {
                        return userProfile.get().then(function (res) {
                            return res.data.result;
                        });
                    }
                }
            });
    }

    function AdvancedFormCtrl(paymentMethods, $state, $scope, $timeout,
                               payment, userProfileData, paymentParams, $httpParamSerializer, currencies, eventService) {

        var detail = this;
        detail.method = paymentMethods.currentMethod;

        if (!detail.method.extra_params) {
            $state.go('root.cashbox');
            return;
        }

        eventService.send('screen_opened', 'deposit-by-' + _.snakeCase(detail.method.name));

        $scope.fields = {};
        detail.showErrors = {};
        detail.formFields = [];
        detail.payParams = paymentParams.get();

        currencies.get().then(function(res){
            detail.currencies = res.data.data;
            detail.currency = _.find(res.data.data, {'name': detail.payParams.currency});
        });


        _.each(detail.method.extra_params.properties, function (param, key) {
            var obj = param;
            obj.name = key;

            if (param.type === 'select') {
                obj.like = 'select';
                $scope.fields[param.name] = param.values[Object.keys(param.values)[0]];
            } else {
                obj.like = 'input';
            }

            if (detail.method.extra_params.required.indexOf(obj.name) !== -1) {
               obj.required = true;
            }

            var profile_prop = _.snakeCase(obj.title);

            if (userProfileData[profile_prop] && userProfileData[profile_prop].replace(' ','')) {
                obj.value = userProfileData[profile_prop];
                $scope.fields[obj.name] = obj.value;
            }

            detail.formFields.push(obj);
            detail.showErrors[obj.name] = false;
        });

        detail.removeError = function(name) {
            detail.showErrors[name] = false;
        };

        detail.fieldOnFocus = function(field, data) {
            field.tmpValue = data;
        };

        detail.fieldOnBlur = function(field, data) {

            if (field.tmpValue !== data) {
                eventService.send('text_changed', 'deposit-by-' + _.snakeCase(detail.method.name) + '_' + field.name);
            }
        };

        detail.backToCashboxEvent = function() {
            eventService.send('button_pressed', 'deposit-by-' + _.snakeCase(detail.method.name) + '_back');
        };

        detail.pay = function() {
            _.each(detail.showErrors, function(o,k){
                detail.showErrors[k] = true;
            });

            $timeout(function(){
                $scope.aform.$setSubmitted();
            });

            if($scope.aform.$valid) {
                detail.payIsProcessing = true;
                eventService.send('button_pressed', 'deposit-by-' + _.snakeCase(detail.method.name) + '_pay');

                payment.process(detail.payParams, $scope.fields).then(function(res) {
                    eventService.send('system', 'billing_api-call', 1, {api_name: res.config.url, type: 'post'}, res.config.timeDiff)
                        .finally(function(){
                            if(res.data.isSuccessful) {
                                payment.redirect(res.data);
                            } else{
                                payment.failredirect(res.data);
                            }
                        })
                }, function (err) {
                    eventService.send('system', 'billing_api-call', 0, {api_name: '/external/cashbox/pay', type: 'post'}, null)
                })
            }

        }



    }

})();