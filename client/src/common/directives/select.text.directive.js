(function () {
    'use strict';

    angular.module('app')
        .directive('selectOnClick', selectOnClick);

    function selectOnClick ($window, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    if (!$window.getSelection().toString()) {
                        $timeout(function () {
                            element[0].select()
                        }, 100);
                    }
                });
            }
        };
    };

})();
