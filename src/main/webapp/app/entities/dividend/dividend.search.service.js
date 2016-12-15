(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .factory('DividendSearch', DividendSearch);

    DividendSearch.$inject = ['$resource'];

    function DividendSearch($resource) {
        var resourceUrl =  'api/_search/dividends/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
