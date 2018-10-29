(function () {
    'use strict';

    app.factory('faqService', [
        '$q',
        '$http',
        '$rootScope',
        faqService
    ]);

    function faqService($q, $http, $rootScope) {
        var faq = {};

        return {
            get: get
        };

        function get(categoryId) {

            if (faq[$rootScope.appConfig.locale]) {
                return $q.resolve(typeof categoryId === 'number' ? _getCategory(categoryId) : faq[$rootScope.appConfig.locale]);
            }

            var config = {
                method: 'get',
                url: location.protocol + '//api.' + $rootScope.appConfig.iqoptionDomain + '/cms/faq',
                params: {
                    lang: $rootScope.appConfig.locale
                }
            };


            return $http(config).then(function (response) {
                if (response && response.data && response.data.isSuccessful && response.data.result) {
                    // save faq to local variable
                    faq[$rootScope.appConfig.locale] = _normalizeLinks(response.data.result);

                    if (typeof categoryId === 'number') {
                        // get specific category
                        return _getCategory(categoryId);
                    }

                    return faq[$rootScope.appConfig.locale];
                }
            });

        }

        function _normalizeLinks(data) {

            angular.forEach(data, function (category) {

                angular.forEach(category.questions, function (item) {

                    var links = item.answer.match(/<a[^>]+>.+?<\/a>/g);

                    angular.forEach(links, function (link) {

                        var newLink = link
                            .replace(/href="(\/.+)"/, 'href="' + $rootScope.appConfig.iqoptionUrl + '$1"')
                            .replace(/(href=".*")/, '$1 target="_blank"');

                        item.answer = item.answer.replace(link, newLink);
                    });

                });

            });

            return data;
        }

        function _getCategory(categoryId) {
            return faq[$rootScope.appConfig.locale].find(function(category) {return category.id === categoryId});
        }
    }
})();