(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('MainController', MainController);

  MainController.$inject = ['dataService','cachingFactory','helpersFactory', 'youtubeFactory', '$routeParams','$location', '$scope'];

  /** @ngInject */
  function MainController(dataService, cachingFactory, helpersFactory, youtubeFactory, $routeParams, $location, $scope) {

    var vm = this,

        inputApproach = cachingFactory.readInputApprachFlag();


    vm.artistsArrayTrimmed;
    vm.clips;
    vm.videoId;
    vm.facebookLogFlag;
    vm.logOut = logOut;
    vm.changeVideo = changeVideo;
    vm.routeArtist = $routeParams.artist;
    vm.currentPage = 0;
    vm.pageSize = 9;
    vm.range = range;
    vm.setPage = setPage;
    vm.pageCount = pageCount;
    $scope.Math=Math;


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

    function setPage(n) {
      vm.currentPage = n;
    }

    function range() {
      var rangeSize = 3;
      var ret = [];
      var start;

      start = vm.currentPage;
      if ( start > vm.pageCount()-rangeSize ) {
        start = vm.pageCount()-rangeSize+1;
      }

      for (var i=start; i<start+rangeSize; i++) {
        ret.push(i);
      }
       return ret;
    }

    function pageCount() {
      return Math.ceil(vm.artistsArrayTrimmed.length/vm.pageSize)-1;
    }

}


          // $scope.maxSize = 5;
          // $scope.bigTotalItems = 175;
          // $scope.bigCurrentPage = 1;
        // });

    
  
})();
