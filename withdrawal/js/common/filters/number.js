(function () {
    'use strict';

    app.filter('number', [
        number
    ]);

    function number() {
        /*
         * @param number               число
         * @param decimalPlaces        кол-во чисел после точки
         * @param thousandsSeparator   разделитель 1000
         * @param removeZeros          удаление лишних нулей в конце
         * @returns {string}           форматированое число
         */

        return function (number, options) {
            options = typeof options === 'object' ? options : {};
            number = typeof number === 'undefined' ? '' : number.toString();
            options.removeZeros = options.removeZeros === undefined ? true : options.removeZeros;
            options.decimalPlaces = typeof options.decimalPlaces === 'number' ? options.decimalPlaces : 2;
            options.thousandsSeparator = options.thousandsSeparator === undefined ? ' ' : options.thousandsSeparator;

            var regExpNumber = options.decimalPlaces === 0 ? new RegExp('(^\\d*)(.*)') : new RegExp('(^\\d*\\.?\\d{0,' + options.decimalPlaces + '})(.*)');

            var numberFormatted = number
                .replace(/[^\d.]/g, '')
                .replace(/^\.+/, '')
                .replace(/^0{2,}/, '0')
                .replace(/^(0+)([1-9]+)/, '$2')
                .replace(regExpNumber, '$1');

            var splittedNumber = numberFormatted.toString().split('.');
            splittedNumber[0] = splittedNumber[0].replace(/(?=\B(?:\d{3})+(?!\d))/g, options.thousandsSeparator);
            numberFormatted = splittedNumber.join('.');

            if (options.removeZeros) {
                numberFormatted = numberFormatted.replace(/\.0+$/, '').replace(/(\.[0-9]*[1-9]+)0+$/, '$1');
            }

            return numberFormatted;
        }
    }
})();