(function () {
    app.factory('ecommpayService', [
        '$rootScope',
        function ($rootScope) {

            var _CHINA_BANKS = {
                'en_US': [
                    {code: 'ECITIC', name: 'China Citic Bank'},
                    {code: 'CIB', name: 'Industrial Bank Co. Ltd.'},
                    {code: 'GDB', name: 'Guangdong Development Bank'},
                    {code: 'CMB', name: 'China Merchants Bank'},
                    {code: 'PSCB', name: 'China Postal Savings Bank'},
                    {code: 'BOC', name: 'Bank of China'},
                    {code: 'ABC', name: 'Agricultural Bank of China'},
                    {code: 'CEB', name: 'China Everbright Bank'},
                    {code: 'CCB', name: 'China Construction Bank'},
                    {code: 'BCOM', name: 'Bank of Communications'},
                    {code: 'ICBC', name: 'Industrial and Commercial Bank of China'},
                    {code: 'SPDB', name: 'Shanghai Pudong Development Bank'},
                    {code: 'SPABANK', name: 'Ping An Bank'},
                    {code: 'HXB', name: 'HSBC Bank'}
                ],
                'zh_CN': [
                    {code: 'ECITIC', name: '中信银行'},
                    {code: 'CIB', name: '兴业银行'},
                    {code: 'GDB', name: '广东发展银行'},
                    {code: 'CMB', name: '招商银行'},
                    {code: 'PSCB', name: '中国邮政储蓄银行'},
                    {code: 'BOC', name: '中国银行'},
                    {code: 'ABC', name: '中国农业银行'},
                    {code: 'CEB', name: '中国光大银行'},
                    {code: 'CCB', name: '中国建设银行'},
                    {code: 'BCOM', name: '交通银行'},
                    {code: 'ICBC', name: '中国工商银行'},
                    {code: 'SPDB', name: '上海浦东发展银行'},
                    {code: 'SPABANK', name: '平安银行'},
                    {code: 'HXB', name: '汇丰中国'}
                ]
            };

            return {
                getBanks: function () {
                    return _CHINA_BANKS[getLocale()];
                }
            };

            function getLocale() {
                return ($.cookie('lang') || $rootScope.appConfig.locale) === 'zh_CN' ? 'zh_CN' : 'en_US';
            }
        }
    ]);
})();