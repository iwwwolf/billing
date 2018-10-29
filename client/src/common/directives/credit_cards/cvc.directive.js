(function () {
    'use strict';

    angular.module('app').directive('cvc',
        cvc
    );

    function cvc($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            compile: function (element, attributes) {
                attributes.$set('maxlength', 4);
                attributes.$set('minlength', 3);
                attributes.$set('pattern', '[0-9]*');


                return function (scope, element, attributes, ngModel) {
                    /*ngModel.$validators.ccCvc = function (value) {
                        return ngModel.$isEmpty(ngModel.$viewValue) || cvc.isValid(value, $parse(attributes.ccType)(scope))
                    }

                    if (attributes.ccType) {
                        scope.$watch(attributes.ccType, bind.call(ngModel.$validate, ngModel))
                    }*/
                }
            }
        }
    }


})();