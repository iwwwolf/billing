(function () {
    'use strict';

    angular.module('common.services.data')
        .service('locationService', function () {

            this.getURLParameter = function (name) {
                var urlRegexp = new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)');
                return decodeURIComponent((urlRegexp.exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
            };

            this.parseUrl = function () {
                return document.location.search.replace(/(^\?)/, '').split("&").map(function (n) {
                    return n = n.split("="), this[n[0]] = n[1], this
                }.bind({}))[0];
            };

        });

})();