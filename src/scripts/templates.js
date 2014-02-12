angular.module('feeds').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('feed-list.html',
    "<div>\n" +
    "    <div ng-if=\"!loading && error\" class=\"alert alert-danger\">\n" +
    "        <h4 class=\"text-center\">Oops... Something bad happened, please try later :(</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"feeds.length == 0\" class=\"alert alert-info\">\n" +
    "        <h4 class=\"text-center\">Nothing to show here... <br/> Please try later...</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"media-list\">\n" +
    "        <li ng-repeat=\"feed in feeds | orderBy: '-publishedDate'\" class=\"media\">\n" +
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
