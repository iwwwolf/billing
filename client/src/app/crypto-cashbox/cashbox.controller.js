(function () {
    'use strict';

    angular.module('cashbox')
        .config(config)
        .controller('CryptoCashboxCtrl', CryptoCashboxCtrl);

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.crypto-cashbox', {
                url: '/crypto-cashbox',
                views: {
                    '@': {
                        templateUrl: 'src/app/crypto-cashbox/cashbox.tpl.html',
                        controller: 'CryptoCashboxCtrl as cashbox',
                        resolve: {
                            featuresData: function(getFeatures, eventService) {
                                return getFeatures.get().then(function (res){
                                    return res.data.features;
                                })
                            },
                            methodCollection: function (cryptoPaymentMethods, featuresData, getFeatures, eventService) {
                                var removeFilter = getFeatures.getFeature('exchange-instrument');

                                return cryptoPaymentMethods.get(removeFilter).then(function (res) {
                                    return res;
                                });
                            }
                        }
                    },
                    'transactions@': {
                        templateUrl: 'src/app/crypto-cashbox/transactions.tpl.html',
                        controller: 'TransactionsCryptoCtrl as transactions'
                    }
                }
            });
    }

    /**
     * @name  HomeCtrl
     * @description Controller
     */
    function CryptoCashboxCtrl(methodCollection, $timeout, frameMessage, $rootScope) {

        var cashbox = this;

        $rootScope.htmlClasses = 'cryptoDepositPage';
        cashbox.methods = methodCollection;

        cashbox.methodsOpened = false;

        frameMessage.send('showCountingInfo', false);


        cashbox.onCopySuccess = function(e) {
            cashbox.addressCopied = true;
            $timeout( function() {
                cashbox.addressCopied = false;
            }, 3000)
        };

        function cashboxToVisible() {
            cashbox.style = {
                opacity: 1
            };
        }

        cashbox.setPaymentMethod = function(method, index) {
            cashbox.currentMethod = cashbox.methods[index];
            cashbox.methodsOpened = false;
        };

        $timeout(function () {

            cashbox.currentMethod = cashbox.methods[0];
            cashboxToVisible();
        });

    }

})();
