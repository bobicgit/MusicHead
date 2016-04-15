(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, youtube, toastr, $sce, $routeParams, $location) {

    var vm = this;

    var artistsArray = [];
    var template = '';

    vm.addArtists = addArtists;
    vm.artistsList;
    vm.artistsArrayTrimmed;
    vm.classAnimation = '';
    vm.clips = [];
    vm.clearCache = clearCache;
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

  // Caching all clips, array of artists from input, video url to display and flag
  // for displaying those elements in view when controller reloads.

    vm.clips = youtube.readCache();
    vm.artistsArrayTrimmed = youtube.readInputFromCache();
    vm.showPlayer = youtube.readCacheFlag();
    vm.videoUrl = getTrustedIframeSrc(youtube.readCacheUrlId());
  // Function that filters view of my thumbnails, depends on routeparameter.
console.log($routeParams);
    function getFilter(){

      if(vm.routeArtist === 'undefined' || vm.routeArtist === 'artists') {
        vm.routeArtist = '';
      }
      return {snippet: {title: vm.routeArtist}};
    }

  // Function that displays first video in each route, for each artist.
  // It is loaded on click in each link and reads what is already in cache.
  // In cache are all objects, so I need to determinate first clip of specific artist (which was clicked).
  // after that I am caching my url to factory. It is read at the beggining of controller, to
  // load after controller is reloaded.

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

  // Function that runs on form submit. It change the flag showPlayer, and cache that flag, for further purpose
  // of diplaying player on other routes. It runs splitArtists function, and iterate the array of artists names.
  // in each iteration function addArtists is calling, which is using factory and service to send
  // request to youtube API.

    function generateArtists() { 
      vm.showPlayer = true;
      template = '';
      youtube.cacheFlag(vm.showPlayer); // cache flag for displaying player in other routes
      youtube.clearCacheClips();
      splitArtists(); 
      for(var i = 0 ; i<vm.artistsArrayTrimmed.length; i++) {
        vm.addArtists(vm.artistsArrayTrimmed[i]);
      }
    };


    function splitArtists() {
      artistsArray = vm.artistsList.split(",");
      vm.artistsArrayTrimmed = trimmingArray(artistsArray); 
      youtube.cacheArray(vm.artistsArrayTrimmed);  // cache array of artists, becouse i use it in view to display links with artists names
    };


    function addArtists(artist) {
      vm.clips = [];
      youtube
      .showItems(artist)
      .then(function(items) {
        vm.artistsList = ''; // clear input
        vm.videoUrl = getTrustedIframeSrc(items[0].id.videoId);// auto adding first video
        angular.forEach(items, function(item, index) {
          $location.path("artists");  
          vm.clips.push(item);
          shuffle(vm.clips);
    
          
        });
      })
    };

// Function that takes an object of clicked video and chacnging src parameter in iframe player.

    function changeVideo(video) {
      vm.videoUrl = getTrustedIframeSrc(video.id.videoId); // changing only src of ifram on click in thumbnail
      //console.log(video);
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
      return 'http://img.youtube.com/vi/' + videoId + '/mqdefault.jpg';
    };

    function getIframeSrc(videoId) {
      // console.log(vm.routeArtist)
      var allIDs = [];
      var myClips = youtube.readCache();
      template = '?autoplay=1&loop=1&playlist=';

      angular.forEach(myClips, function(item) {
        item.id.videoId === videoId ? videoId : allIDs.push(item.id.videoId);   
      });
      angular.forEach(allIDs, function(item) {
        template += item + ",";
      });
      return 'http://www.youtube.com/embed/' + videoId + template;
    };

    function clearCache() {
      //console.log('clearcache function');
      youtube.clearCacheClips();
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

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    };
  }

})();
