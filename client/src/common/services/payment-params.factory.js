(function () {
    'use strict';


    angular.module('common.services.data')
        .factory('paymentParams', function () {

            var data,
                currentMethod = {};


            function get() {
                return data;
            }


            function set(obj) {
                data = obj;
            }

            return {
                get: get,
                set: set
            }
        });
})();
