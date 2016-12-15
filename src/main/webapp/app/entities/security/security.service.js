(function() {
    'use strict';
    angular
        .module('hipsterSharesApp')
        .factory('Security', Security);

    Security.$inject = ['$resource'];

    function Security ($resource) {
        var resourceUrl =  'api/securities/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
