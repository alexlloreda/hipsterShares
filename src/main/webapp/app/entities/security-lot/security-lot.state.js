(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('security-lot', {
            parent: 'entity',
            url: '/security-lot',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hipsterSharesApp.securityLot.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/security-lot/security-lots.html',
                    controller: 'SecurityLotController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('securityLot');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('security-lot-detail', {
            parent: 'entity',
            url: '/security-lot/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hipsterSharesApp.securityLot.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/security-lot/security-lot-detail.html',
                    controller: 'SecurityLotDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('securityLot');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'SecurityLot', function($stateParams, SecurityLot) {
                    return SecurityLot.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'security-lot',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('security-lot-detail.edit', {
            parent: 'security-lot-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/security-lot/security-lot-dialog.html',
                    controller: 'SecurityLotDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SecurityLot', function(SecurityLot) {
                            return SecurityLot.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('security-lot.new', {
            parent: 'security-lot',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/security-lot/security-lot-dialog.html',
                    controller: 'SecurityLotDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                purchasePrice: null,
                                purchaseLocalDate: null,
                                sellLocalDate: null,
                                sellPrice: null,
                                units: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('security-lot', null, { reload: 'security-lot' });
                }, function() {
                    $state.go('security-lot');
                });
            }]
        })
        .state('security-lot.edit', {
            parent: 'security-lot',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/security-lot/security-lot-dialog.html',
                    controller: 'SecurityLotDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SecurityLot', function(SecurityLot) {
                            return SecurityLot.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('security-lot', null, { reload: 'security-lot' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('security-lot.delete', {
            parent: 'security-lot',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/security-lot/security-lot-delete-dialog.html',
                    controller: 'SecurityLotDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['SecurityLot', function(SecurityLot) {
                            return SecurityLot.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('security-lot', null, { reload: 'security-lot' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
