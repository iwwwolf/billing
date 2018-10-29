(function () {
    'use strict';

    app.factory('cacheService', [
        cacheService
    ]);

    function cacheService() {
        var _localStorage = window.localStorage,
            storage = {};

        return {
            isCached: function (key) {
                var cache = getCache(key);
                return cache && cache.data && !this.isExpired(cache);
            },
            isExpired: function (cache) {
                var now = new Date();
                if (cache.expiry && cache.expiry < now.getTime()) {
                    this.removeCache(cache.key);
                    return true;
                }
                return false;
            },
            setCache: function (key, data, minutes) {
                if (!_localStorage) {
                    return false;
                }

                var cacheLife = new Date();

                minutes = isNaN(minutes) ? 5 : minutes;
                cacheLife.setMinutes(cacheLife.getMinutes() + minutes);

                var storage = {
                    'key' : key,
                    'data': data,
                    'expiry': cacheLife.getTime()
                };

                _localStorage.setItem(key, JSON.stringify(storage));
            },
            getCache: function (key) {
                return storage[key] ? storage[key].data : getCache(key);
            },
            removeCache: function (key) {
                return _localStorage && _localStorage.removeItem(key);
            }
        };

        function getCache(key) {
            if (!storage[key]){
                var cache = _localStorage && _localStorage.getItem(key);
                if (cache) {
                    storage[key] = cache && JSON.parse(cache);
                }
            }
            return storage[key] || false;
        }
    }
})();