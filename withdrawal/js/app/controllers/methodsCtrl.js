(function () {
    'use strict';

    app.controller('withdrawalMethods', [
        'BILLING_WITHDRAWAL_PAYSYSTEMS',
        'DOCUMENT_STATUSES',
        'withdrawalSharedData',
        'methodsService',
        'frameMessage',
        '$rootScope',
        '$uibModal',
        '$timeout',
        '$filter',
        '$scope',
        '$q',
        'socketRequest',
        'utilService',
        methodsCtrl
    ]);

    function methodsCtrl(BILLING_WITHDRAWAL_PAYSYSTEMS, DOCUMENT_STATUSES, withdrawalSharedData, methodsService, frameMessage, $rootScope,
                         $uibModal, $timeout, $filter, $scope, $q, socketRequest, utilService) {
        // ---
        // VARIABLES
        // ---
        $scope.loading = true;
        $scope.warningMessage = '';
        $scope.activeMethod = false;
        $scope.shared = withdrawalSharedData;
        $scope.billingPaysystems = BILLING_WITHDRAWAL_PAYSYSTEMS;

        frameMessage.send('closeModal');

        methodsService.init().then(initMethods);

        $rootScope.$watch('appConfig.locale', function (locale, oldLocale) {
            if (locale !== oldLocale) {
                methodsService.init().then(updateMethods);
            }
        });

        $scope.$watch('shared.cancelRequestCount', function (count) {
            if (count > 0) {
                methodsService.init(true).then(updateMethods);
            }
        });

        // ---
        // PUBLIC METHODS.
        // ---

        $scope.selectMethod = function (method) {
            if ($scope.activeMethod) {
                $scope.activeMethod.active = false;
            }
            // Set specific errors
            if (method) {
                // Set active method
                method.active = true;
                $scope.activeMethod = method;
                $scope.tabclicked = true;
            }
        };

        $scope.isWithdrawalPossible = function (method) {
            var msg = '';
            $scope.cardsVerification.warning = false;

            if (method && method.status === 'success') {
                msg = '';
            } else if ($scope.balance === 0) {
                msg = $scope.warningMessages.balanceZero;
            } else if (isDemoAccount()) {
                msg = $scope.warningMessages.demoAccount;
            } else if ($scope.activeMethod) {
                if (
                    (
                        $scope.activeMethod.paysystem === BILLING_WITHDRAWAL_PAYSYSTEMS.BANK_CARD
                    ) &&
                    !isCardMethodAvailable()
                ) {
                    msg = $scope.warningMessages.noCards;
                } else if (
                    (
                        $scope.activeMethod.paysystem !== BILLING_WITHDRAWAL_PAYSYSTEMS.BANK_CARD
                    ) &&
                    isCardMethodAvailable() && $scope.cardsBalance === $scope.balance
                ) {
                    msg = $scope.warningMessages.momentalOutput;
                } else if (!isHaveFreeMoney()) {
                    msg = $scope.warningMessages.noFreeMoney;
                } else if (
                    $scope.activeMethod.paysystem !== BILLING_WITHDRAWAL_PAYSYSTEMS.BANK_CARD
                ) {
                    if (
                        $scope.cardsVerification.cardsList.length === 0 ||
                        $scope.cardsVerification.allVerified ||
                        $scope.cardsVerification.skip
                    ) {
                        $scope.cardsVerification.warning = false;
                    } else {
                        msg = 'cardConfirmWarning';
                        $scope.cardsVerification.warning = true;
                    }
                }
            }

            $scope.warningMessage = msg;

            return !msg;
        };

        $scope.withdrawCard = function (card, form) {

            if (!form.$valid) {
                return;
            }

            var withdrawData = {
                card_id: card.id,
                amount: card.withdrawAmount,
                payout_method_id: $scope.activeMethod.id
            };

            card.iqoption_payment_method_id ?
                withdrawData.iqoption_payment_method_id = card.iqoption_payment_method_id : null;

            card.status = 'process';


            $timeout(function () {
                    methodsService.withdrawalCard(withdrawData).then(
                        function (withdrawAmount) {
                            card.status = 'success';
                            form.$setPristine();
                            card.withdrawAmount = '';
                            $timeout(function () {
                                updateCardBalance(card, withdrawAmount);
                                card.status = 'ready';
                            }, 2000);
                        },
                        function (message) {
                            card.status = 'failed';
                            // Show error message
                            if (message) {
                                card.error.failed = message;
                            }
                            // Clear form
                            $timeout(function () {
                                card.status = 'ready';
                                card.error.failed = '';
                            }, 5000);
                        }
                    );
            }, 2000);

        };

        $scope.withdraw = function (method, form) {


            if (!form.$valid) {
                return;
            }

            if (isCardMethodAvailable()) {
                withdrawModal(method);
                return;
            }

            method.status = 'process';

            $timeout(function () {
                method.withdraw.payment_method_id = method.value;
                methodsService.withdrawal(method.withdraw).then(
                    function (withdrawAmount) {
                        updateBalance(withdrawAmount);
                        form.$setPristine();
                        method.status = 'success';
                        method.withdraw = {};
                    },
                    function (error) {
                        method.status = 'ready';
                        form.$setPristine();
                        method.error.submit = error;
                    }
                );
            }, 2000);

        };

        $scope.initCardForm = function (card, form) {
            if (card && form) {
                card.error = {};
                card.form = form;
            }
        };

        $scope.initWithdrawForm = function (method, form) {
            form.$setPristine();

            if (method && form) {
                method.error = {};
                method.form = form;
                $scope.activeMethod.currentCommission = $scope.activeMethod.commissionByCurrency && $scope.activeMethod.commissionByCurrency[$scope.profile.currency] ?
                    $scope.activeMethod.commissionByCurrency[$scope.profile.currency].fixed : 0;

                $scope.activeMethod.withdrawMax = Math.min.call(null, $scope.activeMethod.currentLimit.max, $scope.balance - $scope.activeMethod.currentCommission);
            }

        };

        $scope.newRequest = function (method) {
            method.status = 'ready';
            // Clear select fields value
            angular.forEach(method.fields, function (field) {
                if(field.select) {
                    field.select.model = undefined;
                }
            });
        };

        $scope.showCardVerification = function () {
            socketRequest.disconnect();
            $rootScope.pageLoader = true;
            frameMessage.send('windowScrollTop');
            frameMessage.send('resize', {height: 500});
            frameMessage.send('goToCardsVerification');
        };

        $scope.skipCardVerification = function () {
            $scope.cardsVerification.skip = true;
        };

        // ---
        // PRIVATE METHODS.
        // ---

        function initMethods(serviceData) {
            // Set method availability check function
            setMethodsAvailability(serviceData.methods);

            // Apply service data
            angular.extend($scope, serviceData);

            checkUserUploadedDocuments();

            var methodIndex = 0;

            angular.forEach($scope.methods, function (method) {
                if (method.hidden) {
                    return;
                }
                if (method.paysystem === BILLING_WITHDRAWAL_PAYSYSTEMS.BANK_CARD) {
                    methodIndex = $scope.methods.indexOf(method);
                }
            });
            // Select first method
            $scope.selectMethod($scope.methods[methodIndex]);
            // Hide preloader
            $scope.loading = false;
        }

        function updateMethods(serviceData) {
            // Save last methods & cards data
            var lastCards = $scope.cards,
                lastMethods = $scope.methods,
                lastActiveMethodIndex = $scope.methods.indexOf($scope.activeMethod);
            // Set method availability check function
            setMethodsAvailability(serviceData.methods);
            // Apply service data
            angular.extend($scope, serviceData);
            // Pass existing form & withdraw data to new methods
            angular.forEach($scope.methods, function (method) {
                angular.forEach(lastMethods, function (lastMethod) {
                    if (method.value === lastMethod.value) {
                        if (method.paysystem === BILLING_WITHDRAWAL_PAYSYSTEMS.BANK_CARD ) {
                            angular.forEach($scope.cards, function (card) {
                                angular.forEach(lastCards, function (lastCard) {
                                    if (card.id === lastCard.id) {
                                        card.withdrawAmount = lastCard.withdrawAmount;
                                        $scope.initCardForm(card, lastCard.form);
                                    }
                                });
                            });
                        } else {
                            method.withdraw = lastMethod.withdraw;
                            $scope.initWithdrawForm(method, lastMethod.form);
                        }
                    }
                });
            });
            // Select prev active method
            $scope.selectMethod($scope.methods[lastActiveMethodIndex]);
        }

        function checkUserUploadedDocuments() {
            $scope.documentsUploaded = $scope.documentsStatus ?
                    DOCUMENT_STATUSES.LOADED.indexOf($scope.documentsStatus.documentsState)  > -1 : false;
        }

        function setMethodsAvailability(methods) {
            angular.forEach(methods, function (method) {
                if (method.paysystem === BILLING_WITHDRAWAL_PAYSYSTEMS.BANK_CARD) {
                    method.isAvalible = isCardMethodAvailable;
                } else {
                    method.isAvalible = isOtherMethodAvailable;
                }
            });
        }

        function withdrawWaterfall(method, cards) {
            var cardMethod = methodsService.getMethodByPaysystem(BILLING_WITHDRAWAL_PAYSYSTEMS.BANK_CARD);
            var cardsPromises = [];
            method.status = 'process';

            // Withdrawal some cards
            angular.forEach(cards, function (card) {

                var withdrawData = {
                        card_id: card.id,
                        amount: card.withdrawAmount,
                        payout_method_id: cardMethod.id
                    },
                    cardDeferred = $q.defer();

                card.iqoption_payment_method_id ?
                    withdrawData.iqoption_payment_method_id = card.iqoption_payment_method_id : null;


                card.status = 'process';

                $timeout(function () {
                    methodsService.withdrawalCard(withdrawData).then(
                        function (withdrawAmount) {
                            updateCardBalance(card, withdrawAmount);
                            card.status = 'success';
                            cardDeferred.resolve();
                        },
                        function (error) {
                            card.status = 'failed';
                            cardDeferred.reject(error);
                        }
                    );
                }, 2000);

                cardsPromises.push(cardDeferred.promise);
            });

            $q.all(cardsPromises).then(
                function () {
                    if (method.withdraw.amount > 0) {
                        method.withdraw.payment_method_id = method.value;
                        $timeout(function () {
                                methodsService.withdrawal(method.withdraw).then(
                                    function (withdrawAmount) {
                                        updateBalance(withdrawAmount);
                                        method.form.$setPristine();
                                        method.status = 'success';
                                        method.withdraw = {};
                                    },
                                    function (error) {
                                        method.status = 'failed';
                                        method.form.$setPristine();
                                        method.error.submit = error;
                                    }
                                );

                        }, 6000);

                    } else {
                        method.form.$setPristine();
                        method.status = 'success';
                        method.withdraw = {};
                    }
                },
                function (error) {
                    method.status = 'failed';
                    method.form.$setPristine();
                    method.error.submit = error;
                    method.withdraw = {};
                }
            )
        }

        function withdrawModal(method) {
            var withdrawAmount = method.withdraw.amount,
                methodAmount = withdrawAmount,
                cardsAmount = 0,
                cards = [],
                currency = $scope.profile.currency;

            angular.forEach($scope.cards, function (card) {
                if (methodAmount >= card.refund_amount) {
                    card.withdrawAmount = card.refund_amount;
                    methodAmount -= card.refund_amount;
                } else {
                    card.withdrawAmount = methodAmount;
                    methodAmount = 0;
                }
                if (card.withdrawAmount > 0) {
                    cardsAmount += card.withdrawAmount;
                    cards.push(card);
                }
            });

            var $uibModalInstance = $uibModal.open({
                keyboard: false,
                animation: true,
                backdrop: 'static',
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                windowClass: 'modal-flat modal-withdrawal',
                controller: function ($scope) {
                    $scope.cards = cards;
                    $scope.method = method;
                    $scope.currency = currency;
                    $scope.cardsAmount = cardsAmount;
                    $scope.methodAmount = methodAmount;
                    $scope.withdrawAmount = withdrawAmount;

                    $scope.modalWithdraw = function () {
                        withdrawWaterfall(method, cards);
                    };

                    $scope.close = function () {
                        if (method.status === 'ready') {
                            method.withdraw.amount = withdrawAmount;
                        }
                        angular.forEach(cards, function (card) {
                            card.status = 'ready';
                            card.withdrawAmount = '';
                        });
                        $uibModalInstance.dismiss('cancel');
                    };

                    withdrawalSharedData.isModalOpen = true;
                },
                templateUrl: 'modalWithdraw.html'
            });

            $uibModalInstance.opened.then(function () {
                method.withdraw.amount = methodAmount;
            });

            $uibModalInstance.closed.then(function () {
                if (method.status === 'failed' || (method.status === 'success' && methodAmount === 0)) {
                    method.status = 'ready';
                }
                withdrawalSharedData.isModalOpen = false;
            });

        }

        function updateBalance(withdrawAmount) {
            $scope.balance = utilService.toFixed($scope.balance - withdrawAmount, 2);
            $scope.requestAmount.total += withdrawAmount;
            updateCardsRefund();
        }

        function updateCardBalance(card, withdrawAmount) {
            card.refund_amount = utilService.toFixed(card.refund_amount - withdrawAmount, 2);
            $scope.cardsBalance = utilService.toFixed($scope.cardsBalance - withdrawAmount, 2);

            updateBalance(withdrawAmount);
        }

        function updateCardsRefund() {
            _.each($scope.cards, function(card){
                if (card.refund_amount > $scope.balance) {
                    card.refund_amount = $scope.balance;
                }
            });
        }

        function isCardMethodAvailable() {
            return !isDemoAccount() && $scope.cardsBalance > 0;
        }

        function isOtherMethodAvailable() {
            return !isDemoAccount() && isHaveFreeMoney() && $scope.cardsBalance !== $scope.balance;
        }

        function isHaveFreeMoney() {
            return $scope.balance > 0;
        }

        function isDemoAccount() {
            return $scope.profile.demo === 1;
        }

    }
})();
