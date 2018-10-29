(function () {
    'use strict';

    angular.module('app').directive('bonusTrim', [
        bonusTrim
    ]);

    function bonusTrim() {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function trimInput(text) {
                    var transformedInput = String(text).replace(/[^a-z0-9!_\-]/gi, '').substr(0, 50);
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(trimInput);
            }
        };
    }
})();