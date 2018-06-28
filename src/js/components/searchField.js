angular.module('foursquare').
component('searchField', {
    bindings:   {
    },
    controllerAs: 'search',
    controller: ['fourSquareData', '$scope', '$element', function (fourSquareData, $scope, $element) {
        let search = this;
        search.data = fourSquareData;
    }],
    template: `
        <div class="container">
            <label>
                Where do you want to search?
                <input type="text" ng-model="search.data.query" ng-model-options="{ debounce: 250 }"
                        ng-change="search.data.updateQuery(search.data.query)" class="search-field">
            </label>
            <div class="searchtype">
                <div>
                    <input type="radio" value="search" ng-model="search.data.searchtype" ng-change="search.data.updateQuery(search.data.query)"  name="searchtype" />
                    <label for="search">Nearest</label>
                </div>
                <div>
                    <input type="radio" value="explore" ng-model="search.data.searchtype" ng-change="search.data.updateQuery(search.data.query)"  name="searchtype" />
                    <label for="search">Recommended</label> 
                </div>
            </div>
        </div>
    `

});