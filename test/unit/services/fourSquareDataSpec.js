'use strict';

describe('fourSquareData serivce', () => {
    let fourSquareData;
    let httpBackend;

    const detail1regex = /https:\/\/api\.foursquare\.com\/v2\/venues\/1\?.*/;
    const detail2regex = /https:\/\/api\.foursquare\.com\/v2\/venues\/1\?.*/;
    const exploreregex = /https:\/\/api\.foursquare\.com\/v2\/venues\/explore\?.*/;

    beforeEach(module("foursquare"));

    beforeEach(inject(function (_fourSquareData_, $httpBackend) {
        fourSquareData = _fourSquareData_;
        httpBackend = $httpBackend;
    }));

    beforeEach(() => {
        httpBackend.whenGET(exploreregex).respond(function(method, url, data) {
            var request = new XMLHttpRequest();

            console.log("explore");

            request.open('GET', 'test/mocks/explore.json', false);
            request.send(null);

            return [request.status, request.response, {}];
        });
//         httpBackend.whenGET(/https:\/\/api\.foursquare\.com\/v2\/venues\/1\?.*/).respond(function(method, url, data) {
// //        httpBackend.whenGET('https://api.foursquare.com/v2/venues/:id').respond(function(method, url, data) {
//             var request = new XMLHttpRequest();
//             console.log("details");
//
//             request.open('GET', 'test/mocks/details.json', false);
//             request.send(null);
//
//             return [request.status, request.response, {}];
//         });
    });


    it('gets new data when the query is updated', () => {
    });

    it('gets detailed data when a venue is selected', () => {

    });
    
    it('selects a venue when a venue is toggled when none is selected', () => {
        let item1 = {item: 1, venue: {id: 1}};
        let item2 = {item: 2, venue: {id: 2}};
        let item1Details = {id: 1, name: 'item1'};
        let items = [item1, item2];

        httpBackend.whenGET(detail1regex).respond({response: item1Details});

        fourSquareData.toggle(item1);

        httpBackend.flush();

        expect(fourSquareData.selection).toEqual(item1);
        expect(fourSquareData.details[item1.venue.id]).toEqual(item1Details);
        expect(fourSquareData.details[item2.venue.id]).toBeUndefined();
        expect(fourSquareData.current).toEqual(item1Details);
    });

    it('selects a venue when a different venue is toggled than the one currently selected', () => {
        let item1 = {item: 1, venue: {id: 1}};
        let item2 = {item: 2, venue: {id: 2}};
        let item1Details = {id: 1, name: 'item1'};
        let items = [item1, item2];

        httpBackend.whenGET(detail1regex).respond({response: item1Details});
        fourSquareData.selection = item2;

        fourSquareData.toggle(item1);
        
        httpBackend.flush();

        expect(fourSquareData.selection).toEqual(item1);
        expect(fourSquareData.details[item1.venue.id]).toEqual(item1Details);
        expect(fourSquareData.details[item2.venue.id]).toBeUndefined();
        expect(fourSquareData.current).toEqual(item1Details);
    });
    
    it('unselects the currently selected venue when it is toggled', () => {
        let item1 = {item: 1, venue: {id: 1}};
        let item2 = {item: 2, venue: {id: 2}};
        let item1Details = {id: 1, name: 'item1'};
        let items = [item1, item2];

        httpBackend.whenGET(detail1regex).respond({response: item1Details});
        fourSquareData.selection = item1;
        fourSquareData.current = item1Details;

        fourSquareData.toggle(item1);

        httpBackend.flush();

        expect(fourSquareData.selection).toBeNull();
        expect(fourSquareData.current).toBeNull();
    });
});
