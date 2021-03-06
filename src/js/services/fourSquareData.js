angular.module('foursquare').
    service('fourSquareData', function(fourSquareApi, geolocation){
    
        this.results = {empty: true};
        this.query = '';
        this.searchtype = 'search';
        this.details = {};
    
        const searchCallback = {
            search: data => {
                this.results = data.response;
            },
            explore: data => {
                this.results = data.response;
            }
        };

        const ll_regex = /\d+(\.\d*)?,\d+(\.\d*)?/;

        let parseQuery = query => {
            if (typeof query === "string" && query.match(ll_regex)) {
                return {ll: query};
            }
            if (query.longitude && query.latitude) {
                return {ll: query.latitude+","+query.longitude};
            }
            if (typeof query === "string" && query.length > 0) {
                return {near: query};
            }
        };

        this.updateQuery = query => {
            let queryObject = parseQuery(query);
            if (queryObject) {
                fourSquareApi[this.searchtype](queryObject).$promise.then(searchCallback[this.searchtype], error => {
                    console.log("error: ",error);
                });
            }
        };

        this.updateDetails = id => {
            if (!this.details[id]) {
                fourSquareApi.details({action: id}).$promise.then(data => {
                    this.details[id] = data.response;
                    this.current = data.response;
                }, error => {
                    console.log("error: ",error);
                });
            }
            else {
                this.current = this.details[id];
            }
        };

        this.toggle = venue => {
            if (this.selected(venue)) {
                this.selection = null;
                this.current = null;
            }
            else {
                this.selection = venue;
                this.updateDetails(venue.id);
            }
        };

        this.selected = venue => this.selection === venue;

        this.selectedDetails = () => this.selection? this.details[this.selection.id]: null;

        if (geolocation.ll) {
            this.updateQuery(geolocation.ll);
        }
        else {
            geolocation.register(location => {
                if (this.results.empty) {
                    this.query = location.latitude+","+location.longitude;
                    this.updateQuery(location);
                }
            });
        }
    });