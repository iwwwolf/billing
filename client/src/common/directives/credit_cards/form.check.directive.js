(function () {
    'use strict';

    angular.module('app').directive('form', [
        checkform
    ]);

    function checkform($document) {
        return {
            link: function ($scope, $element, attrs) {
                $element.on('submit', function() {
                    var isInvalid = $element[0].querySelector('.ng-invalid');
                    if(isInvalid) {
                        isInvalid.focus();
                    }
                });
            }
        };
    }
})();