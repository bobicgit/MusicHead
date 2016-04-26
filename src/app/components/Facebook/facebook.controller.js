(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('FacebookController', fbCtrl);

    function fbCtrl(FBApiService, $location) {

      var vm = this;

      vm.logIn = logIn;

      function logIn() {
        FBApiService.logIn()
        .then(function() {
          $location.path("/allArtists");
        });
      }
    }

})();
