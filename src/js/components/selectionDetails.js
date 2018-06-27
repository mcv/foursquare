angular.module('foursquare').
    component('selectionDetails', {
        bindings:   {
        },
        controllerAs: 'details',
        controller: ['fourSquareData', '$scope', '$element', function (fourSquareData, $scope, $element) {
            let details = this;
            details.data = fourSquareData;
            details.venue = () => fourSquareData.current? fourSquareData.current.venue: null;
        }],
        template: `
            <div ng-show="details.venue()" class="selection-details">
                <h1>{{details.venue().name}}</h1>
                <div class="categories">
                    <span ng-repeat="category in details.venue().categories">
                        {{category.name}}
                    </span>                
                </div>
                <a ng-href="details.venue().canonicalUrl">Visit on FourSquare</a>
                <a ng-href="details.venue().url">Visit {{details.venue().name}}'s website</a>
                <p>Phone: {{details.venue().phone}}</p>
                <p>Address: 
                    <span ng-repeat="line in details.venue().location.formattedAddress"><br/>{{line}}</span>
                </p>
            </div>
        `

    });