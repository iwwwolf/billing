(function () {
    'use strict';

    angular.module('app')
        .filter('money2', money);

    function money($filter) {
        return function (amount, currency) {
            amount = typeof parseFloat(amount) === 'number' ? parseFloat(amount) : 0;

            var amountFormatted = $filter('number')(amount);

            if (!currency) {
                return amountFormatted;
            }

            return currency.mask.replace('%s', amountFormatted);
        };
    }
})();