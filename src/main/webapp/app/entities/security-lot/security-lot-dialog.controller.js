(function() {
    'use strict';

    angular
        .module('simpleApp')
        .controller('SecurityLotDialogController', SecurityLotDialogController);

    SecurityLotDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'SecurityLot', 'Security', 'Portfolio'];

    function SecurityLotDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, SecurityLot, Security, Portfolio) {
        var vm = this;

        vm.securityLot = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.securities = Security.query();
        vm.portfolios = Portfolio.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.securityLot.id !== null) {
                SecurityLot.update(vm.securityLot, onSaveSuccess, onSaveError);
            } else {
                SecurityLot.save(vm.securityLot, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('simpleApp:securityLotUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.purchaseLocalDate = false;
        vm.datePickerOpenStatus.sellLocalDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();