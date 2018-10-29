(function () {
    'use strict';

    angular.module('app').directive('autofocus', [
        autofocus
    ]);

    function autofocus($document) {
        return {
            link: function ($scope, $element, attrs) {
                setTimeout(function () {
                    $element[0].focus();
                }, 100);
            }
        };
    }
})();