'use strict';

angular.module('feeds-services', []).factory('feedService', ['$q', '$sce', 'feedCache', function ($q, $sce, feedCache) {

    function sanitizeFeedEntry(feedEntry) {
      feedEntry.title = $sce.trustAsHtml(feedEntry.title);
      feedEntry.contentSnippet = $sce.trustAsHtml(feedEntry.contentSnippet);
      feedEntry.content = $sce.trustAsHtml(feedEntry.content);
      feedEntry.publishedDate = new Date(feedEntry.publishedDate).getTime();
      return feedEntry;
    }

    var getFeeds = function (feedURL, count) {
      var deferred = $q.defer();

      if (feedCache.hasCache(feedURL)) {
        return deferred.resolve(sanitizeFeedEntry(feedCache.get(feedURL)));
      }

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
          feedCache.set(response.feed.entries);
          for (var i = 0; i < response.feed.entries.length; i++) {
            sanitizeFeedEntry(response.feed.entries[i]);
          }
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
        return angular.fromJson(localStorage['CACHE_TIMES']);
      }
      return {};
    }

    function hasCache(name) {
      var CACHE_TIMES = cacheTimes();
      return name in CACHE_TIMES && name in localStorage && new Date().getTime() - CACHE_TIMES[name] < CACHE_INTERVAL;
    }

    return {
      set: function (name, obj) {
        localStorage[name] = angular.toJson(obj);
        var CACHE_TIMES = cacheTimes();
        CACHE_TIMES[name] = new Date().getTime();
        localStorage['CACHE_TIMES'] = angular.toJson(CACHE_TIMES);
      },
      get: function (name) {
        if (hasCache(name)) {
          return angular.fromJson(localStorage[name]);
        }
        return null;
      },
      hasCache: hasCache
    };
  });