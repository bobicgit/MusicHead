(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(youtubeFactory, $sce, $routeParams, cachingFactory, $timeout) {

    var vm = this,
        requestArtists = requestArtists,
        routeArtist = $routeParams.artist;

  // Caching all clips, array of artists from input, video url to display and flag
  // for displaying those elements in view when controller reloads.

    vm.artistsArrayTrimmed = cachingFactory.readInputArrayFromCache();
    vm.clips = youtubeFactory.clearCacheClips();
    vm.clips = youtubeFactory.readCache();
    vm.changeVideo = changeVideo;
    vm.getFilter = getFilter();
    vm.getTrustedThumbnailSrc = getTrustedThumbnailSrc;
    vm.loadDefVideo = loadDefVideo;
    vm.videoId = cachingFactory.readCacheUrlId();

    activate();

    function activate() {

       for(var i = 0 ; i<vm.artistsArrayTrimmed.length; i++) {
        requestArtists(vm.artistsArrayTrimmed[i]);
      }
    }

    function requestArtists(artist) {
      youtubeFactory
      .showItems(artist)
      .then(function(items) {
        vm.videoId = items[0].id.videoId;
        console.log(vm.videoId);
        angular.forEach(items, function(item) {
          vm.clips.push(item);
        })
      })
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
