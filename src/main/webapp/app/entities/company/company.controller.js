(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('CompanyController', CompanyController);

    CompanyController.$inject = ['$scope', '$state', 'Company', 'CompanySearch'];

    function CompanyController ($scope, $state, Company, CompanySearch) {
        var vm = this;

        vm.companies = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Company.query(function(result) {
                vm.companies = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            CompanySearch.query({query: vm.searchQuery}, function(result) {
                vm.companies = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
