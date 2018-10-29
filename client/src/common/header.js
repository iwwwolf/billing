(function () {
    'use strict';

    angular.module('common.header', [])
        .controller('HeaderCtrl', headerCtrl);

    function headerCtrl(featuresData, getFeatures, $rootScope) {
        var header = this;
        header.cryptoDeposit = getFeatures.getFeature('crypto-deposit');

        if (header.cryptoDeposit === 'enabled') {
            $rootScope.containerClasses = 'with-header';
        }
    }

})();
