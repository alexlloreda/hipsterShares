(function() {
    'use strict';

    angular
        .module('simpleApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('sale', {
            parent: 'entity',
            url: '/sale',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Sales'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/sale/sales.html',
                    controller: 'SaleController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('sale-detail', {
            parent: 'entity',
            url: '/sale/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Sale'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/sale/sale-detail.html',
                    controller: 'SaleDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Sale', function($stateParams, Sale) {
                    return Sale.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'sale',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('sale-detail.edit', {
            parent: 'sale-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/sale/sale-dialog.html',
                    controller: 'SaleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Sale', function(Sale) {
                            return Sale.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('sale.new', {
            parent: 'sale',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/sale/sale-dialog.html',
                    controller: 'SaleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                units: null,
                                localDate: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('sale', null, { reload: 'sale' });
                }, function() {
                    $state.go('sale');
                });
            }]
        })
        .state('sale.edit', {
            parent: 'sale',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/sale/sale-dialog.html',
                    controller: 'SaleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Sale', function(Sale) {
                            return Sale.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('sale', null, { reload: 'sale' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('sale.delete', {
            parent: 'sale',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/sale/sale-delete-dialog.html',
                    controller: 'SaleDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Sale', function(Sale) {
                            return Sale.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('sale', null, { reload: 'sale' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
