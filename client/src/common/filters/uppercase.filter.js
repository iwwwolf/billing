(function () {
    'use strict';

    angular.module('common.filters.uppercase', [])
        .filter('uppercase', uppercase);

    function uppercase() {
        return function (text) {
            return text ? text.toUpperCase() : text;
        };
    }
})();
