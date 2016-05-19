(function() {
  'use strict';

  angular
    .module('musicHead')
    .run(runBlock);

  runBlock.$inject = ['$log'];

  function runBlock($log) {
    $log.debug('runBlock end');
  }
})();
