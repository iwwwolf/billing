(function () {
    'use strict';


    angular.module('common.services.data')
        .factory('paymentMethods', function ($http, $q) {

            var data,
                currentMethod = {};


            function get() {
                return data ? $q.resolve(data) : getMethods();
            }


            function getMethods() {
                return $q.resolve({"data":{"isSuccessful":true,"errors":[],"message":"","data":[{"id":55,"name":"Visa / Mastercard","pay_system":"bank_card","type":"Банковские карты","type_id":2,"cashbox_css_class":"visa-mastercard","can_process_card_api":true,"icon_url":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x2/visa-mastercard.png","icon_url_xs":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/xs/visa-mastercard.png","icon_url_x1":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x1/visa-mastercard.png","icon_url_gl":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/gl/visa-mastercard.png","cdn_icons":{"icon_url":"https://static.billing.iqoption.com/images/cashbox/x2/visa-mastercard.png","icon_url_xs":"https://static.billing.iqoption.com/images/cashbox/xs/visa-mastercard.png","icon_url_x1":"https://static.billing.iqoption.com/images/cashbox/x1/visa-mastercard.png","icon_url_gl":"https://static.billing.iqoption.com/images/cashbox/gl/visa-mastercard.png"},"is_secure":true,"commission_percent":0,"extra_params":{"title":"VisaMasterCardCashboxForm","required":["card_number","card_holder","card_exp_month","card_exp_year","card_cvv"],"properties":{"card_exp_month":{"type":{"enum":[1,2,3,4,5,6,7,8,9,10,11,12]},"title":"Card Exp Month"},"card_exp_year":{"type":{"enum":[18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038]},"title":"Card Exp Year"},"card_cvv":{"type":"string","pattern":"^[0-9]{3,4}$","title":"Card Cvv"},"card_holder":{"type":"string","pattern":"^[a-zA-Z0-9\\s\\.\\-]{2,}$","title":"Card Holder"},"card_number":{"type":"string","title":"Card Number"}}},"limits":{"USD":{"min":0,"max":0}},"kyc_restricted":false},{"id":215,"name":"Bitcoin","pay_system":"bitcoin","type":"ЭЛЕКТРОННЫЕ КОШЕЛЬКИ","type_id":3,"cashbox_css_class":"bitcoin","can_process_card_api":false,"icon_url":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x2/bitcoin.png","icon_url_xs":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/xs/bitcoin.png","icon_url_x1":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x1/bitcoin.png","icon_url_gl":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/gl/bitcoin.png","cdn_icons":{"icon_url":"https://static.billing.iqoption.com/images/cashbox/x2/bitcoin.png","icon_url_xs":"https://static.billing.iqoption.com/images/cashbox/xs/bitcoin.png","icon_url_x1":"https://static.billing.iqoption.com/images/cashbox/x1/bitcoin.png","icon_url_gl":"https://static.billing.iqoption.com/images/cashbox/gl/bitcoin.png"},"is_secure":true,"commission_percent":0,"limits":{"USD":{"min":0,"max":0}},"kyc_restricted":false},{"id":9,"name":"Neteller","pay_system":"neteller","type":"ЭЛЕКТРОННЫЕ КОШЕЛЬКИ","type_id":3,"cashbox_css_class":"neteller","can_process_card_api":false,"icon_url":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x2/neteller.png","icon_url_xs":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/xs/neteller.png","icon_url_x1":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x1/neteller.png","icon_url_gl":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/gl/neteller.png","cdn_icons":{"icon_url":"https://static.billing.iqoption.com/images/cashbox/x2/neteller.png","icon_url_xs":"https://static.billing.iqoption.com/images/cashbox/xs/neteller.png","icon_url_x1":"https://static.billing.iqoption.com/images/cashbox/x1/neteller.png","icon_url_gl":"https://static.billing.iqoption.com/images/cashbox/gl/neteller.png"},"is_secure":true,"commission_percent":0,"extra_params":{"title":"NetellerCashboxForm","required":["netellerEmail","netellerVerificationCode"],"properties":{"netellerEmail":{"type":"string","pattern":"^[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$","title":"payer account"},"netellerVerificationCode":{"type":"string","title":"enter your code"}}},"limits":{"USD":{"min":0,"max":0}},"kyc_restricted":false},{"id":7,"name":"Skrill","pay_system":"skrill","type":"ЭЛЕКТРОННЫЕ КОШЕЛЬКИ","type_id":3,"cashbox_css_class":"skrill","can_process_card_api":false,"icon_url":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x2/skrill.png","icon_url_xs":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/xs/skrill.png","icon_url_x1":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x1/skrill.png","icon_url_gl":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/gl/skrill.png","cdn_icons":{"icon_url":"https://static.billing.iqoption.com/images/cashbox/x2/skrill.png","icon_url_xs":"https://static.billing.iqoption.com/images/cashbox/xs/skrill.png","icon_url_x1":"https://static.billing.iqoption.com/images/cashbox/x1/skrill.png","icon_url_gl":"https://static.billing.iqoption.com/images/cashbox/gl/skrill.png"},"is_secure":true,"commission_percent":0,"limits":{"USD":{"min":0,"max":0}},"kyc_restricted":false},{"id":2,"name":"WebMoney WME","pay_system":"webmoney","type":"ЭЛЕКТРОННЫЕ КОШЕЛЬКИ","type_id":3,"cashbox_css_class":"webmoney-wme","can_process_card_api":false,"icon_url":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x2/webmoney-wme.png","icon_url_xs":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/xs/webmoney-wme.png","icon_url_x1":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x1/webmoney-wme.png","icon_url_gl":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/gl/webmoney-wme.png","cdn_icons":{"icon_url":"https://static.billing.iqoption.com/images/cashbox/x2/webmoney-wme.png","icon_url_xs":"https://static.billing.iqoption.com/images/cashbox/xs/webmoney-wme.png","icon_url_x1":"https://static.billing.iqoption.com/images/cashbox/x1/webmoney-wme.png","icon_url_gl":"https://static.billing.iqoption.com/images/cashbox/gl/webmoney-wme.png"},"is_secure":true,"commission_percent":0,"limits":{"USD":{"min":0,"max":0}},"kyc_restricted":false},{"id":3,"name":"WebMoney WMR","pay_system":"webmoney","type":"ЭЛЕКТРОННЫЕ КОШЕЛЬКИ","type_id":3,"cashbox_css_class":"webmoney-wmr","can_process_card_api":false,"icon_url":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x2/webmoney-wmr.png","icon_url_xs":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/xs/webmoney-wmr.png","icon_url_x1":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x1/webmoney-wmr.png","icon_url_gl":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/gl/webmoney-wmr.png","cdn_icons":{"icon_url":"https://static.billing.iqoption.com/images/cashbox/x2/webmoney-wmr.png","icon_url_xs":"https://static.billing.iqoption.com/images/cashbox/xs/webmoney-wmr.png","icon_url_x1":"https://static.billing.iqoption.com/images/cashbox/x1/webmoney-wmr.png","icon_url_gl":"https://static.billing.iqoption.com/images/cashbox/gl/webmoney-wmr.png"},"is_secure":true,"commission_percent":0,"limits":{"USD":{"min":0,"max":0}},"kyc_restricted":false},{"id":1,"name":"WebMoney WMZ","pay_system":"webmoney","type":"ЭЛЕКТРОННЫЕ КОШЕЛЬКИ","type_id":3,"cashbox_css_class":"webmoney-wmz","can_process_card_api":false,"icon_url":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x2/webmoney-wmz.png","icon_url_xs":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/xs/webmoney-wmz.png","icon_url_x1":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x1/webmoney-wmz.png","icon_url_gl":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/gl/webmoney-wmz.png","cdn_icons":{"icon_url":"https://static.billing.iqoption.com/images/cashbox/x2/webmoney-wmz.png","icon_url_xs":"https://static.billing.iqoption.com/images/cashbox/xs/webmoney-wmz.png","icon_url_x1":"https://static.billing.iqoption.com/images/cashbox/x1/webmoney-wmz.png","icon_url_gl":"https://static.billing.iqoption.com/images/cashbox/gl/webmoney-wmz.png"},"is_secure":true,"commission_percent":0,"limits":{"USD":{"min":0,"max":0}},"kyc_restricted":false},{"id":247,"name":"Direct Bank Transfer","pay_system":"bank_transfer","type":"direct bank transfer","type_id":6,"cashbox_css_class":"thai_banks","can_process_card_api":false,"icon_url":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x2/thai_banks.png","icon_url_xs":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/xs/thai_banks.png","icon_url_x1":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x1/thai_banks.png","icon_url_gl":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/gl/thai_banks.png","cdn_icons":{"icon_url":"https://static.billing.iqoption.com/images/cashbox/x2/thai_banks.png","icon_url_xs":"https://static.billing.iqoption.com/images/cashbox/xs/thai_banks.png","icon_url_x1":"https://static.billing.iqoption.com/images/cashbox/x1/thai_banks.png","icon_url_gl":"https://static.billing.iqoption.com/images/cashbox/gl/thai_banks.png"},"is_secure":true,"commission_percent":0,"extra_params":{"title":"BankTransferCashboxForm","required":["bank_name"],"properties":{"user_account":{"type":"string","title":"Номер Вашего счета (счет отправителя)"},"swift":{"type":"string","title":"SWIFT/BIC Вашего банка"},"bank_name":{"type":"string","title":"Название Вашего Банка"}}},"limits":{"USD":{"min":10,"max":10000}},"kyc_restricted":false}]},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"jsonpCallbackParam":"callback","url":"/external/cashbox/payment-methods","headers":{"Accept":"application/json, text/plain, */*"},"params":{},"requestTimestamp":1540461584509,"withCredentials":true,"responseTimestamp":1540461589929,"timeDiff":5420},"statusText":"OK"});
                // return $http.get('/external/cashbox/payment-methods').then(function (res) {
                //     data = res;
                //
                //     // fix for neteller fields translations
                //     var obj = _.find(data.data.data, function (o) {
                //         return o.name === 'Neteller';
                //     });
                //
                //     if (obj) {
                //         obj.extra_params.properties.netellerEmail.title = 'payer account';
                //         obj.extra_params.properties.netellerVerificationCode.title = 'enter your code';
                //     }
                //
                //     return res;
                // })
            }

            return {
                get: get,
                getMethods: getMethods,
                currentMethod: currentMethod
            }
        });
})();