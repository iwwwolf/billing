(function () {
    'use strict';

    angular.module('app').directive('extendInput', [
        extendInput
    ]);

    function extendInput() {
        return {
            scope: {
                extendInput: '='
            },
            link: function ($scope, $element, attrs) {
                if($scope.extendInput === 'address1') {
                    $element.attr('placeholder','address placeholder');
                } else {
                    $element.attr('placeholder',$scope.extendInput);
                }

            }
        };
    }
})();