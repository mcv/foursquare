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
        <ul ng-repeat="group in resultList.data.results.groups" class="results-list">
            <li>{{group.type}}</li>
            <li ng-repeat="item in group.items" ng-click="resultList.data.toggle(item)" ng-selected="resultList.data.selected(item.vanue)">
            {{item.venue.name}}
            </li>
        </ul>
        <ul ng-show="resultList.data.results.venues" class="results-list">
            <li ng-repeat="venue in resultList.data.results.venues" ng-click="resultList.data.toggle(venue)" ng-selected="resultList.data.selected(venue)">
            {{venue.name}}
            </li>
        </ul>
    `

});