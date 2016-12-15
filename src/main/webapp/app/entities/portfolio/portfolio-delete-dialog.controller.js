(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('PortfolioDeleteController',PortfolioDeleteController);

    PortfolioDeleteController.$inject = ['$uibModalInstance', 'entity', 'Portfolio'];

    function PortfolioDeleteController($uibModalInstance, entity, Portfolio) {
        var vm = this;

        vm.portfolio = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Portfolio.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
