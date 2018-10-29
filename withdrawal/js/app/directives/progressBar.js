(function () {
    'use strict';

    app.directive('progressBar', [
        progressBar
    ]);

    function progressBar() {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                $element.css('width', $attrs.progressBar);
            }
        };
    }
})();