(function () {
    'use strict';

    angular.module('app').directive('onlyIntegers', [
        onlyIntegers
    ]);

    function onlyIntegers() {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function trimInput(text) {
                    var transformedInput = String(text).replace(/[^0-9]/gi, '');
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(trimInput);
            }
        };
    }
})();