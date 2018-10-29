(function () {
    'use strict';

    app.controller('withdrawalFaq', [
        'faqService',
        '$rootScope',
        '$scope',
        faqCtrl
    ]);

    function faqCtrl(faqService, $rootScope, $scope) {

        init();

        $rootScope.$watch('appConfig.locale', function (locale, oldLocale) {
            if (locale !== oldLocale) {
                init();
            }
        });

        function init() {
            $scope.loading = true;
            // 5 - is ID of category "Withdrawing funds"
            faqService.get(5).then(function (faq) {
                if (faq && angular.isArray(faq.questions)) {
                    $scope.faqQuestions = faq.questions;
                    $scope.loading = false;
                }
            });
        }
    }

})();