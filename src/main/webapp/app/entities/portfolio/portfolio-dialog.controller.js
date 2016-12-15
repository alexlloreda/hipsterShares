(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('PortfolioDialogController', PortfolioDialogController);

    PortfolioDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Portfolio', 'SecurityLot'];

    function PortfolioDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Portfolio, SecurityLot) {
        var vm = this;

        vm.portfolio = entity;
        vm.clear = clear;
        vm.save = save;
        vm.securitylots = SecurityLot.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.portfolio.id !== null) {
                Portfolio.update(vm.portfolio, onSaveSuccess, onSaveError);
            } else {
                Portfolio.save(vm.portfolio, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('hipsterSharesApp:portfolioUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
