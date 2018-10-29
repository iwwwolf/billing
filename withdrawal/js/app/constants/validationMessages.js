(function () {
    'use strict';

    app.value('WITHDRAWAL_VALIDATION_MESSAGES', {
        default: {
            required: 'mainpage.index.validation-required',
            pattern: 'mainpage.index.validation-invalid'
        },
        amount: {
            required: 'front.you didnt specified the amount',
            pattern: 'front.incorrect amount',
            rangeMin: 'front.amount less than'
        },
        card: {
            required: 'front.you didnt specified the amount',
            pattern: 'front.incorrect amount',
            rangeMin: 'front.amount less than'
        },
        swiftCode: {
            required: 'front.you didnt specified the swift code',
            pattern: 'front.incorrect swift code'
        },
        bankSwiftCode: {
            required: 'front.you didnt specified the swift code',
            pattern: 'front.incorrect swift code'
        },
        cardOwner: {
            required: 'front.you didnt specified the card owner',
            pattern: 'front.incorrect card owner'
        },
        clientName: {
            required: 'front.you didnt specified the client name',
            pattern: 'front.incorrect client name'
        },
        addInfo: {
            required: 'front.you didnt specified the add info',
            pattern: 'front.incorrect add info'
        },
        IBAN: {
            required: 'front.you didnt specified the iban',
            pattern: 'front.incorrect iban'
        },
        bankAccountNumber: {
            required: 'front.you didnt specified the iban',
            pattern: 'front.incorrect iban'
        },
        INN: {
            required: 'front.you didnt specified the inn',
            pattern: 'front.incorrect inn'
        },
        bankINN: {
            required: 'front.you didnt specified the inn',
            pattern: 'front.incorrect inn'
        },
        address: {
            required: 'front.you didnt specified the address',
            pattern: 'front.incorrect address'
        },
        clientAddress: {
            required: 'front.you didnt specified the address',
            pattern: 'front.incorrect address'
        },
        bankName: {
            required: 'front.you didnt specified the bank name',
            pattern: 'front.incorrect bank name'
        },
        bankAddress: {
            required: 'front.you didnt specified the bank address',
            pattern: 'front.incorrect bank address'
        },
        cardNumber: {
            required: 'front.you didnt specified the card number',
            pattern: 'front.incorrect card number'
        },
        bankCorrespondentAccount: {
            required: 'front.you didnt specified the correspondent account',
            pattern: 'front.incorrect correspondent account'
        },
        bank_account_number: {
            required: 'front.you didnt specified the bank account number',
            pattern: 'front.incorrect bank account number'
        },
        bank_province_code: {
            required: 'front.you didnt select the bank province'
        },
        bank_province: {
            required: 'front.you didnt select the bank province'
        },
        bank_city_code: {
            required: 'front.you didnt select the bank city'
        },
        bank_city: {
            required: 'front.you didnt select the bank city'
        },
        bank_code: {
            required: 'front.you didnt select the bank'
        },
        bank_branch_address: {
            required: 'front.you didnt specified the bank branch address'
        },
        bank_branch: {
            required: 'front.you didnt specified the bank branch address'
        },
        customer_name: {
            required: 'front.you didnt specified the customer name'
        }
    });

})();