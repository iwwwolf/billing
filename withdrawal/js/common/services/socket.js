(function () {
    'use strict';

    app.factory('$socket', [
        '$rootScope',
        socket
    ]);

    function socket($rootScope) {
        var socketObj = (function () {
            var _reconnectDelay = 500,
                _connect = false,
                _url = '/echo';

            return function () {
                var _listenMessage = null,
                    _listenConnect = [],
                    _instance = null,
                    _self = this;
                this.reconnect = function () {
                    _self.disconnect();
                    _self.connect();
                };
                this.disconnect = function () {
                    if (_connect && _instance) {
                        _instance.close(1000);
                    }
                };
                this.connect = function (baseUrl) {
                    if (_connect || _instance) {
                        return;
                    }

                    _instance = new SockJS(baseUrl + _url, null, {transports: 'websocket'});

                    _instance.onopen = function () {
                        _connect = true;

                        var ssid = $.cookie('ssid');

                        if (!ssid) {
                            return;
                        }

                        _self.sendMessage('ssid', ssid);

                        $.each(_listenConnect, function (key, v) {
                            v();
                        });
                    };

                    _instance.onmessage = function (msg) {

                        if (!_listenMessage) {
                            return;
                        }

                        try {
                            msg = JSON.parse(msg.data);
                        } catch (e) {
                            if (msg.hasOwnProperty('data')) {
                                var check = msg.data.split('%%');
                                if (check.length > 1) {
                                    data = JSON.parse(check[1]);
                                    msg = {
                                        'name': check[0],
                                        'msg': data
                                    }
                                }
                            }
                        }

                        _listenMessage(msg);
                    };

                    _instance.onclose = function (e) {
                        if (e.code != '1000') {
                            setTimeout(_self.reconnect, _reconnectDelay);
                        }
                        _connect = false;
                    };
                };
                this.sendMessage = function (name, msg) {
                    if (!name) {
                        throw new Error('Name is empty');
                    }

                    if (!_connect) {
                        return;
                    }

                    var sendData = JSON.stringify({
                        name: name,
                        msg: msg
                    });

                    _instance.send(sendData);
                };
                this.setListenMessage = function (func) {
                    if (!$.isFunction(func)) {
                        throw new Error('func is not function');
                    }
                    _listenMessage = func;
                };
                this.setConnectCallback = function (func) {
                    if (!$.isFunction(func)) {
                        throw new Error('func is not function');
                    }
                    _listenConnect.push(func);
                };
            }
        }());

        var _socket = new socketObj();

        _socket.setListenMessage(function (data) {
            var socketEvent = "socketEvent:" + data.name;
            $rootScope.$broadcast(socketEvent, data.msg);
        });

        _socket.setConnectCallback(function () {
            $rootScope.$broadcast('socketEvent:connect');
        });

        return {
            emit: _socket.sendMessage,
            connect: _socket.connect,
            reconnect: _socket.reconnect,
            disconnect: _socket.disconnect
        };
    }

})();