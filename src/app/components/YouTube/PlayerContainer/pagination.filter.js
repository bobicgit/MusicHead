(function() {

  'use strict';

  angular
    .module('musicHead')
    .filter('pagination', pagination);

    function pagination() {
      return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
      }
    }

})();
