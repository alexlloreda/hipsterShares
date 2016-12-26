(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('PortfolioController', PortfolioController);

    PortfolioController.$inject = ['$scope', '$state', 'Portfolio'];

    function PortfolioController ($scope, $state, Portfolio) {
        var vm = this;

        vm.portfolios = [];

        loadAll();

        function loadAll() {
            Portfolio.query(function(result) {
                vm.portfolios = result;
                vm.searchQuery = null;
            });
        }
    }
})();
