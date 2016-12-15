(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('SecurityController', SecurityController);

    SecurityController.$inject = ['$scope', '$state', 'Security', 'SecuritySearch'];

    function SecurityController ($scope, $state, Security, SecuritySearch) {
        var vm = this;

        vm.securities = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Security.query(function(result) {
                vm.securities = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            SecuritySearch.query({query: vm.searchQuery}, function(result) {
                vm.securities = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
