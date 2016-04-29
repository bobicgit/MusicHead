(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('FacebookController', fbCtrl);

    function fbCtrl(FBApiService, $location, dataService) {

      var vm = this;

      vm.logIn = logIn;
      vm.facebookLogFlag = false;
      vm.logOut = logOut;
      vm.changePath = changePath;

      dataService.checkLogStatus()
        .then(function(response) {
          vm.facebookLogFlag = response.status === 'connected';
        })

      function logIn() {
        FBApiService.logIn()
        .then(function() {
          $location.path("/allArtists");
        });
      }

      function logOut() {
        dataService.logOutFromFb();
        vm.facebookLogFlag = false;
      }

      function changePath() {
        $location.path("/allArtists");
      }

    }
})();
