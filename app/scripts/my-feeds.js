angular.module('my-feeds', [
    'feeds'
  ])
  .controller('MyFeedsController', ['$scope', '$compile', '$http', 'storage', function ($scope, $compile, $http, storage) {
    $scope.isOrigin = function () {
      var url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
      return window.parent.location.href.indexOf(url) !== -1;
    };

    $scope.$watch('feeds', function (newValue, oldValue) {
      if (newValue) {
        storage.set('feeds', newValue);
      }
    }, true);

    if (!storage.get('feeds')) {
      $http.get('my-feeds.json').success(function (feeds) {
        $scope.feeds = feeds;
      });
    }
    else {
      $scope.feeds = storage.get('feeds');
    }

  }])
  .directive('feedWidget', ['$compile', function ($compile) {
    return  {
      restrict: 'A',
      controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element) {
        var feed = $scope.feed;
        var feedHTML = "<feed url='" + feed.url + "' count='" + feed.count + "' summary=" + (feed.summary ? 'true' : 'false') + " post-render='feedPostRender'/>";
        $element.append($compile(feedHTML)($scope));
      }]
    };
  }])
  .controller('FeedWidgetController', ['$scope', function ($scope) {
    $scope.toggleFeed = function () {
      $scope.collapsed = !$scope.collapsed;
    };

    $scope.deleteFeed = function () {
      if (confirm('Are you sure you want to delete this feed?') && $scope.feeds.indexOf($scope.feed) > -1) {
        $scope.feeds.splice($scope.feeds.indexOf($scope.feed), 1);
      }
    }
  }])
  .factory('storage', function () {
    return {
      set: function (name, obj) {
        localStorage[name] = angular.toJson(obj);
      },
      get: function (name) {
        return angular.fromJson(localStorage[name]);
      }
    };
  });

function feedPostRender(element) {
  $(element).find('a').attr('target', '_blank');
}
