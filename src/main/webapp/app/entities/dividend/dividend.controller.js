(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('DividendController', DividendController);

    DividendController.$inject = ['$scope', '$state', 'Dividend', 'DividendSearch'];

    function DividendController ($scope, $state, Dividend, DividendSearch) {
        var vm = this;

        vm.dividends = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Dividend.query(function(result) {
                vm.dividends = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            DividendSearch.query({query: vm.searchQuery}, function(result) {
                vm.dividends = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
