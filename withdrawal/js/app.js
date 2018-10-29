var app = (function () {
    return angular
        .module('billingApp', [
            'ngAnimate',
            'ui.select',
            'ngSanitize',
            'ui.bootstrap',
            'pascalprecht.translate',
            'angular-bind-html-compile',
            'ngMessages'
        ])
        // Set default application provider config
        .config([
            '$translateProvider',
            '$animateProvider',
            'uiSelectConfig',
            '$httpProvider',
            // Set init application config
            function ($translateProvider, $animateProvider, uiSelectConfig, $httpProvider) {
                // Default ui select config
                uiSelectConfig.theme = 'bootstrap';
                uiSelectConfig.resetSearchInput = false;
                //$animateProvider.classNameFilter(/ui-/);
                // Enable cross domain calls
                $httpProvider.defaults.useXDomain = true;

                // $httpProvider.defaults.transformRequest = [function (data) {
                //     if (!data) return '';
                //     return $.param(data);
                // }];

                $httpProvider.interceptors.push('httpSign');
                $httpProvider.interceptors.push('httpMetrics');
                $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $translateProvider.useLoader('translationLoader', {groups: ['front', 'mainpage', 'web']});
            }])
        .run([
            'LANGUAGE_CODES',
            'frameMessage',
            'userService',
            '$rootScope',
            '$translate',
            '$$debounce',
            '$document',
            '$timeout',
            '$window',
            '$time',
            '$q',
            'featuresStorage',
            'locationService',
            'UseWebSocket',
            'eventService',
            function (LANGUAGE_CODES, frameMessage, userService, $rootScope, $translate,
                      $$debounce, $document, $timeout, $window, $time, $q, featuresStorage, locationService,
                      UseWebSocket, eventService) {

                // Root scope variables
                $rootScope.appConfig = {
                    platformId: 9,
                    sessionId: locationService.getURLParameter('sess_id'),
                    lang: $.cookie('lang'),
                    // iqoptionUrl: location.protocol + '//' + location.hostname.match(/billing.(.*)/)[1],
                    // iqoptionDomain: location.hostname.match(/billing.(.*)/)[1]
                };
                // $rootScope.getFeatures = $q(function (resolve, reject) {
                //     return userService.getUserData().then(function(result) {
                //         var profile = result.profile;
                //         return UseWebSocket.getFeatures()
                //             .then(function(result) {
                //                 eventService.identifyUser(profile.user_id, $.cookie('platform'));
                //                 eventService.sendApiMetrics(1, {api_name: 'socket.get-features'}, result.timeDiff);
                //                 featuresStorage.setFeatures(result.features);
                //             }, function(err){
                //                 eventService.identifyUser(profile.user_id, $.cookie('platform'));
                //                 eventService.sendApiMetrics(0, {api_name: 'socket.get-features'}, result.timeDiff);
                //                 featuresStorage.setFeatures({});
                //             })
                //             .finally(function() {
                //                 resolve();
                //             })
                //     });
                // });



                $rootScope.modals = {count: 0};
                $rootScope.pageLoader = true;

                //var iqOptionDomain = $rootScope.appConfig.iqoptionUrl.replace(/https?:\/\//, '');

                $rootScope.appConfig.lang = $.cookie('lang');
                $rootScope.appConfig.locale = LANGUAGE_CODES[$rootScope.appConfig.lang] || $rootScope.appConfig.lang || $rootScope.appConfig.locale || 'en_US';
                
                // Watch parent message to change lang
                frameMessage.watch('setLocale', function (lang) {
                    if (typeof lang !== 'string' || lang === $rootScope.appConfig.lang) {
                        return;
                    }

                    var locale = LANGUAGE_CODES[lang] || 'en_US';

                    $translate
                        .use(locale)
                        .then(function () {
                            $rootScope.appConfig.locale = locale;
                            $rootScope.appConfig.lang = lang;
                            setCookieLocale(locale);
                        });

                    hideTooltips();
                });

                // Set default locale & load translations
                $translate
                    .use($rootScope.appConfig.locale)
                    .then(function () {
                        $rootScope.pageLoader = false;
                    })
                    .catch(function(){
                        $rootScope.pageLoader = false;
                    });

                // Get user data
                userService
                    .getUserData()
                    .then(function (user) {
                        // Set user time diff
                        if (user && user.profile && user.profile.timediff) {
                            $time.setTimeDiff(user.profile.timediff);
                        }
                    });

                angular.element($window).bind('click', function (e) {
                    var $tooltip = $(e.target).closest('.tooltip');
                    if ($tooltip.size()) {
                        $('[aria-describedby="' + $tooltip.attr('id') + '"]').tooltip('hide');
                    }
                });

                angular.element($window).bind('resize', $$debounce(function () {
                    hideTooltips();
                }, 100));

                function hideTooltips() {
                    var $tooltips = $document.find('.tooltip.in');
                    if ($tooltips.size()) {
                        $tooltips.remove();
                    }
                }

                function setCookieLocale(locale) {
                    $.cookie('lang', locale, {
                        domain: iqOptionDomain,
                        path: '/'
                    });
                }
            }
        ]);
})();