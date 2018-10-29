(function () {
    'use strict';

    app.factory('sign', [
        '$rootScope',
        sign
    ]);

    function sign($rootScope) {
        return {
            get: function (fields) {
                delete fields.fkey;

                var fieldsSorted = [];

                angular.forEach(fields, function (value, key) {
                    fieldsSorted.push(key + '=' + value);
                });

                fieldsSorted.push('skey=' + $rootScope.skey);
                fieldsSorted = fieldsSorted.sort();

                return md5(fieldsSorted.join(''));
            }
        }
    }
})();