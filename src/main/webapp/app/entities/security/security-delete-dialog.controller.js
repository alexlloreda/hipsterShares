(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('SecurityDeleteController',SecurityDeleteController);

    SecurityDeleteController.$inject = ['$uibModalInstance', 'entity', 'Security'];

    function SecurityDeleteController($uibModalInstance, entity, Security) {
        var vm = this;

        vm.security = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Security.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
