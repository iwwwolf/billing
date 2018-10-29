(function () {
    'use strict';

    angular.module('app')
        .filter('lowercase', lowercase);

    function lowercase() {
        return function (text) {
            return text ? text.toLowerCase() : text;
        };
    }
})();
