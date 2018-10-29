(function () {
    'use strict';


    angular.module('common.services.data')
        .service('cardService', function ($http, $q) {

            this.unlink = function (card_id) {
                return $http({
                    method: 'POST',
                    url: '/external/counting/unlink-card',
                    data: 'card_id=' + card_id,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            }
        });

})();