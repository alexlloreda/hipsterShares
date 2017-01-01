(function() {
    'use strict';
    angular
        .module('simpleApp')
        .factory('Purchase', Purchase);

    Purchase.$inject = ['$resource', 'DateUtils'];

    function Purchase ($resource, DateUtils) {
        var resourceUrl =  'api/purchases/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.localDate = DateUtils.convertLocalDateFromServer(data.localDate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDate = DateUtils.convertLocalDateToServer(copy.localDate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.localDate = DateUtils.convertLocalDateToServer(copy.localDate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
