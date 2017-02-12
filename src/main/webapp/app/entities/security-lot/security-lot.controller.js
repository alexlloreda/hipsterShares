(function() {
    'use strict';

    angular
        .module('simpleApp')
        .controller('SecurityLotController', SecurityLotController);

    SecurityLotController.$inject = ['$scope', '$state', 'SecurityLot'];

    function SecurityLotController ($scope, $state, SecurityLot) {
        var vm = this;

        vm.securityLots = [];

        loadAll();

        function loadAll() {
            SecurityLot.query(function(result) {
                vm.securityLots = result;
                vm.searchQuery = null;
            });
        }
    }
})();
