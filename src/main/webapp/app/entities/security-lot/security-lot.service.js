(function() {
    'use strict';
    angular
        .module('simpleApp')
        .factory('SecurityLot', SecurityLot);

    SecurityLot.$inject = ['$resource', 'DateUtils'];

    function SecurityLot ($resource, DateUtils) {
        var resourceUrl =  'api/security-lots/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.purchaseLocalDate = DateUtils.convertLocalDateFromServer(data.purchaseLocalDate);
                        data.sellLocalDate = DateUtils.convertLocalDateFromServer(data.sellLocalDate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.purchaseLocalDate = DateUtils.convertLocalDateToServer(copy.purchaseLocalDate);
                    copy.sellLocalDate = DateUtils.convertLocalDateToServer(copy.sellLocalDate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.purchaseLocalDate = DateUtils.convertLocalDateToServer(copy.purchaseLocalDate);
                    copy.sellLocalDate = DateUtils.convertLocalDateToServer(copy.sellLocalDate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
