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
            <li ng-repeat="item in group.items" ng-click="resultList.data.toggle(item)" ng-selected="resultList.data.selected(item)">
            {{item.venue.name}}
            </li>
        </ul>
    `

});