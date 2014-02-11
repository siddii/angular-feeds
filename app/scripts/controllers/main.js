'use strict';

angular.module('angular-feeds-demo')
  .controller('FeedController', function ($scope, $element) {

    $scope.toggleMarkup = function () {
      $element.find('feed ul').fadeToggle();
    };
  });
