(function () {
    'use strict';

    app.factory('translationCache', [
        translationCache
    ]);

    function translationCache() {
        var isAvailableLocalStorage = testLocalStorage(),
            config = getItem('langConfig');

        if (angular.isArray(config) && config.length) {
            angular.forEach(config, function (lang) {
                if (isExpired(lang.expiry)) {
                    delConfig(lang.key);
                    delItem(lang.key);
                } else if (!getItem(lang.key)) {
                    delConfig(lang.key);
                }
            });
        } else {
            deleteOutdatedData();
            config = [];
        }

        setItem('langConfig', config);

        return {
            set: function (key, value) {
                key = fixKey(key);

                if (config.length > 1) {
                    delOldestLang();
                }

                setItem(key, value);
                setConfig(key);
            },
            get: function (key) {
                key = fixKey(key);
                return getItem(key);
            },
            del: function (key) {
                key = fixKey(key);
                delConfig(key);
                delItem(key);
            }
        };

        function fixKey(key) {
            return 'lang_'+ key.replace('_', '-');
        }

        function isExpired(time) {
            var now = new Date();
            return time < now.getTime();
        }

        function delOldestLang() {
            var key = null,
                expiry = 0;

            angular.forEach(config, function (lang) {
                if (expiry === 0 || expiry > lang.expiry) {
                    expiry = lang.expiry;
                    key = lang.key;
                }
            });

            if (key) {
                delConfig(key);
                delItem(key);
            }
        }

        function setConfig(key) {
            var langIndex = getLangIndex(key),
                expiry = new Date();

            // Translation cache time 5 min
            expiry.setMinutes(expiry.getMinutes() + 5);

            var langItem = {
                key: key,
                expiry: expiry.getTime()
            };

            if (langIndex === null) {
                config.push(langItem);
            } else {
                config[langIndex] = langItem;
            }

            return setItem('langConfig', config);
        }

        function delConfig(key) {
            var langIndex = getLangIndex(key);

            if (langIndex !== null) {
                config.splice(langIndex, 1);
            }

            return setItem('langConfig', config);
        }

        function getLangIndex(key) {
            var index = null;
            angular.forEach(config, function (lang, i) {
               if (key === lang.key) {
                   index = i;
               }
            });
            return index;
        }

        function setItem(key, value) {
            return isAvailableLocalStorage && localStorage.setItem(key, jsonStringify(value));
        }

        function getItem(key) {
            return isAvailableLocalStorage && jsonParse(localStorage.getItem(key));
        }

        function delItem(key) {
            return isAvailableLocalStorage && localStorage.removeItem(key);
        }

        function jsonStringify(json) {
            try {
                return JSON.stringify(json);
            } catch (e) {
                return json;
            }
        }

        function jsonParse(str) {
            try {
                return JSON.parse(str);
            } catch (e) {
                return str;
            }
        }

        function deleteOutdatedData() {
            if (!isAvailableLocalStorage) {
                return;
            }
            angular.forEach(window.localStorage, function (item, key) {
                if (key === 'langConfig' || /lang_[a-z]{2}-[A-Z]{2}/.test(key) || /[a-z]{2}_[A-Z]{2}_front_mainpage_web/.test(key)) {
                    delItem(key);
                }
            });
        }

        function testLocalStorage() {
            try {
                var test = 'test';
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch (e) {
                return false;
            }
        }
    }
})();