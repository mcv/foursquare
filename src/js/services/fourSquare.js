angular.module('foursquare').
    factory('fourSquareApi', function($resource){

        let client_id = 'NWBNFLSAY0LNQIO5XV43NJSRWL2PCOZJ3TCCJ0R4WCVLO1YU';
        let client_secret = 'B45JUHGJ324PEFEV2S1PWI3QL3Y5SZJ2YOIHEUGQ1KPKUUPB';
        let api_url = 'https://api.foursquare.com/v2/venues/:action';
        let version = '20180323';

        let defaultParams = {
            client_id: client_id,
            client_secret: client_secret,
            v: version
        };

        return $resource(api_url, defaultParams, {
            explore: {method:'GET', params:{action: 'explore'}},
            search: {method:'GET', params:{action: 'search'}},
            details: {method: 'GET', params: {action: 'id'}}
        });
    });