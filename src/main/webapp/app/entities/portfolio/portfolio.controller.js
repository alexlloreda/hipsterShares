(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('PortfolioController', PortfolioController);

    PortfolioController.$inject = ['$scope', '$state', 'Portfolio', 'PortfolioSearch'];

    function PortfolioController ($scope, $state, Portfolio, PortfolioSearch) {
        var vm = this;

        vm.portfolios = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Portfolio.query(function(result) {
                vm.portfolios = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            PortfolioSearch.query({query: vm.searchQuery}, function(result) {
                vm.portfolios = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
