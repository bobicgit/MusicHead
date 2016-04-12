(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('youtubeListController', youtubeListController);

  /** @ngInject */
  function youtubeListController(youtube, $sce) {

    var vm = this;

    vm.addArtists = addArtists;
    vm.artistsList = 'pink floyd, m83, david bowie, madonna, el guincho, placebo';
    vm.artistsArray = [];
    vm.clips = [];
    vm.splitArtists = splitArtists;
    vm.getTrustedIframeSrc = getTrustedIframeSrc
    vm.showSpecific = showSpecific;

    function getTrustedIframeSrc(id) {
      return trustLink(getIframeSrc(id));
    }
    function splitArtists() {
      vm.artistsArray = vm.artistsList.split(",");
      console.log(vm.artistsArray);
      for(var i = 0 ; i<vm.artistsArray.length; i++) {
        vm.addArtists(vm.artistsArray[i]);
      }
    };

    function addArtists(artist) {
      vm.clips = [];
      youtube
      .showItems(artist)
      .then(function(response) {
        vm.artistsList = '';
        angular.forEach(response.data.items, function(item, index) {
          vm.clips.push(item);
          shuffle(vm.clips);
        });
      })
    };

    function getIframeSrc(videoId) {
      return 'https://www.youtube.com/embed/' + videoId;
    };

    function trustLink(src) {
      return $sce.trustAsResourceUrl(src);
    };

    function showSpecific(artist) {
      console.log(artist);
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
    }; 
  }
})();
