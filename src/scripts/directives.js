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
