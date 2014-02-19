angular.module('my-feeds', [
    'feeds'
  ])
  .controller('MyFeedsController', ['$scope', '$compile', '$http', '$rootScope', function ($scope, $compile, $http, $rootScope) {
    $scope.isOrigin = function () {
      var url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
      return window.parent.location.href.indexOf(url) !== -1;
    };

    $http.get('my-feeds.json').success(function (feeds) {
      $scope.feeds = feeds;
    });
  }])
  .directive('feedWidget', ['$compile', function ($compile) {
    return  {
      restrict: 'A',
      controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element) {
        var feed = $scope.feed;
        console.log('##### feed.summary = ', feed.summary);
        var feedHTML = "<feed url='" + feed.url + "' count='" + feed.count + "' summary=" + (feed.summary ? 'true' : 'false') + " post-render='feedPostRender'/>";
        $element.append($compile(feedHTML)($scope));
      }]
    };
  }])
  .controller('FeedWidgetController', ['$scope', function ($scope) {
    $scope.toggleFeed = function () {
      $scope.collapsed = !$scope.collapsed;
    };
  }]);

function feedPostRender(element) {
  $(element).find('a').attr('target', '_blank');
}
