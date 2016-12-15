(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .factory('SecurityLotSearch', SecurityLotSearch);

    SecurityLotSearch.$inject = ['$resource'];

    function SecurityLotSearch($resource) {
        var resourceUrl =  'api/_search/security-lots/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
