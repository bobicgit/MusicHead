(function() {
  'use strict';

  angular
    .module('musicHead')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
