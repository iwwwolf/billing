(function () {
    'use strict';

    angular.module('app')
        .directive('tooltipPlacement', function ($window, $rootScope) {


            return {

                restrict: 'AE',
                scope: {
                    tooltipFn: '&'
                },
                link: function (s, e, a) {
                    var body = angular.element(document.getElementsByTagName("body")),
                    clientWidth = getClientWidth();

                    $rootScope.pageWidth = clientWidth;

                    $window.onresize = function (event) {
                        clientWidth = getClientWidth();
                        s.tooltipFn(clientWidth);

                        $rootScope.pageWidth = clientWidth;
                    }

                    function getClientWidth() {
                        if (document.documentElement.clientWidth < 750) return 'small';
                        return 'large';
                    }


                }


            }

        })
})();
