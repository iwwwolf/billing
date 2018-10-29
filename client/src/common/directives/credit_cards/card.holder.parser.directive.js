(function () {
    'use strict';

    angular.module('app').directive('cardHolder', [
        cardHolder
    ]);

    function cardHolder() {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = String(text).replace(/[^a-zA-Z0-9_\s]/gi, '').toUpperCase();
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