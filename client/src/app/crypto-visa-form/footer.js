(function () {
    'use strict';

    angular.module('app')
        .controller('FooterCryptoCtrl', FooterCryptoCtrl);

    function FooterCryptoCtrl(locationService) {
        var footer = this;
        footer.color = locationService.getURLParameter('color');

        if (footer.color === 'orange' || footer.color === 'green') {
            footer.iconsColor = 'gray';
        } else {
            footer.iconsColor = 'blue';
        }
    }

})();
