(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('PortfolioDetailController', PortfolioDetailController);

    PortfolioDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Portfolio', 'SecurityLot'];

    function PortfolioDetailController($scope, $rootScope, $stateParams, previousState, entity, Portfolio, SecurityLot) {
        var vm = this;

        vm.portfolio = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('hipsterSharesApp:portfolioUpdate', function(event, result) {
            vm.portfolio = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
