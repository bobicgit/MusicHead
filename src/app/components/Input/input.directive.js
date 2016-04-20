
(function() {

  'use strict';

  angular
    .module('musicHead')
    .directive('appInput', appInput);

    appInput.$inject = ['youtubeFactory','cachingFactory','$location'];

    function appInput(youtubeFactory, cachingFactory, $location) {

    return {
      restrict: "E",
      templateUrl: 'app/components/Input/input.template.html',
      controller: startController,
      controllerAs: 'startCtrl'
    }

    function startController() {
      var vm = this,
          artistsArray;

      vm.artistsList;
      vm.getArtists = getArtists;

      function getArtists() {
        cachingFactory.clearCachedUrlId();
        youtubeFactory.clearCacheClips();
        artistsArray = vm.artistsList.split(",");
        artistsArray = trimmingArray(artistsArray);
        artistsArray = shuffle(artistsArray);
        cachingFactory.cacheArray(artistsArray);
        vm.artistsList = ''; // clear input
        $location.path("/allArtists");
      }

////////// HELPERS

      function trimmingArray(arr) {
        var trimmedArray = [];
        angular.forEach(arr, function(item) {
          item = item.trim();
          trimmedArray.push(item);
        });
        return trimmedArray;
      }

      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }
    }
  }
})();
