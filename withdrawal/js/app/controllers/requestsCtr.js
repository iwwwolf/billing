(function () {
    'use strict';

    app.controller('withdrawalRequests', [
        'withdrawalSharedData',
        'requestsService',
        '$rootScope',
        '$uibModal',
        '$timeout',
        '$filter',
        '$scope',
        requestsCtrl
    ]);

    function requestsCtrl(withdrawalSharedData, requestsService, $rootScope, $uibModal, $timeout, $filter, $scope) {
        $scope.page = 1;
        $scope.loading = true;
        $scope.shared = withdrawalSharedData;

        var cardRequests = [],
            updateCardRequestsTimer = null,
            isShownCardRequestCompleteModal = false;

        requestsService.init().then(initRequests);

        $rootScope.$watch('appConfig.locale', function (locale, oldLocale) {
            if (locale !== oldLocale) {
                $scope.getRequestPage();
            }
        });

        $scope.$watch('shared.requestCount', function (newCount, oldCount) {
            if (newCount !== oldCount && newCount > 0) {
                $scope.page = 1;
                $scope
                    .getRequestPage()
                    .then(checkCardRequestsStatus);
            }
        });

        $scope.getRequestPage = function () {
            $scope.pageLoading = true;
            return requestsService
                .getRequests($scope.page)
                .then(function (data) {
                    applyRequests(data);
                    $scope.pageLoading = false;
                });
        };

        $scope.cancelRequest = function (request) {
            request.cancelPreloader = true;
            request.error = '';
            $timeout(function () {
                requestsService
                    .cancelRequest(request)
                    .then(
                        function () {
                            cancelRequestSuccess(request)
                        },function (error) {
                            cancelRequestError(request, error)
                        }
                    );
            }, 1000);
        };

        function cancelRequestSuccess(request) {
            request.message = $filter('translate')('front.cancelled by user');
            request.cancelPreloader = false;
            request.state_id = 'canceled';
            request.canceled = true;
            $scope.getRequestPage();
        }

        function cancelRequestError(request, error) {
            request.error = error || '';
            request.cancelPreloader = false;
        }

        function openCardRequestCompleteModal() {
            if (isShownCardRequestCompleteModal || $scope.shared.isModalOpen) {
                return;
            }

            var $uibModalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                windowClass: 'modal-flat modal-withdrawal',
                controller: function ($scope) {
                    $scope.close = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                templateUrl: 'modalCardRequestComplete.html'
            });

            isShownCardRequestCompleteModal = true;
        }

        function checkCardRequestsStatus() {
            angular.forEach($scope.requests, function (request) {
                if (request.card && request.state_id === 'in_process' && cardRequests.indexOf(request.op_id) === -1) {
                    cardRequests.push(request.op_id);
                }
            });

            if (cardRequests.length) {
                updateCardRequests();
            }
        }

        function updateCardRequests(count) {
            count = count || 0;

            if (count > 5) {
                return;
            }

            if (updateCardRequestsTimer) {
                $timeout.cancel(updateCardRequestsTimer);
            }

            updateCardRequestsTimer = $timeout(function () {
                count++;
                requestsService
                    .getRequests()
                    .then(function (data) {
                        if (isCardRequestComplete(data.data)) {
                            openCardRequestCompleteModal();
                            applyRequests(data);
                            $scope.page = 1;
                        } else {
                            updateCardRequests(count);
                        }
                    });
                updateCardRequestsTimer = null;
            }, 2000);

        }

        function isCardRequestComplete(requests) {
            var isRequestComplete = false;

            angular.forEach(requests, function (request) {
                if (request.card) {
                    var cardRequestIndex = cardRequests.indexOf(request.op_id);
                    if (request.state_id === 'complete' && cardRequestIndex > -1) {
                        isRequestComplete = true;
                        cardRequests.splice(cardRequestIndex, 1);
                    }
                }
            });

            return isRequestComplete;
        }

        function initRequests(serviceData) {
            // Apply service data
            angular.extend($scope, serviceData);
            // Hide preloader
            $scope.loading = false;
        }

        function applyRequests(data) {
            $scope.requests = data.data;
            $scope.totalRequests = data.total;
        }
    }
})();