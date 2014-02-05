'use strict';

angular.module('feeds-directives', []).directive('feed', ['feedsService', function (feedsService) {
    return  {
        restrict: 'E',
        replace: false,
        link: function ($scope, $element) {
            console.log('##### Feed Directive', feedsService);
        }
    }
}]);
