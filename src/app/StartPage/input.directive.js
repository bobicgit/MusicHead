
(function() {

  'use strict';

  angular
    .module('musicHead')
    .directive('appInput', appInput);

  appInput.$inject = ['youtubeFactory','cachingFactory','$location','helpersFactory','FBApiService','dataService','toastr'];

  function appInput(youtubeFactory, cachingFactory, $location, helpersFactory, FBApiService, dataService,toastr) {

    return {
      restrict: "E",
      templateUrl: 'app/StartPage/input.template.html',
      controller: startController,
      controllerAs: 'startCtrl'
    }

    function startController() {
      var vm = this,
          inputApproach = false;

      vm.artistsList;
      vm.getArtists = getArtists;

      function getArtists() {
        inputApproach = true;
        dataService.checkLogStatus()
          .then(function(response) {
              if(response.status === 'connected') {
                FBApiService.logOut()
                  .then(prepareApp)
                  .catch(function(error) {
                    toastr.error(error);
                  })
              } else {
                prepareApp();
              }
          })
      }

      function prepareApp() {
        cachingFactory.clearCachedUrlId();
        youtubeFactory.clearCacheClips();
        vm.artistsList = vm.artistsList.split(" ");
        vm.artistsList = helpersFactory.trimmingArray(vm.artistsList);
        cachingFactory.cacheArray(vm.artistsList);
        cachingFactory.cacheInputApprachFlag(inputApproach);
        vm.artistsList = ''; // clear input
        $location.path("/allArtists");
      }
    }
  }
})();
