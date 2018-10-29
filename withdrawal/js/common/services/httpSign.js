(function () {
    'use strict';

    app.factory('httpSign', [
        '$rootScope',
        'sign',
        httpSign
    ]);

    function httpSign($rootScope, sign) {
        return {
            request: function (config) {
                if (config.method == 'POST' && $rootScope.skey && config.data) {
                    config.data.fkey = sign.get(config.data);
                }
                return config;
            }
        };
    }
})();