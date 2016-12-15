(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('security', {
            parent: 'entity',
            url: '/security',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hipsterSharesApp.security.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/security/securities.html',
                    controller: 'SecurityController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('security');
                    $translatePartialLoader.addPart('currency');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('security-detail', {
            parent: 'entity',
            url: '/security/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hipsterSharesApp.security.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/security/security-detail.html',
                    controller: 'SecurityDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('security');
                    $translatePartialLoader.addPart('currency');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Security', function($stateParams, Security) {
                    return Security.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'security',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('security-detail.edit', {
            parent: 'security-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/security/security-dialog.html',
                    controller: 'SecurityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Security', function(Security) {
                            return Security.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('security.new', {
            parent: 'security',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/security/security-dialog.html',
                    controller: 'SecurityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                ticker: null,
                                issuedUnits: null,
                                spotPrice: null,
                                currency: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('security', null, { reload: 'security' });
                }, function() {
                    $state.go('security');
                });
            }]
        })
        .state('security.edit', {
            parent: 'security',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/security/security-dialog.html',
                    controller: 'SecurityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Security', function(Security) {
                            return Security.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('security', null, { reload: 'security' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('security.delete', {
            parent: 'security',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/security/security-delete-dialog.html',
                    controller: 'SecurityDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Security', function(Security) {
                            return Security.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('security', null, { reload: 'security' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
