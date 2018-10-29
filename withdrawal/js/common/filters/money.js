(function () {
    'use strict';

    app.filter('money', [
        '$filter',
        money
    ]);

    function money($filter) {
        var currencySymbols = {
            'rub': '%s₽',
            'usd': '$%s',
            'gbp': '£%s',
            'try': '₮%s',
            'brl': 'R$%s',
            'eur': '€%s',
            'idr': 'Rp%s',
            'myr': 'RM%s',
            'vnd': '₫%s',
            'cny': '¥%s',
            'otn': '%s OTN',
            'btc': '%s BTC',
            'thb': "฿%s"
        };
        /**
         * @param amount
         * @param options
         * @returns {string}
         */
        return function (amount, options) {
            amount = typeof parseFloat(amount) === 'number' ? parseFloat(amount) : 0;
            options = options || {};

            if (options.currency && options.onlyMask) {
                return currencySymbols[options.currency.toLowerCase()];
            }

            var amountFormatted = $filter('number')(amount, options);

            if (!options.currency || !currencySymbols[options.currency.toLowerCase()]) {
                return amountFormatted;
            }

            return currencySymbols[options.currency.toLowerCase()].replace('%s', amountFormatted);
        };
    }
})();