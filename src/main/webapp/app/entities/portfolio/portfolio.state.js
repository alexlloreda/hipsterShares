(function() {
    'use strict';

    angular
        .module('simpleApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('portfolio', {
            parent: 'entity',
            url: '/portfolio',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Portfolios'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/portfolio/portfolios.html',
                    controller: 'PortfolioController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('portfolio-detail', {
            parent: 'entity',
            url: '/portfolio/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Portfolio'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/portfolio/portfolio-detail.html',
                    controller: 'PortfolioDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Portfolio', function($stateParams, Portfolio) {
                    return Portfolio.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'portfolio',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('portfolio-detail.edit', {
            parent: 'portfolio-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/portfolio/portfolio-dialog.html',
                    controller: 'PortfolioDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Portfolio', function(Portfolio) {
                            return Portfolio.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('portfolio.new', {
            parent: 'portfolio',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/portfolio/portfolio-dialog.html',
                    controller: 'PortfolioDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('portfolio', null, { reload: 'portfolio' });
                }, function() {
                    $state.go('portfolio');
                });
            }]
        })
        .state('portfolio.edit', {
            parent: 'portfolio',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/portfolio/portfolio-dialog.html',
                    controller: 'PortfolioDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Portfolio', function(Portfolio) {
                            return Portfolio.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('portfolio', null, { reload: 'portfolio' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('portfolio.delete', {
            parent: 'portfolio',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/portfolio/portfolio-delete-dialog.html',
                    controller: 'PortfolioDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Portfolio', function(Portfolio) {
                            return Portfolio.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('portfolio', null, { reload: 'portfolio' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
