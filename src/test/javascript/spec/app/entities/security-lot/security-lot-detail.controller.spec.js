'use strict';

describe('Controller Tests', function() {

    describe('SecurityLot Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockSecurityLot, MockSecurity, MockPortfolio;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockSecurityLot = jasmine.createSpy('MockSecurityLot');
            MockSecurity = jasmine.createSpy('MockSecurity');
            MockPortfolio = jasmine.createSpy('MockPortfolio');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'SecurityLot': MockSecurityLot,
                'Security': MockSecurity,
                'Portfolio': MockPortfolio
            };
            createController = function() {
                $injector.get('$controller')("SecurityLotDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'hipsterSharesApp:securityLotUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
