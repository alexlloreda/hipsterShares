(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('DividendDialogController', DividendDialogController);

    DividendDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Dividend', 'Security'];

    function DividendDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Dividend, Security) {
        var vm = this;

        vm.dividend = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.securities = Security.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.dividend.id !== null) {
                Dividend.update(vm.dividend, onSaveSuccess, onSaveError);
            } else {
                Dividend.save(vm.dividend, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('hipsterSharesApp:dividendUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.recordLocalDate = false;
        vm.datePickerOpenStatus.exLocalDate = false;
        vm.datePickerOpenStatus.paymentLocalDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
