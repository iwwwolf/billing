(function () {
    'use strict';

    app.directive('iframeOnload', [
        iframeOnload
    ]);

    function iframeOnload() {
        return {
            scope: {
                callBack: '&iframeOnload'
            },
            link: function (scope, element, attrs) {
                element.on('load', function () {
                    return scope.callBack();
                })
            }
        };
    }
})();