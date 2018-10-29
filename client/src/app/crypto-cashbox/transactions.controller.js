(function () {
    'use strict';

    angular.module('app')
        .controller('TransactionsCryptoCtrl', TransactionsCryptoCtrl)

    function TransactionsCryptoCtrl(getCryptoTransactions) {
        var transactions = this;

        getCryptoTransactions.getTransactions().then(function(res){
            var _transactions = res.data;
            _.each(_transactions, function(transaction){
                transaction.progress = parseInt((transaction.actual_confirmations / transaction.needful_confirmations) * 100);
            });

            transactions.cryptoTransactions = _transactions;
        });
    }

})();
