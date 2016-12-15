(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .controller('DividendDetailController', DividendDetailController);

    DividendDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Dividend', 'Security'];

    function DividendDetailController($scope, $rootScope, $stateParams, previousState, entity, Dividend, Security) {
        var vm = this;

        vm.dividend = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('hipsterSharesApp:dividendUpdate', function(event, result) {
            vm.dividend = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
