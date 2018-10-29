(function () {
    'use strict';


    angular.module('common.services.data')
        .factory('defaultBonuses', function ($http, $q, currencies, $filter) {

            var customData = [], data;

            function get() {
                return data ? $q.resolve(data) : getDefaultBonuses();
            }


            function getDefaultBonuses() {
                return $http.get('/external/cashbox/default-bonuses').then(function (res) {
                    var result = _.filter(res.data.data, function (a) {
                        return a.available;
                    });

                    data = res;
                    return data;
                })
            }

            function getInfo(currencies) {
                var arr = {};
                _.each(currencies, function (currency) {
                    arr[currency.name] = [];
                });
                return get().then(function (res) {
                    console.log(res);
                    _.each(res.data.data, function (bonus, bonusName) {
                        if (bonus.available) {
                            _.each(currencies, function (currency) {
                                var obj = {
                                    is_percent: bonus.is_percent,
                                    name: bonusName
                                };

                                if (bonus.is_custom) {
                                    obj.is_custom = true;
                                    obj.amount = bonus.amount[currency.name] / 1000000;
                                    obj.min_amount = bonus.min_amount[currency.name] / 1000000;
                                } else {
                                    obj.amount = bonus.amount[currency.name];
                                    obj.min_amount = bonus.min_amount[currency.name];
                                }

                                if (bonus.is_percent) {
                                    obj.labelShort = '+' + obj.amount + '%';
                                    obj.nominal = obj.amount + '%';

                                } else {
                                    //obj.labelShort = '+' + obj.amount + currency.symbol;
                                    obj.labelShort = '+' + $filter('money2')(obj.amount, currency);
                                    obj.nominal = obj.amount + currency.symbol;
                                }

                                if (bonus.is_custom) {
                                    obj.labelFull = bonusName;
                                } else {
                                    obj.labelFull = $filter('translate')('from').toLowerCase()
                                        + ' ' + $filter('money2')(obj.min_amount, currency);
                                }

                                arr[currency.name].push(obj);
                            });
                        }

                    });
                    _.each(arr, function (a) {
                        a.sort(function (a, b) {
                            if (b.is_custom) return -1;
                            return a.min_amount - b.min_amount
                        });
                    });
                    return arr;
                })
            }

            function addBonus(bonus, currencies) {
                _.extend(data.data.data, bonus);
                return getInfo(currencies);
            }

            return {
                get: get,
                getDefaultBonuses: getDefaultBonuses,
                getInfo: getInfo,
                addBonus: addBonus
            }
        });
})();
