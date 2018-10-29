(function () {
    'use strict';


    angular.module('common.services.data')
        .factory('userProfile', function ($http, $q, $rootScope) {

            var data;


            function get() {
                return data ? $q.resolve(data) : getProfile();
            }


            function getProfile() {
                data = {"data":{"isSuccessful":true,"message":"","result":{"avatar":"","confirmation_required":0,"popup":[],"money":{"deposit":{"min":2,"max":1000000},"withdraw":{"min":2,"max":1000000}},"user_group":"VIP","welcome_splash":0,"functions":{"popup_ids":["1"],"ext_fields":[],"is_vip_mode":0,"is_bonus_block":0,"is_no_currency_change":0,"is_trading_bonus_block":0},"finance_state":"","balance":406.26,"bonus_wager":0,"bonus_total_wager":0,"balance_id":10663700,"balance_type":4,"messages":0,"id":7,"demo":0,"public":1,"group_id":3,"name":"7 7","nickname":"Jayden Baker","currency":"USD","currency_char":"$","mask":"$%s","city":"","user_id":7,"first_name":"7","last_name":"7","phone":"7 *****00007","email":"7@test.iqoption.com","created":1380187236,"last_visit":1422364162,"site_id":1,"tz":"Pacific/Pago_Pago","locale":"ru_RU","birthdate":0,"country_id":4,"currency_id":5,"gender":"male","address":"","postal_index":"","timediff":-50400,"tz_offset":-660,"balances":[{"id":7,"type":1,"amount":500000000,"currency":"USD","new_amount":500000000,"description":null,"bonus_amount":0,"bonus_total_amount":0},{"id":10663700,"type":4,"amount":406260000,"currency":"USD","new_amount":0,"description":null,"bonus_amount":0,"bonus_total_amount":0},{"id":13942830,"type":2,"amount":100000000,"currency":"USD","new_amount":0,"description":null,"bonus_amount":0,"bonus_total_amount":0},{"id":13171159,"type":2,"amount":100000000,"currency":"USD","new_amount":0,"description":null,"bonus_amount":0,"bonus_total_amount":0},{"id":88557954,"type":5,"amount":0,"currency":"BTC","new_amount":0,"description":null,"bonus_amount":0,"bonus_total_amount":0},{"id":88557956,"type":5,"amount":0,"currency":"OTN","new_amount":0,"description":null,"bonus_amount":0,"bonus_total_amount":0},{"id":88557955,"type":5,"amount":0,"currency":"ETH","new_amount":0,"description":null,"bonus_amount":0,"bonus_total_amount":0}],"infeed":1,"confirmed_phones":[],"need_phone_confirmation":true,"rate_in_one_click":false,"deposit_in_one_click":false,"kyc_confirmed":false,"kyc":{"status":3,"isPhoneFilled":true,"isPhoneNeeded":true,"isProfileFilled":true,"isProfileNeeded":true,"isRegulatedUser":false,"daysLeftToVerify":-1,"isPhoneConfirmed":false,"isDocumentsNeeded":false,"isDocumentsApproved":false,"isDocumentsDeclined":false,"isDocumentsUploaded":false,"isDocumentPoaUploaded":false,"isDocumentPoiUploaded":false,"isDocumentsUploadSkipped":false,"isPhoneConfirmationSkipped":false},"trade_restricted":false,"auth_two_factor":false,"deposit_count":5,"is_activated":true,"new_email":"","tc":true,"trial":false,"is_islamic":false,"tin":"","personal_data_policy":{"is_call_accepted":{"status":true},"is_push_accepted":{"status":true},"is_email_accepted":{"status":true},"is_agreement_accepted":{"status":null},"is_thirdparty_accepted":{"status":true}},"client_category_id":0,"tournaments_ids":null,"socials":{},"flag":"AS","cashback_level_info":{"enabled":false},"user_circle":"No exp","skey":"b59e1cfc9453ebf11b8fd4fe8740be44","forget_status":{"status":"none","created":null,"expires":null},"account_status":"NONE"}},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"jsonpCallbackParam":"callback","url":"//build40515.sandbox3.mobbtech.com/api/getprofile","headers":{"Accept":"application/json, text/plain, */*"},"params":{},"requestTimestamp":1540463774669,"withCredentials":true,"responseTimestamp":1540463779763,"timeDiff":5094},"statusText":"OK"};
                return $q.resolve(data);
                return $http.get('//' + $rootScope.iqOptionUrl + '/api/getprofile').then(function (res) {
                    console.log(JSON.stringify(res));
                    data = res;
                    return res;
                })
            }

            return {
                get: get,
                getProfile: getProfile
            }
        });
})();
