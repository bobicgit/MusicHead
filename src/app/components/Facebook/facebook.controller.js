(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('FacebookController', fbCtrl);

    function fbCtrl(FBApiService, $location, dataService, spinnerService) {
      var vm = this;

      vm.getResource = getResource;

      function getResource() {
      console.log(arguments);

      spinnerService.show('mySpinner');
      

      vm.logIn = logIn;
      vm.facebookLogFlag = false;
      vm.logOut = logOut;
      vm.changePath = changePath;

      dataService.checkLogStatus()
        .then(function(response) {
          vm.facebookLogFlag = response.status === 'connected';
          spinnerService.hide('mySpinner');
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


    }
})();
