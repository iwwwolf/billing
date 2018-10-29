(function () {
    'use strict';

    app.directive('tip', [
        '$timeout',
        tooltip
    ]);

    function tooltip($timeout) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                // Create tooltip with custom options
                $element.tooltip({
                    html: true,
                    delay: { 'hide' : 100 },
                    container: $element.parent()[0],
                    trigger: $attrs.tipTrigger || 'manual',
                    placement: $attrs.tipPlace || 'right auto',
                    //viewport: { selector: '.container-fluid', padding: 0 },
                    template: [
                        '<div class="tooltip tooltip--vip ' + ($attrs.tipType || '') + '" role="tooltip">',
                            '<div class="tooltip-arrow"></div>',
                            '<div class="tooltip-inner"></div>',
                        '</div>'
                    ].join(''),
                    title: function () {
                        return $element.attr('tip-title') || '';
                    }
                });
                // Start observing tip show flag
                var stopObservingTipShow = $attrs.$observe('tipShow', function (isTipShow) {
                    toggleTooltip(!(!isTipShow || isTipShow === 'false'));
                });

                if ($element[0].nodeName === 'INPUT') {
                    $element.on('input', function () {
                       if (this.value !== this.oldValue) {
                           var tipShow = $element.attr('tip-show'),
                               tipTitle = $element.attr('tip-title');
                           toggleTooltip(tipShow && tipShow !== 'false' && tipTitle && tipTitle.length);
                           this.oldValue = this.value;
                       }
                    });
                }

                function toggleTooltip(isShow) {
                    if (isShow) {
                        $element.data('bs.tooltip').options.animation = !$element.attr('aria-describedby');
                        $timeout(function () {
                            $element.tooltip('show');
                        }, 1);
                    } else {
                        $element.tooltip('hide');
                    }
                }

                $scope.$on('$destroy', function () {
                    if ($element.attr('aria-describedby')) {
                        // Remove tooltip immediately
                        $('#' + $element.attr('aria-describedby')).remove();
                    }
                    $element.tooltip('destroy');
                    stopObservingTipShow();
                });
            }
        };
    }
})();
