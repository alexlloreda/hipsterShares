(function() {
    'use strict';
    angular
        .module('hipsterSharesApp')
        .factory('Dividend', Dividend);

    Dividend.$inject = ['$resource', 'DateUtils'];

    function Dividend ($resource, DateUtils) {
        var resourceUrl =  'api/dividends/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.recordLocalDate = DateUtils.convertLocalDateFromServer(data.recordLocalDate);
                        data.exLocalDate = DateUtils.convertLocalDateFromServer(data.exLocalDate);
                        data.paymentLocalDate = DateUtils.convertLocalDateFromServer(data.paymentLocalDate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.recordLocalDate = DateUtils.convertLocalDateToServer(copy.recordLocalDate);
                    copy.exLocalDate = DateUtils.convertLocalDateToServer(copy.exLocalDate);
                    copy.paymentLocalDate = DateUtils.convertLocalDateToServer(copy.paymentLocalDate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.recordLocalDate = DateUtils.convertLocalDateToServer(copy.recordLocalDate);
                    copy.exLocalDate = DateUtils.convertLocalDateToServer(copy.exLocalDate);
                    copy.paymentLocalDate = DateUtils.convertLocalDateToServer(copy.paymentLocalDate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
