'use strict';

angular.module('feeds-directives', []).directive('feed', ['feedsService', '$compile', '$templateCache', function (feedsService, $compile, $templateCache) {
  return  {
    restrict: 'E',
    replace: false,
    controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
      if ($element.html().trim().length === 0) {
        $element.append($compile($templateCache.get('feeds-template'))($scope));
      } else {
        $element.append($compile($element.contents())($scope));
      }
    }]
  }
}]);
