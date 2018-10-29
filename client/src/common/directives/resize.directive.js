(function () {
    'use strict';

    angular.module('app')
        .directive('resize', resize);

    function resize(frameMessage, $rootScope, $interval, $timeout) {
        return {
            restrict: 'A',
            link: function ($scope, $element) {
                var elementSize = getElementSize(),
                    checkInterval = $interval(matchSizes, 10);

                function matchSizes() {
                    var newElementSize = getElementSize();
                    if (elementSize.height !== newElementSize.height) {
                        handleChangeHeight(newElementSize.height);
                    }
                    elementSize = newElementSize;
                }

                function handleChangeHeight(height) {
                    frameMessage.send('resizeIFrame', {
                        height: height
                    });
                }

                function getElementSize() {
                    return {
                        height: $element[0].scrollHeight
                    }
                }

                // Remove scope watchers
                $scope.$on('$destroy', function () {
                    $interval.cancel(checkInterval);
                });

            }
        };
    }
})();
