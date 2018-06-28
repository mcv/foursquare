angular.module('foursquare').
    service('fourSquareData', function(fourSquareApi){
    
        this.results = {empty: true};
        this.query = '';
        this.details = {};

        this.updateQuery = () => {
            fourSquareApi.query({ll: '40.7243,-74.0018'}).$promise.then(data => {
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

        this.updateQuery();
    });