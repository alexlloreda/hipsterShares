(function() {
    'use strict';

    angular
        .module('simpleApp')
        .controller('PurchaseDetailController', PurchaseDetailController);

    PurchaseDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Purchase', 'Security'];

    function PurchaseDetailController($scope, $rootScope, $stateParams, previousState, entity, Purchase, Security) {
        var vm = this;

        vm.purchase = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('simpleApp:purchaseUpdate', function(event, result) {
            vm.purchase = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
