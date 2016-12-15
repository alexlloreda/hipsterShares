(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('SaleController', SaleController);

    SaleController.$inject = ['$scope', '$state', 'Sale', 'SaleSearch'];

    function SaleController ($scope, $state, Sale, SaleSearch) {
        var vm = this;

        vm.sales = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Sale.query(function(result) {
                vm.sales = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            SaleSearch.query({query: vm.searchQuery}, function(result) {
                vm.sales = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
