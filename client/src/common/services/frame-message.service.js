(function () {
    'use strict';

    angular.module('common.services.data')
        .factory('frameMessage', frameMessage);

    function frameMessage($window) {
        var watchers = [];

        $window.addEventListener('message', _handleFrameMessages);

        return {
            watch: function (messageName, callback) {
                var watcherIndex = watchers.length;

                watchers.push({
                    name: messageName,
                    callback: callback || function () {}
                });

                return function () {
                    // Unwatch
                    watchers.splice(watcherIndex, 1);
                };
            },
            send: function (eventName, dataObject) {
                if (!$window.parent) {
                    console.error('No parent element');
                    return;
                }

                var event = {
                    eventName: 'billingEvent',
                    eventType: eventName
                };

                if (dataObject) {
                    event.eventData = dataObject;
                }

                console.log(event);

                $window.parent.postMessage(event, '*');
            }
        };

        function _handleFrameMessages(event) {
            if (!_isTrustedFrameOrigin(event.origin)) {
                return;
            }
            var message = event.data;

            if (typeof message === 'string') {
                try {
                    message = JSON.parse(message);
                } catch (err) {
                    // empty
                }
            }

            if (typeof message === 'object' && message.actionName) {
                angular.forEach(watchers, function (watcher) {
                    if (message.actionName === watcher.name) {
                        watcher.callback.apply(this, [message.data]);
                    }
                });
            }
        }

        function _isTrustedFrameOrigin(origin) {
            return /http(s)?:\/\/(.*)iqoption\.com/.test(origin) || /http(s)?:\/\/(.*)mobbtech\.com/.test(origin);
        }
    }
})();