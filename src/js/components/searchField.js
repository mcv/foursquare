angular.module('foursquare').
component('searchField', {
    bindings:   {
    },
    controller: ['fourSquareData', '$scope', '$element', function (fourSquareData, $scope, $element) {
        this.data = fourSquareData;
    }],
    template: `
        <input type="text" ng-model="fourSquareData.query" ng-change="fourSquareData.update()">
    `

});