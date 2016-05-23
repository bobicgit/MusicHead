(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope','dataService','cachingFactory','helpersFactory', 'youtubeFactory', '$routeParams','$location','spinnerService','toastr', 'favouritesService'];

  function MainController($scope, dataService, cachingFactory, helpersFactory, youtubeFactory, $routeParams, $location, spinnerService, toastr, favouritesService) {

    var vm = this,
        inputApproach = cachingFactory.readInputApprachFlag();

    vm.getSpinner = getSpinner;

    function getSpinner() {

      spinnerService.show('mySpinner');

      vm.artistsArrayTrimmed;
      vm.favourites = [];
      vm.clips;
      vm.videoId;
      vm.facebookLogFlag;
      vm.changeVideo = changeVideo;
      vm.routeArtist = $routeParams.artist;
      vm.keepPage = keepPage;
      vm.addToFavourites = addToFavourites;
      vm.inputApproachFlag = cachingFactory.approachFlag;
      vm.currentPage;
      vm.pageSize = 9;
      vm.currentClipTitle;

      init();
    }

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
            .then(trimArtists)
            .then(prepareArtistsArray)
            .then(prepareDataForDisplayingClips)
            .then(function() {
              spinnerService.hide('mySpinner');
            }).catch(function(error) {
              toastr.error(error);
              spinnerService.hide('mySpinner');
            })
        });
        favouritesService.checkLocalStorage();
    }

    function trimArtists(artists) {
      vm.artistsArrayTrimmed = artists;
      return artists;
    }

    function prepareArtistsArray(artists) {
      var artistsArray;
        if (vm.routeArtist) {
          artistsArray = [vm.routeArtist];
        } else {
          artistsArray = artists;
        }
        return dataService.getMusicVideosFromYt(artistsArray);
    }

    function prepareDataForDisplayingClips(artistsClips) {
      vm.currentPage = cachingFactory.readCurrentPaginationPage();
        if(artistsClips.length > 1 || artistsClips[0].length) {
          var objOfClipsAndId = dataService.getVideosAndPlayId(artistsClips);
          vm.clips = objOfClipsAndId.clips;
          vm.videoId = objOfClipsAndId.id;
          vm.currentClipTitle = vm.clips[0].snippet.title;
        } else {
          dataService.getVideosAndPlayId(artistsClips);
        }
    }

    function changeVideo(video) {
      vm.videoId = video.id.videoId;
    }

    function keepPage() {
      cachingFactory.saveCurrentPaginationPage(vm.currentPage);
    }

    function addToFavourites (artist) {
      favouritesService.addToFavourites(artist);
    }

    $scope.$on('newId', function(evt, newid) {
      var currentClip = vm.clips.filter(function(clip) {
        return clip.id.videoId === newid;
      })
      vm.currentClipTitle = currentClip[0].snippet.title;
    });
  }
})();
