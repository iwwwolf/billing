(function () {
    'use strict';

    app.factory('frameMessage', [
        '$window',
        frameMessage
    ]);

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

                var event = { name: eventName };

                if (dataObject) {
                    event.data = dataObject;
                }

                $window.parent.postMessage(JSON.stringify(event), '*');
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

            if (typeof message === 'object' && message.name) {
                angular.forEach(watchers, function (watcher) {
                    if (message.name === watcher.name) {
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