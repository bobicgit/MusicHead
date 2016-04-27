(function() {

  'use strict';

  angular
    .module('musicHead')
    .filter('pagination', pagination);

    function pagination() {
      return function(input, start) {
        if (!input || !input.length) { return; }
          start = parseInt(start, 10);
      return input.slice(start);
    }
  }

})();
