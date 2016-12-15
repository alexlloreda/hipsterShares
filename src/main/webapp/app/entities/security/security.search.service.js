(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .factory('SecuritySearch', SecuritySearch);

    SecuritySearch.$inject = ['$resource'];

    function SecuritySearch($resource) {
        var resourceUrl =  'api/_search/securities/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
