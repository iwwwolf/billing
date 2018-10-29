
(function () {
    'use strict';

    angular.module('app').directive('luhnCheck',
        luhnCheck
    );

    function luhnCheck() {
        return {
            require: 'ngModel',
            link: function ($scope, $element, $attrs, $ngModel) {
                var luhnChk = (function (arr) {
                    return function (ccNum) {
                        var
                            len = ccNum.length,
                            bit = 1,
                            sum = 0,
                            val;

                        while (len) {
                            val = parseInt(ccNum.charAt(--len), 10);
                            sum += (bit ^= 1) ? arr[val] : val;
                        }

                        return sum && sum % 10 === 0;
                    };
                }([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));

                $ngModel.$validators.luhnCheck = function (number) {
                    if (!number) return true;
                    var cardNumber = number.replace(/\s/g, '');

                    if (cardNumber.length < 13 || cardNumber.length > 21) {
                        return false;
                    }

                    return luhnChk(cardNumber);
                }
            }
        }

    }

})();