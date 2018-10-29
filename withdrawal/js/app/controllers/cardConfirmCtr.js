(function () {
    'use strict';

    app.controller('cardConfirm', [
        '$rootScope',
        '$uibModal',
        '$timeout',
        '$filter',
        '$scope',
        '$sce',
        '$q',
        'frameMessage',
        'DECLINE_REASON',
        'UseWebSocket',
        'eventService',
        methodsCtrl
    ]).constant('DECLINE_REASON', {
        'CARD_IS_NOT_SIGNED': 'front.billing.card status card not signed',
        'THERE_IS_NO_BACKSIDE' : 'front.billing.card status no backside',
        'BLACK_AND_WHITE_COPY' : 'front.billing.card status black and white copy',
        'WRONG_CARD': ' front.billing.card status wrong card',
        'COPY_IS_BLURRY': 'front.billing.card status copy is blurred',
        'INFO_IS_HIDDEN': 'front.billing.card status info is hidden',
        'NO_FRONT_SIDE': 'front.billing.card front side was not provided',
        'ANOTHER_REASON': 'front.billing.card status rejected message'
    });

    function methodsCtrl($rootScope, $uibModal, $timeout, $filter, $scope, $sce, $q, frameMessage,
                         DECLINE_REASON, UseWebSocket, eventService) {
        // ---
        // VARIABLES
        // ---
        $scope.loading = true;
        $scope.cardsList = [];
        $scope.declineReason = DECLINE_REASON;

        var STATUSES = {
            verified: ['verified'],
            rejected: ['failed', 'declined'],
            process: ['callback_wait', 'verify_pending'],
            initial: [null, 'new', 'started', 'upload_failed']
        };

        initCardsVerification();

        frameMessage.send('closeModal');

        $scope.openCardVerificationModal = function (card) {
            var $verifyCardModalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                windowClass: 'modal-flat',
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                controller: function ($scope) {
                    $scope.card = card;
                    $scope.loading = true;
                    $scope.iframeLoaded = function () {
                        // Знаю что так делать нельзя в контроллере но чо поделать то
                        var iframeElement = window.document.getElementById('cardVerificationIframe');
                        try {
                            // Если у наст есть доступ к контенту iframe,
                            // значит это редирект на success/failed страницу
                            if (iframeElement.contentWindow.location.href &&
                                iframeElement.contentWindow.location.href !== 'about:blank') {
                                $scope.loading = true;
                                initCardsVerification();
                                $verifyCardModalInstance.dismiss('cancel');
                                return;
                            }
                        } catch (e) {}
                        $scope.loading = false;
                    };
                    $scope.close = function () {
                        initCardsVerification();
                        $verifyCardModalInstance.dismiss('cancel');
                    };
                    getCardVerificationUrl(card.id).then(function (cardVerificationUrl) {
                        if (!cardVerificationUrl) {
                            initCardsVerification();
                            return;
                        }
                        var lang = $rootScope.appConfig.locale.substr(0, 2);
                        var url = cardVerificationUrl + '&responsiveLayout=true&locale=' + lang;
                        $scope.cardVerificationUrl = $sce.trustAsResourceUrl(url);
                    });
                },
                templateUrl: 'verifyCardModal.html'
            });
        };

        function formatCards(cardsList) {
            angular.forEach(cardsList, function (card, index) {
                cardsList[index].type = getCardType(card.number);
                cardsList[index].number = getCardNumber(card.number);
                cardsList[index].status = getCardStatus(card.status);
            });
            return cardsList;
        }

        function getCardType(cardNumber) {
            var result = 'unknown';

            if (/^5[1-5]/.test(cardNumber)) {
                result = 'mastercard';
            }

            if (/^(5018|5020|5038|6304|6759|6761|6763)/.test(cardNumber)) {
                result = 'maestro';
            } else if (/^4/.test(cardNumber)) {
                result = 'visa';
            } else if (/^3[47]/.test(cardNumber)) {
                result = 'amex';
            }

            return result;
        }

        function getCardNumber(cardNumber) {
            var firstPart = cardNumber.substr(0, 4);
            var secondPart = cardNumber.substr(4, 2);
            var lastPart = cardNumber.substr(cardNumber.length - 4);
            return firstPart + ' ' + secondPart + '<span>•• ••••</span> ' + lastPart;
        }

        function getCardStatus(cardStatus) {
            var status = '';

            angular.forEach(STATUSES, function (statusList, statusName) {
                if (statusList.indexOf(cardStatus) > -1) {
                    status = statusName;
                }
            });

            return status;
        }

        function getVerificationCards() {
            return UseWebSocket.getCardsStatus().then(function(result) {
                eventService.sendApiMetrics(1, {api_name: 'socket.get-verify-card-status'}, result.timeDiff);
                return result;
            }, function(err) {
                eventService.sendApiMetrics(0, {api_name: 'socket.get-verify-card-status'}, err.timeDiff);
            })
        }

        function getCardVerificationUrl(cardId) {
            return UseWebSocket.getVerifyCardUrl(cardId).then(function(result) {
                eventService.sendApiMetrics(1, {api_name: 'socket.get-verify-card-url'}, result.timeDiff);
                return result.url
            }, function(err) {
                eventService.sendApiMetrics(0, {api_name: 'socket.get-verify-card-url'}, err.timeDiff);
            })
        }

        function initCardsVerification() {
            getVerificationCards().then(function (cardsList) {
                $scope.loading = false;
                $scope.cardsList = formatCards(cardsList);
            });
        }
    }
})();