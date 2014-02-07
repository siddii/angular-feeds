'use strict';

angular.module('feeds-directives', []).directive('feed', ['feedService', '$compile', '$templateCache', function (feedService, $compile, $templateCache) {
  return  {
    restrict: 'E',
    replace: false,
    controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {

      $scope.feeds = [];

      var spinner = $templateCache.get('spinner.html');
      $element.append($compile(spinner)($scope));

      feedService.getFeeds($attrs.src).then(function (feedsObj) {
        if (feedsObj.length > 0) {

          $element.find('.spinner').slideUp();

          $element.append($compile($templateCache.get('template.html'))($scope));

          for (var i = 0; i < feedsObj.length; i++) {
            $scope.feeds.push(feedsObj[i]);
          }
        }
      });
    }]
  }
}]);
