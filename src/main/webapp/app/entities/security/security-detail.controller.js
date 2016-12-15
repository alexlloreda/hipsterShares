(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('SecurityDetailController', SecurityDetailController);

    SecurityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Security', 'Company'];

    function SecurityDetailController($scope, $rootScope, $stateParams, previousState, entity, Security, Company) {
        var vm = this;

        vm.security = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('hipsterSharesApp:securityUpdate', function(event, result) {
            vm.security = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
