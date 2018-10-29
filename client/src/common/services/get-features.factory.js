(function () {
    'use strict';


    angular.module('common.services.data')
        .factory('getFeatures', function ($http, $q, $rootScope) {

            var data;


            function get() {
                return data ? $q.resolve(data) : getFeatures();
            }


            function getFeatures() {
                var url = document.location.protocol +
                        '//features.' +
                        $rootScope.iqOptionUrl +
                        '/api/v2/features?category=billing';
                data = {"data":{"identity":"7a4a37666ef78ba1cd9f8ff37f070cd79a7712c8344e14cbe061e2a9dcfa4bb7c6e0fa4924ebcb2ab8b883773a79a64f158e60c727f40db086e0edd41fed8506c6a193a2ee70856286e0edd41fed850691563d7a4596a95efdb58ed2332660dd11bee3e0972e80ba69b97f382cb5e22684f32f37759bed214669790d08636e4542f8fc5a1fd97a8278d8e41ce10798621aa7ec9f4dfc2fc6ee6e507941a145c8960e4304881f17496452420fa729bc08","features":[{"id":116,"name":"socket-create-session","category":"billing","params":null,"version":1,"status":"disabled"},{"id":117,"name":"cashbox-using-api","category":"billing","params":null,"version":1,"status":"enabled"},{"id":198,"name":"refund-through-billing","category":"billing","params":null,"version":1,"status":"disabled"},{"id":199,"name":"payout-through-billing","category":"billing","params":null,"version":1,"status":"enabled"},{"id":202,"name":"withdrawal-static-page","category":"billing","params":null,"version":1,"status":"enabled"},{"id":272,"name":"crypto-withdraw","category":"billing","params":null,"version":1,"status":"enabled_show_3ds"},{"id":337,"name":"kyc-limit","category":"billing","params":null,"version":1,"status":"disabled"},{"id":353,"name":"crypto-deposit","category":"billing","params":null,"version":1,"status":"enabled"},{"id":357,"name":"cards-verification","category":"billing","params":null,"version":1,"status":"enabled"},{"id":376,"name":"exchange-instrument","category":"billing","params":null,"version":1,"status":"disabled"},{"id":430,"name":"use-balance-type-5","category":"billing","params":null,"version":1,"status":"enabled"},{"id":644,"name":"cashbox-uikit","category":"billing","params":null,"version":1,"status":"enabled"},{"id":762,"name":"instruments-minimal-deal","category":null,"params":{"states":[{"currencies":[{"name":"DAH","value":0.0042},{"name":"ETH","value":0.0034},{"name":"QTM","value":0.1163},{"name":"IDR","value":14621.9983},{"name":"TRX","value":26.3158},{"name":"OTN","value":0.05},{"name":"VND","value":22637.4832},{"name":"OTM","value":0.6989},{"name":"ETC","value":0.0768},{"name":"XRP","value":2.91},{"name":"OMG","value":0.227},{"name":"LTC","value":0.0161},{"name":"EUR","value":0.854},{"name":"RUB","value":67.5258},{"name":"CNY","value":0.6801},{"name":"TRY","value":6.261},{"name":"MYR","value":4.0965},{"name":"USD","value":1},{"name":"BRL","value":4.0913},{"name":"XEM","value":9.0934},{"name":"XLM","value":4.3335},{"name":"BTG","value":0.0453},{"name":"BCH","value":0.0018},{"name":"BTC","value":0.0001},{"name":"NEO","value":0.0488},{"name":"ZEC","value":0.0066},{"name":"GBP","value":0.7744}],"state-name":"min_1"},{"currencies":[{"name":"DAH","value":0.0125},{"name":"ETH","value":0.0102},{"name":"QTM","value":0.3488},{"name":"IDR","value":43865.9949},{"name":"TRX","value":78.9474},{"name":"OTN","value":0.15},{"name":"VND","value":67912.4496},{"name":"OTM","value":2.0968},{"name":"ETC","value":0.2303},{"name":"XRP","value":8.7301},{"name":"OMG","value":0.6811},{"name":"LTC","value":0.0483},{"name":"EUR","value":2.5619},{"name":"RUB","value":202.5774},{"name":"CNY","value":2.0403},{"name":"TRY","value":18.7829},{"name":"MYR","value":12.2895},{"name":"USD","value":3},{"name":"BRL","value":12.2739},{"name":"XEM","value":27.2802},{"name":"XLM","value":13.0005},{"name":"BTG","value":0.1359},{"name":"BCH","value":0.0054},{"name":"BTC","value":0.0004},{"name":"NEO","value":0.1464},{"name":"ZEC","value":0.0197},{"name":"GBP","value":2.3231}],"state-name":"min_3"},{"currencies":[{"name":"DAH","value":0.0208},{"name":"ETH","value":0.0171},{"name":"QTM","value":0.5814},{"name":"IDR","value":73109.9916},{"name":"TRX","value":131.5789},{"name":"OTN","value":0.25},{"name":"VND","value":113187.416},{"name":"OTM","value":3.4947},{"name":"ETC","value":0.3839},{"name":"XRP","value":14.5501},{"name":"OMG","value":1.1352},{"name":"LTC","value":0.0805},{"name":"EUR","value":4.2699},{"name":"RUB","value":337.6289},{"name":"CNY","value":3.4006},{"name":"TRY","value":31.3049},{"name":"MYR","value":20.4825},{"name":"USD","value":5},{"name":"BRL","value":20.4564},{"name":"XEM","value":45.4669},{"name":"XLM","value":21.6675},{"name":"BTG","value":0.2266},{"name":"BCH","value":0.009},{"name":"BTC","value":0.0007},{"name":"NEO","value":0.244},{"name":"ZEC","value":0.0328},{"name":"GBP","value":3.8719}],"state-name":"min_5"},{"currencies":[{"name":"DAH","value":0.0417},{"name":"ETH","value":0.0342},{"name":"QTM","value":1.1628},{"name":"IDR","value":146219.9831},{"name":"TRX","value":263.1579},{"name":"OTN","value":0.5},{"name":"VND","value":226374.8321},{"name":"OTM","value":6.9894},{"name":"ETC","value":0.7678},{"name":"XRP","value":29.1002},{"name":"OMG","value":2.2704},{"name":"LTC","value":0.1609},{"name":"EUR","value":8.5397},{"name":"RUB","value":675.2579},{"name":"CNY","value":6.8011},{"name":"TRY","value":62.6097},{"name":"MYR","value":40.965},{"name":"USD","value":10},{"name":"BRL","value":40.9129},{"name":"XEM","value":90.9339},{"name":"XLM","value":43.3351},{"name":"BTG","value":0.4531},{"name":"BCH","value":0.0179},{"name":"BTC","value":0.0014},{"name":"NEO","value":0.488},{"name":"ZEC","value":0.0655},{"name":"GBP","value":7.7438}],"state-name":"min_10"},{"currencies":[{"name":"DAH","value":0.0833},{"name":"ETH","value":0.0683},{"name":"QTM","value":2.3256},{"name":"IDR","value":292439.9663},{"name":"TRX","value":526.3158},{"name":"OTN","value":1},{"name":"VND","value":452749.6642},{"name":"OTM","value":13.9787},{"name":"ETC","value":1.5356},{"name":"XRP","value":58.2004},{"name":"OMG","value":4.5408},{"name":"LTC","value":0.3219},{"name":"EUR","value":17.0794},{"name":"RUB","value":1350.5158},{"name":"CNY","value":13.6022},{"name":"TRY","value":125.2195},{"name":"MYR","value":81.93},{"name":"USD","value":20},{"name":"BRL","value":81.8258},{"name":"XEM","value":181.8678},{"name":"XLM","value":86.6701},{"name":"BTG","value":0.9063},{"name":"BCH","value":0.0359},{"name":"BTC","value":0.0028},{"name":"NEO","value":0.976},{"name":"ZEC","value":0.131},{"name":"GBP","value":15.4876}],"state-name":"min_20"}],"instruments":["forex","cfd","crypto"]},"version":1,"status":"disabled"},{"id":763,"name":"test-nocat-feature","category":null,"params":null,"version":1,"status":"disabled"},{"id":767,"name":"fx-min-deal-amount","category":null,"params":[{"period":3600,"min_deal_amount":25}],"version":1,"status":"enabled"},{"id":784,"name":"no-billing-session","category":"billing","params":null,"version":1,"status":"enabled"},{"id":805,"name":"hide-big-leverages","category":null,"params":{"instruments":["forex"],"hide_leverage_threshold":500},"version":1,"status":"enabled"},{"id":810,"name":"do-spot-switcher-instrument","category":null,"params":null,"version":1,"status":"disabled"}]},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"jsonpCallbackParam":"callback","url":"http://features.build40515.sandbox3.mobbtech.com/api/v2/features?category=billing","withCredentials":true,"headers":{"Accept":"application/json, text/plain, */*"},"params":{},"requestTimestamp":1540463645308,"responseTimestamp":1540463650519,"timeDiff":5211},"statusText":"OK"};
                return $q.resolve(data);
                return $http({
                    method: 'GET',
                    url: url,
                    withCredentials: true
                }).then(function (res) {
                    console.log(JSON.stringify(res));
                    data = res;
                    return res;
                }, function(){
                    data = {
                        data: {
                            features: {}
                        }
                    };
                    return data;
                })
            }

            function getFeature(featureName) {
                var foundFeature = false;
                angular.forEach(data.data.features, function (feature) {
                    if (!foundFeature && feature.name === featureName) {
                        foundFeature = feature.status;
                    }
                });
                return foundFeature;
            }

            return {
                get: get,
                getMethods: getFeatures,
                getFeature: getFeature
            }
        });
})();
