(function () {
    'use strict';

    angular.module('app').directive('range', [
        range
    ]);

    function range() {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                'min': '=',
                'max': '='
            },
            link: function ($scope, $element, $attrs, $ngModel) {
                var min = checkNumber($scope.min),
                    max = checkNumber($scope.max),
                    allowLess = $attrs.rangeAllowLess !== undefined,
                    allowMore = $attrs.rangeAllowMore !== undefined;

                var unWatchMin = $scope.$watch('min', function (number) {
                    min = checkNumber(number);
                    $ngModel.$validate();
                });

                var unWatchMax = $scope.$watch('max', function (number) {
                    max = checkNumber(number);
                    $ngModel.$validate();
                });

                // Set validator for minimum number
                $ngModel.$validators.rangeMin = function (number) {
                    if (_.isNaN(number)) return;
                    return !$ngModel.$isEmpty(number) && clearNumber(number) >= min;
                };
                // Set validator for maximum number
                $ngModel.$validators.rangeMax = function (number) {
                    if (_.isNaN(number)) return;
                    return !$ngModel.$isEmpty(number) && (clearNumber(number) === 0 || clearNumber(number) <= max );
                };

                if (!allowLess) {
                    $ngModel.$parsers.push(function (number) {
                        if (
                            !$ngModel.$isEmpty(number) &&
                            min > 0 && min > clearNumber(number)
                        ) {
                            $ngModel.$setViewValue(min);
                            $ngModel.$render();
                            return max;
                        }
                        return number;
                    });
                }

                if (!allowMore) {
                    $ngModel.$parsers.push(function (number) {
                        if (
                            !$ngModel.$isEmpty(number) &&
                            max > 0 && max < clearNumber(number)
                        ) {
                            $ngModel.$setViewValue(max);
                            $ngModel.$render();
                            return max;
                        }
                        return number;
                    });
                }
                // Remove scope watchers
                $scope.$on('$destroy', function () {
                    unWatchMin();
                    unWatchMax();
                });

                function checkNumber(number) {
                    return typeof number === 'number' ? number : 0;
                }

                function clearNumber(number) {
                    return parseFloat(number.toString().replace('[^\d.]', ''));
                }
            }
        };
    }
})();