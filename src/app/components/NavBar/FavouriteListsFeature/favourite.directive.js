
(function() {

  'use strict';

  angular
    .module('musicHead')
    .directive('favourite', favourite);

  favourite.$inject = ['YT_event','cachingFactory','toastr'];

  function favourite() {

    return {
      restrict: "E",
      templateUrl: 'app/components/NavBar/FavouriteListsFeature/favourite.template.html',
      controller: favouriteController,
      controllerAs: 'fvCtrl'
    }

    function favouriteController($timeout, dataService, YT_event, $scope, cachingFactory, toastr, favouritesService) {

      var vm = this;

      vm.playlists = favouritesService.favourites;
      vm.activePlaylist = favouritesService.activePlaylist;
      vm.toggleActive = favouritesService.toggleActive;
      vm.setActivePlaylist = setActivePlaylist;
      vm.addNewPlaylist = addNewPlaylist;
      vm.addingNewPlaylistStatus = false;
      vm.addingNewPlaylist = addingNewPlaylist;
      vm.makeXshowPlaylist = favouritesService.makeXshowPlaylist;
      vm.makeXhidePlaylist = favouritesService.makeXhidePlaylist;
      vm.makeXshowArtist = favouritesService.makeXshowArtist;
      vm.makeXhideArtist = favouritesService.makeXhideArtist;
      vm.removePlaylist = favouritesService.removePlaylist;
      vm.removeArtist = favouritesService.removeArtist;
      vm.showPlaylists = showPlaylists;
      vm.hidePlaylists = hidePlaylists;
      vm.playlistsVisible = false;
      vm.playlistsVisibleTimeout = false;
      vm.showArtists = showArtists;
      vm.hideArtists = hideArtists;
      vm.artistsVisible = false;
      vm.artistsVisibleTimeout = false;

      favouritesService.checkLocalStorage();

      function showPlaylists() {
        if (vm.artistsVisible === false) {
          vm.playlistsVisible = true;
          vm.playlistsVisibleTimeout = false;
        }
      }

      function hidePlaylists() {
        vm.playlistsVisibleTimeout = true;
        $timeout(function() {
          if (vm.playlistsVisibleTimeout) {
            vm.playlistsVisible = false;
          }
        }, 200);
      }

      function showArtists() {
        vm.artistsVisible = true;
        vm.artistsVisibleTimeout = false;
      }

      function hideArtists() {
        vm.artistsVisibleTimeout = true;
        $timeout(function() {
          if (vm.artistsVisibleTimeout) {
            vm.artistsVisible = false;
          }
        }, 200);
      }

      function setActivePlaylist(playlist) {
        vm.playlistsVisible = false;
        favouritesService.setActivePlaylist(playlist);
      }

      function addingNewPlaylist() {
        vm.addingNewPlaylistStatus = true;
        vm.newPlaylist = '';
      }

      function addNewPlaylist(playlist) {
        if (playlist) {
          favouritesService.addNewPlaylist(playlist);
        }
        $timeout(function() {
          vm.addingNewPlaylistStatus = false;
        }, 50);
      }
    }
  }
})();
