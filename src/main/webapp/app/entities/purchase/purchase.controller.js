(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('PurchaseController', PurchaseController);

    PurchaseController.$inject = ['$scope', '$state', 'Purchase', 'PurchaseSearch'];

    function PurchaseController ($scope, $state, Purchase, PurchaseSearch) {
        var vm = this;

        vm.purchases = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Purchase.query(function(result) {
                vm.purchases = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            PurchaseSearch.query({query: vm.searchQuery}, function(result) {
                vm.purchases = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
