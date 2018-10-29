(function () {
    'use strict';

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });


    angular.module('app', [
        'ui.router',
        'ngAnimate',
        'ngSanitize',
        'ngCookies',
        'ui.bootstrap',
        'ngMessages',
        'pascalprecht.translate',
        'common.interceptors.http',
        'cashbox',
        'advancedform',
        'common.services.data',
        'common.header',
        'templates'
    ])
        .config(config)
        .run(run)
        .controller('MainCtrl', MainCtrl);


    function config($stateProvider, $urlRouterProvider, $translateProvider, $logProvider, $httpProvider,
                    $animateProvider, $uibTooltipProvider) {

        $urlRouterProvider.otherwise('/');
        $logProvider.debugEnabled(true);
        $httpProvider.interceptors.push('httpInterceptor');
        $httpProvider.defaults.withCredentials = true;
        $uibTooltipProvider.options({appendToBody: true});

        $animateProvider.classNameFilter(/angular-animate/);

        $translateProvider.useStaticFilesLoader({
            prefix: '',
            suffix: '.json'
        });

        $stateProvider
            .state('root', {
                views: {
                    'header': {
                        templateUrl: 'src/common/header.tpl.html',
                        controller: 'HeaderCtrl as header',
                        resolve: {
                            featuresData: function(getFeatures) {
                                return getFeatures.get().then(function (res){
                                    return res.data.features;
                                })
                            }
                        }
                    },
                    'footer': {
                        templateUrl: 'src/common/footer.tpl.html',
                        controller: 'FooterCtrl as footer',
                        resolve: {
                            userProfileData: function (userProfile) {
                                return userProfile.get().then(function (res) {
                                    return res.data.result;
                                });
                            }
                        }
                    }
                }
            });
    }

    function MainCtrl($log) {

    }


    function run($log, $state, $rootScope, $stateParams, $timeout, $translate, paymentParams, frameMessage, userProfile, $cookies) {

        window.onblur = function () {
            angular.element(document).triggerHandler('click');
        };

        function getURLParameter(name) {
            var urlRegexp = new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)');
            return decodeURIComponent((urlRegexp.exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
        }

        function parseUrl() {
            return document.location.search.replace(/(^\?)/, '').split("&").map(function (n) {
                return n = n.split("="), this[n[0]] = n[1], this
            }.bind({}))[0];
        }

        var url_params = parseUrl();
        delete(url_params.sess_id);

        var validateParams = {
            process_payment: function (val) {
                var number = parseInt(val, 10);
                if (isNaN(number) ? val === 'true' : number > 0) {
                    return number;
                }
                return false;
            },
            payment_method_id: function (val) {
                var number = parseInt(val, 10);
                if (!isNaN(number) && number > 0) {
                    return number;
                }
                return false;
            },
            payment_card_id: function (val) {
                var number = parseInt(val, 10);
                if (!isNaN(number) && number > 0) {
                    return number;
                }
                return false;
            },
            bonuscode: function (val) {
                if (typeof val === 'string' && val.length < 100) {
                    return val;
                }
                return false;
            },
            currency: function (currencyName) {
                if (typeof currencyName === 'string' && currencyName.length === 3) {
                    return currencyName.toUpperCase();
                }
                return false;
            },
            deposit: function (val) {
                var number = parseFloat(val);
                if (!isNaN(number) && number > 0) {
                    return number;
                }
                return false;
            },
            link_card_agree: function(val) {
                var result = (val.toLowerCase() === 'true');
                return result;
            }
        };


        if (!_.isEmpty(url_params)) {
            var object_to_restore = {};

            _.each(url_params, function (value, key) {
                if (validateParams[key]) {
                    object_to_restore[key] = validateParams[key](value);
                }
            });


            var params_to_save = {
                currency: object_to_restore.currency,
                payment_method: object_to_restore.payment_method_id,
                amount: object_to_restore.deposit,
                bonusCode: object_to_restore.bonuscode,
                process_payment: object_to_restore.process_payment,
                link_card_agree: object_to_restore.link_card_agree
            };

            paymentParams.set(params_to_save);
        }

        $rootScope.sess_id = getURLParameter('sess_id');


        //$rootScope.iqOptionUrl = location.hostname.match(/billing.(.*)/)[1] || null;

        // Classes for html element
        $rootScope.htmlClasses = [];
        // Classes for container element
        $rootScope.containerClasses = [];

        $rootScope.loading = true;

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            $timeout(function () {
                $rootScope.loading = false;
            }, 500);
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name) frameMessage.send('windowScrollTop');
        });

        $rootScope.loacale = $cookies.get('lang');
        $translate.use('en_US');
        // if ($rootScope.loacale) {
        //     $translate.use($rootScope.loacale);
        // } else {
        //     userProfile.get().then(function (res) {
        //         var userLocale = res && res.data && res.data.result && res.data.result.locale ? res.data.result.locale : 'en_US';
        //         $rootScope.loacale = userLocale;
        //         $translate.use(userLocale);
        //     });
        // }
    }

})();
