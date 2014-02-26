angular.module('app-templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/add_feed_popover.html',
    "<div>\n" +
    "    <div>\n" +
    "        <label for=\"url\">URL</label>\n" +
    "        <input type=\"url\" class=\"form-control\" id=\"url\" placeholder=\"RSS, Atom or Media feed url\">\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <label for=\"exampleInputPassword1\">Password</label>\n" +
    "        <input type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Password\">\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/api.html',
    "<div class=\"container\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h3>Feed Directive</h3>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <p>At the very basic, you just need <code ng-non-bindable>&lt;feed/&gt;</code> directive for displaying the feed content.\n" +
    "                The only <i>required</i> attribute is the <em>url</em>.<br/>\n" +
    "                Please note that url should be publicly accessible.\n" +
    "            </p>\n" +
    "            <p>\n" +
    "                Most of the <i>heavy-weight</i> lifting is done through <a target=\"_new\"\n" +
    "                                                                           href=\"https://developers.google.com/feed/\">Google\n" +
    "                    Feeds</a> and all the complexities are completely abstracted to the end user.\n" +
    "            </p>\n" +
    "            <h4>\n" +
    "                Attributes</h4>\n" +
    "            <table class=\"table table-bordered table-striped\">\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th>\n" +
    "                        Name\n" +
    "                    </th>\n" +
    "                    <th>\n" +
    "                        Required\n" +
    "                    </th>\n" +
    "                    <th>\n" +
    "                        Default value\n" +
    "                    </th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr>\n" +
    "                    <td>\n" +
    "                        url\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        true\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        Note that it should be a publicly accessible url\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>\n" +
    "                        summary<br/>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        false\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <em>false</em><br/>By default, the template displays the full feed content. If this is set to\n" +
    "                        `true`, it will display only the short summary.\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>\n" +
    "                        count<br/>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        false\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        None. Specify the no. of items to display\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>\n" +
    "                        template-url\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        false\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        Specify the template url for displaying feed content\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>\n" +
    "                        post-render\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        false\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        Javascript function that will be called after rendering the feed.\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('templates/code.html',
    "<div class=\"container\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h3>Code</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\" id=\"Getting Started\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <h4>Getting Started</h4>\n" +
    "            <ol>\n" +
    "                <li><p>First make sure to include Google Feeds API script preferably in the <code>&lt;head/&gt;</code> section</p>\n" +
    "                    <pre class=\"prettyprint linenums\">\n" +
    "                        <!-- Google Feeds API script -->\n" +
    "&lt;script\n" +
    "type=\"text/javascript\"\n" +
    "src=\"https://www.google.com/jsapi?autoload=%7B%22modules%22%3A%5B%7B%22name%22%3A%22feeds%22%2C%22version%22%3A%221.0%22%2C%22nocss%22%3Atrue%7D%5D%7D\"&gt;&lt;/script&gt;\n" +
    "                    </pre>\n" +
    "                </li>\n" +
    "                <li><p>Now include Angular Feeds files after including AngularJS scripts</p>\n" +
    "                    <pre class=\"prettyprint linenums\">\n" +
    "&lt;head&gt;\n" +
    "...\n" +
    "&lt;link rel=\"stylesheet\" href=\"http://siddii.github.io/angular-feeds/angular-feeds/angular-feeds.min.css\"/&gt;\n" +
    "&lt;script src=\"http://siddii.github.io/angular-feeds/angular-feeds/angular-feeds.min.js\"&gt;&lt;/script&gt;\n" +
    "&lt;/head&gt;                        \n" +
    "                    </pre>\n" +
    "                </li>\n" +
    "                <li><p>Make sure to inject <em>feeds</em> module into your app</p>\n" +
    "                    <pre class=\"prettyprint linenums\">\n" +
    "angular.module('angular-feeds-demo', ['feeds',...])\n" +
    "                    </pre>\n" +
    "                </li>\n" +
    "                <li>Use <code>&lt;feeds/&gt;</code> directive as you wish...</code></li>\n" +
    "            </ol>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\" id=\"contribute\">\n" +
    "    <div class=\"col-sm-12\">\n" +
    "    <h4>\n" +
    "        Contributions welcome!</h4>\n" +
    "    <p>\n" +
    "        We welcome any or all kinds of contributions! Please submit <a\n" +
    "            href=\"https://github.com/siddii/angular-feeds/pulls\" target=\"_new\">pull requests</a> or create <a\n" +
    "            href=\"https://github.com/siddii/angular-feeds/issues\" target=\"_new\">issues</a> to contribute to this\n" +
    "        project :)</p>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/feed-code-toggle.html',
    "<div class=\"pull-right feed-control\">\n" +
    "    <button type=\"button\" class=\"btn btn-default btn-sm fa {{code ? 'fa-rss' : 'fa-code'}}\" ng-click=\"code = !code; toggleCode(code);\"> Show {{code ? 'Feed' : 'Code'}}</button>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/feed-tester-iframe.html',
    "<div>\n" +
    "    <iframe width=\"100%\" height=\"800px\" scrolling=\"auto\" frameborder=\"0\" src=\"feed-tester.html\"></iframe>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/feed-widget-control.html',
    "<div class=\"pull-right feed-control\">\n" +
    "    <i ng-click=\"deleteFeed();\" class=\"fa fa-trash-o\"></i>&nbsp;&nbsp;<i ng-click=\"toggleFeed();\" class=\"fa {{!collapsed ? 'fa-chevron-circle-down' : 'fa-chevron-circle-up'}}\"></i>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/feed-widget.html',
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <div ng-include src=\"'templates/feed-control.html'\"></div>\n" +
    "        <h3 class=\"panel-title\">{{title}}</h3>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <div class=\"feed-block\">\n" +
    "            {{feed_html}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/main-page.html',
    "<div class=\"container\">\n" +
    "    <div class=\"row\" id=\"introduction\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <p>Angular Feeds renders <a target=\"_new\" href=\"http://en.wikipedia.org/wiki/Atom_(standard)\">Atom</a>,\n" +
    "                <a target=\"_new\" href=\"http://en.wikipedia.org/wiki/RSS\">RSS</a> and <a target=\"_new\"\n" +
    "                                                                                        href=\"http://en.wikipedia.org/wiki/Media_RSS\">Media\n" +
    "                    feeds</a> using <i>simple</i> HTML markup (aka <em><a target=\"_new\" href=\"http://docs.angularjs.org/guide/directive\">Directives</a></em>).\n" +
    "                It internally uses <a target=\"_new\" href=\"https://developers.google.com/feed/\">Google Feeds</a> for\n" +
    "                reading & parsing feeds and comes with default template for displaying feed content. You can also configure it to use a different\n" +
    "                template of your choice.\n" +
    "            </p>\n" +
    "\n" +
    "            <p>Following are some examples to help you understand its usage. Please feel free to poke through the code &\n" +
    "                let me know your thoughts & feedback.</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"page-header\">\n" +
    "        <h3>Examples</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\" id=\"stackoverflow-feed-panel\" ng-controller=\"FeedController\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <div class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    <div ng-include src=\"'templates/feed-code-toggle.html'\"></div>\n" +
    "                    <h3 class=\"panel-title\">Stack Overflow <i>AngularJS</i> Questions</h3>\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"feed-block\">\n" +
    "                        <feed summary=\"true\" url=\"http://stackoverflow.com/feeds/tag?tagnames=angularjs&sort=newest\"\n" +
    "                              count=\"5\"></feed>\n" +
    "                    </div>\n" +
    "                    <div style=\"display: none;\" class=\"code-block\"\n" +
    "                         ng-include=\"'templates/stackoverflow-feed-code.html'\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\" id=\"wikipedia-feed-panel\" ng-controller=\"FeedController\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <div class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    <div ng-include src=\"'templates/feed-code-toggle.html'\"></div>\n" +
    "                    <h3 class=\"panel-title\">Wikipedia Featured Articles</h3>\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"feed-block\">\n" +
    "                        <script type=\"text/javascript\">\n" +
    "                            //run only trusted code here :)\n" +
    "                            function wikipediaFeedPostRender() {\n" +
    "                                $('#wikipedia-feed').find('a').each(function (idx, anchor) {\n" +
    "                                    anchor.target = '_new';\n" +
    "                                    anchor.href = anchor.href.replace(window.location.origin, 'http://en.wikipedia.org');\n" +
    "                                })\n" +
    "                            }\n" +
    "                        </script>\n" +
    "                        <feed id=\"wikipedia-feed\" count=\"10\"\n" +
    "                              url=\"http://en.wikipedia.org/w/api.php?action=featuredfeed&feed=featured&feedformat=atom\"\n" +
    "                              template-url=\"templates/wikipedia-featured-article.html\"\n" +
    "                              post-render=\"wikipediaFeedPostRender();\"/>\n" +
    "                    </div>\n" +
    "                    <div style=\"display: none;\" class=\"code-block\"\n" +
    "                         ng-include=\"'templates/wikipedia-feed-code.html'\"></div>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\" id=\"reddit-feed-panel\" ng-controller=\"FeedController\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <div class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    <div ng-include src=\"'templates/feed-code-toggle.html'\"></div>\n" +
    "                    <h3 class=\"panel-title\">Reddit (<i>/r/programming</i>)</h3>\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"feed-block\">\n" +
    "                        <feed url=\"http://www.reddit.com/r/programming/.rss\"/>\n" +
    "                    </div>\n" +
    "                    <div style=\"display: none;\" class=\"code-block\"\n" +
    "                         ng-include=\"'templates/reddit-feed-code.html'\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/my-feeds-iframe.html',
    "<div>\n" +
    "    <iframe width=\"100%\" height=\"800px\" scrolling=\"auto\" frameborder=\"0\" src=\"my-feeds.html\"></iframe>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/navbar.html',
    "<div class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\" ng-controller=\"NavbarController\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <div id=\"fork-me\">\n" +
    "                <a href=\"https://github.com/siddii/angular-feeds/fork\" title=\"Fork me on GitHub\"><img\n" +
    "                        alt=\"Fork me on GitHub\" src=\"images/forkme.png\"/></a>\n" +
    "            </div>\n" +
    "            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n" +
    "                <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "            <a class=\"navbar-brand\" ng-click=\"gotoPage('#main-page', '#introduction');\" href=\"#\"><i class=\"fa fa-rss\"></i> Angular Feeds</a>\n" +
    "        </div>\n" +
    "        <div class=\"navbar-collapse collapse\">\n" +
    "            <ul class=\"nav navbar-nav\">\n" +
    "                <li class=\"{{page == '#main-page' ? 'active dropdown' : 'dropdown'}}\">\n" +
    "                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Examples <b class=\"caret\"></b></a>\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                        <li><a ng-click=\"gotoPage('#main-page', '#stackoverflow-feed-panel');\" href=\"#\">Stack Overflow <i>AngularJS</i> Questions</a></li>\n" +
    "                        <li><a ng-click=\"gotoPage('#main-page', '#wikipedia-feed-panel');\" href=\"#\">Wikipedia Featured Articles</a></li>\n" +
    "                        <li><a ng-click=\"gotoPage('#main-page', '#reddit-feed-panel');\" href=\"#\">Reddit (<i>/r/programming</i>)</a></li>\n" +
    "                    </ul>\n" +
    "                </li>\n" +
    "                <li class=\"{{page == '#api' ? 'active' : ''}}\"><a ng-click=\"gotoPage('#api');\" href=\"#\">&lt;Feed/&gt;</a></li>\n" +
    "                <li class=\"{{page == '#feed-tester' ? 'active' : ''}}\"><a ng-click=\"gotoPage('#feed-tester');\" href=\"#\">Feed Tester</a></li>\n" +
    "                <li class=\"{{page == '#used-where' ? 'active' : ''}}\"><a ng-click=\"gotoPage('#used-where');\" href=\"#\">Where is this used?</a></li>\n" +
    "                <!--<li class=\"{{page == '#code' ? 'active' : ''}}\"><a ng-click=\"gotoPage('#code');\" href=\"#\">Code</a></li>-->\n" +
    "                <li class=\"{{page == '#code' ? 'active dropdown' : 'dropdown'}}\">\n" +
    "                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Code <b class=\"caret\"></b></a>\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                        <li><a ng-click=\"gotoPage('#code', '#getting-started');\" href=\"#\">Getting Started</a></li>\n" +
    "                        <li><a ng-click=\"gotoPage('#code', '#contribute');\" href=\"#\">Contribute</a></li>\n" +
    "                        <li><a target=\"_new\" href=\"https://github.com/siddii/angular-feeds\">View on Github</a></li>\n" +
    "                    </ul>\n" +
    "                </li>\n" +
    "                <li class=\"{{page == '#my-feeds' ? 'active' : ''}}\"><a ng-click=\"gotoPage('#my-feeds');\" href=\"#\">My Feeds</a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/reddit-feed-code.html',
    "<div>\n" +
    "    <pre class=\"prettyprint linenums\">\n" +
    "&lt;feed url=\"http://www.reddit.com/r/programming/.rss\"/&gt;</pre>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/stackoverflow-feed-code.html',
    "<div>\n" +
    "    <pre class=\"prettyprint linenums\">\n" +
    "&lt;feed summary=\"true\" url=\"http://stackoverflow.com/feeds/tag?tagnames=angularjs&sort=newest\" count=\"5\"/&gt;</pre>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/used-where.html',
    "<div class=\"container\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h3>Where is this module used?</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <p>Following is the list of apps & services where this module is used currently. If you like to add something to the list, please send a <a target=\"_new\" href=\"https://github.com/siddii/angular-feeds/pulls\">Pull Request</a> updating this <a target=\"_new\" href=\"https://github.com/siddii/angular-feeds/blob/master/app/templates/used-where.html\">file</a>.</p>\n" +
    "\n" +
    "            <h4 class=\"underline\">Android Apps</h4>\n" +
    "            <ul>\n" +
    "                <li><a target=\"_new\" href=\"https://play.google.com/store/apps/details?id=com.boxysystems.dzonereader&hl=en\">DZone Reader</a></li>\n" +
    "                <li><a target=\"_new\" href=\"https://play.google.com/store/apps/details?id=com.boxysystems.newstabs&hl=en\">Newsreader</a></li>\n" +
    "            </ul>\n" +
    "\n" +
    "            <h4 class=\"underline\">iOS Apps</h4>\n" +
    "            <ul>\n" +
    "                <li><a target=\"_new\" href=\"https://itunes.apple.com/us/app/dzone-reader/id500542671?mt=8\">DZone Reader</a></li>\n" +
    "            </ul>\n" +
    "\n" +
    "            <h4 class=\"underline\">Chrome Extensions</h4>\n" +
    "            <ul>\n" +
    "                <li><a target=\"_new\" href=\"https://chrome.google.com/webstore/detail/wikipedia/imilikhegdfjlcbgakjieeecgdnomiel\">Wikipedia</a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/wikipedia-featured-article.html',
    "<div id=\"wikipedia-featured-articles\" class=\"carousel slide\" data-ride=\"carousel\" data-interval=\"false\">\n" +
    "    <ol class=\"carousel-indicators\">\n" +
    "        <li data-target=\"#wikipedia-featured-articles\" data-slide-to=\"0\" class=\"active\"></li>\n" +
    "        <li data-target=\"#wikipedia-featured-articles\" data-slide-to=\"1\"></li>\n" +
    "        <li data-target=\"#wikipedia-featured-articles\" data-slide-to=\"2\"></li>\n" +
    "    </ol>\n" +
    "    <div class=\"carousel-inner\">\n" +
    "        <div ng-repeat=\"feed in feeds\" class=\"item\" ng-class=\"{active: $index==0}\">\n" +
    "            <h4 class=\"text-center\"><a target=\"_new\" href=\"{{feed.link}}\" ng-bind-html=\"feed.title\"></a></h4>\n" +
    "            <p ng-bind-html=\"!summary ? feed.content : feed.contentSnippet\"></p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <a class=\"left carousel-control\" href=\"#wikipedia-featured-articles\" data-slide=\"prev\">\n" +
    "        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n" +
    "    </a>\n" +
    "    <a class=\"right carousel-control\" href=\"#wikipedia-featured-articles\" data-slide=\"next\">\n" +
    "        <span class=\"glyphicon glyphicon-chevron-right\"></span>\n" +
    "    </a>\n" +
    "</div>"
  );


  $templateCache.put('templates/wikipedia-feed-code.html',
    "<div>\n" +
    "    <ul class=\"nav nav-tabs\">\n" +
    "        <li class=\"active\"><a href=\"#wikipedia-code-markup\" data-toggle=\"tab\">Markup</a></li>\n" +
    "        <li><a href=\"#wikipedia-featured-article\" data-toggle=\"tab\">wikipedia-featured-article.html</a></li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <!-- Tab panes -->\n" +
    "    <div class=\"tab-content\">\n" +
    "        <div class=\"tab-pane active\" id=\"wikipedia-code-markup\">\n" +
    "    <pre class=\"prettyprint linenums\">\n" +
    "&lt;script type=\"text/javascript\"&gt;\n" +
    "//run only trusted code here :)\n" +
    "function wikipediaFeedPostRender() {\n" +
    "    $('#wikipedia-feed').find('a').each(function (idx, anchor) {\n" +
    "        anchor.target = '_new';\n" +
    "        anchor.href = anchor.href.replace(window.location.origin, 'http://en.wikipedia.org');\n" +
    "    })\n" +
    "}\n" +
    "&lt;/script&gt;\n" +
    "&lt;feed id=\"wikipedia-feed\" count=\"10\"\n" +
    "      url=\"http://en.wikipedia.org/w/api.php?action=featuredfeed&feed=featured&feedformat=atom\"\n" +
    "      template-url=\"templates/wikipedia-featured-article.html\"\n" +
    "      post-render=\"wikipediaFeedPostRender();\"/&gt;</pre>\n" +
    "        </div>\n" +
    "        <div class=\"tab-pane\" id=\"wikipedia-featured-article\">\n" +
    "            <pre class=\"prettyprint linenums\">\n" +
    "&lt;div id=\"wikipedia-featured-articles\" class=\"carousel slide\" data-ride=\"carousel\" data-interval=\"false\"&gt;\n" +
    "    &lt;ol class=\"carousel-indicators\"&gt;\n" +
    "        &lt;li data-target=\"#wikipedia-featured-articles\" data-slide-to=\"0\" class=\"active\"&gt;&lt;/li&gt;\n" +
    "        &lt;li data-target=\"#wikipedia-featured-articles\" data-slide-to=\"1\"&gt;&lt;/li&gt;\n" +
    "        &lt;li data-target=\"#wikipedia-featured-articles\" data-slide-to=\"2\"&gt;&lt;/li&gt;\n" +
    "    &lt;/ol&gt;\n" +
    "    &lt;div class=\"carousel-inner\"&gt;\n" +
    "        &lt;div ng-repeat=\"feed in feeds\" class=\"item\" ng-class=\"{active: $index==0}\"&gt;\n" +
    "            &lt;h4 class=\"text-center\"&gt;&lt;a target=\"_new\" href=\"{{feed.link}}\" ng-bind-html=\"feed.title\"&gt;&lt;/a&gt;&lt;/h4&gt;\n" +
    "            &lt;p ng-bind-html=\"!summary ? feed.content : feed.contentSnippet\"&gt;&lt;/p&gt;\n" +
    "        &lt;/div&gt;\n" +
    "    &lt;/div&gt;\n" +
    "\n" +
    "    &lt;a class=\"left carousel-control\" href=\"#wikipedia-featured-articles\" data-slide=\"prev\"&gt;\n" +
    "        &lt;span class=\"glyphicon glyphicon-chevron-left\"&gt;&lt;/span&gt;\n" +
    "    &lt;/a&gt;\n" +
    "    &lt;a class=\"right carousel-control\" href=\"#wikipedia-featured-articles\" data-slide=\"next\"&gt;\n" +
    "        &lt;span class=\"glyphicon glyphicon-chevron-right\"&gt;&lt;/span&gt;\n" +
    "    &lt;/a&gt;\n" +
    "&lt;/div&gt;\n" +
    "            </pre>                \n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );

}]);
