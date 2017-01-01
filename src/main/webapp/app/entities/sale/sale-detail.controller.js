(function() {
    'use strict';

    angular
        .module('simpleApp')
        .controller('SaleDetailController', SaleDetailController);

    SaleDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Sale', 'Security'];

    function SaleDetailController($scope, $rootScope, $stateParams, previousState, entity, Sale, Security) {
        var vm = this;

        vm.sale = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('simpleApp:saleUpdate', function(event, result) {
            vm.sale = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
