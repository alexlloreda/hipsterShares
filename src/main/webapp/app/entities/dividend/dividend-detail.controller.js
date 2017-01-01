(function() {
    'use strict';

    angular
        .module('simpleApp')
        .controller('DividendDetailController', DividendDetailController);

    DividendDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Dividend', 'Security'];

    function DividendDetailController($scope, $rootScope, $stateParams, previousState, entity, Dividend, Security) {
        var vm = this;

        vm.dividend = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('simpleApp:dividendUpdate', function(event, result) {
            vm.dividend = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
