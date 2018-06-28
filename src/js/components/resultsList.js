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
            {{item.venue.name}} <span class="distance" ng-show="venue.location.distance">{{item.venue.location.distance}} m</span>
            </li>
        </ul>
        <ul ng-show="resultList.data.results.venues" class="results-list">
            <li ng-repeat="venue in resultList.data.results.venues" ng-click="resultList.data.toggle(venue)" ng-selected="resultList.data.selected(venue)">
            {{venue.name}} <span class="distance" ng-show="venue.location.distance">{{venue.location.distance}} m</span>
            </li>
        </ul>
        <div ng-show="resultList.data.results.empty" class="please-wait">
            Please wait while we retrieve your location, or type your own search query above.
        </div>
    `

});