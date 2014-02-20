'use strict';

angular.module('feeds-directives', []).directive('feed', ['feedService', '$compile', '$templateCache', '$http', function (feedService, $compile, $templateCache, $http) {
  return  {
    restrict: 'E',
    scope: {
      summary: '=summary'
    },
    controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
      $scope.$watch('finishedLoading', function (value) {
        if ($attrs.postRender && value) {
          $timeout(function () {
            new Function("element", $attrs.postRender + '(element);')($element);
          }, 0);
        }
      });

      $scope.feeds = [];

      var spinner = $templateCache.get('feed-spinner.html');
      $element.append($compile(spinner)($scope));

      function renderTemplate(templateHTML, feedsObj) {
        $element.append($compile(templateHTML)($scope));
        if (feedsObj) {
          for (var i = 0; i < feedsObj.length; i++) {
            $scope.feeds.push(feedsObj[i]);
          }
        }
      }

      feedService.getFeeds($attrs.url, $attrs.count).then(function (feedsObj) {
        if ($attrs.templateUrl) {
          $http.get($attrs.templateUrl, {cache: $templateCache}).success(function (templateHtml) {
            renderTemplate(templateHtml, feedsObj);
          });
        }
        else {
          renderTemplate($templateCache.get('feed-list.html'), feedsObj);
        }
      },function (error) {
        console.error('Error loading feed ', error);
        $scope.error = error;
        renderTemplate($templateCache.get('feed-list.html'));
      }).finally(function () {
        $element.find('.spinner').slideUp();
        $scope.$evalAsync('finishedLoading = true')
      });
    }]
  }
}]);
