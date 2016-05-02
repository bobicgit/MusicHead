(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('FacebookController', fbCtrl);

    function fbCtrl(FBApiService, $location, dataService, spinnerService, toastr) {
      var vm = this;

      vm.getResource = getResource;

      function getResource() {

        spinnerService.show('mySpinner');

        vm.logIn = logIn;
        vm.facebookLogFlag = false;
        vm.logOut = logOut;
        vm.changePath = changePath;

        dataService.checkLogStatus()
          .then(setFlag)
          .then(function() {
            spinnerService.hide('mySpinner');
          })
          .catch(function(error) {
            toastr.error(error);
            spinnerService.hide('mySpinner');
          })

        function logIn() {
          FBApiService.logIn()
          .then(vm.changePath)
          .catch(function(error) {
            toastr.error(error);
          })
        }

        function logOut() {
          dataService.logOutFromFb();
          vm.facebookLogFlag = false;
        }

        function changePath() {
          $location.path("/allArtists");
        }

        function setFlag(response) {
          vm.facebookLogFlag = response.status === 'connected';
        }
      }


    }
})();
