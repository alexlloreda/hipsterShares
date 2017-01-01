(function() {
    'use strict';

    angular
        .module('simpleApp')
        .controller('SecurityDetailController', SecurityDetailController);

    SecurityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Security', 'Company'];

    function SecurityDetailController($scope, $rootScope, $stateParams, previousState, entity, Security, Company) {
        var vm = this;

        vm.security = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('simpleApp:securityUpdate', function(event, result) {
            vm.security = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
