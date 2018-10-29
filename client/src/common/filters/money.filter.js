(function () {
    'use strict';

    angular.module('app').filter('money', [
        '$filter',
        money
    ]);

    function money($filter) {
        /**
         * @param amount
         * @param options
         * @returns {string}
         */
        return function (amount, currency) {
            amount = typeof parseFloat(amount) === 'number' ? parseFloat(amount) : 0;

            var currencySymbols = {
                'rub': '{a} ₽',
                'usd': '$ {a}',
                'gbp': '£ {a}',
                'try': '₮ {a}',
                'brl': 'R$ {a}',
                'eur': '€ {a}',
                'idr': 'Rp {a}',
                'myr': 'RM {a}',
                'vnd': '{a} ₫',
                'cny': '¥ {a}'
            };

            var amountFormatted = $filter('number')(amount);

            if (!currency || !currencySymbols[currency.toLowerCase()]) {
                return amountFormatted;
            }

            return currencySymbols[currency.toLowerCase()].replace('{a}', amountFormatted);
        };
    }
})();