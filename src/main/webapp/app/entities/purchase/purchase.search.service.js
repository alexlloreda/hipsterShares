(function() {
    'use strict';

    angular
        .module('hipsterSharesApp')
        .factory('PurchaseSearch', PurchaseSearch);

    PurchaseSearch.$inject = ['$resource'];

    function PurchaseSearch($resource) {
        var resourceUrl =  'api/_search/purchases/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
