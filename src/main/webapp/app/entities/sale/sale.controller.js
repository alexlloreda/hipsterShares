(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('SaleController', SaleController);

    SaleController.$inject = ['$scope', '$state', 'Sale'];

    function SaleController ($scope, $state, Sale) {
        var vm = this;

        vm.sales = [];

        loadAll();

        function loadAll() {
            Sale.query(function(result) {
                vm.sales = result;
                vm.searchQuery = null;
            });
        }
    }
})();
