(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(youtube, $scope, $sce, $routeParams, $location, YT_event, cachingFactory) {

    var vm = this;

    var artistsArray = [];


    vm.sendControlEvent = sendControlEvent;// function sending controlls to youtubeplpayer directive
    vm.YT_event = YT_event;// contants for controlls of player
    vm.videoId = ""; // variable to change in youtubeplayer directive. and watch inside this directive.


    vm.addArtists = addArtists;
    vm.artistsList;
    vm.artistsArrayTrimmed;
    vm.classAnimation = '';
    vm.clips = [];
  
    vm.routeArtist = $routeParams.artist;
    vm.splitArtists = splitArtists;
    vm.generateArtists = generateArtists;
    vm.getTrustedThumbnailSrc = getTrustedThumbnailSrc;
    vm.getFilter = getFilter();
    vm.changeVideo = changeVideo;
    vm.videoUrl = '';
    vm.loadDefVideo = loadDefVideo;

  // Caching all clips, array of artists from input, video url to display and flag
  // for displaying those elements in view when controller reloads.

    vm.clips = youtube.readCache();
    vm.artistsArrayTrimmed = cachingFactory.readInputFromCache();
    vm.videoId  = cachingFactory.readCacheUrlId();

console.log(vm.clips);
  // Sending controlls to directive for my youtube player. Inside YoutubePlayerDirective in link 
  // function are handlers for each controlls. (Play, Pause, Stop)

    function sendControlEvent(ctrlEvent) {
      console.log("SENDING");
      console.log(ctrlEvent);
      $scope.$broadcast(ctrlEvent);
    }

  // Function that filters view of my thumbnails, depends on routeparameter.

    function getFilter(){
      return {snippet: {title: vm.routeArtist || ''}};
    }

  // Function that displays first video in each route, for each artist.
  // It is loaded on click in each link and reads what is already in cache.
  // In cache are all objects, so I need to determinate first clip of specific artist (which was clicked).
  // after that I am caching my url to factory. It is read at the beggining of controller, to
  // load after controller is reloaded.

    function loadDefVideo(artist) {
      var myClips = youtube.readCache();
      for(var i = 0 ; i < myClips.length ; i++) {
        var dbTitle = myClips[i].snippet.title.toLowerCase();
        var inputTitle = artist.toLowerCase();
        if(dbTitle.indexOf(inputTitle) > -1) {
            cachingFactory.cacheUrlId(myClips[i].id.videoId);
            break;
          }
        }
    }

  // Function that runs on form submit. It change the flag showPlayer, and cache that flag, for further purpose
  // of diplaying player on other routes. It runs splitArtists function, and iterate the array of artists names.
  // in each iteration function addArtists is calling, which is using factory and service to send
  // request to youtube API.

    function generateArtists() {
      vm.clips = []; 
      youtube.clearCacheClips();
      splitArtists(); 
      for(var i = 0 ; i<vm.artistsArrayTrimmed.length; i++) {
        vm.addArtists(vm.artistsArrayTrimmed[i]);
      }
    }


    function splitArtists() {
      artistsArray = vm.artistsList.split(",");
      vm.artistsArrayTrimmed = trimmingArray(artistsArray); 
      cachingFactory.cacheArray(vm.artistsArrayTrimmed);  // cache array of artists, becouse i use it in view to display links with artists names
    }


    function addArtists(artist) {
      youtube
      .showItems(artist)
      .then(function(items) {
        vm.artistsList = ''; // clear input
        $location.path("allArtists"); 
        cachingFactory.cacheUrlId(items[0].id.videoId);
        vm.videoId  = cachingFactory.readCacheUrlId();
        angular.forEach(items, function(item) {
          vm.clips.push(item);
          shuffle(vm.clips); 
        })
      })
    }

// Function that takes an object of clicked video and chacnging src parameter in iframe player.

    function changeVideo(video) {
      vm.videoId = video.id.videoId;
      console.log(vm.YT_event.PLAY);
      $scope.$broadcast(vm.YT_event.PLAY);
    }
 
///////////// ESCAPING UNTRUSTED LINKS

    function trustLink(src) {
      return $sce.trustAsResourceUrl(src);
    }

    function getTrustedThumbnailSrc(id) {
      return trustLink(getThumbnailSrc(id));
    }

    function getThumbnailSrc(videoId) {
      return 'http://img.youtube.com/vi/' + videoId + '/mqdefault.jpg';
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
  }

})();
