(function () {
    'use strict';

    angular.module('app')
        .controller('FooterCtrl', footerCtrl)
        .value('Badges', [
            {
                name: 'CySEC',
                format: 'png',
                sizes: ['2x'],
                link: 'http://cysec.gov.cy/entities/investment-firms/cypriot/40647/',
                text: 'License number 247/14',
                className: 'badge-cysec',
                countries: [14, 21, 32, 206, 92, 78, 81, 56, 96, 182, 97, 54, 107, 113, 114, 122, 140, 141, 159, 176, 177, 160, 164, 71, 72, 52, 55, 188, 66] // European Union
            },
            {
                name: 'EU',
                show_not_regulated: true,
                format: 'png',
                sizes: ['2x'],
                text: 'iq4.deposit.safely_stored',
                className: 'badge-eu',
                countries: [] // all countries
            },
            {
                name: 'SSL',
                format: 'png',
                sizes: ['2x'],
                text: 'iq4.deposit.ssl',
                className: 'badge-ssl',
                countries: [] // all countries
            },
            {
                name: 'SecureCode',
                format: 'png',
                sizes: ['2x'],
                className: 'badge-securecode',
                countries: [] // all countries
            },
            {
                name: 'VisaVerified',
                format: 'png',
                sizes: ['2x'],
                className: 'badge-visaverified',
                countries: [] // all countries
            },
            {
                name: 'DSS',
                format: 'png',
                className: 'badge-dss',
                sizes: ['2x'],
                countries: [] // all countries
            }
        ]);

    function footerCtrl($log, Badges, userProfileData) {
        var footer = this;

        footer.profile = userProfileData;
        footer.isRegulated = userProfileData.kyc.isRegulatedUser;
        //
        // footer.badgeClass = function(name) {
        //   return 'badge' + name.tolowerCase();
        // };

        footer.badges = Badges.filter(function (badge) {
            function filterByCountry() {
                return badge.countries.indexOf(footer.profile.country_id) != -1;
            }

            if(badge.show_not_regulated && footer.isRegulated) {
                return false;
            }

            return _.isEmpty(badge.countries) || filterByCountry()
        })
    }

})();
