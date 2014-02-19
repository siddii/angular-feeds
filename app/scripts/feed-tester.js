angular.module('feed-tester', [
    'feeds'
  ]).controller('FeedTesterController', ['$scope', '$compile', function ($scope, $compile) {
    $scope.count = 10;
    $scope.summary = false;
    $scope.showFeed = function (){
      var $panelBody = $('.panel-body');
      $panelBody.html('');
      var feedHTML = "<feed url='" + $scope.url + "' count='" + $scope.count + "' summary='" + $scope.summary + "'/>";
      $panelBody.append($compile(feedHTML)($scope));
    };

    var url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    $scope.isOrigin = function (){
      return window.parent.location.href.indexOf(url) === -1;
    };
  }]);
