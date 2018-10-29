(function () {
    'use strict';

    angular.module('app').directive('rangeMin', rangeMin);

    function rangeMin() {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                'min': '=setmin',
                'max': '=setmax'
            },
            link: function(scope, element, attrs, ngModel) {

                ngModel.$validators.rangeMin = function (modelValue) {
                    if (_.isEmpty(modelValue)) return true;
                    return modelValue > 1000;
                };
        }
      }
    }
  })();