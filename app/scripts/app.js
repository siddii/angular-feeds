'use strict';

angular.module('angular-feeds-demo', [
  'feeds',
  'ngSanitize',
  'ngRoute'
]).directive('feedMarkup', function(){
  return {
    restrict: 'M',
    link: function(scope, elem, attr) {
      var commentText = elem[0].textContent;
      var feedMarkup = commentText.substr(commentText.indexOf('feedMarkup') + 11);
      elem.parent().parent().find('.fa-code').popover({trigger: 'click', placement:'left', content: feedMarkup});
    }
  };
});