(function() {
    'use strict';

    angular
        .module('simpleApp')
        .controller('DividendDeleteController',DividendDeleteController);

    DividendDeleteController.$inject = ['$uibModalInstance', 'entity', 'Dividend'];

    function DividendDeleteController($uibModalInstance, entity, Dividend) {
        var vm = this;

        vm.dividend = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Dividend.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
