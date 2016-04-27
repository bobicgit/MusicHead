
(function() {

  'use strict';

  angular
    .module('musicHead')
    .directive('appInput', appInput);

  appInput.$inject = ['youtubeFactory','cachingFactory','$location','helpersFactory'];

  function appInput(youtubeFactory, cachingFactory, $location, helpersFactory) {

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
        cachingFactory.clearCachedUrlId();
        youtubeFactory.clearCacheClips();
        vm.artistsList = vm.artistsList.split(",");
        vm.artistsList = helpersFactory.trimmingArray(vm.artistsList);
        cachingFactory.cacheArray(vm.artistsList);
        cachingFactory.cacheInputApprachFlag(inputApproach);
        vm.artistsList = ''; // clear input
        $location.path("/allArtists");
      }
    }
  }
})();
