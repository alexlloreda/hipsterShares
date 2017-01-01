(function() {
    'use strict';

    angular
        .module('simpleApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('dividend', {
            parent: 'entity',
            url: '/dividend',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Dividends'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dividend/dividends.html',
                    controller: 'DividendController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('dividend-detail', {
            parent: 'entity',
            url: '/dividend/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Dividend'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dividend/dividend-detail.html',
                    controller: 'DividendDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Dividend', function($stateParams, Dividend) {
                    return Dividend.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'dividend',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('dividend-detail.edit', {
            parent: 'dividend-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dividend/dividend-dialog.html',
                    controller: 'DividendDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Dividend', function(Dividend) {
                            return Dividend.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('dividend.new', {
            parent: 'dividend',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dividend/dividend-dialog.html',
                    controller: 'DividendDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                recordLocalDate: null,
                                exLocalDate: null,
                                paymentLocalDate: null,
                                dps: null,
                                franking: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('dividend', null, { reload: 'dividend' });
                }, function() {
                    $state.go('dividend');
                });
            }]
        })
        .state('dividend.edit', {
            parent: 'dividend',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dividend/dividend-dialog.html',
                    controller: 'DividendDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Dividend', function(Dividend) {
                            return Dividend.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('dividend', null, { reload: 'dividend' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('dividend.delete', {
            parent: 'dividend',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dividend/dividend-delete-dialog.html',
                    controller: 'DividendDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Dividend', function(Dividend) {
                            return Dividend.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('dividend', null, { reload: 'dividend' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
