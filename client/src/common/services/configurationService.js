(function () {
    'use strict';


    angular.module('common.services.data')
        .factory('configurationService', function ($http, $q, $rootScope) {

        var data = {};


        function get() {
            return !_.isEmpty(data)? $q.resolve(data) : getConfiguration();
        }

        function getConfiguration() {
            return $http({
                method: 'GET',
                url: '//' + $rootScope.iqOptionUrl + '/api/configuration',
            }).then(function (res) {
                data = res;
                return res;
            });
        }

        return {
            get: get,
            getConfiguration: getConfiguration
        }
    });
})();
