(function () {
    'use strict';

    app.directive('resize', [
        'frameMessage',
        '$rootScope',
        '$interval',
        '$timeout',
        resize
    ]);

    function resize(frameMessage, $rootScope, $interval, $timeout) {
        return {
            restrict: 'A',
            link: function ($scope, $element) {
                var elementSize = getElementSize(), checkInterval;

                $rootScope.$watch('pageLoader', function (pageLoader) {
                    if (!pageLoader) {
                        $timeout(function () {
                            checkInterval = $interval(matchSizes, 10);
                        }, 310);
                    }
                });

                function matchSizes() {
                    var newElementSize = getElementSize();
                    if (elementSize.height !== newElementSize.height) {
                        handleChangeHeight(newElementSize.height);
                    }
                    elementSize = newElementSize;
                }

                function handleChangeHeight(height) {
                    frameMessage.send('resize', {
                        height: height
                    });
                }

                function getElementSize() {
                    return {
                        height: $element.height()
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