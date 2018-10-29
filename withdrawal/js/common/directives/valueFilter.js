(function () {
    'use strict';

    app.directive('valueFilter', [
        '$filter',
        filter
    ]);

    function filter($filter) {
        var filtersViewModel = {
                amount: function (amount) {
                    amount = $filter('number')(amount, { thousandsSeparator: '' });
                    if (!amount) return '';

                    return isNaN(amount) ? '' : parseFloat(amount);
                },
                email: function (email) {
                    return email.replace(/[^\w\d\-@+._]/g, '');
                },
                phone: function (phone) {
                    return phone.replace(/[^\d+]/g, '');
                },
                clearSpaces: function (text) {
                    var str = text.replace(/\s+/g, '');
                    return str;
                }
            },
            filtersModelView = {
                amount: function (amount) {
                    return $filter('number')(amount, { removeZeros: false });
                }
            },
            nope = function (d) {
                return d;
            };

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, $element, $attrs, $ngModel) {
                var filterName = $attrs.valueFilter;

                if (filterName === '' || filterName === 'text') {
                    return;
                }
                // Get specific filters
                var filterViewModel = filtersViewModel[filterName] || nope,
                    filterModelView = filtersModelView[filterName] || filtersViewModel[filterName] || nope;
                // Set data parser view -> model
                $ngModel.$parsers.push(function (data) {
                    if ($ngModel.$isEmpty(data)) {
                        return data;
                    }

                    $ngModel.$setViewValue(filterModelView(data));
                    $ngModel.$render();
                    return filterViewModel(data);
                });
                // Set data formatter model -> view
                $ngModel.$formatters.push(function (data) {
                    if ($ngModel.$isEmpty(data)) {
                        return data;
                    }
                    console.log(filterModelView(data));
                    return filterModelView(data);
                });
            }
        };
    }
})();