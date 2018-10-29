(function () {
    'use strict';

    app.directive('uibModalWindow', [
        'frameMessage',
        '$rootScope',
        modalPosition
    ]);

    function modalPosition(frameMessage, $rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $element) {

                $rootScope.modals.count = $rootScope.modals.count + 1;

                var unWatchPositionModal = frameMessage.watch('positionModal', function (position) {
                    position.top = position.top > 0 ? position.top : 0;
                    $rootScope.modals.position = position;
                    setModalPosition(position);
                });

                setModalPosition($rootScope.modals.position);

                frameMessage.send('openModal');

                function setModalPosition(position) {
                    if (position) {
                        $element.css(position);
                    }
                }

                $scope.$on('$destroy', function () {
                    $rootScope.modals.count = $rootScope.modals.count - 1;

                    if ($rootScope.modals.count === 0) {
                        frameMessage.send('closeModal');
                    }

                    unWatchPositionModal();
                });
            }
        };
    }
})();