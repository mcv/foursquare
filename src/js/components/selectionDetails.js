angular.module('foursquare').
    component('selectionDetails', {
        bindings:   {
        },
        controllerAs: 'details',
        controller: ['fourSquareData', function (fourSquareData) {
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
                <div class="links">
                    <a ng-href="details.venue().canonicalUrl">Visit on FourSquare</a>
                    <a ng-href="details.venue().url">Visit {{details.venue().name}}'s website</a>
                </div>
                <div class="contact" ng-show="details.venue().location.formattedAddress || details.venue().contact.formattedPhone">
                    <p ng-show="details.venue().contact.formattedPhone">Phone: {{details.venue().contact.formattedPhone}}</p>
                    <p ng-show="details.venue().location.formattedAddress">Address: 
                        <span ng-repeat="line in details.venue().location.formattedAddress"><br/>{{line}}</span>
                    </p>
                </div>
            </div>
        `

    });