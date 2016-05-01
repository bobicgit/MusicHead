(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('MainController', MainController);

  MainController.$inject = ['dataService','cachingFactory','helpersFactory', 'youtubeFactory', '$routeParams','$location','spinnerService'];

  /** @ngInject */
  function MainController(dataService, cachingFactory, helpersFactory, youtubeFactory, $routeParams, $location, spinnerService) {

    var vm = this,
        inputApproach = cachingFactory.readInputApprachFlag();

    vm.getResource = getResource;
    
    function getResource() {

      spinnerService.show('mySpinner');

    vm.artistsArrayTrimmed;
    vm.clips;
    vm.videoId;
    vm.facebookLogFlag;
    // vm.logOut = logOut;
    vm.changeVideo = changeVideo;
    vm.routeArtist = $routeParams.artist;
    vm.keepPage = keepPage;
    // vm.getResource = getResource;
    //GDZIE TO WRZUCIC
    vm.currentPage;
    vm.pageSize = 9;


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
                vm.currentPage = cachingFactory.readCurrentPaginationPage();
                if(artistsClips.length > 1 || artistsClips[0].length) {
                  var objOfClipsAndId = dataService.getVideosAndPlayId(artistsClips);
                  vm.clips = objOfClipsAndId.clips;
                  vm.videoId = objOfClipsAndId.id;  
                  spinnerService.hide('mySpinner');                
                } else {
                  dataService.getVideosAndPlayId(artistsClips);
                  spinnerService.hide('mySpinner');
                }

              });
        });
    }

    function changeVideo(video) {
      vm.videoId = video.id.videoId;
    }

    // function logOut() {
    //   dataService.logOutFromFb();
    // }

    function keepPage() {
      cachingFactory.saveCurrentPaginationPage(vm.currentPage);
    }
  }
}
})();
