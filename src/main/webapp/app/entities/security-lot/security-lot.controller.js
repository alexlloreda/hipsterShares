(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('SecurityLotController', SecurityLotController);

    SecurityLotController.$inject = ['$scope', '$state', 'SecurityLot', 'SecurityLotSearch'];

    function SecurityLotController ($scope, $state, SecurityLot, SecurityLotSearch) {
        var vm = this;

        vm.securityLots = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            SecurityLot.query(function(result) {
                vm.securityLots = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            SecurityLotSearch.query({query: vm.searchQuery}, function(result) {
                vm.securityLots = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
