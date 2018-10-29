(function () {
    'use strict';

    app.factory('$time', [
        time
    ]);

    function time() {
        var timeDiff = 0;
        return {
            convert: function (timestamp, toUTC) {
                var utcTime = moment.utc(timestamp * 1000).add(-moment().utcOffset(), 'minutes');

                if (toUTC) {
                    return utcTime.valueOf();
                }
                return utcTime.clone().add(timeDiff, 'seconds').add(3, 'hours').valueOf();
            },
            setTimeDiff: function (diff) {
                if (typeof diff === 'number') {
                    timeDiff = diff;
                }
            }
        }
    }
})();