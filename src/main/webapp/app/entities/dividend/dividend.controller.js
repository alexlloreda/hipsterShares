(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('DividendController', DividendController);

    DividendController.$inject = ['$scope', '$state', 'Dividend'];

    function DividendController ($scope, $state, Dividend) {
        var vm = this;

        vm.dividends = [];

        loadAll();

        function loadAll() {
            Dividend.query(function(result) {
                vm.dividends = result;
                vm.searchQuery = null;
            });
        }
    }
})();
