(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, youtube, toastr, $sce, $routeParams) {

    var vm = this;

    var artistsArray = [];

    vm.addArtists = addArtists;
    vm.artistsList;
    vm.artistsArrayTrimmed;
    vm.classAnimation = '';
    vm.clips = [];
    vm.creationDate = 1460370332351;
    vm.routeArtist = $routeParams.artist;
    vm.showToastr = showToastr;
    vm.splitArtists = splitArtists;
    vm.generateArtists = generateArtists;
    vm.getTrustedThumbnailSrc = getTrustedThumbnailSrc;
    vm.getFilter = getFilter();
    vm.changeVideo = changeVideo;
    vm.videoUrl = '';
    vm.showPlayer = false;
    vm.loadDefVideo = loadDefVideo;
    // activate();

    // function activate() {
    //   //getWebDevTec();
    //   return youtube
    //         .initConnection()
    //         .then(function(data) {
    //           vm.awesomeThings.push(data);
    //         });
    // }

    vm.clips = youtube.readCache();
    vm.artistsArrayTrimmed = youtube.readInputFromCache();
    vm.videoUrl = getTrustedIframeSrc(youtube.readCacheUrlId());
    vm.showPlayer = youtube.readCacheFlag()

    function getFilter(){
      if(vm.routeArtist === 'undefined') {
        vm.routeArtist = '';
      }
      console.log('');
      return {snippet: {title: vm.routeArtist}};
    }

    function loadDefVideo(artist) {
      
      var myClips = youtube.readCache();
      for(var i = 0 ; i < myClips.length ; i++) {;
        var dbTitle = myClips[i].snippet.title.toLowerCase();
        var inputTitle = artist.toLowerCase();
        if(dbTitle.indexOf(inputTitle) > -1) {
            youtube.cacheUrl(myClips[i].id.videoId);
            break;
          }
        }
    };

    function splitArtists() {
      artistsArray = vm.artistsList.split(",");
      vm.artistsArrayTrimmed = trimmingArray(artistsArray); 
      youtube.cacheArray(vm.artistsArrayTrimmed);  
    }

    function generateArtists() { 
      vm.showPlayer = true;
      youtube.cacheFlag(vm.showPlayer);
      splitArtists(); 
      for(var i = 0 ; i<vm.artistsArrayTrimmed.length; i++) {
        vm.addArtists(vm.artistsArrayTrimmed[i]);
      }
    };

    function addArtists(artist) {
      vm.clips = [];
      youtube
      .showItems(artist)
      .then(function(items) {
        vm.artistsList = '';
        vm.videoUrl = getTrustedIframeSrc(items[0].id.videoId);
        angular.forEach(items, function(item, index) {
          vm.clips.push(item);
          // console.log(item);
          shuffle(vm.clips);    
        });
      })
    };

    function changeVideo(video) {
      vm.videoUrl = getTrustedIframeSrc(video.id.videoId);
      console.log(video);
    }

///////////// ESCAPING UNTRUSTED LINKS

    function trustLink(src) {
      return $sce.trustAsResourceUrl(src);
    };

    function getTrustedThumbnailSrc(id) {
      return trustLink(getThumbnailSrc(id));
    };

    function getTrustedIframeSrc(id) {
      return trustLink(getIframeSrc(id));
    };

    function getThumbnailSrc(videoId) {
      return 'http://img.youtube.com/vi/' + videoId + '/default.jpg';
    };

    function getIframeSrc(videoId) {
      return 'http://www.youtube.com/embed/' + videoId + '?autoplay=1';   
    };

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

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    };
  }

})();
