(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('MainController', MainController);

  MainController.$inject = ['youtubeFactory','$sce','$routeParams','cachingFactory','helpersFactory','FBApiService','$q'];

  /** @ngInject */
  function MainController(youtubeFactory, $sce, $routeParams, cachingFactory, helpersFactory, FBApiService,$q) {

    var vm = this,
        routeArtist = $routeParams.artist;

  // Caching all clips, array of artists from input, video url to display and flag
  // for displaying those elements in view when controller reloads.

    vm.artistsArrayTrimmed = cachingFactory.readInputArrayFromCache();
    vm.clips = youtubeFactory.readCache();
    vm.changeVideo = changeVideo;
    vm.getFilter = getFilter();
    vm.getTrustedThumbnailSrc = getTrustedThumbnailSrc;
    vm.loadDefVideo = loadDefVideo;
    vm.videoId = cachingFactory.readCacheUrlId();
    vm.logOut = logOut;
    vm.facebookLogFlag = cachingFactory.readFacebookLogFlag();
    vm.clips.length === 0 ? activate().then(getVideosAndSetId) : void(0);


  // Inside activate, in for loop, i am filling array with promises. I got those promises from requestArtists function
  // that uses youtubeFactory to return promise. Function activate is waiting for all promises to be return, and then
  // return this array of promises. This array is passed to getVideosAndSetId function, to get clips and videoId.

    function activate() {
      var arrayOfRequestPromises = [];
      for(var i = 0 ; i<vm.artistsArrayTrimmed.length; i++) {
        arrayOfRequestPromises.push(requestArtists(vm.artistsArrayTrimmed[i]));
      }
      return $q.all(arrayOfRequestPromises);
    }

    function getVideosAndSetId() {
      angular.forEach(arguments[0], function(array) {
          angular.forEach(array, function(item) {
            vm.clips.push(item);
        })
      })
      helpersFactory.shuffle(vm.clips)
      youtubeFactory.saveCache(vm.clips);
      vm.videoId = vm.clips[0].id.videoId;
    }

    function requestArtists(artist) {
      var reqestPromise = youtubeFactory
                          .showItems(artist);
      return reqestPromise;
    }

  // Function that filters view of my thumbnails, depends on routeparameter.

    function getFilter() {
      return {snippet: {title: routeArtist || ''}};
    }

  // Function that displays first video in each route, for each artist.
  // It is loaded on click in each link and reads what is already in cache.
  // In cache are all objects, so I need to determinate first clip of specific artist (which was clicked).
  // after that I am caching my url to factory. It is read at the beggining of controller, to
  // load after controller is reloaded.

    function loadDefVideo(artist) {

      var myClips = youtubeFactory.readCache();
      for(var i = 0 ; i < myClips.length ; i++) {
        var dbTitle = myClips[i].snippet.title.toLowerCase();
        var inputTitle = artist.toLowerCase();
        if(dbTitle.indexOf(inputTitle) > -1) {
            cachingFactory.cacheUrlId(myClips[i].id.videoId);
            break;
          }
        }
    }

// Function that takes an object of clicked video and chacnging src parameter in iframe player.

    function changeVideo(video) {
      vm.videoId = video.id.videoId;
    }

    function logOut() {
      FBApiService.logOut()
      .then(function() {
        youtubeFactory.clearCacheClips();
      });
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

  }

})();
