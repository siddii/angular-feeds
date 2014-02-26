angular.module('app-templates', []);

angular.module('my-feeds', [
    'feeds',
    'app-templates'
  ])
  .controller('MyFeedsController', ['$scope', '$compile', '$http', 'storage', '$templateCache', '$sce', function ($scope, $compile, $http, storage, $templateCache, $sce) {

    $scope.isOrigin = function () {
      var url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
      return window.parent.location.href.indexOf(url) !== -1;
    };

    $scope.addFeedPopover = function () {
      console.log('#### Showing Add Feed Popover');
    };

    $scope.showPopover = function () {
      console.log('#### Showing Popover');
      $(this).popover('show');
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

//    $('button.add-feed').popover('toggle', {content: function () {
//      return $templateCache.get('templates/add_feed_popover.html');
//    }});
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
