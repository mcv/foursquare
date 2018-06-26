angular.module('foursquare').
component('resultsList', {
    bindings:   {
    },
    controllerAs: 'resultList',
    controller: ['fourSquareData', '$scope', '$element', function (fourSquareData, $scope, $element) {
        let resultList = this;
        resultList.data = fourSquareData;
    }],
    template: `
        <ul ng-repeat="group in resultList.data.results.groups">
            <li>{{group.type}}</li>
            <li ng-repeat="item in group.items">
            {{item.venue.name}}
            </li>
        </ul>
    `

});