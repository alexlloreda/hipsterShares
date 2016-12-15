(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('SecurityDialogController', SecurityDialogController);

    SecurityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Security', 'Company'];

    function SecurityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Security, Company) {
        var vm = this;

        vm.security = entity;
        vm.clear = clear;
        vm.save = save;
        vm.companies = Company.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.security.id !== null) {
                Security.update(vm.security, onSaveSuccess, onSaveError);
            } else {
                Security.save(vm.security, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('hipsterSharesApp:securityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
