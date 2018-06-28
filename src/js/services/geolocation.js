angular.module('foursquare').
service('geolocation', function(){
    this.ll = null;

    let callbacks = [];

    this.register = callback => callbacks.push(callback);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("position: ",position);
            this.ll = position.coords.latitude+","+position.coords.longitude;
            callbacks.forEach(callback => callback(position.coords));
        });
    }
});
