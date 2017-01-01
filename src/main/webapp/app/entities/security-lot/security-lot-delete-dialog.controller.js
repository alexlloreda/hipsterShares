(function() {
    'use strict';

    angular
        .module('simpleApp')
        .controller('SecurityLotDeleteController',SecurityLotDeleteController);

    SecurityLotDeleteController.$inject = ['$uibModalInstance', 'entity', 'SecurityLot'];

    function SecurityLotDeleteController($uibModalInstance, entity, SecurityLot) {
        var vm = this;

        vm.securityLot = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            SecurityLot.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
