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
