(function () {
    'use strict';

    app.directive('commissionMin', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                var commissionAmount = attrs.commissionMin;

                ctrl.$validators.commisssionMin = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue) || commissionAmount === 0) {
                        return true;
                    }

                    if (modelValue > commissionAmount) {
                        return true;
                    }

                    return false;
                };
            }
        };
    });
})()