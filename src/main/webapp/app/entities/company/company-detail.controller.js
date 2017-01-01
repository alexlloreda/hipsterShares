(function() {
    'use strict';

    angular
        .module('simpleApp')
        .controller('CompanyDetailController', CompanyDetailController);

    CompanyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Company', 'Security'];

    function CompanyDetailController($scope, $rootScope, $stateParams, previousState, entity, Company, Security) {
        var vm = this;

        vm.company = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('simpleApp:companyUpdate', function(event, result) {
            vm.company = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
