'use strict';

describe('fourSquareData serivce', () => {
    let fourSquareData;
    let httpBackend;

    beforeEach(module("foursquare"));

    beforeEach(inject(function (_fourSquareData_, $httpBackend) {
        fourSquareData = _fourSquareData_;
        httpBackend = $httpBackend;
    }));

    beforeEach(() => {
        httpBackend.whenGET('https://api.foursquare.com/v2/venues/explore').respond(function(method, url, data) {
            var request = new XMLHttpRequest();

            request.open('GET', '/test/mocks/explore.json', false);
            request.send(null);

            return [request.status, request.response, {}];
        });
        httpBackend.whenGET('https://api.foursquare.com/v2/venues/:id').respond(function(method, url, data) {
            var request = new XMLHttpRequest();

            request.open('GET', '/test/mocks/details.json', false);
            request.send(null);

            return [request.status, request.response, {}];
        });
    });


    it('gets new data when the query is updated', () => {
        
    });

    it('gets detailed data when a venue is selected', () => {

    });
    
    it('selects a venue when a venue is toggled when none is selected', () => {
        
    });

    it('selects a venue when a different venue is toggled than the one currently selected', () => {
        
    });
    
    it('unselects the currently selected venue when it is toggled', () => {
        
    });
});
