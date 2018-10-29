(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/footer.tpl.html",
    "<ul class=\"footer__list\">\n" +
    "    <li ng-repeat=\"badge in footer.badges\" class=\"footer__list-item\" ng-class=\"badge.className\">\n" +
    "        <img alt=\"{{badge.name}}\" ng-src=\"/images/web/badges/{{badge.name}}.{{badge.format}}\"  ng-srcset=\"/images/web/badges/{{badge.name}}@2x.{{badge.format}} 2x\">\n" +
    "        <span ng-if=\"badge.text\">{{badge.text | translate}}</span>\n" +
    "    </li>\n" +
    "\n" +
    "    <!-- <li class=\"footer__list-item badge-eu\">\n" +
    "        <img alt=\"\"  src=\"/images/footer-icons/EU.svg\">\n" +
    "        <span>Funds safely stored in a European bank</span>\n" +
    "    </li>\n" +
    "    <li class=\"footer__list-item badge-ssl\">\n" +
    "        <img alt=\"\"  src=\"/images/footer-icons/SSL.svg\">\n" +
    "        <span>Bank-level secure encryption</span>\n" +
    "    </li>\n" +
    "    <li class=\"footer__list-item badge-securecode\">\n" +
    "        <img alt=\"\"  src=\"/images/footer-icons/SecureCode.svg\">\n" +
    "    </li>\n" +
    "    <li class=\"footer__list-item badge-visaverified\">\n" +
    "        <img alt=\"\"  src=\"/images/footer-icons/VisaVerified.svg\">\n" +
    "    </li>\n" +
    "    <li class=\"footer__list-item badge-dss\">\n" +
    "        <img alt=\"\"  src=\"/images/footer-icons/DSS.svg\">\n" +
    "    </li> -->\n" +
    "</ul>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/header.tpl.html",
    "<ul class=\"tabs\" ng-if=\"header.cryptoDeposit === 'enabled'\">\n" +
    "    <li class=\"tabs__item\" ui-sref-active=\"selected\">\n" +
    "        <a href ui-sref=\"root.cashbox\" class=\"tabs__link tabs__link--with-icon\">\n" +
    "            <!-- <img src=\"/images/cashbox-crypto/billing_usd.svg\"> -->\n" +
    "            <svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
    "                <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
    "                    <g class=\"path-with-fill\" transform=\"translate(-49.000000, -21.000000)\" fill=\"#000000\">\n" +
    "                        <g transform=\"translate(49.000000, 21.000000)\">\n" +
    "                            <path d=\"M10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 Z M10.8107281,15.9616089 L10.8107281,15.0350952 C12.930479,14.8666382 14.1447735,13.7786865 14.1447735,12.0309448 C14.1447735,10.5499268 13.2744122,9.65148926 11.5056133,9.23034668 L10.8107281,9.08294678 L10.8107281,6.17004395 C11.6670513,6.28234863 12.26367,6.87194824 12.2847271,7.6159668 L13.9622784,7.6159668 C13.9271832,6.03668213 12.7058697,4.90661621 10.8107281,4.73815918 L10.8107281,3.76953125 L9.84210014,3.76953125 L9.84210014,4.73815918 C7.85571098,4.91363525 6.66247368,5.99456787 6.66247368,7.65106201 C6.66247368,9.05487061 7.54687309,10.0094604 9.16827202,10.4025269 L9.84210014,10.5709839 L9.84210014,13.6383057 C8.85241508,13.526001 8.21368217,12.9574585 8.15051079,12.1572876 L6.4378643,12.1572876 C6.44488335,13.8137817 7.75042534,14.9157715 9.84210014,15.0491333 L9.84210014,15.9616089 L10.8107281,15.9616089 Z M12.439146,12.2134399 C12.439146,13.0557251 11.8425274,13.5891724 10.8107281,13.6523438 L10.8107281,10.753479 C11.9267559,10.9780884 12.439146,11.4413452 12.439146,12.2134399 Z M8.38915825,7.51068115 C8.38915825,6.7666626 8.99981499,6.2121582 9.84210014,6.1630249 L9.84210014,8.87939453 C8.89452934,8.68286133 8.38915825,8.21258545 8.38915825,7.51068115 Z\" id=\"billing_usd\"></path>\n" +
    "                        </g>\n" +
    "                    </g>\n" +
    "                </g>\n" +
    "            </svg>\n" +
    "            <span translate>cashbox.deposit funds</span>\n" +
    "        </a>\n" +
    "    </li>\n" +
    "    <li class=\"tabs__item\" ui-sref-active=\"selected\">\n" +
    "        <a href ui-sref=\"root.crypto-cashbox\" class=\"tabs__link tabs__link--with-icon\">\n" +
    "            <!-- <img src=\"/images/cashbox-crypto/billing_btc.svg\"> -->\n" +
    "            <svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
    "                <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
    "                    <g class=\"path-with-fill\" transform=\"translate(-49.000000, -57.000000)\" fill=\"#000000\">\n" +
    "                        <path d=\"M59,57 L59,57 C64.5228475,57 69,61.4771525 69,67 L69,67 C69,72.5228475 64.5228475,77 59,77 C53.4771525,77 49,72.5228475 49,67 L49,67 L49,67 C49,61.4771525 53.4771525,57 59,57 L59,57 Z M63.8561337,65.3865423 C64.1100589,63.8923732 63.038705,63.0575144 61.5589881,62.4805446 L62.096756,60.461578 L60.9217145,60.122397 L60.3981536,62.0881601 C60.0892489,61.999003 59.7718001,61.9142042 59.4563546,61.8301629 L59.9836265,59.8514556 L58.8092589,59.5122922 L58.2711726,61.5305455 C58.0153301,61.4625162 57.7641868,61.3953149 57.52054,61.3251376 L57.5220539,61.3188328 L55.901582,60.8502627 L55.5522614,62.1628789 C55.5522614,62.1628789 56.4245695,62.3961458 56.4056947,62.408693 C56.881596,62.5462818 56.9595188,62.8799968 56.9381482,63.1423801 L56.3255794,65.4424215 C56.3583721,65.4520919 56.4008356,65.4658928 56.4474953,65.486853 C56.408337,65.4756059 56.3665105,65.4632316 56.3233269,65.4511742 L55.4647353,68.67318 C55.4021175,68.8238075 55.2475357,69.0481603 54.9148535,68.952741 C54.9261772,68.9710136 54.0607739,68.7058526 54.0607739,68.7058526 L53.4363611,70.1060798 L54.965485,70.5475849 C55.2499474,70.63011 55.528589,70.7160074 55.8029699,70.797211 L55.2595387,72.8392923 L56.4332323,73.178438 L56.9713741,71.1580714 C57.291796,71.2581042 57.6029673,71.3508454 57.9075281,71.4384789 L57.3713203,73.4493795 L58.5463618,73.7885605 L59.0896916,71.7503537 C61.0966984,72.2022579 62.6179657,72.0810147 63.3064744,70.1904175 C63.8612462,68.6681744 63.3442755,67.7681743 62.2979372,67.1627237 C63.0758323,66.9966369 63.6720397,66.4803715 63.8561337,65.3865423 L63.8561337,65.3865423 Z M61.0491823,69.2779777 C60.6433525,70.804121 58.1913738,69.9091413 57.3948292,69.6799731 L58.115801,66.9746098 C58.9123179,67.2048346 61.4732486,67.6864 61.0491823,69.2779777 Z M58.4456436,65.7362072 L59.0993286,63.282508 C59.7626526,63.4739981 61.9050469,63.8550762 61.5194704,65.303149 C61.1492871,66.6913525 59.1089676,65.9276973 58.4456436,65.7362072 Z\" id=\"billing_btc\"></path>\n" +
    "                    </g>\n" +
    "                </g>\n" +
    "            </svg>\n" +
    "\n" +
    "            <!-- <svg viewBox=\"0 0 56 56\" id=\"icon_crypto_otn\" width=\"20px\" height=\"20px\">\n" +
    "                <g class=\"path-with-fill\" fill-rule=\"nonzero\" fill=\"#00E0C7\">\n" +
    "                    <path d=\"M46.023 49.306L34.952 38.234l-5.246 2.028L41.743 52.3a30.047 30.047 0 0 0 4.28-2.993zM52.299 41.71L40.262 29.674l-2.028 5.246 11.072 11.07a26.8 26.8 0 0 0 2.993-4.28z\"></path><path d=\"M18.57 37.076c-5.02-5.02-5.02-13.196 0-18.216 5.02-5.02 13.196-5.02 18.216 0l17.766 17.765a27.558 27.558 0 0 0 1.384-8.657C55.936 12.552 43.384 0 27.968 0S0 12.552 0 27.968s12.552 27.968 27.968 27.968c2.864 0 5.6-.45 8.207-1.256L18.57 37.076z\"></path>\n" +
    "                </g>\n" +
    "            </svg> -->\n" +
    "            <span translate>cashbox.deposit eth</span>\n" +
    "        </a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/advanced-form/advanced.form.tpl.html",
    "<div class=\"advanced advanced--form-page\">\n" +
    "    <div class=\"sidebar\">\n" +
    "        <div class=\"advanced__inner\">\n" +
    "            <div class=\"advanced__header\">\n" +
    "                <a class=\"advanced__back-link\" ng-click=\"detail.backToCashboxEvent()\" ui-sref=\"root.cashbox\" ng-if=\"!detail.payIsProcessing\">\n" +
    "                    <svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
    "                        <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
    "                            <g class=\"path-with-fill\" transform=\"translate(-453.000000, -313.000000)\" fill=\"#000000\">\n" +
    "                                <g transform=\"translate(452.000000, 312.000000)\">\n" +
    "                                    <rect x=\"3.91304348\" y=\"9.33333333\" width=\"16.9565217\" height=\"4\" rx=\"1.25\"></rect>\n" +
    "                                    <g transform=\"translate(0.000000, 0.053324)\">\n" +
    "                                        <rect transform=\"translate(7.173913, 14.946343) rotate(-315.000000) translate(-7.173913, -14.946343) \" x=\"-4.39069071e-13\" y=\"12.946343\" width=\"14.3478261\" height=\"4\" rx=\"1.25\"></rect>\n" +
    "                                        <rect transform=\"translate(7.173913, 7.412997) scale(1, -1) rotate(-315.000000) translate(-7.173913, -7.412997) \" x=\"-4.37910577e-13\" y=\"5.41299744\" width=\"14.3478261\" height=\"4\" rx=\"1.25\"></rect>\n" +
    "                                    </g>\n" +
    "                                </g>\n" +
    "                            </g>\n" +
    "                        </g>\n" +
    "                    </svg>\n" +
    "                </a>\n" +
    "\n" +
    "                <img ng-if=\"detail.method.icon_url\" src=\"{{ detail.method.icon_url }}\" class=\"advanced__logo\">\n" +
    "\n" +
    "                <h3 ng-if=\"!detail.method.icon_url\">{{detail.method.name}}</h3>\n" +
    "\n" +
    "                <div class=\"advanced__descr\" ng-switch=\"detail.method.extra_params.title\">\n" +
    "                    <span ng-switch-when=\"AstropayCashboxForm\" translate>astropay advanced form descr</span>\n" +
    "                    <span ng-switch-when=\"BankTransferCashboxForm\" translate>bank transfer.advanced form descr</span>\n" +
    "                    <span ng-switch-default translate>advanced form descr</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <form autocomplete=\"off\" ng-submit=\"detail.pay()\" class=\"advanced__form\" name=\"aform\" novalidate=\"true\">\n" +
    "\n" +
    "                <div class=\"form-group\" ng-repeat=\"field in detail.formFields\">\n" +
    "                    <label class=\"control-label\" for=\"{{ field.name + '-' + $index }}\">\n" +
    "                        <span translate>{{field.title | lowercase}}</span>&nbsp;<b ng-if=\"field.required\">*</b>\n" +
    "                    </label>\n" +
    "                    <div class=\"form__input-wrapper\">\n" +
    "                        <input ng-if=\"field.pattern && field.like==='input'\"\n" +
    "                               class=\"form-control\"\n" +
    "                               ng-required=\"field.required\"\n" +
    "                               ng-model=\"fields[field.name]\"\n" +
    "                               ng-pattern=\"field.pattern\"\n" +
    "                               ng-model-options=\"{allowInvalid:true}\"\n" +
    "                               name=\"{{field.name}}\"\n" +
    "                               ng-class=\"{'valid': aform[field.name].$valid && (aform[field.name].$dirty || aform[field.name].$modelValue),\n" +
    "                                          'invalid': aform[field.name].$invalid && aform.$submitted && detail.showErrors[field.name]}\"\n" +
    "                               ng-change=\"detail.removeError(field.name)\"\n" +
    "                               ng-focus=\"detail.fieldOnFocus(field, fields[field.name])\"\n" +
    "                               ng-blur=\"detail.fieldOnBlur(field, fields[field.name])\"\n" +
    "                               maxlength=\"{{field.maxLength}}\"\n" +
    "                               custom-trim=\"field.pattern\"\n" +
    "                               id=\"{{ field.name + '-' + $index }}\"\n" +
    "                               type=\"input\">\n" +
    "                        <input ng-if=\"!field.pattern && field.like==='input'\"\n" +
    "                               class=\"form-control\"\n" +
    "                               ng-required=\"field.required\"\n" +
    "                               ng-model=\"fields[field.name]\"\n" +
    "                               name=\"{{field.name}}\"\n" +
    "                               maxlength=\"{{field.maxLength}}\"\n" +
    "                               ng-focus=\"detail.fieldOnFocus(field, fields[field.name])\"\n" +
    "                               ng-blur=\"detail.fieldOnBlur(field, fields[field.name])\"\n" +
    "                               ng-change=\"detail.removeError(field.name)\"\n" +
    "                               ng-class=\"{'valid': aform[field.name].$valid && (aform[field.name].$dirty || aform[field.name].$modelValue),\n" +
    "                                          'invalid': aform[field.name].$invalid && aform.$submitted && detail.showErrors[field.name]}\"\n" +
    "                               id=\"{{ field.name + '-' + $index }}\"\n" +
    "                               type=\"input\">\n" +
    "                        <select ng-if=\"field.like==='select'\"\n" +
    "                                class=\"form-control\"\n" +
    "                                ng-required=\"field.required\"\n" +
    "                                ng-options=\"value as key for (key, value) in field.values\"\n" +
    "                                name=\"{{field.name}}\"\n" +
    "                                id=\"{{ field.name + '-' + $index }}\"\n" +
    "                                ng-model=\"fields[field.name]\">\n" +
    "                        </select>\n" +
    "\n" +
    "                        <div class=\"help-text --error\"\n" +
    "                            ng-messages=\"aform[field.name].$error\"\n" +
    "                            role=\"alert\"\n" +
    "                            ng-if=\"aform.$submitted && detail.showErrors[field.name]\">\n" +
    "\n" +
    "                            <span ng-message=\"required\" translate>required field</span>\n" +
    "\n" +
    "                            <span ng-message=\"pattern\" translate>invalid value</span>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"submit-box form-group\">\n" +
    "                    <button class=\"btn btn-success\" type=\"submit\" ng-disabled=\"detail.payIsProcessing\">\n" +
    "                        <span translate>pay</span> <span>{{detail.payParams.amount| money2:detail.currency}}</span>\n" +
    "                        <i class=\"submit-loader\" ng-if=\"cashbox.payIsProcessing\">\n" +
    "                            <svg class=\"submit-loader__circular\" viewbox=\"25 25 50 50\">\n" +
    "                                <circle class=\"submit-loader__path\" cx=\"50\" cy=\"50\" fill=\"none\" r=\"20\" stroke-miterlimit=\"10\"\n" +
    "                                        stroke-width=\"4\">\n" +
    "                                </circle>\n" +
    "                            </svg>\n" +
    "                        </i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/astropay-form/astropay.form.tpl.html",
    "<div class=\"advanced\">\n" +
    "    <div class=\"sidebar\">\n" +
    "        <div class=\"advanced__inner advanced__inner-astropay\">\n" +
    "\n" +
    "            <div class=\"error-message\" ng-if=\"detail.formHasErrors\">\n" +
    "                <div ng-repeat=\"error in detail.cardProcessingErrors\" class=\"error-message__item\" translate>\n" +
    "                    {{error}}\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"advanced__header\">\n" +
    "                <a class=\"advanced__back-link\" ui-sref=\"root.cashbox\" ng-click=\"detail.backToCashboxEvent()\" ng-if=\"!detail.payIsProcessing\">\n" +
    "                    <svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
    "                        <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
    "                            <g class=\"path-with-fill\" transform=\"translate(-453.000000, -313.000000)\" fill=\"#000000\">\n" +
    "                                <g transform=\"translate(452.000000, 312.000000)\">\n" +
    "                                    <rect x=\"3.91304348\" y=\"9.33333333\" width=\"16.9565217\" height=\"4\" rx=\"1.25\"></rect>\n" +
    "                                    <g transform=\"translate(0.000000, 0.053324)\">\n" +
    "                                        <rect transform=\"translate(7.173913, 14.946343) rotate(-315.000000) translate(-7.173913, -14.946343) \" x=\"-4.39069071e-13\" y=\"12.946343\" width=\"14.3478261\" height=\"4\" rx=\"1.25\"></rect>\n" +
    "                                        <rect transform=\"translate(7.173913, 7.412997) scale(1, -1) rotate(-315.000000) translate(-7.173913, -7.412997) \" x=\"-4.37910577e-13\" y=\"5.41299744\" width=\"14.3478261\" height=\"4\" rx=\"1.25\"></rect>\n" +
    "                                    </g>\n" +
    "                                </g>\n" +
    "                            </g>\n" +
    "                        </g>\n" +
    "                    </svg>\n" +
    "                </a>\n" +
    "                <div class=\"advanced__header-content\">\n" +
    "                    <h3 translate>advanced form card title</h3>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <form class=\"advanced__form\"\n" +
    "                  ng-submit=\"detail.pay()\"\n" +
    "                  name=\"aform\"\n" +
    "                  autocomplete=\"off\"\n" +
    "                  novalidate=\"true\">\n" +
    "\n" +
    "                <!-- ¯\\_(ツ)_/¯ try prevent default browser form auto fill -->\n" +
    "                <input type=\"text\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"password\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"text\" name=\"login\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"password\" name=\"password\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"email\" name=\"email\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"password\" name=\"repeatpassword\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <!-- ¯\\_(ツ)_/¯ -->\n" +
    "\n" +
    "                <div class=\"pay-card pay-card--astropay\">\n" +
    "                    <div class=\"pay-card__side pay-card__side--astropay-front\">\n" +
    "                        <div class=\"pay-card__icons-parent\">\n" +
    "                            <div class=\"pay-card__icons\">\n" +
    "                                <div class=\"pay-card__icon pay-card__icon-visa\">\n" +
    "                                    <img src=\"/images/cashbox/x2/astropay_white.png\" alt=\"\" width=\"74\" height=\"24\">\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"form__input-wrapper\">\n" +
    "                                <input type=\"text\" class=\"form-control\"\n" +
    "                                       autofocus\n" +
    "                                       id=\"card-number\"\n" +
    "                                       placeholder=\"{{ 'card number' | translate }}\"\n" +
    "                                       name=\"card_number\"\n" +
    "                                       format-card=\"\"\n" +
    "                                       maxlength=\"19\"\n" +
    "                                       tabindex=\"1\"\n" +
    "                                       luhn-check\n" +
    "                                       ng-model=\"card.card_number\"\n" +
    "                                       ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                       ng-focus=\"detail.fieldFocus('card_number')\"\n" +
    "                                       ng-blur=\"detail.fieldBlur('card_number', 'deposit-by-card_card-number')\"\n" +
    "                                       ng-class=\"{'valid': aform.card_number.$valid && aform.card_number.$dirty,\n" +
    "                                                  'invalid': aform.card_number.$invalid && aform.$submitted && detail.showErrors.card_number}\"\n" +
    "                                       ng-change=\"detail.removeError('card_number');\"\n" +
    "                                       required>\n" +
    "                                <div ng-messages=\"aform.card_number.$error\" role=\"alert\"\n" +
    "                                     class=\"--error tooltip bottom fade in\"\n" +
    "                                     ng-if=\"aform.$submitted && detail.showErrors.card_number && detail.card_number_focused\">\n" +
    "                                    <div ng-message=\"required\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>required field</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div ng-message=\"luhnCheck\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>card number wrong</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group form-group--expiration\">\n" +
    "\n" +
    "                            <label for=\"card-exp-month\" class=\"control-label\" translate>card expiration</label>\n" +
    "\n" +
    "                            <div class=\"pay-card__expiration\" date-focus>\n" +
    "\n" +
    "                                <div class=\"form__input-wrapper\">\n" +
    "                                    <input type=\"text\"\n" +
    "                                           id=\"card-exp-month\"\n" +
    "                                           name=\"card_exp_month\"\n" +
    "                                           ng-model=\"card.card_exp_month\"\n" +
    "                                           class=\"form-control\"\n" +
    "                                           tabindex=\"2\"\n" +
    "                                           range range-allow-less=\"true\" range-allow-more=\"true\"\n" +
    "                                           min=\"detail.rangeLimits.monthMin\"\n" +
    "                                           max=\"detail.rangeLimits.monthMax\"\n" +
    "                                           ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                           ng-focus=\"detail.fieldFocus('card_exp_month')\"\n" +
    "                                           ng-blur=\"detail.fieldBlur('card_exp_month','deposit-by-card_expiry-month')\"\n" +
    "                                           placeholder=\"{{ 'card expiry month' | translate }}\"\n" +
    "                                           ng-class=\"{'valid': aform.card_exp_month.$valid && aform.card_exp_month.$dirty,\n" +
    "                                                      'invalid': aform.card_exp_month.$invalid && aform.$submitted && detail.showErrors.card_exp_month}\"\n" +
    "                                           minlength=\"1\"\n" +
    "                                           ng-change=\"detail.removeError('card_exp_month')\"\n" +
    "                                           only-integers\n" +
    "                                           maxlength=\"2\"\n" +
    "                                           required>\n" +
    "                                    <div ng-messages=\"aform.card_exp_month.$error\" role=\"alert\"\n" +
    "                                             class=\"--error tooltip bottom fade in\"\n" +
    "                                             ng-if=\"aform.$submitted && detail.showErrors.card_exp_month && detail.card_exp_month_focused\">\n" +
    "                                        <div ng-message=\"required\">\n" +
    "                                            <div class=\"tooltip-arrow\"></div>\n" +
    "                                            <div class=\"tooltip-inner\">\n" +
    "                                                <span translate>card expiry month wrong</span>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div ng-message=\"rangeMax\">\n" +
    "                                            <div class=\"tooltip-arrow\"></div>\n" +
    "                                            <div class=\"tooltip-inner\">\n" +
    "                                                <span translate>card expiry month wrong</span>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div ng-message=\"rangeMin\">\n" +
    "                                            <div class=\"tooltip-arrow\"></div>\n" +
    "                                            <div class=\"tooltip-inner\">\n" +
    "                                                <span translate>card expiry month wrong</span>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <span class=\"pay-card__expiration-separator\">/</span>\n" +
    "\n" +
    "                                <div class=\"form__input-astropay-year-wrapper\">\n" +
    "                                    <input type=\"text\"\n" +
    "                                           id=\"card-exp-year\"\n" +
    "                                           name=\"card_exp_year\"\n" +
    "                                           ng-model=\"card.card_exp_year\"\n" +
    "                                           class=\"form-control\"\n" +
    "                                           range range-allow-less=\"true\" range-allow-more=\"true\"\n" +
    "                                           min=\"detail.rangeLimits.yearsMin\"\n" +
    "                                           max=\"detail.rangeLimits.yearsMax\"\n" +
    "                                           ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                           ng-focus=\"detail.fieldFocus('card_exp_year')\"\n" +
    "                                           ng-blur=\"detail.fieldBlur('card_exp_year','deposit-by-card_expiry-year')\"\n" +
    "                                           placeholder=\"{{ 'astropay card expiry year' | translate }}\"\n" +
    "                                           only-integers\n" +
    "                                           ng-class=\"{'valid': aform.card_exp_year.$valid && aform.card_exp_year.$dirty,\n" +
    "                                                      'invalid': aform.card_exp_year.$invalid && aform.$submitted && detail.showErrors.card_exp_year}\"\n" +
    "                                           ng-change=\"detail.removeError('card_exp_year')\"\n" +
    "                                           minlength=\"4\"\n" +
    "                                           tabindex=\"3\"\n" +
    "                                           maxlength=\"4\"\n" +
    "                                           required>\n" +
    "\n" +
    "                                    <div ng-messages=\"aform.card_exp_year.$error\" role=\"alert\"\n" +
    "                                             class=\"--error tooltip bottom fade in\"\n" +
    "                                             ng-if=\"aform.$submitted && detail.showErrors.card_exp_year && detail.card_exp_year_focused\">\n" +
    "                                        <div ng-message=\"required\">\n" +
    "                                            <div class=\"tooltip-arrow\"></div>\n" +
    "                                            <div class=\"tooltip-inner\">\n" +
    "                                                <span translate>card expiry year empty</span>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div ng-message=\"rangeMax\">\n" +
    "                                            <div class=\"tooltip-arrow\"></div>\n" +
    "                                            <div class=\"tooltip-inner\">\n" +
    "                                                <span translate>card expiry max year wrong</span>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div ng-message=\"rangeMin\">\n" +
    "                                            <div class=\"tooltip-arrow\"></div>\n" +
    "                                            <div class=\"tooltip-inner\">\n" +
    "                                                <span translate>card expiry year wrong</span>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div role=\"alert\"\n" +
    "                                 class=\"--error tooltip right fade in\"\n" +
    "                                 ng-if=\"detail.errorDate\">\n" +
    "                                <div class=\"tooltip-arrow\"></div>\n" +
    "                                <div class=\"tooltip-inner\">\n" +
    "                                    <span>{{detail.errorDate}}</span>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group --mb0 form-group--astropay-cvv\">\n" +
    "                            <div class=\"form__input-wrapper form__input-astropay-cvv\">\n" +
    "                                <input type=\"password\" id=\"card-cvv\" class=\"form-control\"\n" +
    "                                       name=\"card_cvv\"\n" +
    "                                       cvc\n" +
    "                                       only-integers\n" +
    "                                       minlength=\"3\"\n" +
    "                                       maxlength=\"4\"\n" +
    "                                       ng-model=\"card.card_cvv\"\n" +
    "                                       placeholder=\"{{ 'astropay card cvv' | translate }}\"\n" +
    "                                       ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                       ng-focus=\"detail.fieldFocus('card_cvv')\"\n" +
    "                                       ng-blur=\"detail.fieldBlur('card_cvv','deposit-by-card_cvv')\"\n" +
    "                                       ng-class=\"{'valid': aform.card_cvv.$valid && aform.card_cvv.$dirty,\n" +
    "                                                  'invalid': aform.card_cvv.$invalid && aform.$submitted && detail.showErrors.card_cvv}\"\n" +
    "                                       ng-change=\"detail.removeError('card_cvv')\"\n" +
    "                                       tabindex=\"5\"\n" +
    "                                       required>\n" +
    "\n" +
    "                                <div ng-messages=\"aform.card_cvv.$error\" role=\"alert\"\n" +
    "                                     class=\"tooltip bottom fade in --error\"\n" +
    "                                     ng-if=\"aform.$submitted && detail.showErrors.card_cvv && detail.card_cvv_focused\">\n" +
    "                                    <div ng-message=\"required\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>required field</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div ng-message=\"minlength\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>card cvc wrong</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <!--<label for=\"card-cvv\" class=\"control-label\" translate>card cvv descr</label>-->\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"advanced__footer advanced__footer--astropay\">\n" +
    "                    <div class=\"advanced__footer-astropay-agree\" translate>you agree to the terms</div>\n" +
    "\n" +
    "                    <button type=\"submit\" class=\"btn btn-success btn--with-icon\" tabindex=\"6\"  ng-disabled=\"detail.payIsProcessing\">\n" +
    "                        <img src=\"/images/advanced/icon-lock.svg\" alt=\"icon lock\" class=\"btn__icon-lock\" width=\"16\" height=\"18\">\n" +
    "                        <span translate>pay</span>&nbsp;<span>{{detail.payParams.amount | money2:detail.currency}}</span>\n" +
    "                        <i class=\"submit-loader\" ng-if=\"detail.payIsProcessing\">\n" +
    "                            <svg class=\"submit-loader__circular\" viewBox=\"25 25 50 50\">\n" +
    "                                <circle class=\"submit-loader__path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"4\" stroke-miterlimit=\"10\"></circle>\n" +
    "                            </svg>\n" +
    "                        </i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/cashbox/cashbox.tpl.html",
    "<div class=\"billing-block__content\" tooltip-placement>\n" +
    "\n" +
    "    <div id=\"error-message\" class=\"error-block show\"\n" +
    "         ng-if=\"!cashbox.methods.length || cashbox.userProfile.user_circle === 'BillingPageOFF'\">\n" +
    "        <div class=\"error-block__inner\">\n" +
    "            <img src=\"/images/cashbox/icon-restricted.svg\" alt=\"restricted\" width=\"72\" height=\"72\">\n" +
    "            <h1 class=\"error-block__header\" translate>no payment methods</h1>\n" +
    "            <p class=\"error-block__text\" translate>cashbox error text</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"error-message\" class=\"error-block full show\"\n" +
    "         ng-if=\"cashbox.sessionData.kyc.is_restricted || cashbox.userNeedsToVerify\">\n" +
    "        <div class=\"error-block__inner\">\n" +
    "            <p class=\"error-block__text\" translate>User needs to be verified</p>\n" +
    "            <a target=\"_top\" href=\"//{{iqOptionUrl}}/verification\" class=\"verification_button\" translate>kyc.verification</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"error-message\" class=\"error-block full show\"\n" +
    "         ng-if=\"cashbox.avalaibleDepLessThanMin\">\n" +
    "        <div class=\"error-block__inner\">\n" +
    "            <p class=\"verification_text\" translate>User reach deposit limit</p>\n" +
    "            <a target=\"_top\" href=\"//{{iqOptionUrl}}/verification\" class=\"verification_button\" translate>kyc.verification</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"error-message\" ng-if=\"cashbox.pageHasErrors\">\n" +
    "        <div ng-repeat=\"error in cashbox.errorsOnPay\" class=\"error-message__item\" translate>\n" +
    "            {{error}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"flex-cols\" ng-if=\"cashbox.methods.length\" ng-style=\"cashbox.style\" style=\"opacity:0\">\n" +
    "        <div class=\"flex-cols__left\">\n" +
    "\n" +
    "            <ul class=\"deposits sidebar\" id=\"deposits-list\">\n" +
    "                <li class=\"deposits__item-col\"\n" +
    "                    ng-repeat=\"dep in cashbox.actualDeposits\">\n" +
    "                    <div class=\"deposits__item\"\n" +
    "                         ng-if=\"!dep.disabled\"\n" +
    "                         ng-click=\"cashbox.setAmount(dep)\"\n" +
    "                         ng-class=\"{'selected': dep.amount == cashbox.paymentController.amount, 'deposits__item--vip': dep.badge === 'vip'}\">\n" +
    "\n" +
    "                        <a href=\"//iqoption.com/vip\" ng-click=\"cashbox.clickOnVipEvent()\" target=\"_blank\"\n" +
    "                           class=\"deposits__icon-vip\"\n" +
    "                           ng-click=\"$event.stopPropagation()\"\n" +
    "                           ng-if=\"dep.badge === 'vip'\">\n" +
    "                            <i tooltip-placement=\"bottom\"\n" +
    "                               tooltip-trigger=\"'mouseenter'\"\n" +
    "                               tooltip-class=\"tooltip--vip\"\n" +
    "                               ng-mouseenter=\"cashbox.mouseOverVipEvent()\"\n" +
    "                               uib-tooltip-template=\"'src/common/tooltip/vip.info.tpl.html'\"\n" +
    "                            >\n" +
    "                                <svg width=\"35\" height=\"27\" viewBox=\"0 0 35 27\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
    "                                    <g stroke=\"none\" fill=\"#ff7700\" fill-rule=\"evenodd\">\n" +
    "                                        <path id=\"b\" d=\"M32.136 5.553c-1.216 0-2.203.996-2.203 2.22 0 .5.152.96.418 1.304l-2.886 2.106c-2.088 1.532-5.05.766-6.19-1.57l-2.658-5.4c.72-.383 1.215-1.11 1.215-1.992C19.83.997 18.845 0 17.63 0c-1.215 0-2.202.996-2.202 2.22 0 .882.493 1.61 1.215 1.993l-2.658 5.4c-1.14 2.336-4.1 3.064-6.19 1.57L4.83 9.038c.228-.344.38-.804.38-1.264 0-1.225-.988-2.22-2.203-2.22-1.215 0-2.24.995-2.24 2.22 0 1.226.987 2.222 2.202 2.222.303 0 .57-.077.835-.153l5.05 13.136h17.508l5.05-13.1c.23.077.457.116.723.116 1.215 0 2.202-.996 2.202-2.222 0-1.225-.987-2.22-2.202-2.22zM8.856 25.966C8.856 26.54 9.31 27 9.88 27H25.3c.57 0 1.025-.46 1.025-1.034V24.51H8.855v1.456z\"/>\n" +
    "                                    </g>\n" +
    "                                </svg>\n" +
    "                            </i>\n" +
    "                        </a>\n" +
    "\n" +
    "                        <span class=\"deposits__value\">\n" +
    "                            {{dep.amount | money2:cashbox.currentCurrency}}\n" +
    "                        </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"deposits__item --not-available\"\n" +
    "                         tooltip-placement=\"bottom\"\n" +
    "                         tooltip-trigger=\"'outsideClick'\"\n" +
    "                         uib-tooltip-template=\"'src/common/tooltip/deposit.need.to.verify.tpl.html'\"\n" +
    "                         ng-if=\"dep.disabled\"\n" +
    "                         ng-class=\"{'selected': dep.amount == cashbox.paymentController.amount, 'badge-vip': dep.badge === 'vip'}\">\n" +
    "\n" +
    "                        <span class=\"deposits__value\" style=\"color: #777;\">\n" +
    "                            {{dep.amount | money2:cashbox.currentCurrency}}\n" +
    "                        </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <div class=\"flex-cols__right\">\n" +
    "            <form autocomplete=\"off\" class=\"sidebar\" name=\"paymentForm\" novalidate>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"--flex\">\n" +
    "                        <label class=\"control-label\" translate>payment method</label>\n" +
    "\n" +
    "                        <a class=\"--fz12\"\n" +
    "                           ng-if=\"cashbox.currentMethod.is_custom\"\n" +
    "                           ng-click=\"cashbox.unlinkCard()\" translate>\n" +
    "                            unlink\n" +
    "                        </a>\n" +
    "\n" +
    "                        <label class=\"checkbox__label\" for=\"link-card\" ng-if=\"cashbox.currentMethod.extra_params.title === 'VisaMasterCardCashboxForm'\">\n" +
    "                            <span class=\"checkbox\">\n" +
    "                                <input type=\"checkbox\"\n" +
    "                                       id=\"link-card\"\n" +
    "                                       ng-change=\"cashbox.setLinkCardEvent(cashbox.paymentController.link_card_agree)\" checked\n" +
    "                                       ng-model=\"cashbox.paymentController.link_card_agree\">\n" +
    "                                <span class=\"checkbox__icon\"></span>\n" +
    "                            </span>\n" +
    "                            <span class=\"checkbox__text\" translate>link card</span>\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div on-toggle=\"toggled(open)\" uib-dropdown auto-close=\"outsideClick\"\n" +
    "                         is-open=\"cashbox.methodsOpened\">\n" +
    "                        <button aria-expanded=\"false\" class=\"form-control dropdown-toggle\" data-toggle=\"dropdown\"\n" +
    "                                type=\"button\" uib-dropdown-toggle>\n" +
    "                            <i class=\"paymethod-icon\">\n" +
    "                                <img class=\"paymethod-img {{cashbox.currentMethod.cashbox_css_class}}\"\n" +
    "                                     ng-src=\"{{cashbox.currentMethod.icon_url_xs}}\">\n" +
    "                            </i>\n" +
    "                            <span>\n" +
    "                                {{cashbox.currentMethod.name}}\n" +
    "                            </span>\n" +
    "                        </button>\n" +
    "                        <ul aria-labelledby=\"simple-dropdown\" class=\"dropdown-menu\" uib-dropdown-menu>\n" +
    "                            <li ng-class=\"{'active': cashbox.currentMethod.id === method.id, 'disabled': method.disabled}\"\n" +
    "                                ng-repeat=\"method in cashbox.methods\">\n" +
    "\n" +
    "                                <a ng-if=\"!method.disabled\"\n" +
    "                                   ng-click=\"cashbox.setPaymentMethod(method, $index)\">\n" +
    "\n" +
    "                                    <i class=\"paymethod-icon\">\n" +
    "                                        <img ng-src=\"{{method.icon_url_xs}}\">\n" +
    "                                    </i>\n" +
    "                                    <span>\n" +
    "                                        {{method.name}}\n" +
    "                                    </span>\n" +
    "                                </a>\n" +
    "\n" +
    "                                <a ng-if=\"method.disabled\"\n" +
    "                                   tooltip-placement=\"{{cashbox.methodTooltipPosition()}}\"\n" +
    "                                   tooltip-trigger=\"'outsideClick'\"\n" +
    "                                   tooltip-class=\"tooltip--vip\"\n" +
    "                                   uib-tooltip-template=\"'src/common/tooltip/pm.need.to.verify.tpl.html'\">\n" +
    "                                    <i class=\"paymethod-icon\">\n" +
    "                                        <img ng-src=\"{{method.icon_url_xs}}\">\n" +
    "                                    </i>\n" +
    "                                    <span>\n" +
    "                                    {{method.name}}\n" +
    "                                </span>\n" +
    "                                </a>\n" +
    "\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"secure-check form-group\" ng-if=\"cashbox.currentMethod.payment_method_3ds_id && (cashbox.enabled3dsReccurent === 'enabled_show_3ds')\">\n" +
    "                    <label class=\"checkbox__label secure-check__label\">\n" +
    "                        <!--<span class=\"checkbox-input vertical-align-top\">-->\n" +
    "                        <!--<input type=\"checkbox\" ng-model=\"cashbox.refillWith3ds\">-->\n" +
    "                        <!--<i></i>-->\n" +
    "                        <!--</span>-->\n" +
    "                        <span class=\"checkbox\">\n" +
    "                            <input type=\"checkbox\" ng-model=\"cashbox.refillWith3ds\">\n" +
    "                            <span class=\"checkbox__icon\"></span>\n" +
    "                        </span>\n" +
    "                        <div class=\"js-accept-bonus-text\">\n" +
    "                            <div class=\"secure-check__title\" translate>\n" +
    "                                enable 3ds protection\n" +
    "                            </div>\n" +
    "                            <div class=\"secure-check__text\" translate>\n" +
    "                                in order to withdraw cryptocurrency\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <span class=\"secure-check__help\"\n" +
    "                              tooltip-placement=\"bottom\"\n" +
    "                              tooltip-trigger=\"'mouseenter'\"\n" +
    "                              uib-tooltip-template=\"'src/common/tooltip/payment.3ds.info.tpl.html'\">\n" +
    "                            <svg height=\"15px\" width=\"15px\" id=\"icon_general_support_temp\" viewBox=\"0 0 15 15\"\n" +
    "                                 fill=\"#8d8d8d\">\n" +
    "                                <path fill-rule=\"evenodd\" d=\"M7.5 0C3.36 0 0 3.36 0 7.5 0 11.64 3.36 15 7.5 15c4.14 0 7.5-3.36 7.5-7.5C15 3.36 11.64 0 7.5 0zm2.496 7.29c.497-.47.785-1.116.785-1.802 0-1.728-1.47-3.122-3.28-3.122-1.81 0-3.28 1.394-3.28 3.122v.28h2.06v-.28c0-.622.547-1.14 1.22-1.14.673 0 1.22.518 1.22 1.14 0 .305-.128.587-.353.795l-.935.9a3.065 3.065 0 0 0-.963 2.212v.635h2.06v-.28c0-.857.184-1.223.792-1.807l.676-.655-.002.003zM8.25 13.03h.28v-2.06H6.47v2.06h1.78z\"></path>\n" +
    "                            </svg>\n" +
    "                        </span>\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"alert alert-warning\"\n" +
    "                     ng-if=\"cashbox.showCryptoWithdrawalWarning ==='enabled' &&\n" +
    "                    ((!cashbox.currentMethod.is_secure && !cashbox.currentMethod.is_custom)\n" +
    "                    || (cashbox.currentMethod.is_custom && !(cashbox.currentMethod.payment_method_3ds_id && cashbox.enabled3dsReccurent === 'enabled_show_3ds')))\n" +
    "                \">\n" +
    "                    <span translate>you may have problems with crypto withdrawals</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-row\">\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"control-label\" translate>counting amount</label>\n" +
    "                        <div class=\"form-group__amount\" id=\"amount-input-group\"\n" +
    "                             ng-class=\"{'focus':cashbox.amountFocus}\">\n" +
    "\n" +
    "                            <i class=\"\">\n" +
    "                                {{cashbox.currentCurrency.symbol}}\n" +
    "                            </i>\n" +
    "\n" +
    "                            <input ng-if=\"!cashbox.currentLimits.minByKyc\"\n" +
    "                                   class=\"form-control\"\n" +
    "                                   max=\"cashbox.currentLimits.max\"\n" +
    "                                   min=\"cashbox.currentLimits.min\"\n" +
    "                                   name=\"amount\"\n" +
    "                                   ng-focus=\"cashbox.focusAmountField()\"\n" +
    "                                   ng-blur=\"cashbox.blurAmountField()\"\n" +
    "                                   numbers-only\n" +
    "                                   ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                   ng-model=\"cashbox.paymentController.amount\"\n" +
    "                                   range range-allow-less=\"true\" range-allow-more=\"true\"\n" +
    "                                   maxlength=\"13\"\n" +
    "                                   type=\"text\">\n" +
    "\n" +
    "                            <input ng-if=\"cashbox.currentLimits.minByKyc\"\n" +
    "                                   class=\"form-control\"\n" +
    "                                   max=\"cashbox.currentLimits.minByKyc\"\n" +
    "                                   min=\"cashbox.currentLimits.min\"\n" +
    "                                   name=\"amount\"\n" +
    "                                   ng-focus=\"cashbox.focusAmountField()\"\n" +
    "                                   ng-blur=\"cashbox.blurAmountField()\"\n" +
    "                                   numbers-only\n" +
    "                                   ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                   ng-model=\"cashbox.paymentController.amount\"\n" +
    "                                   range range-allow-less=\"true\" range-allow-more=\"true\"\n" +
    "                                   maxlength=\"13\"\n" +
    "                                   type=\"text\">\n" +
    "\n" +
    "                            <div ng-messages=\"paymentForm.amount.$error\" role=\"alert\">\n" +
    "                                <div ng-message=\"rangeMin\">\n" +
    "                                    <div class=\"--error tooltip bottom fade in\" ng-class=\"{ in: isOpen }\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            {{ ('amount is less than min' | translate).replace('{min}',\n" +
    "                                            cashbox.currentLimits.min | money2:cashbox.currentCurrency) }}\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div ng-message=\"rangeMax\" ng-if=\"!cashbox.amountWithKycLimit\">\n" +
    "                                    <div class=\"--error tooltip bottom fade in\" ng-class=\"{ in: isOpen }\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            {{ ('amount is more than max' | translate).replace('{max}',\n" +
    "                                            cashbox.currentLimits.max | money2:cashbox.currentCurrency) }}\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div ng-message=\"rangeMax\" ng-if=\"cashbox.amountWithKycLimit\">\n" +
    "                                    <div class=\"--error tooltip bottom fade in\" ng-class=\"{ in: isOpen }\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            {{ ('amount is more than kyc limit max' | translate).replace('{max}',\n" +
    "                                            cashbox.currentLimits.max | money2:cashbox.currentCurrency) }}\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\" ng-if=\"cashbox.currencies.length != 1\">\n" +
    "                        <label for=\"\" class=\"control-label\" translate>currency</label>\n" +
    "\n" +
    "                        <div on-toggle=\"toggled(open)\" uib-dropdown class=\"dropdown--short\">\n" +
    "\n" +
    "                            <button aria-expanded=\"false\" class=\"form-control dropdown-toggle\"\n" +
    "                                    ng-class=\"{'disabled' : cashbox.currencies.length === 1}\"\n" +
    "                                    data-toggle=\"dropdown\" type=\"button\" uib-dropdown-toggle>\n" +
    "                                {{cashbox.currentCurrency.name}}\n" +
    "                            </button>\n" +
    "\n" +
    "                            <ul aria-labelledby=\"simple-dropdown\" class=\"dropdown-menu\" uib-dropdown-menu>\n" +
    "                                <li ng-class=\"{'active': cur.name === cashbox.currentCurrency.name}\"\n" +
    "                                    ng-repeat=\"cur in cashbox.currencies\">\n" +
    "                                    <a ng-click=\"cashbox.paymentController.currency = cur.name; cashbox.changeCurrency(); cashbox.setCurrencyEvent();\">\n" +
    "                                        {{cur.name}}\n" +
    "                                    </a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"submit-box\">\n" +
    "                    <button class=\"btn btn-success btn--big\"\n" +
    "                            ng-class=\"{'disabled' : !paymentForm.$valid || (cashbox.needToAgreeWithTerms  && !cashbox.termsAccepted)}\"\n" +
    "                            ng-click=\"cashbox.goToPayment()\"\n" +
    "                            ng-disabled=\"cashbox.payIsProcessing ||\n" +
    "                            !paymentForm.$valid ||\n" +
    "                            (cashbox.needToAgreeWithTerms && !cashbox.termsAccepted)\">\n" +
    "                        <span translate>go to payment</span>\n" +
    "\n" +
    "                        <i class=\"submit-loader\" ng-if=\"cashbox.payIsProcessing\">\n" +
    "                            <svg class=\"submit-loader__circular\" viewbox=\"25 25 50 50\">\n" +
    "                                <circle class=\"submit-loader__path\" cx=\"50\" cy=\"50\" fill=\"none\" r=\"20\" stroke-miterlimit=\"10\"\n" +
    "                                        stroke-width=\"4\">\n" +
    "                                </circle>\n" +
    "                            </svg>\n" +
    "                        </i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group--margin-top\" ng-if=\"cashbox.needToAgreeWithTerms\">\n" +
    "                    <label class=\"checkbox__label --fz12\" for=\"accept-bonus-checkbox\">\n" +
    "                        <span class=\"checkbox\">\n" +
    "                            <input type=\"checkbox\"\n" +
    "                                   id=\"accept-bonus-checkbox\"\n" +
    "                                   ng-model=\"cashbox.termsAccepted\">\n" +
    "                            <span class=\"checkbox__icon\"></span>\n" +
    "                        </span>\n" +
    "                        <span class=\"checkbox__text js-accept-bonus-text\" translate>i_hereby_accept</span>\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group--margin-top text-center --fz12\"\n" +
    "                     ng-if=\"cashbox.currentMethod.extra_params.title === 'VisaMasterCardCashboxForm'\">\n" +
    "                    <a href=\"//iqoption.com/terms-and-conditions/payment-policy\"\n" +
    "                       class=\"policy-link\"\n" +
    "                       target=\"_blank\"\n" +
    "                       id=\"payment-policy-link\"\n" +
    "                       ng-click=\"cashbox.paymentPolicyEvent()\"\n" +
    "                       translate>\n" +
    "                        payment policy\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/crypto-cashbox/cashbox.tpl.html",
    "<div class=\"billing-block__content billing-block__content--crypto\">\n" +
    "\n" +
    "    <div id=\"error-message\" class=\"error-block show\"\n" +
    "         ng-if=\"!cashbox.methods.length\">\n" +
    "        <div class=\"error-block__inner\">\n" +
    "            <img src=\"/images/cashbox/icon-restricted.svg\" alt=\"restricted\" width=\"72\" height=\"72\">\n" +
    "            <h1 class=\"error-block__header\" translate>no payment methods</h1>\n" +
    "            <p class=\"error-block__text\" translate>cashbox error text</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"sidebar \">\n" +
    "\n" +
    "        <div ng-if=\"cashbox.methods.length\"\n" +
    "             ng-style=\"cashbox.style\"\n" +
    "             class=\"crypto-deposit\"\n" +
    "             style=\"opacity:0\">\n" +
    "            <div class=\"crypto-deposit__wallets\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" translate>crypto_deposit.cryptocurrency</label>\n" +
    "\n" +
    "                    <div uib-dropdown\n" +
    "                         on-toggle=\"toggled(open)\"\n" +
    "                         auto-close=\"outsideClick\"\n" +
    "                         is-open=\"cashbox.methodsOpened\">\n" +
    "\n" +
    "                        <!--ng-class=\"{'disabled' : cashbox.methods.length === 1}\"-->\n" +
    "                        <button uib-dropdown-toggle\n" +
    "                                aria-expanded=\"false\"\n" +
    "                                class=\"form-control dropdown-toggle\"\n" +
    "                                data-toggle=\"dropdown\"\n" +
    "                                type=\"button\"\n" +
    "                                >\n" +
    "                            <i class=\"paymethod-icon\">\n" +
    "                                <img class=\"paymethod-img {{cashbox.currentMethod.cashbox_css_class}}\"\n" +
    "                                     ng-src=\"{{cashbox.currentMethod.icon_url_xs}}\">\n" +
    "                            </i>\n" +
    "                            <span>{{cashbox.currentMethod.name}}</span>\n" +
    "                        </button>\n" +
    "\n" +
    "                        <ul uib-dropdown-menu\n" +
    "                            aria-labelledby=\"simple-dropdown\"\n" +
    "                            class=\"dropdown-menu\">\n" +
    "\n" +
    "                            <li ng-class=\"{'active': cashbox.currentMethod.id === method.id}\"\n" +
    "                                ng-repeat=\"method in cashbox.methods\">\n" +
    "\n" +
    "                                <a ng-click=\"cashbox.setPaymentMethod(method, $index)\">\n" +
    "                                    <i class=\"paymethod-icon\">\n" +
    "                                        <img class=\"paymethod-img {{method.cashbox_css_class}}\"\n" +
    "                                             ng-src=\"{{method.icon_url_xs}}\">\n" +
    "                                    </i>\n" +
    "                                    <span>{{method.name}}</span>\n" +
    "                                </a>\n" +
    "\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"crypto-deposit__arrow hidden-xs\">\n" +
    "                    <svg width=\"17px\" height=\"18px\" viewBox=\"0 0 17 18\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
    "                        <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(-748.000000, -388.000000)\">\n" +
    "                            <g transform=\"translate(208.000000, 291.000000)\" fill=\"#000000\">\n" +
    "                                <g transform=\"translate(114.000000, 40.000000)\">\n" +
    "                                    <g class=\"path-with-fill\" fill=\"#000000\" transform=\"translate(435.000000, 66.000000) scale(-1, 1) translate(-435.000000, -66.000000) translate(426.000000, 56.000000)\">\n" +
    "                                        <rect x=\"3.375\" y=\"8.02083333\" width=\"14.625\" height=\"3.4375\" rx=\"1.02272727\"></rect>\n" +
    "                                        <g transform=\"translate(0.000000, 0.045826)\">\n" +
    "                                            <rect transform=\"translate(6.187500, 12.844513) rotate(-315.000000) translate(-6.187500, -12.844513) \" x=\"-9.219292e-13\" y=\"11.1257635\" width=\"12.375\" height=\"3.4375\" rx=\"1.02272727\"></rect>\n" +
    "                                            <rect transform=\"translate(6.187500, 6.370545) scale(1, -1) rotate(-315.000000) translate(-6.187500, -6.370545) \" x=\"-9.21041021e-13\" y=\"4.65179467\" width=\"12.375\" height=\"3.4375\" rx=\"1.02272727\"></rect>\n" +
    "                                        </g>\n" +
    "                                    </g>\n" +
    "                                </g>\n" +
    "                            </g>\n" +
    "                        </g>\n" +
    "                    </svg>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group hidden-xs\">\n" +
    "                    <label class=\"control-label\" translate>iq4.deposit.crypto_depositto</label>\n" +
    "                    <span aria-expanded=\"false\"\n" +
    "                            class=\"form-control dropdown-toggle --without-arrow\"\n" +
    "                            type=\"button\"\n" +
    "                            style=\"pointer-events: none;\">\n" +
    "                        <i class=\"paymethod-icon\">\n" +
    "                            <img class=\"paymethod-img\"\n" +
    "                                 src=\"/images/cashbox-crypto/billing-iq-acc.svg\">\n" +
    "                        </i>\n" +
    "                        <span> {{ ('iq4.deposit.crypto_depositto-account' | translate).replace('%ticker',cashbox.currentMethod.currency) }}</span>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"crypto-address\">\n" +
    "            <div class=\"crypto-address__qrcode\">\n" +
    "                <qrcode data=\"{{cashbox.currentMethod.address}}\" size=\"174\"></qrcode>\n" +
    "            </div>\n" +
    "            <div class=\"crypto-address__details\">\n" +
    "                <div>\n" +
    "                    <div class=\"crypto-address__title\">\n" +
    "                        <img class=\"crypto-address__title-icon\" src=\"/images/cashbox-crypto/billing_warning.svg\">\n" +
    "                        <span>{{('crypto_deposit.billing warning title ' + cashbox.currentMethod.currency) | translate}}</span>\n" +
    "                    </div>\n" +
    "                    <div class=\"crypto-address__text\">\n" +
    "                        {{('crypto_deposit.billing warning para ' + cashbox.currentMethod.currency) | translate}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"crypto-address__address\" style=\"margin-top: 4px;\">\n" +
    "                    <input id=\"address\"\n" +
    "                            class=\"form-control --with-icon-right\"\n" +
    "                            ng-model=\"cashbox.currentMethod.address\"\n" +
    "                            ngclipboard\n" +
    "                            data-clipboard-text=\"{{cashbox.currentMethod.address}}\"\n" +
    "                            ngclipboard-success=\"cashbox.onCopySuccess(e);\"\n" +
    "                            name=\"address\"\n" +
    "                            select-on-click\n" +
    "                            readonly>\n" +
    "                    <i ngclipboard\n" +
    "                       data-clipboard-text=\"{{cashbox.currentMethod.address}}\"\n" +
    "                       ngclipboard-success=\"cashbox.onCopySuccess(e);\"\n" +
    "                       class=\"form-control-icon crypto-address__copy\">\n" +
    "                       <svg width=\"17px\" height=\"18px\" viewBox=\"0 0 17 18\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
    "                           <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
    "                               <g transform=\"translate(-1051.000000, -608.000000)\" fill-rule=\"nonzero\" fill=\"#000000\">\n" +
    "                                   <g transform=\"translate(208.000000, 291.000000)\">\n" +
    "                                       <g transform=\"translate(114.000000, 40.000000)\">\n" +
    "                                           <g transform=\"translate(310.000000, 264.000000)\">\n" +
    "                                               <g class=\"path-with-fill\" transform=\"translate(419.000000, 13.000000)\" fill=\"#000\">\n" +
    "                                                   <path d=\"M13,4 L13,2 C13,0.8954305 12.1045695,-2.02906125e-16 11,0 L2,0 C0.8954305,2.02906125e-16 -1.3527075e-16,0.8954305 0,2 L0,12 C1.3527075e-16,13.1045695 0.8954305,14 2,14 L4,14 L4,12 L2,12 L2,2 L11,2 L11,4 L13,4 Z\"></path>\n" +
    "                                                   <path d=\"M6,6 L6,16 L15,16 L15,6 L6,6 Z M6,4 L15,4 C16.1045695,4 17,4.8954305 17,6 L17,16 C17,17.1045695 16.1045695,18 15,18 L6,18 C4.8954305,18 4,17.1045695 4,16 L4,6 C4,4.8954305 4.8954305,4 6,4 Z\"></path>\n" +
    "                                               </g>\n" +
    "                                           </g>\n" +
    "                                       </g>\n" +
    "                                   </g>\n" +
    "                               </g>\n" +
    "                           </g>\n" +
    "                       </svg>\n" +
    "                       <span uib-tooltip-template=\"'src/common/tooltip/address.copied.tpl.html'\"\n" +
    "                             tooltip-trigger=\"none\"\n" +
    "                             tooltip-is-open=\"cashbox.addressCopied\"\n" +
    "                             tooltip-class=\"tooltip--vip\"\n" +
    "                             tooltip-placement=\"top\"\n" +
    "                             ></span>\n" +
    "                    </i>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/crypto-cashbox/transactions.tpl.html",
    "<div class=\"transactions-section\" ng-if=\"transactions.cryptoTransactions.length\">\n" +
    "    <h1 translate>crypto_deposit.transactions</h1>\n" +
    "    <div class=\"transactions-table\">\n" +
    "        <div class=\"transactions-table-header flex-row-justify\" style=\"margin-bottom: 13px;\">\n" +
    "            <div class=\"cryptocurrency-col\" translate>crypto_deposit.cryptocurrency</div>\n" +
    "            <div class=\"pending-amount-col\" translate>crypto_deposit.pending amount</div>\n" +
    "            <div class=\"block-approvals-col\">{{'crypto_deposit.block approvals' | translate}} - {{'crypto_deposit.progress' | translate}}</div>\n" +
    "        </div>\n" +
    "        <div class=\"transactions-table-container\">\n" +
    "            <div class=\"transactions-table-body flex-row-justify\"\n" +
    "                 ng-repeat=\"transaction in transactions.cryptoTransactions\">\n" +
    "                <div class=\"blockchain-name\">\n" +
    "                    <span>\n" +
    "                        <img src=\"/images/cashbox/xs/{{transaction.css_class}}.png\" width=\"22\" alt=\"\">\n" +
    "                        <span class=\"blockchain-name-text\">{{transaction.blockchain}}</span>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "                <div class=\"pending-amount\">\n" +
    "                    <span>{{transaction.amount}}\n" +
    "                        <span class=\"small-text\">{{transaction.iso_code}}</span>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "                <div class=\"transaction-confirmations\">\n" +
    "                    <span>\n" +
    "                        {{transaction.actual_confirmations}}/{{transaction.needful_confirmations}}\n" +
    "                        <span class=\"small-text\">{{transaction.progress}}%</span>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/crypto-visa-form/footer.tpl.html",
    "<div ng-if=\"experiment === 'wizard'\" class=\"footer-card-details montserrat-font\">\n" +
    "    <div class=\"card-details-title\" translate>billing.enter-card-details</div>\n" +
    "    <div class=\"card-details-text\" translate>billing.cryptos-added-to-crypto-balance</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"badges-list-row montserrat-font\"\n" +
    "     ng-class=\"{'with-orange-buttons': footer.color === 'orange',\n" +
    "                'green-landing': footer.color === 'green'}\">\n" +
    "    <ul class=\"badges-list\">\n" +
    "        <li class=\"badges-list-item badge-eu\">\n" +
    "            <img src=\"/images/crypto/footer/{{footer.iconsColor}}/safe-store.svg\">\n" +
    "            <span translate>iq4.deposit.safely_stored</span>\n" +
    "        </li>\n" +
    "\n" +
    "        <li class=\"badges-list-item  badge-ssl\">\n" +
    "            <img src=\"/images/crypto/footer/{{footer.iconsColor}}/bank-level.svg\">\n" +
    "            <span translate>iq4.deposit.ssl</span>\n" +
    "        </li>\n" +
    "\n" +
    "        <li class=\"badges-list-item  badge-securecode\">\n" +
    "            <img src=\"/images/crypto/footer/{{footer.iconsColor}}/pci-dss.svg\">\n" +
    "        </li>\n" +
    "\n" +
    "        <li class=\"badges-list-item  badge-visaverified\">\n" +
    "            <img src=\"/images/crypto/footer/{{footer.iconsColor}}/mastercard.svg\">\n" +
    "        </li>\n" +
    "\n" +
    "        <li class=\"badges-list-item  badge-dss\">\n" +
    "            <img src=\"/images/crypto/footer/{{footer.iconsColor}}/visacard.svg\">\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/crypto-visa-form/header.tpl.html",
    "<div ng-if=\"experiment === 'wizard'\" class=\"header-card-details\">\n" +
    "    <div class=\"card-details-title\" translate>billing.enter-card-details</div>\n" +
    "    <div class=\"card-details-text\" translate>billing.cryptos-added-to-crypto-balance</div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/crypto-visa-form/visa.form.3ds.tpl.html",
    "<div class=\"advanced-inner montserrat-font\"\n" +
    "     ng-class=\"{'with-orange-buttons': detail.color === 'orange'}\">\n" +
    "\n" +
    "    <div class=\"crypto-header\">\n" +
    "        <h1 translate>advanced form card title</h1>\n" +
    "        <h2 translate>crypto_purchase.advanced form card subtitle</h2>\n" +
    "    </div>\n" +
    "    <div class=\"crypto-purchase-header\">\n" +
    "        <div class=\"purchase-column\">\n" +
    "            <div class=\"payment-amount\">\n" +
    "                <span class=\"text\"><span translate>deposit amount</span>:</span>\n" +
    "                <span class=\"amount\">{{detail.payParams.amount | money2:detail.currency}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"crypto-amount\">\n" +
    "                <span class=\"text\"><span translate>total with bonus</span>:</span>\n" +
    "                <span class=\"amount\">{{detail.crypto_amount}} {{detail.payParams.ticker}}</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"back-column\">\n" +
    "            <a href=\"\" ng-click=\"detail.eventBack()\" translate>change</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <form class=\"advanced-form visamastercard-from blue-visamastercard-form\"\n" +
    "          ng-submit=\"detail.pay()\"\n" +
    "          name=\"aform\"\n" +
    "          autocomplete=\"off\"\n" +
    "          novalidate=\"true\">\n" +
    "\n" +
    "        <!-- ¯\\_(ツ)_/¯ try prevent default browser form auto fill -->\n" +
    "        <input type=\"text\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "        <input type=\"password\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "        <input type=\"text\" name=\"login\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "        <input type=\"password\" name=\"password\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "        <input type=\"email\" name=\"email\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "        <input type=\"password\" name=\"repeatpassword\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "        <!-- ¯\\_(ツ)_/¯ -->\n" +
    "\n" +
    "        <div class=\"advanced-errors\" ng-if=\"detail.formHasErrors\"\n" +
    "             style=\"margin: 0 auto 18px auto;text-align: left;border-radius: 3px;font-size: 14px;color: #d74a37;\">\n" +
    "            <p ng-repeat=\"error in detail.cardProcessingErrors\" class=\"advanced-errors-item\" style=\"margin: 0;\"\n" +
    "               translate>{{error}}</p>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"card-wrapper\">\n" +
    "            <div class=\"card-side card-front\">\n" +
    "                <div class=\"card-front-icons\">\n" +
    "                    <img src=\"/images/advanced/icon-card-visa.svg\" alt=\"card visa\" width=\"34\" height=\"22\"\n" +
    "                         class=\"icon-card-visa\">\n" +
    "                    <img src=\"/images/advanced/icon-card-mastercard.svg\" alt=\"card mastercard\" width=\"34\" height=\"22\"\n" +
    "                         class=\"icon-card-mastercard\">\n" +
    "                    <img src=\"/images/advanced/icon-card-maestro.svg\" alt=\"card maestro\" width=\"34\" height=\"22\"\n" +
    "                         class=\"icon-card-maestro\">\n" +
    "                </div>\n" +
    "                <div class=\"advanced-form-row\">\n" +
    "                    <div class=\"advanced-form-input-wrapper\">\n" +
    "                        <input type=\"text\" class=\"advanced-form-input\"\n" +
    "                               autofocus\n" +
    "                               id=\"card-number\"\n" +
    "                               name=\"card_number\"\n" +
    "                               ng-model=\"card_recurrent.card_number\"\n" +
    "                               ng-model-options=\"{allowInvalid:true}\"\n" +
    "                               disabled>\n" +
    "                        <i></i>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"advanced-form-row advanced-form-group card-expiration\">\n" +
    "                    <label for=\"card-exp-month\" class=\"advanced-form-label\" translate>card expiration</label>\n" +
    "                    <div class=\"advanced-form-input-wrapper\">\n" +
    "                        <input type=\"text\"\n" +
    "                               id=\"card-exp-month\"\n" +
    "                               name=\"card_exp_month\"\n" +
    "                               ng-model=\"card_recurrent.card_exp_month\"\n" +
    "                               class=\"advanced-form-input\"\n" +
    "                               tabindex=\"2\"\n" +
    "                               disabled>\n" +
    "                    </div>\n" +
    "                    <span class=\"card-expiration-separator\">/</span>\n" +
    "                    <div class=\"advanced-form-input-wrapper\">\n" +
    "                        <input type=\"text\"\n" +
    "                               id=\"card-exp-year\"\n" +
    "                               name=\"card_exp_year\"\n" +
    "                               ng-model=\"card_recurrent.card_exp_year\"\n" +
    "                               class=\"advanced-form-input\"\n" +
    "                               ng-focus=\"detail.fieldFocus('card_exp_year')\"\n" +
    "                               disabled>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"advanced-form-row\">\n" +
    "                    <div class=\"advanced-form-input-wrapper\">\n" +
    "                        <input type=\"text\"\n" +
    "                               id=\"card-holder\"\n" +
    "                               name=\"card_holder\"\n" +
    "                               ng-model=\"card_recurrent.card_holder\"\n" +
    "                               class=\"advanced-form-input\"\n" +
    "                               disabled>\n" +
    "                        <i></i>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"card-side card-back\">\n" +
    "                <div class=\"advanced-form-input-wrapper\">\n" +
    "                    <input type=\"password\" id=\"card-cvv\" class=\"advanced-form-input\"\n" +
    "                           name=\"card_cvv\"\n" +
    "                           cvc\n" +
    "                           only-integers\n" +
    "                           minlength=\"3\"\n" +
    "                           maxlength=\"4\"\n" +
    "                           ng-model=\"card.card_cvv\"\n" +
    "                           placeholder=\"{{ 'card cvc' | translate }}\"\n" +
    "                           ng-model-options=\"{allowInvalid:true}\"\n" +
    "                           ng-focus=\"detail.fieldFocus('card_cvv')\"\n" +
    "                           ng-blur=\"detail.fieldBlur('card_cvv','deposit-by-card_cvv')\"\n" +
    "                           ng-class=\"{'valid': aform.card_cvv.$valid && aform.card_cvv.$dirty,\n" +
    "                                          'invalid': aform.card_cvv.$invalid && aform.$submitted && detail.showErrors.card_cvv}\"\n" +
    "                           ng-change=\"detail.removeError('card_cvv')\"\n" +
    "                           tabindex=\"5\"\n" +
    "                           required>\n" +
    "                    <div ng-messages=\"aform.card_cvv.$error\" role=\"alert\"\n" +
    "                         style=\"\"\n" +
    "                         class=\"cvv_tooltip error tooltip bottom fade in\"\n" +
    "                         ng-if=\"aform.$submitted && detail.showErrors.card_cvv && detail.card_cvv_focused\">\n" +
    "                        <div ng-message=\"required\">\n" +
    "                            <div style=\"\">\n" +
    "                                <div class=\"tooltip-arrow\"></div>\n" +
    "                                <div class=\"tooltip-inner\">\n" +
    "                                    <span translate>required field</span>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div ng-message=\"minlength\">\n" +
    "                            <div style=\"\">\n" +
    "                                <div class=\"tooltip-arrow\"></div>\n" +
    "                                <div class=\"tooltip-inner\">\n" +
    "                                    <span translate>card cvc wrong</span>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <label for=\"card-cvv\" class=\"card-cvv-descr\" translate>card cvv descr</label>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row visamastercard-footer\">\n" +
    "            <button type=\"submit\" class=\"advanced-form-submit btn\" tabindex=\"6\" ng-disabled=\"detail.payIsProcessing\"\n" +
    "                    style=\"\">\n" +
    "                <img src=\"/images/advanced/icon-lock.svg\" alt=\"icon lock\" class=\"icon-lock\" width=\"16\" height=\"18\">\n" +
    "                <span translate>pay</span> <span>{{detail.payParams.amount | money2:detail.currency}}</span>\n" +
    "                <i class=\"loader\" ng-if=\"detail.payIsProcessing\">\n" +
    "                    <svg class=\"circular\" viewBox=\"25 25 50 50\">\n" +
    "                        <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"4\"\n" +
    "                                stroke-miterlimit=\"10\"></circle>\n" +
    "                    </svg>\n" +
    "                </i>\n" +
    "            </button>\n" +
    "            <p translate>you agree to the terms</p>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/crypto-visa-form/visa.form.tpl.html",
    " <div class=\"advanced-inner montserrat-font\"\n" +
    "      ng-class=\"{'with-orange-buttons': detail.color === 'orange', 'green-landing': detail.color === 'green'}\">\n" +
    "        <div class=\"crypto-header\" ng-if=\"detail.color !== 'green'\">\n" +
    "            <h1 translate>advanced form card title</h1>\n" +
    "            <h2 translate>crypto_purchase.advanced form card subtitle</h2>\n" +
    "        </div>\n" +
    "     <div class=\"crypto-header\" ng-if=\"detail.color === 'green'\">\n" +
    "         <h1 translate>crypto_purchase.enter card details and finish</h1>\n" +
    "     </div>\n" +
    "        <div class=\"crypto-purchase-header\" ng-if=\"detail.color !== 'green'\">\n" +
    "            <div class=\"purchase-column\">\n" +
    "                <div class=\"payment-amount\">\n" +
    "                    <span class=\"text\"><span translate>deposit amount</span>:</span>\n" +
    "                    <span class=\"amount\">{{detail.payParams.amount | money2:detail.currency}}</span>\n" +
    "                </div>\n" +
    "                <div class=\"crypto-amount\">\n" +
    "                    <span class=\"text\"><span translate>total with bonus</span>:</span>\n" +
    "                    <span class=\"amount\">{{detail.crypto_amount}} {{detail.payParams.ticker}}</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"back-column\">\n" +
    "                <a href=\"\" ng-click=\"detail.eventBack()\" translate>change</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <form class=\"advanced-form visamastercard-from blue-visamastercard-form\"\n" +
    "              ng-class=\"{'with-orange-buttons': detail.color === 'orange'}\"\n" +
    "              ng-submit=\"detail.pay()\"\n" +
    "              name=\"aform\"\n" +
    "              autocomplete=\"off\"\n" +
    "              novalidate=\"true\">\n" +
    "\n" +
    "            <!-- ¯\\_(ツ)_/¯ try prevent default browser form auto fill -->\n" +
    "            <input type=\"text\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "            <input type=\"password\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "            <input type=\"text\" name=\"login\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "            <input type=\"password\" name=\"password\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "            <input type=\"email\" name=\"email\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "            <input type=\"password\" name=\"repeatpassword\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "            <!-- ¯\\_(ツ)_/¯ -->\n" +
    "\n" +
    "            <div class=\"advanced-errors\" ng-if=\"detail.formHasErrors\" style=\"margin: 0 auto 18px auto;text-align: left;border-radius: 3px;font-size: 14px;color: #d74a37;\">\n" +
    "                <p ng-repeat=\"error in detail.cardProcessingErrors\" class=\"advanced-errors-item\" style=\"margin: 0;\" translate>{{error}}</p>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"card-wrapper blue-card\">\n" +
    "                <div class=\"card-side card-front\">\n" +
    "                    <div class=\"card-front-icons\">\n" +
    "                        <img src=\"/images/advanced/icon-card-visa.svg\" alt=\"card visa\" width=\"34\" height=\"22\" class=\"icon-card-visa\">\n" +
    "                        <img src=\"/images/advanced/icon-card-mastercard.svg\" alt=\"card mastercard\" width=\"34\" height=\"22\" class=\"icon-card-mastercard\">\n" +
    "                        <img src=\"/images/advanced/icon-card-maestro.svg\" alt=\"card maestro\" width=\"34\" height=\"22\" class=\"icon-card-maestro\">\n" +
    "                    </div>\n" +
    "                    <div class=\"advanced-form-row\">\n" +
    "                        <div class=\"advanced-form-input-wrapper\">\n" +
    "                            <input type=\"text\"\n" +
    "                                   class=\"advanced-form-input\"\n" +
    "                                   autofocus\n" +
    "                                   id=\"card-number\"\n" +
    "                                   placeholder=\"{{ 'card number' | translate }}\"\n" +
    "                                   name=\"card_number\"\n" +
    "                                   format-card=\"\"\n" +
    "                                   maxlength=\"22\"\n" +
    "                                   tabindex=\"1\"\n" +
    "                                   luhn-check\n" +
    "                                   ng-focus=\"detail.fieldFocus('card_number')\"\n" +
    "                                   ng-blur=\"detail.fieldBlur('card_number')\"\n" +
    "                                   ng-model=\"card.card_number\"\n" +
    "                                   ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                   ng-class=\"{'valid': aform.card_number.$valid && aform.card_number.$dirty,\n" +
    "                                              'invalid': aform.card_number.$invalid && aform.$submitted && detail.showErrors.card_number}\"\n" +
    "                                   ng-change=\"detail.removeError('card_number')\"\n" +
    "                                   required>\n" +
    "                            <div ng-messages=\"aform.card_number.$error\" role=\"alert\"\n" +
    "                                 style=\"left: 100%; top: 4px; width: 185px;\"\n" +
    "                                 class=\"error tooltip right fade in\"\n" +
    "                                 ng-if=\"aform.$submitted && detail.showErrors.card_number && detail.card_number_focus\">\n" +
    "                                <div ng-message=\"required\">\n" +
    "                                    <div style=\"top: 99%; left: 0;\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>required field</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div ng-message=\"luhnCheck\">\n" +
    "                                    <div style=\"top: 99%; left: 0;\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>card number wrong</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <i></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"advanced-form-row advanced-form-group card-expiration\">\n" +
    "                        <label for=\"card-exp-month\" class=\"advanced-form-label\" translate>card expiration</label>\n" +
    "                        <div class=\"advanced-form-input-wrapper\">\n" +
    "                            <input type=\"text\"\n" +
    "                                   id=\"card-exp-month\"\n" +
    "                                   name=\"card_exp_month\"\n" +
    "                                   ng-model=\"card.card_exp_month\"\n" +
    "                                   class=\"advanced-form-input\"\n" +
    "                                   tabindex=\"2\"\n" +
    "                                   range range-allow-less=\"true\" range-allow-more=\"true\"\n" +
    "                                   min=\"detail.rangeLimits.monthMin\"\n" +
    "                                   max=\"detail.rangeLimits.monthMax\"\n" +
    "                                   ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                   ng-focus=\"detail.fieldFocus('card_exp_month')\"\n" +
    "                                   ng-blur=\"detail.fieldBlur('card_exp_month')\"\n" +
    "                                   placeholder=\"{{ 'card expiry month' | translate }}\"\n" +
    "                                   ng-class=\"{'valid': aform.card_exp_month.$valid && aform.card_exp_month.$dirty,\n" +
    "                                              'invalid': aform.card_exp_month.$invalid && aform.$submitted && detail.showErrors.card_exp_month}\"\n" +
    "                                   minlength=\"1\"\n" +
    "                                   ng-change=\"detail.removeError('card_exp_month')\"\n" +
    "                                   only-integers\n" +
    "                                   maxlength=\"2\"\n" +
    "                                   required>\n" +
    "                            <div ng-messages=\"aform.card_exp_month.$error\" role=\"alert\"\n" +
    "                                 style=\"min-width: 130px;right: -30px;\"\n" +
    "                                 class=\"month-tooltip error tooltip bottom fade in\"\n" +
    "                                 ng-if=\"aform.$submitted && detail.showErrors.card_exp_month && detail.card_exp_month_focused\">\n" +
    "                                <div ng-message=\"required\">\n" +
    "                                    <div style=\"top: 99%; left: 0;\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>card expiry month wrong</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div ng-message=\"rangeMax\">\n" +
    "                                    <div style=\"top: 99%; left: 0;\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>card expiry month wrong</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div ng-message=\"rangeMin\">\n" +
    "                                    <div style=\"top: 99%; left: 0;\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>card expiry month wrong</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <span class=\"card-expiration-separator\">/</span>\n" +
    "                        <div class=\"advanced-form-input-wrapper\">\n" +
    "                            <input type=\"text\"\n" +
    "                                   id=\"card-exp-year\"\n" +
    "                                   name=\"card_exp_year\"\n" +
    "                                   ng-model=\"card.card_exp_year\"\n" +
    "                                   class=\"advanced-form-input\"\n" +
    "                                   range range-allow-less=\"true\" range-allow-more=\"true\"\n" +
    "                                   min=\"detail.rangeLimits.yearsMin\"\n" +
    "                                   max=\"detail.rangeLimits.yearsMax\"\n" +
    "                                   ng-focus=\"detail.fieldFocus('card_exp_year')\"\n" +
    "                                   ng-blur=\"detail.fieldBlur('card_exp_year')\"\n" +
    "                                   ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                   placeholder=\"{{ 'card expiry year' | translate }}\"\n" +
    "                                   only-integers\n" +
    "                                   ng-class=\"{'valid': aform.card_exp_year.$valid && aform.card_exp_year.$dirty,\n" +
    "                                              'invalid': aform.card_exp_year.$invalid && aform.$submitted && detail.showErrors.card_exp_year}\"\n" +
    "                                   ng-change=\"detail.removeError('card_exp_year')\"\n" +
    "                                   minlength=\"2\"\n" +
    "                                   tabindex=\"3\"\n" +
    "                                   maxlength=\"2\"\n" +
    "                                   required>\n" +
    "                        </div>\n" +
    "                        <div ng-messages=\"aform.card_exp_year.$error\" role=\"alert\"\n" +
    "                             style=\"left: 71%;width: 120px;\"\n" +
    "                             class=\"error tooltip bottom fade in\"\n" +
    "                             ng-if=\"aform.$submitted && detail.showErrors.card_exp_year && detail.card_exp_year_focused\">\n" +
    "                            <div ng-message=\"required\">\n" +
    "                                <div style=\"top: 99%; left: 0;\">\n" +
    "                                    <div class=\"tooltip-arrow\"></div>\n" +
    "                                    <div class=\"tooltip-inner\">\n" +
    "                                        <span translate>card expiry year empty</span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div ng-message=\"rangeMax\">\n" +
    "                                <div style=\"top: 99%; left: 0;\">\n" +
    "                                    <div class=\"tooltip-arrow\"></div>\n" +
    "                                    <div class=\"tooltip-inner\">\n" +
    "                                        <span translate>card expiry year wrong</span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div ng-message=\"rangeMin\">\n" +
    "                                <div style=\"top: 99%; left: 0;\">\n" +
    "                                    <div class=\"tooltip-arrow\"></div>\n" +
    "                                    <div class=\"tooltip-inner\">\n" +
    "                                        <span translate>card expiry year wrong</span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div role=\"alert\"\n" +
    "                             style=\"left: 100%;width: 200px;top: 0;\"\n" +
    "                             class=\"error tooltip right fade in\"\n" +
    "                             ng-if=\"detail.errorDate\">\n" +
    "                            <div style=\"top: 99%; left: 0;\">\n" +
    "                                <div class=\"tooltip-arrow\"></div>\n" +
    "                                <div class=\"tooltip-inner\">\n" +
    "                                    <span>{{detail.errorDate}}</span>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"advanced-form-row\">\n" +
    "                        <div class=\"advanced-form-input-wrapper\">\n" +
    "                            <input type=\"text\"\n" +
    "                                   id=\"card-holder\"\n" +
    "                                   name=\"card_holder\"\n" +
    "                                   ng-model=\"card.card_holder\"\n" +
    "                                   class=\"advanced-form-input\"\n" +
    "                                   placeholder=\"{{ 'cardholder name' | translate }}\"\n" +
    "                                   minlength=\"2\"\n" +
    "                                   ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                   card-holder\n" +
    "                                   tabindex=\"4\"\n" +
    "                                   ng-focus=\"detail.fieldFocus('card_holder')\"\n" +
    "                                   ng-blur=\"detail.fieldBlur('card_holder')\"\n" +
    "                                   ng-class=\"{'valid': aform.card_holder.$valid && aform.card_holder.$dirty,\n" +
    "                                              'invalid': aform.card_holder.$invalid && aform.$submitted && detail.showErrors.card_holder}\"\n" +
    "                                   ng-change=\"detail.removeError('card_holder')\"\n" +
    "                                   required>\n" +
    "                            <div ng-messages=\"aform.card_holder.$error\" role=\"alert\"\n" +
    "                                 style=\"\"\n" +
    "                                 class=\"card-holder-tooltip error tooltip bottom fade in\"\n" +
    "                                 ng-if=\"aform.$submitted && detail.showErrors.card_holder && detail.card_holder_focused\">\n" +
    "                                <div ng-message=\"required\">\n" +
    "                                    <div style=\"top: 99%; left: 0;\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>required field</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div ng-message=\"minlength\">\n" +
    "                                    <div style=\"top: 99%; left: 0;\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>cardholder name wrong</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <i></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"card-side card-back\">\n" +
    "                    <div class=\"advanced-form-input-wrapper\">\n" +
    "                        <input type=\"password\" id=\"card-cvv\" class=\"advanced-form-input\"\n" +
    "                               name=\"card_cvv\"\n" +
    "                               cvc\n" +
    "                               only-integers\n" +
    "                               minlength=\"3\"\n" +
    "                               maxlength=\"4\"\n" +
    "                               ng-model=\"card.card_cvv\"\n" +
    "                               placeholder=\"{{ 'card cvc' | translate }}\"\n" +
    "                               ng-focus=\"detail.fieldFocus('card_cvv')\"\n" +
    "                               ng-blur=\"detail.fieldBlur('card_cvv')\"\n" +
    "                               ng-model-options=\"{allowInvalid:true}\"\n" +
    "                               ng-class=\"{'valid': aform.card_cvv.$valid && aform.card_cvv.$dirty,\n" +
    "                                          'invalid': aform.card_cvv.$invalid && aform.$submitted && detail.showErrors.card_cvv}\"\n" +
    "                               ng-change=\"detail.removeError('card_cvv')\"\n" +
    "                               tabindex=\"5\"\n" +
    "                               required>\n" +
    "                        <div ng-messages=\"aform.card_cvv.$error\" role=\"alert\"\n" +
    "                             style=\"\"\n" +
    "                             class=\"cvv_tooltip error tooltip bottom fade in\"\n" +
    "                             ng-if=\"aform.$submitted && detail.showErrors.card_cvv && detail.card_cvv_focused\">\n" +
    "                            <div ng-message=\"required\">\n" +
    "                                <div style=\"\">\n" +
    "                                    <div class=\"tooltip-arrow\"></div>\n" +
    "                                    <div class=\"tooltip-inner\">\n" +
    "                                        <span translate>required field</span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div ng-message=\"minlength\">\n" +
    "                                <div style=\"\">\n" +
    "                                    <div class=\"tooltip-arrow\"></div>\n" +
    "                                    <div class=\"tooltip-inner\">\n" +
    "                                        <span translate>card cvc wrong</span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <label for=\"card-cvv\" class=\"card-cvv-descr\" translate>card cvv descr</label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row visamastercard-footer\"\n" +
    "                 ng-if=\"detail.color !== 'green'\">\n" +
    "\n" +
    "                <button type=\"submit\"\n" +
    "                        class=\"advanced-form-submit btn\"\n" +
    "                        tabindex=\"6\"\n" +
    "                        ng-disabled=\"detail.payIsProcessing\"\n" +
    "                        ng-if=\"detail.color !== 'green'\"\n" +
    "                        style=\"\">\n" +
    "                    <img src=\"/images/advanced/icon-lock.svg\" alt=\"icon lock\" class=\"icon-lock\" width=\"16\" height=\"18\">\n" +
    "                    <span translate>pay</span> <span>{{detail.payParams.amount | money2:detail.currency}}</span>\n" +
    "                    <i class=\"loader\" ng-if=\"detail.payIsProcessing\">\n" +
    "                        <svg class=\"circular\" viewBox=\"25 25 50 50\">\n" +
    "                            <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"4\" stroke-miterlimit=\"10\"></circle>\n" +
    "                        </svg>\n" +
    "                    </i>\n" +
    "                </button>\n" +
    "                <p translate>you agree to the terms</p>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row visamastercard-footer\" ng-if=\"detail.color === 'green'\">\n" +
    "\n" +
    "                <button type=\"submit\"\n" +
    "                        class=\"advanced-form-submit btn\"\n" +
    "                        tabindex=\"6\"\n" +
    "                        ng-disabled=\"detail.payIsProcessing\"\n" +
    "                        style=\"\">\n" +
    "                    <span translate>crypto_purchase.get bitcoin</span>\n" +
    "                    <i class=\"loader\" ng-if=\"detail.payIsProcessing\">\n" +
    "                        <svg class=\"circular\" viewBox=\"25 25 50 50\">\n" +
    "                            <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"4\" stroke-miterlimit=\"10\"></circle>\n" +
    "                        </svg>\n" +
    "                    </i>\n" +
    "                    <img ng-if=\"!detail.payIsProcessing\" class=\"green-arrow-right\" src=\"/images/crypto/arrow-right.svg\">\n" +
    "                </button>\n" +
    "                <p><img src=\"/images/crypto/3D secure.svg\" height=\"24\"></p>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/visa-form/visa.form.tpl.html",
    "<div class=\"advanced\">\n" +
    "    <div class=\"sidebar\">\n" +
    "        <div class=\"advanced__inner\">\n" +
    "\n" +
    "            <div class=\"error-message\" ng-if=\"detail.formHasErrors\">\n" +
    "                <div ng-repeat=\"error in detail.cardProcessingErrors\" class=\"error-message__item\" translate>\n" +
    "                    {{error}}\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"advanced__header\">\n" +
    "                <a class=\"advanced__back-link\" ui-sref=\"root.cashbox\" ng-click=\"detail.backToCashboxEvent()\" ng-if=\"!detail.payIsProcessing\">\n" +
    "                    <svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
    "                        <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
    "                            <g class=\"path-with-fill\" transform=\"translate(-453.000000, -313.000000)\" fill=\"#000000\">\n" +
    "                                <g transform=\"translate(452.000000, 312.000000)\">\n" +
    "                                    <rect x=\"3.91304348\" y=\"9.33333333\" width=\"16.9565217\" height=\"4\" rx=\"1.25\"></rect>\n" +
    "                                    <g transform=\"translate(0.000000, 0.053324)\">\n" +
    "                                        <rect transform=\"translate(7.173913, 14.946343) rotate(-315.000000) translate(-7.173913, -14.946343) \" x=\"-4.39069071e-13\" y=\"12.946343\" width=\"14.3478261\" height=\"4\" rx=\"1.25\"></rect>\n" +
    "                                        <rect transform=\"translate(7.173913, 7.412997) scale(1, -1) rotate(-315.000000) translate(-7.173913, -7.412997) \" x=\"-4.37910577e-13\" y=\"5.41299744\" width=\"14.3478261\" height=\"4\" rx=\"1.25\"></rect>\n" +
    "                                    </g>\n" +
    "                                </g>\n" +
    "                            </g>\n" +
    "                        </g>\n" +
    "                    </svg>\n" +
    "                </a>\n" +
    "                <div class=\"advanced__header-content\">\n" +
    "                    <h3 translate>advanced form card title</h3>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <form class=\"advanced__form\"\n" +
    "                  ng-submit=\"detail.pay()\"\n" +
    "                  name=\"aform\"\n" +
    "                  autocomplete=\"off\"\n" +
    "                  novalidate=\"true\">\n" +
    "\n" +
    "                <!-- ¯\\_(ツ)_/¯ try prevent default browser form auto fill -->\n" +
    "                <input type=\"text\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"password\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"text\" name=\"login\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"password\" name=\"password\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"email\" name=\"email\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"password\" name=\"repeatpassword\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <!-- ¯\\_(ツ)_/¯ -->\n" +
    "\n" +
    "                <div class=\"pay-card pay-card--{{detail.cardType}}\">\n" +
    "                    <div class=\"pay-card__side pay-card__side--front\">\n" +
    "                        <div class=\"pay-card__icons-parent\">\n" +
    "                            <div class=\"pay-card__icons\">\n" +
    "                                <div class=\"pay-card__icon pay-card__icon-unionpay\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-unionpay.svg\" alt=\"\" width=\"62\" height=\"40\">\n" +
    "                                </div>\n" +
    "                                <div class=\"pay-card__icon pay-card__icon-amex\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-amex.svg\" alt=\"\" width=\"120\" height=\"30\">\n" +
    "                                </div>\n" +
    "                                <div class=\"pay-card__icon pay-card__icon-maestro\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-maestro.svg\" alt=\"\" width=\"40\" height=\"32\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-maestro-default.svg\" alt=\"\" width=\"40\" height=\"32\">\n" +
    "                                </div>\n" +
    "                                <div class=\"pay-card__icon pay-card__icon-mastercard\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-mastercard.svg\" alt=\"\" width=\"40\" height=\"32\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-mastercard-default.svg\" alt=\"\" width=\"40\" height=\"32\">\n" +
    "                                </div>\n" +
    "                                <div class=\"pay-card__icon pay-card__icon-visa\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-visa.svg\" alt=\"\" width=\"74\" height=\"24\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-visa-default.svg\" alt=\"\" width=\"74\" height=\"24\">\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"form__input-wrapper\">\n" +
    "                                <input type=\"text\" class=\"form-control\"\n" +
    "                                       autofocus\n" +
    "                                       id=\"card-number\"\n" +
    "                                       placeholder=\"{{ 'card number' | translate }}\"\n" +
    "                                       name=\"card_number\"\n" +
    "                                       format-card=\"\"\n" +
    "                                       maxlength=\"24\"\n" +
    "                                       tabindex=\"1\"\n" +
    "                                       luhn-check\n" +
    "                                       ng-model=\"card.card_number\"\n" +
    "                                       ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                       ng-focus=\"detail.fieldFocus('card_number')\"\n" +
    "                                       ng-blur=\"detail.fieldBlur('card_number', 'deposit-by-card_card-number')\"\n" +
    "                                       ng-class=\"{'valid': aform.card_number.$valid && aform.card_number.$dirty,\n" +
    "                                                  'invalid': aform.card_number.$invalid && aform.$submitted && detail.showErrors.card_number}\"\n" +
    "                                       ng-change=\"detail.removeError('card_number'); detail.setCardType(card.card_number)\"\n" +
    "                                       required>\n" +
    "                                <div ng-messages=\"aform.card_number.$error\" role=\"alert\"\n" +
    "                                     class=\"--error tooltip right fade in\"\n" +
    "                                     ng-if=\"aform.$submitted && detail.showErrors.card_number && detail.card_number_focus\">\n" +
    "                                    <div ng-message=\"required\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>required field</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div ng-message=\"luhnCheck\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>card number wrong</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group form-group--expiration\">\n" +
    "\n" +
    "                            <label for=\"card-exp-month\" class=\"control-label\" translate>card expiration</label>\n" +
    "\n" +
    "                            <div class=\"pay-card__expiration\" date-focus>\n" +
    "\n" +
    "                                <div class=\"form__input-wrapper\">\n" +
    "                                    <input type=\"text\"\n" +
    "                                           id=\"card-exp-month\"\n" +
    "                                           name=\"card_exp_month\"\n" +
    "                                           ng-model=\"card.card_exp_month\"\n" +
    "                                           class=\"form-control\"\n" +
    "                                           tabindex=\"2\"\n" +
    "                                           range range-allow-less=\"true\" range-allow-more=\"true\"\n" +
    "                                           min=\"detail.rangeLimits.monthMin\"\n" +
    "                                           max=\"detail.rangeLimits.monthMax\"\n" +
    "                                           ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                           ng-focus=\"detail.fieldFocus('card_exp_month')\"\n" +
    "                                           ng-blur=\"detail.fieldBlur('card_exp_month','deposit-by-card_expiry-month')\"\n" +
    "                                           placeholder=\"{{ 'card expiry month' | translate }}\"\n" +
    "                                           ng-class=\"{'valid': aform.card_exp_month.$valid && aform.card_exp_month.$dirty,\n" +
    "                                                      'invalid': aform.card_exp_month.$invalid && aform.$submitted && detail.showErrors.card_exp_month}\"\n" +
    "                                           minlength=\"1\"\n" +
    "                                           ng-change=\"detail.removeError('card_exp_month')\"\n" +
    "                                           only-integers\n" +
    "                                           maxlength=\"2\"\n" +
    "                                           required>\n" +
    "                                    <div ng-messages=\"aform.card_exp_month.$error\" role=\"alert\"\n" +
    "                                         class=\"--error tooltip bottom fade in\"\n" +
    "                                         ng-if=\"aform.$submitted && detail.showErrors.card_exp_month && detail.card_exp_month_focused\">\n" +
    "                                        <div ng-message=\"required\">\n" +
    "                                            <div class=\"tooltip-arrow\"></div>\n" +
    "                                            <div class=\"tooltip-inner\">\n" +
    "                                                <span translate>card expiry month wrong</span>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div ng-message=\"rangeMax\">\n" +
    "                                            <div class=\"tooltip-arrow\"></div>\n" +
    "                                            <div class=\"tooltip-inner\">\n" +
    "                                                <span translate>card expiry month wrong</span>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div ng-message=\"rangeMin\">\n" +
    "                                            <div class=\"tooltip-arrow\"></div>\n" +
    "                                            <div class=\"tooltip-inner\">\n" +
    "                                                <span translate>card expiry month wrong</span>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <span class=\"pay-card__expiration-separator\">/</span>\n" +
    "\n" +
    "                                <div class=\"form__input-wrapper\">\n" +
    "                                    <input type=\"text\"\n" +
    "                                           id=\"card-exp-year\"\n" +
    "                                           name=\"card_exp_year\"\n" +
    "                                           ng-model=\"card.card_exp_year\"\n" +
    "                                           class=\"form-control\"\n" +
    "                                           range range-allow-less=\"true\" range-allow-more=\"true\"\n" +
    "                                           min=\"detail.rangeLimits.yearsMin\"\n" +
    "                                           max=\"detail.rangeLimits.yearsMax\"\n" +
    "                                           ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                           ng-focus=\"detail.fieldFocus('card_exp_year')\"\n" +
    "                                           ng-blur=\"detail.fieldBlur('card_exp_year','deposit-by-card_expiry-year')\"\n" +
    "                                           placeholder=\"{{ 'card expiry year' | translate }}\"\n" +
    "                                           only-integers\n" +
    "                                           ng-class=\"{'valid': aform.card_exp_year.$valid && aform.card_exp_year.$dirty,\n" +
    "                                                      'invalid': aform.card_exp_year.$invalid && aform.$submitted && detail.showErrors.card_exp_year}\"\n" +
    "                                           ng-change=\"detail.removeError('card_exp_year')\"\n" +
    "                                           minlength=\"2\"\n" +
    "                                           tabindex=\"3\"\n" +
    "                                           maxlength=\"2\"\n" +
    "                                           required>\n" +
    "\n" +
    "                                    <div ng-messages=\"aform.card_exp_year.$error\" role=\"alert\"\n" +
    "                                         class=\"--error tooltip bottom fade in\"\n" +
    "                                         ng-if=\"aform.$submitted && detail.showErrors.card_exp_year && detail.card_exp_year_focused\">\n" +
    "                                        <div ng-message=\"required\">\n" +
    "                                            <div class=\"tooltip-arrow\"></div>\n" +
    "                                            <div class=\"tooltip-inner\">\n" +
    "                                                <span translate>card expiry year empty</span>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div ng-message=\"rangeMax\">\n" +
    "                                            <div class=\"tooltip-arrow\"></div>\n" +
    "                                            <div class=\"tooltip-inner\">\n" +
    "                                                <span translate>card expiry year wrong</span>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div ng-message=\"rangeMin\">\n" +
    "                                            <div class=\"tooltip-arrow\"></div>\n" +
    "                                            <div class=\"tooltip-inner\">\n" +
    "                                                <span translate>card expiry year wrong</span>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div role=\"alert\"\n" +
    "                                 class=\"--error tooltip right fade in\"\n" +
    "                                 ng-if=\"detail.errorDate\">\n" +
    "                                <div class=\"tooltip-arrow\"></div>\n" +
    "                                <div class=\"tooltip-inner\">\n" +
    "                                    <span>{{detail.errorDate}}</span>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"form__input-wrapper\">\n" +
    "                                <input type=\"text\"\n" +
    "                                       id=\"card-holder\"\n" +
    "                                       name=\"card_holder\"\n" +
    "                                       ng-model=\"card.card_holder\"\n" +
    "                                       class=\"form-control\"\n" +
    "                                       placeholder=\"{{ 'cardholder name' | translate }}\"\n" +
    "                                       minlength=\"2\"\n" +
    "                                       ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                       card-holder\n" +
    "                                       tabindex=\"4\"\n" +
    "                                       ng-focus=\"detail.fieldFocus('card_holder')\"\n" +
    "                                       ng-blur=\"detail.fieldBlur('card_holder','deposit-by-card_cardholder')\"\n" +
    "                                       ng-class=\"{'valid': aform.card_holder.$valid && aform.card_holder.$dirty,\n" +
    "                                                  'invalid': aform.card_holder.$invalid && aform.$submitted && detail.showErrors.card_holder}\"\n" +
    "                                       ng-change=\"detail.removeError('card_holder')\"\n" +
    "                                       required>\n" +
    "                                <div ng-messages=\"aform.card_holder.$error\" role=\"alert\"\n" +
    "                                     class=\"--error tooltip bottom fade in\"\n" +
    "                                     ng-if=\"aform.$submitted && detail.showErrors.card_holder && detail.card_holder_focused\">\n" +
    "                                    <div ng-message=\"required\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>required field</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div ng-message=\"minlength\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>cardholder name wrong</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"pay-card__side pay-card__side--back\">\n" +
    "                        <div class=\"form-group form-group--cvv\">\n" +
    "                            <div class=\"form__input-wrapper\">\n" +
    "                                <input type=\"password\" id=\"card-cvv\" class=\"form-control\"\n" +
    "                                       name=\"card_cvv\"\n" +
    "                                       cvc\n" +
    "                                       only-integers\n" +
    "                                       minlength=\"3\"\n" +
    "                                       maxlength=\"4\"\n" +
    "                                       ng-model=\"card.card_cvv\"\n" +
    "                                       placeholder=\"{{ 'card cvv' | translate }}\"\n" +
    "                                       ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                       ng-focus=\"detail.fieldFocus('card_cvv')\"\n" +
    "                                       ng-blur=\"detail.fieldBlur('card_cvv','deposit-by-card_cvv')\"\n" +
    "                                       ng-class=\"{'valid': aform.card_cvv.$valid && aform.card_cvv.$dirty,\n" +
    "                                                  'invalid': aform.card_cvv.$invalid && aform.$submitted && detail.showErrors.card_cvv}\"\n" +
    "                                       ng-change=\"detail.removeError('card_cvv')\"\n" +
    "                                       tabindex=\"5\"\n" +
    "                                       required>\n" +
    "\n" +
    "                                <div ng-messages=\"aform.card_cvv.$error\" role=\"alert\"\n" +
    "                                     class=\"tooltip bottom fade in --error\"\n" +
    "                                     ng-if=\"aform.$submitted && detail.showErrors.card_cvv && detail.card_cvv_focused\">\n" +
    "                                    <div ng-message=\"required\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>required field</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div ng-message=\"minlength\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>card cvc wrong</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <label for=\"card-cvv\" class=\"control-label\" translate>card cvv descr</label>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"advanced__footer\">\n" +
    "                    <button type=\"submit\" class=\"btn btn-success btn--with-icon\" tabindex=\"6\"  ng-disabled=\"detail.payIsProcessing\">\n" +
    "                        <img src=\"/images/advanced/icon-lock.svg\" alt=\"icon lock\" class=\"btn__icon-lock\" width=\"16\" height=\"18\">\n" +
    "                        <span translate>pay</span>&nbsp;<span>{{detail.payParams.amount | money2:detail.currency}}</span>\n" +
    "                        <i class=\"submit-loader\" ng-if=\"detail.payIsProcessing\">\n" +
    "                            <svg class=\"submit-loader__circular\" viewBox=\"25 25 50 50\">\n" +
    "                                <circle class=\"submit-loader__path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"4\" stroke-miterlimit=\"10\"></circle>\n" +
    "                            </svg>\n" +
    "                        </i>\n" +
    "                    </button>\n" +
    "                    <span class=\"advanced__footer-agree\" translate>you agree to the terms</span>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/visa-form-3ds/visa.form.3ds.tpl.html",
    "<div class=\"advanced\">\n" +
    "    <div class=\"sidebar\">\n" +
    "        <div class=\"advanced__inner\">\n" +
    "\n" +
    "            <div class=\"error-message\" ng-if=\"detail.formHasErrors\">\n" +
    "                <div ng-repeat=\"error in detail.cardProcessingErrors\" class=\"error-message__item\" translate>\n" +
    "                    {{error}}\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"advanced__header\">\n" +
    "                <a class=\"advanced__back-link\" ui-sref=\"root.cashbox\" ng-click=\"detail.backToCashboxEvent()\" ng-if=\"!detail.payIsProcessing\">\n" +
    "                    <svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
    "                        <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
    "                            <g class=\"path-with-fill\" transform=\"translate(-453.000000, -313.000000)\" fill=\"#000000\">\n" +
    "                                <g transform=\"translate(452.000000, 312.000000)\">\n" +
    "                                    <rect x=\"3.91304348\" y=\"9.33333333\" width=\"16.9565217\" height=\"4\" rx=\"1.25\"></rect>\n" +
    "                                    <g transform=\"translate(0.000000, 0.053324)\">\n" +
    "                                        <rect transform=\"translate(7.173913, 14.946343) rotate(-315.000000) translate(-7.173913, -14.946343) \" x=\"-4.39069071e-13\" y=\"12.946343\" width=\"14.3478261\" height=\"4\" rx=\"1.25\"></rect>\n" +
    "                                        <rect transform=\"translate(7.173913, 7.412997) scale(1, -1) rotate(-315.000000) translate(-7.173913, -7.412997) \" x=\"-4.37910577e-13\" y=\"5.41299744\" width=\"14.3478261\" height=\"4\" rx=\"1.25\"></rect>\n" +
    "                                    </g>\n" +
    "                                </g>\n" +
    "                            </g>\n" +
    "                        </g>\n" +
    "                    </svg>\n" +
    "                </a>\n" +
    "                <div class=\"advanced__header-content\">\n" +
    "                    <h3 translate>advanced form card title</h3>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <form class=\"advanced__form\"\n" +
    "                  ng-submit=\"detail.pay()\"\n" +
    "                  name=\"aform\"\n" +
    "                  autocomplete=\"off\"\n" +
    "                  novalidate=\"true\">\n" +
    "\n" +
    "                <!-- ¯\\_(ツ)_/¯ try prevent default browser form auto fill -->\n" +
    "                <input type=\"text\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"password\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"text\" name=\"login\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"password\" name=\"password\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"email\" name=\"email\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <input type=\"password\" name=\"repeatpassword\" tabindex=\"-1\" class=\"fake-autofill-input\">\n" +
    "                <!-- ¯\\_(ツ)_/¯ -->\n" +
    "\n" +
    "                <div class=\"pay-card pay-card--{{detail.cardType}}\">\n" +
    "                    <div class=\"pay-card__side pay-card__side--front\">\n" +
    "                        <div class=\"pay-card__icons-parent\">\n" +
    "                            <div class=\"pay-card__icons\">\n" +
    "                                <div class=\"pay-card__icon pay-card__icon-unionpay\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-unionpay.svg\" alt=\"\" width=\"62\" height=\"40\">\n" +
    "                                </div>\n" +
    "                                <div class=\"pay-card__icon pay-card__icon-amex\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-amex.svg\" alt=\"\" width=\"120\" height=\"30\">\n" +
    "                                </div>\n" +
    "                                <div class=\"pay-card__icon pay-card__icon-maestro\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-maestro.svg\" alt=\"\" width=\"40\" height=\"32\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-maestro-default.svg\" alt=\"\" width=\"40\" height=\"32\">\n" +
    "                                </div>\n" +
    "                                <div class=\"pay-card__icon pay-card__icon-mastercard\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-mastercard.svg\" alt=\"\" width=\"40\" height=\"32\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-mastercard-default.svg\" alt=\"\" width=\"40\" height=\"32\">\n" +
    "                                </div>\n" +
    "                                <div class=\"pay-card__icon pay-card__icon-visa\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-visa.svg\" alt=\"\" width=\"74\" height=\"24\">\n" +
    "                                    <img src=\"/images/advanced/icon-card-visa-default.svg\" alt=\"\" width=\"74\" height=\"24\">\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"form__input-wrapper\">\n" +
    "                                <input type=\"text\" class=\"form-control\"\n" +
    "                                       autofocus\n" +
    "                                       id=\"card-number\"\n" +
    "                                       name=\"card_number\"\n" +
    "                                       ng-model=\"card_recurrent.card_number\"\n" +
    "                                       ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                       disabled>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group form-group--expiration\">\n" +
    "\n" +
    "                            <label for=\"card-exp-month\" class=\"control-label\" translate>card expiration</label>\n" +
    "\n" +
    "                            <div class=\"pay-card__expiration\">\n" +
    "\n" +
    "                                <div class=\"form__input-wrapper\">\n" +
    "                                    <input type=\"text\"\n" +
    "                                           id=\"card-exp-month\"\n" +
    "                                           name=\"card_exp_month\"\n" +
    "                                           ng-model=\"card_recurrent.card_exp_month\"\n" +
    "                                           class=\"form-control\"\n" +
    "                                           tabindex=\"2\"\n" +
    "                                           disabled>\n" +
    "                                </div>\n" +
    "                                <span class=\"pay-card__expiration-separator\">/</span>\n" +
    "\n" +
    "                                <div class=\"form__input-wrapper\">\n" +
    "                                    <input type=\"text\"\n" +
    "                                           id=\"card-exp-year\"\n" +
    "                                           name=\"card_exp_year\"\n" +
    "                                           ng-model=\"card_recurrent.card_exp_year\"\n" +
    "                                           class=\"form-control\"\n" +
    "                                           ng-focus=\"detail.fieldFocus('card_exp_year')\"\n" +
    "                                           disabled>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"form__input-wrapper\">\n" +
    "                                <input type=\"text\"\n" +
    "                                       id=\"card-holder\"\n" +
    "                                       name=\"card_holder\"\n" +
    "                                       ng-model=\"card_recurrent.card_holder\"\n" +
    "                                       class=\"form-control\"\n" +
    "                                       disabled>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"pay-card__side pay-card__side--back\">\n" +
    "                        <div class=\"form-group form-group--cvv\">\n" +
    "                            <div class=\"form__input-wrapper\">\n" +
    "                                <input type=\"password\" id=\"card-cvv\" class=\"form-control\"\n" +
    "                                       name=\"card_cvv\"\n" +
    "                                       cvc\n" +
    "                                       only-integers\n" +
    "                                       minlength=\"3\"\n" +
    "                                       maxlength=\"4\"\n" +
    "                                       ng-model=\"card.card_cvv\"\n" +
    "                                       placeholder=\"{{ 'card cvc' | translate }}\"\n" +
    "                                       ng-model-options=\"{allowInvalid:true}\"\n" +
    "                                       ng-focus=\"detail.fieldFocus('card_cvv')\"\n" +
    "                                       ng-blur=\"detail.fieldBlur('card_cvv','deposit-by-card_cvv')\"\n" +
    "                                       ng-class=\"{'valid': aform.card_cvv.$valid && aform.card_cvv.$dirty,\n" +
    "                                                  'invalid': aform.card_cvv.$invalid && aform.$submitted && detail.showErrors.card_cvv}\"\n" +
    "                                       ng-change=\"detail.removeError('card_cvv')\"\n" +
    "                                       tabindex=\"5\"\n" +
    "                                       required>\n" +
    "\n" +
    "                                <div ng-messages=\"aform.card_cvv.$error\" role=\"alert\"\n" +
    "                                 class=\"tooltip bottom fade in --error\"\n" +
    "                                 ng-if=\"aform.$submitted && detail.showErrors.card_cvv && detail.card_cvv_focused\">\n" +
    "                                    <div ng-message=\"required\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>required field</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div ng-message=\"minlength\">\n" +
    "                                        <div class=\"tooltip-arrow\"></div>\n" +
    "                                        <div class=\"tooltip-inner\">\n" +
    "                                            <span translate>card cvc wrong</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <label for=\"card-cvv\" class=\"control-label\" translate>card cvv descr</label>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"advanced__footer\">\n" +
    "                    <button type=\"submit\" class=\"btn btn-success btn--with-icon\" tabindex=\"6\"  ng-disabled=\"detail.payIsProcessing\">\n" +
    "                        <img src=\"/images/advanced/icon-lock.svg\" alt=\"icon lock\" class=\"btn__icon-lock\" width=\"16\" height=\"18\">\n" +
    "                        <span translate>pay</span>&nbsp;<span>{{detail.payParams.amount | money2:detail.currency}}</span>\n" +
    "                        <i class=\"submit-loader\" ng-if=\"detail.payIsProcessing\">\n" +
    "                            <svg class=\"submit-loader__circular\" viewBox=\"25 25 50 50\">\n" +
    "                                <circle class=\"submit-loader__path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"4\" stroke-miterlimit=\"10\"></circle>\n" +
    "                            </svg>\n" +
    "                        </i>\n" +
    "                    </button>\n" +
    "                    <span translate>you agree to the terms</span>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/modal/bonus.terms.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <div class=\"modal-logo\"></div>\n" +
    "    <h3 class=\"modal-title\" ng-bind-html=\"header\"></h3>\n" +
    "    <button class=\"close\" type=\"button\" ng-click=\"$close()\">×</button>\n" +
    "</div>\n" +
    "<div class=\"circular-loader\" ng-if=\"!modalText\">\n" +
    "    <div class=\"circular-loader-center\">\n" +
    "        <svg viewBox=\"25 25 50 50\">\n" +
    "            <circle cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"4\" stroke-miterlimit=\"10\"></circle>\n" +
    "        </svg>\n" +
    "        <p>{{ 'front.withdrawal loading' | translate }}</p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"modal-body\" ng-if=\"modalText\" ng-bind-html=\"modalText\"></div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-default pull-right\" ng-click=\"$close()\">\n" +
    "        {{ 'front.close' | translate }}\n" +
    "    </button>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/modal/modal.unlink.tpl.html",
    " <div class=\"modal-content\" ng-if=\"state == 'default'\">\n" +
    "        <div class=\"modal-header\">\n" +
    "            <button aria-hidden=\"true\" class=\"close\" type=\"button\" ng-click=\"$close()\">\n" +
    "                ×\n" +
    "            </button>\n" +
    "            <div class=\"modal-logo\"></div>\n" +
    "            <h4 class=\"modal-title\" translate>unlink card title</h4>\n" +
    "        </div>\n" +
    "        <div class=\"modal-body\">\n" +
    "            <p><span translate>unlink card text1</span>{{card_name}}<span translate>unlink card text2</span></p>\n" +
    "        </div>\n" +
    "        <div class=\"modal-footer\">\n" +
    "            <button class=\"btn btn-lg btn-default\" ng-click=\"$close()\" translate>\n" +
    "                cancel\n" +
    "            </button>\n" +
    "            <button class=\"btn btn-lg btn-danger\" style=\"width:56%\" ng-click=\"unlinkCard()\" translate>\n" +
    "                unlink card\n" +
    "            </button>\n" +
    "        </div>\n" +
    " </div>\n" +
    " <div class=\"modal-content\" ng-if=\"state == 'unlinkIsOk'\">\n" +
    "     <div class=\"modal-header\">\n" +
    "         <h4 class=\"modal-title\" translate>card is unlinked</h4>\n" +
    "         <button type=\"button\" class=\"close\" data-dismiss=\"modal\"  ng-click=\"$close()\" aria-hidden=\"true\">×</button>\n" +
    "     </div>\n" +
    "     <div class=\"modal-body\">\n" +
    "         <div style=\"text-align:center\">\n" +
    "             <img src=\"/images/cashbox/icon-success-circle.svg\">\n" +
    "             <h4 style=\"margin-top:12xp;font-size:24px;color:#32ab51;font-weight:400;line-height:1.33;letter-spacing:-0.2px\" translate>card is unlinked header</h4>\n" +
    "             <p style=\"margin-top:7xp\" translate>card is unlinked text</p>\n" +
    "         </div>\n" +
    "     </div>\n" +
    " </div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/tooltip/address.copied.tpl.html",
    "<span translate>crypto_deposit.copied</span>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/tooltip/bonus.info.tpl.html",
    "<span translate>bonus descr short</span> <br>\n" +
    "<a ng-click=\"cashbox.bonusModal()\" class=\"bonus-terms-link js-bonus-terms-link\" target=\"_blank\" translate>bonus terms</a>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/tooltip/deposit.need.to.verify.tpl.html",
    "<span translate>payment methods need verification</span> <br>\n" +
    "<a href=\"//{{iqOptionUrl}}/verification\" class=\"bonus-terms-link js-bonus-terms-link\" target=\"_parent\" translate>kyc verification link</a>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/tooltip/payment.3ds.info.tpl.html",
    "<div class=\"tooltip__content\">\n" +
    "    <div class=\"tooltip__descr\" translate>enable_3d_secure_description</div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/tooltip/pm.need.to.verify.tpl.html",
    "<div class=\"tooltip__content\">\n" +
    "    <div class=\"tooltip__descr\">\n" +
    "        <span translate>payment methods need verification</span> <br>\n" +
    "        <a href=\"//{{iqOptionUrl}}/verification\" class=\"bonus-terms-link js-bonus-terms-link\" target=\"_parent\" translate>kyc verification link</a>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/tooltip/vip.info.tpl.html",
    "<div class=\"tooltip__content\">\n" +
    "    <div class=\"tooltip__title\" translate>tooltip vip header</div>\n" +
    "    <div class=\"tooltip__descr\" translate>tooltip vip descr</div>\n" +
    "</div>\n" +
    "");
}]);
})();
