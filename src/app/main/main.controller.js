(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, youtube, toastr, $sce, $routeParams) {
    var vm = this;

    vm.addArtists = addArtists;
    vm.artistsList = 'Madonna, El Guincho, Placebo';
    vm.artistsArray = [];
    vm.classAnimation = '';
    vm.clips = [];
    vm.creationDate = 1460370332351;
    vm.routeArtist = $routeParams.artist;
    vm.showToastr = showToastr;
    vm.splitArtists = splitArtists;
    vm.redirect = redirect;
    vm.getTrustedIframeSrc = getTrustedIframeSrc;
    vm.showRouteArtist = showRouteArtist;

    // activate();

    // function activate() {
    //   //getWebDevTec();
    //   return youtube
    //         .initConnection()
    //         .then(function(data) {
    //           vm.awesomeThings.push(data);
    //         });
    // }


    function getTrustedIframeSrc(id) {
      return trustLink(getIframeSrc(id));
    }
    function splitArtists() {
      vm.artistsArray = vm.artistsList.split(",");
      console.log(vm.artistsArray);
      for(var i = 0 ; i<vm.artistsArray.length; i++) {
        vm.addArtists(vm.artistsArray[i]);
      }
    }

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

    function getIframeSrc(videoId) {
      return 'https://www.youtube.com/embed/' + videoId;
    };

    function trustLink(src) {
      return $sce.trustAsResourceUrl(src);
    };

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    };

    function redirect(artist) {
      artist = artist.trim();
      console.log(artist);
      window.location = ("#/" + artist);
      showRouteArtist(artist);
    };

    function showRouteArtist(artist) {
      console.log(vm.clips);
      vm.clips = vm.clips.filter(function(clip) { 
        if (clip.snippet.title.indexOf(artist) > -1) {debugger;
          return clip;
        }
      });
    //       var string = "foo",
    //     substring = "oo";
    // console.log(string.indexOf(substring) > -1);
    }
  }
})();
