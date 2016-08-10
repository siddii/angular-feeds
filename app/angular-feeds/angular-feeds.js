/**
 * angular-feeds - v0.0.4 - 2016-08-10 4:43 PM
 * https://github.com/siddii/angular-feeds
 *
 * Copyright (c) 2016 
 * Licensed MIT <https://github.com/siddii/angular-feeds/blob/master/LICENSE.txt>
 */
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

      $attrs.$observe('url', function(url){
        feedService.getFeeds(url, $attrs.count).then(function (feedsObj) {
          if ($attrs.template && $templateCache.get($attrs.template)) {
            renderTemplate($templateCache.get($attrs.template), feedsObj);
          } else if ($attrs.templateUrl) {
            $http.get($attrs.templateUrl, {cache: $templateCache}).success(function (templateHtml) {
              renderTemplate(templateHtml, feedsObj);
            });
          } else {
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
      });
    }]
  }
}]);

'use strict';

angular.module('feeds', ['feeds-services', 'feeds-directives']);
'use strict';

angular.module('feeds-services', []).factory('feedService', ['$q', '$sce', 'feedCache', function ($q, $sce, feedCache) {

    function sanitizeFeedEntry(feedEntry) {
      feedEntry.title = $sce.trustAsHtml(feedEntry.title);
      feedEntry.contentSnippet = $sce.trustAsHtml(feedEntry.contentSnippet);
      feedEntry.content = $sce.trustAsHtml(feedEntry.content);
      feedEntry.publishedDate = new Date(feedEntry.publishedDate).getTime();
      return feedEntry;
    }

    function sanitizeEntries(entries) {
      for (var i = 0; i < entries.length; i++) {
        sanitizeFeedEntry(entries[i]);
      }
    }

    var getFeeds = function (feedURL, count) {
      var deferred = $q.defer();

      if (feedCache.hasCache(feedURL)) {
        var entries = feedCache.get(feedURL);
        sanitizeEntries(entries);
        deferred.resolve(entries);
      }

      google.load('feeds','1');
      var feed = new google.feeds.Feed(feedURL);
      if (count) {
        feed.includeHistoricalEntries();
        feed.setNumEntries(count);
      }

      feed.load(function (response) {
        if (response.error) {
          deferred.reject(response.error);
        }
        else {
          feedCache.set(feedURL, response.feed.entries);
          sanitizeEntries(response.feed.entries);
          deferred.resolve(response.feed.entries);
        }
      });
      return deferred.promise;
    };

    return {
      getFeeds: getFeeds
    };
  }])
  .factory('feedCache', function () {
    var CACHE_INTERVAL = 1000 * 60 * 5; //5 minutes

    function cacheTimes() {
      if ('CACHE_TIMES' in localStorage) {
        return angular.fromJson(localStorage.getItem('CACHE_TIMES'));
      }
      return {};
    }

    function hasCache(name) {
      var CACHE_TIMES = cacheTimes();
      return name in CACHE_TIMES && name in localStorage && new Date().getTime() - CACHE_TIMES[name] < CACHE_INTERVAL;
    }

    return {
      set: function (name, obj) {
        localStorage.setItem(name, angular.toJson(obj));
        var CACHE_TIMES = cacheTimes();
        CACHE_TIMES[name] = new Date().getTime();
        localStorage.setItem('CACHE_TIMES', angular.toJson(CACHE_TIMES));
      },
      get: function (name) {
        if (hasCache(name)) {
          return angular.fromJson(localStorage.getItem(name));
        }
        return null;
      },
      hasCache: hasCache
    };
  });

angular.module('feeds').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('feed-list.html',
    "<div>\n" +
    "    <div ng-show=\"error\" class=\"alert alert-danger\">\n" +
    "        <h5 class=\"text-center\">Oops... Something bad happened, please try later :(</h5>\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"media-list\">\n" +
    "        <li ng-repeat=\"feed in feeds | orderBy:publishedDate:reverse\" class=\"media\">\n" +
    "            <div class=\"media-body\">\n" +
    "                <h4 class=\"media-heading\"><a target=\"_new\" href=\"{{feed.link}}\" ng-bind-html=\"feed.title\"></a></h4>\n" +
    "                <p ng-bind-html=\"!summary ? feed.content : feed.contentSnippet\"></p>\n" +
    "            </div>\n" +
    "            <hr ng-if=\"!$last\"/>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>"
  );


  $templateCache.put('feed-spinner.html',
    "<div class=\"spinner\">\n" +
    "    <div class=\"bar1\"></div>\n" +
    "    <div class=\"bar2\"></div>\n" +
    "    <div class=\"bar3\"></div>\n" +
    "    <div class=\"bar4\"></div>\n" +
    "    <div class=\"bar5\"></div>\n" +
    "    <div class=\"bar6\"></div>\n" +
    "    <div class=\"bar7\"></div>\n" +
    "    <div class=\"bar8\"></div>\n" +
    "</div>\n"
  );

}]);
