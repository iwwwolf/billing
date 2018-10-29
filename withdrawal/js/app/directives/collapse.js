(function () {
    'use strict';

    app.directive('collapse', [
        collapse
    ]);

    function collapse() {
        return {
            restrict: 'A',
            link: function ($scope, $element) {
                $element.on('click', function () {
                    var isCollapsed = $element.hasClass('collapsed');
                    $element.toggleClass('collapsed', !isCollapsed);
                    $element.toggleClass('expanded', isCollapsed);
                });
            }
        };
    }
})();