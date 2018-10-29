(function () {
    'use strict';


    angular.module('common.services.data')
        .factory('eventService', function ($http, $q) {
            var apiHost = window.location.hostname.replace('billing.', 'event.'),
                apiUrl = window.location.protocol + '//' + apiHost + '/api/v1/events',
                UIDVal = '',
                UIDKey = 'Events_UID',
                userId, platformId;


            function identifyUser(user_id, platform_id) {
                userId = user_id;
                platformId = Number(platform_id);
                var cookieUID = getCookie(UIDKey),
                    storageUID = getStorage(UIDKey),
                    sessionUID = getSession(UIDKey);

                if (cookieUID && isValidUID(cookieUID)) {
                    UIDVal = cookieUID;
                } else if (storageUID && isValidUID(storageUID)) {
                    UIDVal = storageUID;
                } else if (sessionUID && isValidUID(sessionUID)) {
                    UIDVal = sessionUID;
                } else {
                    UIDVal = createUID();
                }

                saveUID();

            };

            function saveUID() {
                // Save UID to cookie
                setCookie(UIDKey, UIDVal);
                // Save UID to local storage
                setStorage(UIDKey, UIDVal);
                // Save UID to session storage
                setSession(UIDKey, UIDVal);
            };

            function createUID() {
                function chr4() {
                    return Math.random().toString(16).slice(-4);
                }

                return [chr4() + chr4(), chr4(), chr4(), chr4(), chr4() + chr4() + chr4()].join('-');
            }

            function isValidUID(uid) {
                return uid && uid.length && uid.length === 36 && /^[\d\w]{8}-[\d\w]{4}-[\d\w]{4}-[\d\w]{4}-[\d\w]{12}$/.test(uid);
            }

            function getCookie(key) {
                var cookie = '';

                if (document.cookie.indexOf(key) === -1) {
                    return cookie;
                }

                document.cookie.split(';').forEach(function (cookieString) {
                    if (cookieString.indexOf(key) > -1) {
                        cookie = cookieString.split('=')[1];
                    }
                });

                return cookie;
            }

            function setCookie(key, value) {
                document.cookie = key + '=' + value + '; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
            }

            function getStorage(key) {
                return localStorage.getItem(key);
            }

            function setStorage(key, value) {
                    try {
                        localStorage.setItem(key, value);
                    } catch (e) {}
            }

            function getSession(key) {
                return sessionStorage.getItem(key);
            }

             function setSession(key, value) {
                    try {
                        sessionStorage.setItem(key, value);
                    } catch (e) {}
            }


            function send(category, name, value, params, duration, callback, wait) {

                var event = JSON.stringify({
                    name: name,
                    category: category,
                    user_id: userId,
                    device_id: UIDVal,
                    platform_id: platformId,
                    time: (new Date()).getTime(),
                    value: typeof value === 'number' ? value : null,
                    duration: typeof duration === 'number' ? duration : null,
                    parameters: typeof params === 'object' ? params : null
                });

                var config = {
                    method: 'POST',
                    withCredentials: false,
                    headers:{
                        'X-Action':'single'
                    },
                    url: apiUrl,
                    data: event
                };
                return $q.resolve();
                return $http(config);

            };

            function sendApiMetrics(value, params, duration) {
                return $q.resolve();
                return send('system', 'billing_api-call', value, params, duration);
            }

            return {
                identifyUser:identifyUser,
                send:send,
                sendApiMetrics:sendApiMetrics
            }
        });

})();