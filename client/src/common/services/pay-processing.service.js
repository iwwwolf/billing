(function () {
    'use strict';


    angular.module('common.services.data')
        .service('payment', function ($http, $httpParamSerializer, $rootScope) {

            this.process = function (params, extra_params) {
                if (extra_params) {
                    _.each(extra_params, function (val, key) {
                        params['extra_params[' + key + ']'] = val;
                    });

                }
                return $http({
                    method: 'POST',
                    url: '/external/cashbox/pay',
                    data: $httpParamSerializer(params),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            };

            this.redirect = function(res) {
                var form = document.createElement('form');

                form.action = res.data.redirect.url;

                if (res.data.redirect.method) {
                    form.method = res.data.redirect.method;
                }

                if(form.action.indexOf('http') === -1
                    || form.action.indexOf(document.location.hostname) === -1
                    || form.action.indexOf('external/payment-redirect') > -1
                    || form.action.indexOf('bank-transfer')) {
                    form.target = '_top';
                }

                _.each(res.data.redirect.params, function(value, key){
                    var input = document.createElement('input');
                    input.name = key;
                    input.value = value;
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit();
            };

            this.failredirect = function(result) {
                var failedObject = {
                    data: {
                        redirect: {
                            params: {
                                sess_id: $rootScope.sess_id || result.data.sess_id
                            },
                            url: "/external/payment-redirect/failed"
                        }
                    }

                };
                this.redirect(failedObject);
            }
        });

})();