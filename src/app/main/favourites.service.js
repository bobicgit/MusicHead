(function() {

  'use strict';

  angular
      .module('musicHead')
      .service('favouritesService', favouritesService);


  function favouritesService($window, $location, $timeout) {

    var self = this;
    self.favourites = {
      playlists : []
    }

    self.activePlaylist = {
      activePlaylist: {
        name:'no playlist created'}
    }


    self.checkLocalStorage = checkLocalStorage;
    self.addToFavourites = addToFavourites;
    self.toggleActive = toggleActive;
    self.setActivePlaylist = setActivePlaylist;
    self.addNewPlaylist = addNewPlaylist;
    self.makeXshowPlaylist = makeXshowPlaylist;
    self.makeXhidePlaylist = makeXhidePlaylist;
    self.makeXshowArtist = makeXshowArtist;
    self.makeXhideArtist = makeXhideArtist;
    self.removePlaylist = removePlaylist;
    self.removeArtist = removeArtist;
    self.updateLocalStorageString = updateLocalStorageString;


    function checkLocalStorage() {

      if (localStorage.favourites) {
        self.favourites.playlists = angular.fromJson(localStorage.favourites).playlists;
      }
      if (localStorage.activePlaylist) {
        self.activePlaylist.activePlaylist = angular.fromJson(localStorage.activePlaylist);
      }
      updateLocalStorageString();
    }


    function addToFavourites(artist) {

      for (var i = 0; i < self.activePlaylist.activePlaylist.artists.length; i ++) {
        if (self.activePlaylist.activePlaylist.artists[i].name === artist) {
          return;
        }
      }

      self.activePlaylist.activePlaylist.artists.push({name:artist, active: true});
      localStorage.activePlaylist = angular.toJson(self.activePlaylist.activePlaylist);
      localStorage.favourites = angular.toJson(self.favourites);
      updateLocalStorageString();
    }


    function toggleActive(artist) {

      for (var i = 0; i < self.activePlaylist.activePlaylist.artists.length; i ++) {
        if (self.activePlaylist.activePlaylist.artists[i].name === artist) {
          self.activePlaylist.activePlaylist.artists[i].active = !self.activePlaylist.activePlaylist.artists[i].active;
          localStorage.activePlaylist = angular.toJson(self.activePlaylist.activePlaylist);
          updateLocalStorageString();
          return;
        }
      }
    }


    function setActivePlaylist(playlist) {

      for (var i = 0; i < self.favourites.playlists.length ; i ++) {
        if (self.favourites.playlists[i].name === playlist) {
          self.activePlaylist.activePlaylist = self.favourites.playlists[i];
        }
      }
      localStorage.activePlaylist = angular.toJson(self.activePlaylist.activePlaylist);
      updateLocalStorageString();
    }


    function addNewPlaylist(playlist) {

      for ( var i = 0 ; i < self.favourites.playlists.length ; i ++) {
        if (self.favourites.playlists[i].name === playlist) {
          return
        }
      }

      self.favourites.playlists.push({
        name: playlist,
        artists : []
      });

      localStorage.favourites = angular.toJson(self.favourites);
    }


    function makeXshowPlaylist(index) {

      $timeout(function() {
        self.favourites.playlists[index].showX = false;
        if (self.favourites.playlists[index].showXtimeout === true) {
           self.favourites.playlists[index].showX = true;
        }
      }, 1000);
      self.favourites.playlists[index].showXtimeout = true;
    }


    function makeXhidePlaylist(index) {

      self.favourites.playlists[index].showXtimeout = false;
      self.favourites.playlists[index].showX = false;
    }


    function makeXshowArtist(index) {

       $timeout(function() {
        self.activePlaylist.activePlaylist.artists[index].showX = false;
        if (self.activePlaylist.activePlaylist.artists[index].showXtimeout === true) {
           self.activePlaylist.activePlaylist.artists[index].showX = true;
        }
      }, 1000);
      self.activePlaylist.activePlaylist.artists[index].showXtimeout = true;
    }


    function makeXhideArtist(index) {

      self.activePlaylist.activePlaylist.artists[index].showXtimeout = false;
      self.activePlaylist.activePlaylist.artists[index].showX = false;
    }


    function removePlaylist(index) {

      var name = self.favourites.playlists[index].name;
      self.favourites.playlists.splice(index, 1);
      if (self.activePlaylist.activePlaylist.name === name) {
        self.activePlaylist.activePlaylist = {name :'playlists'};
        localStorage.activePlaylist = "";
      }
      localStorage.favourites = angular.toJson(self.favourites);
      updateLocalStorageString();
    }


    function removeArtist(index) {

      self.activePlaylist.activePlaylist.artists.splice(index, 1);
      localStorage.activePlaylist = angular.toJson(self.activePlaylist.activePlaylist);
      updateLocalStorageString();
    }


    function updateLocalStorageString() {

      if ( localStorage.activePlaylist ) {
        var activeArtistArray = [];
        var artists = angular.fromJson(localStorage.activePlaylist).artists;
        artists.forEach(function (artist) {
          if (artist.active === true) {
            activeArtistArray.push(artist.name);
          }
        });
      localStorage.artists = activeArtistArray;
      } else {
      localStorage.artists = '';
      }
    }

  }
})();
