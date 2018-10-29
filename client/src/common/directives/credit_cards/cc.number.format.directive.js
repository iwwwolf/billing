(function () {
    'use strict';

    angular.module('app').directive('formatCard', [
        formatCard
    ]);

    function formatCard() {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {

                function formatNumber(text) {
                    var transformedInput = String(text).replace(/\D/g, '').match(/.{1,4}|^$/g).join(' ');

                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(formatNumber);
            }
        };
    }
})();