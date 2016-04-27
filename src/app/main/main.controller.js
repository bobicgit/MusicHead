(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('MainController', MainController);

  MainController.$inject = ['dataService','cachingFactory','helpersFactory', 'youtubeFactory', '$routeParams','$location'];

  /** @ngInject */
  function MainController(dataService, cachingFactory, helpersFactory, youtubeFactory, $routeParams, $location) {

    var vm = this,

        inputApproach = cachingFactory.readInputApprachFlag();


    vm.artistsArrayTrimmed;
    vm.clips;
    vm.videoId;
    vm.facebookLogFlag;
    vm.logOut = logOut;
    vm.changeVideo = changeVideo;
    vm.routeArtist = $routeParams.artist,


    init();

    function init() {
      dataService
        .checkLogStatus()
        .then(function(response) {

          if (response.status !== 'connected' && !inputApproach) {
            $location.path("/");
            return;
          }

          vm.facebookLogFlag = response.status === 'connected'; // setup flag for showing button in view. true if connected
          var connected = response.status === 'connected'; // flag for getArtists function

          dataService.getArtists(connected)
            .then(function(artists) {
              vm.artistsArrayTrimmed = artists;
              return artists;
            })
            .then(function(artists) {
              var artistsArray;
              if (vm.routeArtist) {
                artistsArray = [vm.routeArtist];
              } else {
                artistsArray = artists;
              }
              return dataService.getMusicVideosFromYt(artistsArray);
            })
            .then(function(artistsClips) {
                var objOfClipsAndId = dataService.getVideosAndPlayId(artistsClips);
                vm.clips = objOfClipsAndId.clips;
                vm.videoId = objOfClipsAndId.id;
              });
        });
    }

    function changeVideo(video) {
      vm.videoId = video.id.videoId;
    }

    function logOut() {
      dataService.logOutFromFb();
    }
  }
})();
