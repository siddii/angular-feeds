'use strict';

angular.module('feeds-services', []);

angular
    .module('feeds-services')
    .factory('feedService', ['$q', '$sce', 'feedCache', 'yui', feedService]);
angular
    .module('feeds-services')
    .factory('feedCache', feedCache);

function feedService ($q, $sce, feedCache, yui) {
    var YQLUrl = 'http://query.yahooapis.com/v1/public/yql?q=', query = 'select * from rss where url=';
    return {
        getFeeds: getFeeds
    };

    function sanitizeFeedEntry (feedEntry) {
        console.log(feedEntry);
        var normalizedFeedEntry = {};


        var properties = [
            {indexName: 'content', possibleIndexNames: ['content', 'description', 'summary']},
            {indexName: 'title', possibleIndexNames: ['title']},
            {indexName: 'link', possibleIndexNames: ['link']}
        ];

        properties.forEach(function(property) {
            property.possibleIndexNames.forEach(function(contentIndex) {
                if(feedEntry[contentIndex]) {
                    var content = typeof feedEntry[contentIndex] === 'string' ? feedEntry[contentIndex] : feedEntry[contentIndex].content;
                    if(!content) {
                        content = feedEntry[contentIndex].href;
                    }
                    normalizedFeedEntry[property.indexName] =  $sce.trustAsHtml(content);
                }
            });
        });

        return normalizedFeedEntry;
    }

    function sanitizeEntries (entries) {
        var sanitezedEntries = []
        for (var i = 0; i < entries.length; i++) {
            sanitezedEntries.push(sanitizeFeedEntry(entries[i]));
        }

        return sanitezedEntries;
    }

    function getFeeds (feedURL, count) {
        var deferred = $q.defer();

        var fullUrlFeed = encodeURI(YQLUrl) + encodeURIComponent(query + feedURL);

        if (feedCache.hasCache(fullUrlFeed)) {
            var entries = feedCache.get(fullUrlFeed);
            deferred.resolve(sanitizeEntries(entries));
        } else if (count) {
            yui
                .load()
                .then(fetchFeed);
        } else {
            console.warn('called getFeeds with count ' + count);
        }

        function fetchFeed () {
            try {
                YUI().use('yql', function (Y) {
                    var query = 'select * from feed(0,' + count + ') where url = "' + feedURL + '"';
                    var q     = Y.YQL(query, function (response) {
                        //r now contains the result of the YQL Query as a JSON
                        console.log(response, feedURL);
                        if (response.query.count) {
                            var itemsIndex = typeof response.query.results.item === 'undefined' ? 'entry' : 'item';
                            var entries    = response.query.results[itemsIndex];
                            feedCache.set(feedURL, entries);
                            deferred.resolve(sanitizeEntries(entries));
                        } else {
                            deferred.resolve([]);
                        }
                    });
                })
            } catch(ex) {
                deferred.reject(ex);
            }

        }

//        google.load('feeds', '1');
//        var feed = new google.feeds.Feed(feedURL);
//        if (count) {
//            feed.includeHistoricalEntries();
//            feed.setNumEntries(count);
//        }
//
//        feed.load(function (response) {
//            if (response.error) {
//                deferred.reject(response.error);
//            }
//            else {
//                feedCache.set(feedURL, response.feed.entries);
//                sanitizeEntries(response.feed.entries);
//                deferred.resolve(response.feed.entries);
//            }
//        });

        return deferred.promise;
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
        hasCache: hasCache
    };
}

angular.module('feeds-services')
    .provider('yui', [yui])
    .run(['yui', function (yuiLoader) {
    }]);

function yui () {
    this.$get = ['$q', loadYuiScript];

    function loadYuiScript ($q) {
        var isNotLoadingScript = true, requests = [];
        fetchScript();

        return {
            load: fetchScript
        };

        function fetchScript () {
            var deferred = $q.defer();
            requests.push(deferred);

            if (!document.querySelector('[src*="http://yui.yahooapis.com/3.18.1/build/yui/yui-min.js"]')
                && isNotLoadingScript) {
                isNotLoadingScript = false;
                var script         = document.createElement('script');
                script.onload      = function () {
                    isNotLoadingScript = true;
                    requests.forEach(function (request) {
                        request.resolve();
                    });
                };
                script.src         = "http://yui.yahooapis.com/3.18.1/build/yui/yui-min.js";
                document.getElementsByTagName('head')[0].appendChild(script);
            } else if (isNotLoadingScript) {
                deferred.resolve();
            }

            return deferred.promise;
        }
    }
}