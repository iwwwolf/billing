(function() {
    'use strict';

    angular.module('app').directive('ngclipboard', clipboard);

    function clipboard() {
        return {
            restrict: 'A',
            scope: {
                ngclipboardSuccess: '&',
                ngclipboardError: '&'
            },
            link: function(scope, element) {
                var clipboard = new Clipboard(element[0]);

                clipboard.on('success', function(e) {
                    scope.$apply(function () {
                        scope.ngclipboardSuccess({
                            e: e
                        });
                    });
                });

                clipboard.on('error', function(e) {
                    scope.$apply(function () {
                        scope.ngclipboardError({
                            e: e
                        });
                    });
                });

                element.on('$destroy', function() {
                    clipboard.destroy();
                });

            }
        };
    };
})();
