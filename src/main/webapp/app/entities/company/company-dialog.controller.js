(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('CompanyDialogController', CompanyDialogController);

    CompanyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Company', 'Security'];

    function CompanyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Company, Security) {
        var vm = this;

        vm.company = entity;
        vm.clear = clear;
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
            if (vm.company.id !== null) {
                Company.update(vm.company, onSaveSuccess, onSaveError);
            } else {
                Company.save(vm.company, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('hipsterSharesApp:companyUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();