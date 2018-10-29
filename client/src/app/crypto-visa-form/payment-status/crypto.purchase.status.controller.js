(function () {
    'use strict';

    angular.module('advancedform')
        .config(config)
        .value('CRYPTO_CURRENCIES', {
                LTC: 'Litecoin',
                BTC: 'Bitcoin',
                ETH: 'Etherium',
                XPR: 'Ripple',
                DSH: 'Dash'
        })
        .controller('CryptoPurchaseStatusCtrl', CryptoPurchaseStatusCtrl);

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.crypto-cardform.status', {
                url: 'status/',
                views: {
                    'header@': {
                        template:''
                    },
                    '@': {
                        templateUrl: 'src/app/crypto-visa-form/payment-status/crypto-purchase-status.html',
                        controller: 'CryptoPurchaseStatusCtrl as detail'
                    },
                    'footer@': {
                        template: ''
                    }
                }
            });
    }

    function CryptoPurchaseStatusCtrl($http, frameMessage, $timeout, $rootScope, CRYPTO_CURRENCIES, userProfile, configurationService, locationService) {
        var detail = this;
        var profileTaken = false;
        var delay = 4000;

        // Experiment implementation
        var experiment = locationService.getURLParameter('experiment');
        // Validate GET parameter of the experiment name
        if (
            window.location.pathname.indexOf('landing') > -1 &&
            experiment && typeof experiment === 'string' && experiment.length < 50
        ) {
            $rootScope.experiment = experiment;
            $rootScope.htmlClasses.push('experiment-' + experiment + '-status');
        }

        detail.cryptoCurrencies = CRYPTO_CURRENCIES;
        getStatus();

        function getStatus() {
            $http.get('/external/cashbox/status-purchase').then(function (res) {
                detail.response = res.data;

                if (!detail.response.payment_finished || !detail.response.order_finished) {
                    retakeStatus();
                } else {
                    if (detail.response.order_status === 'success' && detail.response.payment_status === 'success') {
                        detail.successEvent();
                    }
                }
                if (detail.response.payment_finished && detail.response.payment_status === 'success') {
                    if (!profileTaken) {
                        userProfile.getProfile();
                        profileTaken = true;
                        configurationService.getConfiguration();
                    }
                }

            })
        }

        function retakeStatus() {
            delay += delay < 10000 ? 1000 : 0;
            $timeout(getStatus, delay);
        }

        detail.successEvent = function () {
            frameMessage.send('successPayment', {
                amount: detail.response.position_count,
                ticker: detail.response.order_ticker
            });
        };

        detail.goToIqoption = function () {
            frameMessage.send('goToIqoption');
        };

        detail.tryAgain = function () {
            frameMessage.send('close');
        };

    }

})();