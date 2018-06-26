angular.module('foursquare').
    service('fourSquareData', function(fourSquareApi){
    
        this.results = {empty: true};
        this.query = '';
        this.update = () => {
            console.log("update()");
            fourSquareApi.query({ll: '40.7243,-74.0018'}).$promise.then(data => {
                console.log("success: ",data.response);
                console.log("# results = ",data.response.groups[0].items.length);
                this.results = data.response;
            }, error => {
                console.log("error: ",error);
            });
        }

        this.update();
    });