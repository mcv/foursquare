angular.module('foursquare').
    service('fourSquareData', function(fourSquareApi, geolocation){
    
        this.results = {empty: true};
        this.query = '';
        this.details = {};

        const ll_regex = /\d+(\.\d*)?,\d+(\.\d*)?/;

        let parseQuery = query => {
            if (typeof query === "string" && query.match(ll_regex)) {
                return {ll: query};
            }
            if (query.longitude && query.latitude) {
                return {ll: query.latitude+","+query.longitude};
            }
            else {
                return {near: query};
            }
        };

        this.updateQuery = query => {
            console.log("query: ",query);
            let queryObject = parseQuery(query);
            console.log("query obj: ",queryObject);
            fourSquareApi.query(queryObject).$promise.then(data => {
                this.results = data.response;
            }, error => {
                console.log("error: ",error);
            });
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

        this.toggle = item => {
            if (this.selected(item)) {
                this.selection = null;
                this.current = null;
            }
            else {
                this.selection = item;
                this.updateDetails(item.venue.id);
            }
        };

        this.selected = item => this.selection === item;

        this.selectedDetails = () => this.selection? this.details[this.selection.venue.id]: null;

        if (geolocation.ll) {
            this.updateQuery(geolocation.ll);
        }
        else {
            geolocation.register(location => this.updateQuery(location));
        }
    });