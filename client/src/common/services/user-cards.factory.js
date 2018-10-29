(function() {
  'use strict';


  angular.module('common.services.data')
    .factory('userCards', function ($http, $q) {

      var data;


      function get() {
          return data ? $q.resolve(data) : getUserCards();
      }


      function getUserCards() {
          data = {"data":{"isSuccessful":true,"errors":[],"message":"","data":[{"limits":{"USD":{"min":0,"max":0}},"payment_method_id":56,"expiry_date":"10/20","card_id":11,"card_number":"4000-00XX-XXXX-0002","recurrent_count":0,"recurrent_amount":0,"init_payment_method_id":240,"payment_method_3ds_id":213,"card_holder":"EWWOPDJ EWO","default_3ds":false,"card_icon":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x2/visa-card.png","card_icon_x1":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/x1/visa-card.png","card_icon_gl":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/gl/visa-card.png","card_icon_xs":"http://billing.build40515.sandbox3.mobbtech.com:8080/images/cashbox/xs/visa-card.png"}]},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"jsonpCallbackParam":"callback","url":"/external/cashbox/user-cards","headers":{"Accept":"application/json, text/plain, */*"},"params":{},"requestTimestamp":1540464343334,"withCredentials":true,"responseTimestamp":1540464343570,"timeDiff":236},"statusText":"OK"};
          return $q.resolve(data);
          return $http.get('/external/cashbox/user-cards').then(function(res){

              data = res;
              return res;
          })
      }

      function getCreditCardType(accountNumber) {

          var result = "default";

          if (/^5[1-5]/.test(accountNumber)) {
              result = "mastercard";
          }

          if (/^5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390/.test(accountNumber)){
              result = "maestro";
          }

          else if (/^4/.test(accountNumber)) {
              result = "visa";
          }

          else if (/^3[47]/.test(accountNumber)) {
              result = "amex";
          }

          else if (/^(62|88)/.test(accountNumber)) {
              result = "unionpay";
          }

          return result;
      }

      return {
        get: get,
        getUserCards: getUserCards,
        getCreditCardType: getCreditCardType
        }
    });
})();
