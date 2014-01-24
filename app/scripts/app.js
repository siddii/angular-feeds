'use strict';

angular.module('angular-feeds', [
  'ngSanitize',
  'ngRoute',
  'chieffancypants.loadingBar'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
