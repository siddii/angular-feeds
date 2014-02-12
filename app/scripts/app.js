'use strict';

angular.module('angular-feeds-demo', [
  'feeds',
  'ngSanitize',
  'ngRoute'
]).controller('FeedController', ['$scope', '$element', function ($scope, $element) {
    $scope.toggleCode = function (code) {
      var fadeElements = ['div.feed-block', 'div.code-block'];
      if (!code) {
        fadeElements.reverse();
      }
      $element.find(fadeElements[0]).fadeOut(function () {
        $element.find(fadeElements[1]).fadeIn();
      });
    };
  }]).controller('NavbarController', ['$scope', '$element', function ($scope, $element) {

    var pageElements = ['#main-page', '#code', '#api'];

    $scope.gotoPage = function (id) {
      $(pageElements.join(',')).fadeOut(function (){
        $(id).fadeIn();
      });
    };
  }]);