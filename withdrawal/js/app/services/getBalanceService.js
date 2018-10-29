(function () {
    'use strict';


    app.factory('socketBalance', function (UseWebSocket, $q) {

        var data;


        function get() {
            return data ? $q.resolve(data) : getBalance();
        }


        function getBalance() {
            return UseWebSocket.getBalances().then(function(result) {
                data = _.filter(result, function(res) {
                    return res.type === 1;
                })[0];

                return data;
            })
        }

        return {
            get: get,
            getBalance: getBalance
        }
    });
})();
