(function() {
    'use strict';

    angular
        .module('simpleApp')
        .controller('PortfolioDetailController', PortfolioDetailController);

    PortfolioDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Portfolio', 'SecurityLot'];

    function PortfolioDetailController($scope, $rootScope, $stateParams, previousState, entity, Portfolio, SecurityLot) {
        var vm = this;

        vm.portfolio = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('simpleApp:portfolioUpdate', function(event, result) {
            vm.portfolio = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
