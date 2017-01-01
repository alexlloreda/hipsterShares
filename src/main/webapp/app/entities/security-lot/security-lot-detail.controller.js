(function() {
    'use strict';

    angular
        .module('simpleApp')
        .controller('SecurityLotDetailController', SecurityLotDetailController);

    SecurityLotDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'SecurityLot', 'Security', 'Portfolio'];

    function SecurityLotDetailController($scope, $rootScope, $stateParams, previousState, entity, SecurityLot, Security, Portfolio) {
        var vm = this;

        vm.securityLot = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('simpleApp:securityLotUpdate', function(event, result) {
            vm.securityLot = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
