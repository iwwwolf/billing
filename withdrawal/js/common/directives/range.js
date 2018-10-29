(function () {
    'use strict';

    app.directive('range', [
        '$filter',
        range
    ]);

    function range($filter) {
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
                });

                var unWatchMax = $scope.$watch('max', function (number) {
                    max = checkNumber(number);
                });

                // Set validator for minimum number
                $ngModel.$validators.rangeMin = function (number) {
                    return !$ngModel.$isEmpty(number) && clearNumber(number) >= min;
                };
                // Set validator for maximum number
                $ngModel.$validators.rangeMax = function (number) {
                    return !$ngModel.$isEmpty(number) && clearNumber(number) <= max;
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