'use strict';

angular.module('feeds-services', []);

angular
    .module('feeds-services')
    .factory('feedService', ['$window', '$q', '$sce', 'feedCache', feedService]);
angular
    .module('feeds-services')
    .factory('feedCache', feedCache);

function feedService ($window, $q, $sce, feedCache) {

    return {
        getFeeds: getFeeds,
        clearCache: clearCache
    };

    function clearCache(forFeed) {
        if(feedCache.hasCache(forFeed)) {
            feedCache.unset(forFeed);
        }
    }

    function getFeeds (feedURL, count) {
        var deferredFeedsFetch = $q.defer();

        if (count === 0) {
            console.warn('called getFeeds with count ' + count);
            setTimeout(deferredFeedsFetch.resolve, 400);
            return deferredFeedsFetch.promise;
        }

        feedCache.hasCache(feedURL)
            ? deferredFeedsFetch.resolve(sanitizeEntries(feedCache.get(feedURL)))
            : fetchFeed(feedURL);

        return deferredFeedsFetch.promise;

        function fetchFeed (feedURL) {
            try {
                YUI().use('yql', performYQLQuery(feedURL));
            } catch (ex) {
                deferredFeedsFetch.reject(ex);
            }
        }

        function performYQLQuery (feedURL) {
            return function (Y) {
                var query = 'select * from feed(0,' + count + ') where url = "' + feedURL + '"',
                    href = $window.location && $window.location.href ? $window.location.href : null,
                    proto = href && (href.toLowerCase().indexOf('https') === 0) ? 'https' : 'http';

                Y.YQL(query, parseYQLResponse, {}, {proto: proto});
            };
        }

        function parseYQLResponse (rawResponse) {

            var response = [];

            if (rawResponse.query.count) {
                var itemsIndex = typeof rawResponse.query.results.item === 'undefined' ? 'entry' : 'item';
                var entries    = rawResponse.query.results[itemsIndex];
                feedCache.set(feedURL, entries);
                response = sanitizeEntries(entries);
            }

            resolve(response);
        }

        function resolve (withData) {
            deferredFeedsFetch.resolve(withData);
        }
    }

    function sanitizeFeedEntry (feedEntry) {
        var normalizedFeedEntry = {};

        var properties = [
            {indexName: 'content', possibleIndexNames: ['content', 'description', 'summary']},
            {indexName: 'title', possibleIndexNames: ['title']},
            {indexName: 'link', possibleIndexNames: ['link']}
        ];

        properties.forEach(function (property) {
            property.possibleIndexNames.forEach(function (contentIndex) {
                if (feedEntry[contentIndex]) {
                    var content = typeof feedEntry[contentIndex] === 'string' ? feedEntry[contentIndex] : feedEntry[contentIndex].content;
                    if (!content) {
                        content = feedEntry[contentIndex].href;
                    }
                    normalizedFeedEntry[property.indexName] = $sce.trustAsHtml(content);
                }
            });
        });

        return normalizedFeedEntry;
    }

    function sanitizeEntries (entries) {
        var sanitezedEntries = [];
        for (var i = 0; i < entries.length; i++) {
            sanitezedEntries.push(sanitizeFeedEntry(entries[i]));
        }

        return sanitezedEntries;
    }
}

function feedCache () {
    var CACHE_INTERVAL = 1000 * 60 * 5; //5 minutes

    function cacheTimes () {
        if ('CACHE_TIMES' in localStorage) {
            return angular.fromJson(localStorage.getItem('CACHE_TIMES'));
        }
        return {};
    }

    function hasCache (name) {
        var CACHE_TIMES = cacheTimes();
        return name in CACHE_TIMES && name in localStorage && new Date().getTime() - CACHE_TIMES[name] < CACHE_INTERVAL;
    }

    return {
        set     : function (name, obj) {
            localStorage.setItem(name, angular.toJson(obj));
            var CACHE_TIMES   = cacheTimes();
            CACHE_TIMES[name] = new Date().getTime();
            localStorage.setItem('CACHE_TIMES', angular.toJson(CACHE_TIMES));
        },
        get     : function (name) {
            if (hasCache(name)) {
                return angular.fromJson(localStorage.getItem(name));
            }
            return null;
        },
        unset: function(name) {
              localStorage.removeItem(name);
        },
        hasCache: hasCache
    };
}

//angular.module('feeds-services')
//    .provider('yui', [yui])
//    .run(['yui', function (yuiLoader) {
//    }]);
//
//function yui () {
//    this.$get = ['$q', loadYuiScript];
//
//    function loadYuiScript ($q) {
//        var isNotLoadingScript = true, requests = [];
//        fetchScript();
//
//        return {
//            load: fetchScript
//        };
//
//        function fetchScript () {
//            var deferred = $q.defer();
//            requests.push(deferred);
//
//            if ((!document.querySelector('[src*="yui-min.js"]') && !document.querySelector('[src*="yui.js"]'))
//                && isNotLoadingScript) {
//                isNotLoadingScript = false;
//                var script         = document.createElement('script');
//                script.onload      = function () {
//                    isNotLoadingScript = true;
//                    requests.forEach(function (request) {
//                        request.resolve();
//                    });
//                };
//                script.src         = "http://yui.yahooapis.com/3.18.1/build/yui/yui-min.js";
//                document.getElementsByTagName('head')[0].appendChild(script);
//            } else if (isNotLoadingScript) {
//                deferred.resolve();
//            }
//
//            return deferred.promise;
//        }
//    }
//}