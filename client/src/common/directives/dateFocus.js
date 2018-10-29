(function () {
    'use strict';

    angular.module('app').directive('dateFocus', [
        datefocus
    ]);

    function datefocus() {
        return {
            restrict: 'A',
            link: function (scope, $element) {
                var $input = $element.find('input');

                $input.on('input', function () {
                    if($input.val().length === 2) {
                        $input.parent().next().next().find('input')[0].focus();
                    }
                });
            }
        };
    }
})();
