angular.module('feeds').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('spinner.html',
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


  $templateCache.put('template.html',
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
    "        <li feeds ng-repeat=\"feed in feeds | orderBy: '-publishedDate'\" class=\"media\">\n" +
    "            <div class=\"media-body\">\n" +
    "                <span class=\"text-muted fa-stack pull-right\">\n" +
    "                    <i class=\"fa fa-calendar-o fa-stack-2x\"></i>\n" +
    "                    <div class=\"time-ago\" title=\"{{feed.publishedDate}}\"/>\n" +
    "                </span>\n" +
    "                <h4 class=\"media-heading\"><a target=\"_new\" href=\"{{feed.link}}\" ng-bind-html=\"feed.title\"></a></h4>\n" +
    "                <p ng-bind-html=\"feed.content\"></p>\n" +
    "            </div>\n" +
    "            <hr ng-if=\"!$last\"/>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>"
  );

}]);
