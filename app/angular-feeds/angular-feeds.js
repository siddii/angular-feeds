/**
 * angular-feeds - v0.0.4 - 2017-03-14 8:09 AM
 * https://github.com/siddii/angular-feeds
 *
 * Copyright (c) 2017 
 * Licensed MIT <https://github.com/siddii/angular-feeds/blob/master/LICENSE.txt>
 */
'use strict';

angular.module('feeds-directives', [])
    .directive('feed', ['feedService', '$compile', '$templateCache', '$http', feedDirective]);

function feedDirective (feedService, $compile, $templateCache, $http) {

    return {
        restrict  : 'E',
        scope     : {
            summary     : '=summary',
            refreshAfter: '='
        },
        controller: ['$scope', '$element', '$attrs', '$timeout', '$interval', feedDirectiveController]
    };

    function feedDirectiveController ($scope, $element, $attrs, $timeout, $interval) {

        $scope.$watch('finishedLoading', watchFinishedLoading);
        $attrs.$observe('refreshAfter', lookRefreshAttribute);
        $attrs.$observe('url', fetchFeed);

        $scope.feeds = [];

        var spinner = $templateCache.get('feed-spinner.html'), refreshIntervalId = null;

        $element.append($compile(spinner)($scope));
        $element.on('$destroy', clearRefreshInterval);

        function renderTemplate (templateHTML, feedsObj) {
            $scope.feeds = [];
            $element.html($compile(templateHTML)($scope));
            if (feedsObj) {
                for (var i = 0; i < feedsObj.length; i++) {
                    $scope.feeds.push(feedsObj[i]);
                }
            }
        }

        function watchFinishedLoading (value) {
            if ($attrs.postRender && value) {
                $timeout(function () {
                    new Function("element", $attrs.postRender + '(element);')($element);
                }, 0);
            }
        }

        function fetchFeed (url) {
            feedService.getFeeds(url, $attrs.count).then(function (feedsObj) {
                if ($attrs.template && $templateCache.get($attrs.template)) {
                    renderTemplate($templateCache.get($attrs.template), feedsObj);
                } else if ($attrs.templateUrl) {
                    $http.get($attrs.templateUrl, {cache: $templateCache}).success(function (templateHtml) {
                        renderTemplate(templateHtml, feedsObj);
                    });
                }
                else {
                    renderTemplate($templateCache.get('feed-list.html'), feedsObj);
                }
            }, function (error) {
                console.error('Error loading feed ', error);
                $scope.error = error;
                renderTemplate($templateCache.get('feed-list.html'));
            }).finally(function () {
                $element.find('.spinner').slideUp();
                $scope.$evalAsync('finishedLoading = true')
            });
        }

        function lookRefreshAttribute (refreshAfter) {

            if (isNaN(parseFloat(refreshAfter)) || !$attrs.url) {
                return;
            }

            setupRefreshInterval(refreshAfter);
        }

        function setupRefreshInterval (refreshAfter) {
            clearRefreshInterval();

            refreshIntervalId = $interval(function () {
                fetchFeed($attrs.url);
            }, refreshAfter);
        }

        function clearRefreshInterval () {
            refreshIntervalId && $interval.cancel(refreshIntervalId);
        }
    }
}

'use strict';

angular.module('feeds', ['feeds-services', 'feeds-directives']);
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
