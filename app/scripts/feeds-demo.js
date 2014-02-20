'use strict';

angular.module('feeds-demo', [
    'feeds',
    'ngSanitize'
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

    $scope.page = '#main-page';

    function scrollToPanel(panelId) {
      if (panelId) {
        var target = $(panelId);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 55
          }, 1000);
        }
      }
    }

    function checkNavbarToggle() {
      var $navbarToggle = $('.navbar-toggle');
      if ($navbarToggle.is(':visible')) {
        $navbarToggle.click();
      }
    }

    $scope.gotoPage = function (pageId, panelId) {
      if ($scope.page === pageId) {
        scrollToPanel(panelId);
        checkNavbarToggle();
        return;
      }
      $($scope.page).fadeOut();
      $(pageId).fadeIn();
      $scope.page = pageId;
      scrollToPanel(panelId);
      checkNavbarToggle();
    };
  }]);