angular.module('foursquare').
    factory('fourSquareApi', function($resource){

        let client_id = 'NL3MD2G0IKFWY1EN5Y4LQWWXCFVSFB2LCBIK05AUIEIRWWSC';
        let client_secret = 'SV1RTHFBPQWNWM0KP4KSU4BBFBLNBQDNPJIF53QBDJL4WLRB';
        let api_url = 'https://api.foursquare.com/v2/venues/:action';
        let version = '20180323';

        let defaultParams = {
            client_id: client_id,
            client_secret: client_secret,
            v: version
        };

        return $resource(api_url, defaultParams, {
            query: {method:'GET', params:{action: 'explore'}},
            details: {method: 'GET', params: {action: 'id'}}
        });
    });