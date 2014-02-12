'use strict';

angular.module('feeds-directives', []).directive('feed', ['feedService', '$compile', '$templateCache', function (feedService, $compile, $templateCache) {
  return  {
    restrict: 'E',
    scope: {
      summary: '=summary'
    },
    controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {

      $scope.$watch('finishedLoading', function (value){
        if ($attrs.postRender && value) {
          $timeout(function (){
            new Function($attrs.postRender)();
          });
        }
      });

      $scope.feeds = [];

      var spinner = $templateCache.get('feed-spinner.html');
      $element.append($compile(spinner)($scope));

      feedService.getFeeds($attrs.src, $attrs.count).then(function (feedsObj) {
        if (feedsObj.length > 0) {

          $element.find('.spinner').slideUp();

          $element.append($compile($templateCache.get('feed-list.html'))($scope));

          for (var i = 0; i < feedsObj.length; i++) {
            $scope.feeds.push(feedsObj[i]);
          }
        }
      }, function (error) {
        $scope.error = error;
        console.error('Error loading feed ', error);
      }).finally(function (){
        $scope.$evalAsync('finishedLoading = true')
      });
    }]
  }
}]);
