'use strict';

angular.module('angular-feeds-demo')
  .controller('FeedController', function ($scope, $element) {
    $scope.markup = false;

    $scope.toggleMarkup = function () {
      var fadeElements = ['feed ul', 'pre'];

      $element.find(!$scope.markup ? fadeElements[0] : fadeElements[1]).fadeOut(function (){
        $element.find(!$scope.markup ? fadeElements[1] : fadeElements[0]).fadeIn(function (){
          $scope.$apply(function (){
            $scope.markup = !$scope.markup;
          });
        });
      });
    };
  });
