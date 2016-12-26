(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('SecurityController', SecurityController);

    SecurityController.$inject = ['$scope', '$state', 'Security'];

    function SecurityController ($scope, $state, Security) {
        var vm = this;

        vm.securities = [];

        loadAll();

        function loadAll() {
            Security.query(function(result) {
                vm.securities = result;
                vm.searchQuery = null;
            });
        }
    }
})();
