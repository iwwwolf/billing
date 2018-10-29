(function () {
    'use strict';

    angular.module('app').directive('numbersOnly', [
        numbersOnly
    ]);

    function numbersOnly() {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = String(text).replace(/[^0-9.]/g, '');
                        if (String(transformedInput).indexOf('.') != String(transformedInput).length - 1 &&
                            String(transformedInput).indexOf('.0') != String(transformedInput).length - 2) {
                            transformedInput = parseFloat(transformedInput);
                        }
                        transformedInput = String(transformedInput).replace(/\.(.*)/, function (a, b) {
                            return a.slice(0, 3);
                        });
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                        return transformedInput;
                    }
                    return undefined;
                }

                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    }
})();