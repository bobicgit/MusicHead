
(function() {

  'use strict';

  angular
      .module('musicHead')
      .service('dataService', dataService);

  dataService.$inject = ['FBApiService', 'youtubeFactory', '$q', 'helpersFactory', '$sce', '$location','cachingFactory'];

  function dataService(FBApiService, youtubeFactory, $q, helpersFactory, $sce, $location, cachingFactory) {

    var that = this,
        id;

    that.checkLogStatus = FBApiService.checkStatus;
    that.getMusicInfoFromFb = getMusicInfoFromFb;
    that.getMusicVideosFromYt = getMusicVideosFromYt;
    that.getVideosAndPlayId = getVideosAndPlayId;
    that.getTrustedThumbnailSrc = getTrustedThumbnailSrc;
    that.logOutFromFb = logOutFromFb;
    that.getArtists = getArtists;
    that.getProfilePicture = FBApiService.pictureRequest;

    function getMusicInfoFromFb() {
      var defer = $q.defer();
      FBApiService.musicRequest()
                  .then(function(response) {
                    defer.resolve(response);
                  })
      return defer.promise;
    }

  // Inside activate, in for loop, i am filling array with promises. I got those promises from requestArtists function
  // that uses youtubeFactory to return promise. Function activate is waiting for all promises to be return, and then
  // return this array of promises. This array is passed to getVideosAndSetId function, to get clips and videoId.

    function getMusicVideosFromYt(arrayOfArtists) {
      var arrayOfRequestPromises = [];
      for(var i = 0 ; i<arrayOfArtists.length; i++) {
        arrayOfRequestPromises.push(requestArtists(arrayOfArtists[i]));
      }
      return $q.all(arrayOfRequestPromises);
    }

    function requestArtists(artist) {
      return youtubeFactory.showItems(artist);
    }

    function getVideosAndPlayId(artistsClips) {//artistsClips
      var obj = {},
          clips = [];
      angular.forEach(artistsClips, function(array) {
          angular.forEach(array, function(item) {
            clips.push(item);
        })
      })
      helpersFactory.shuffle(clips);
      youtubeFactory.saveCache(clips);

      id = clips[0].id.videoId;
      obj = {
        clips: clips,
        id: id
      }
      return obj;
    }

    function getArtists(connected) {
      var deferred = $q.defer();
      if (connected) {
        that.getMusicInfoFromFb()
          .then(deferred.resolve);
      } else {
        deferred.resolve(cachingFactory.readInputArrayFromCache());
      }
        return deferred.promise;
    }

    function logOutFromFb() {
      FBApiService
        .logOut()
        .then(function() {
          youtubeFactory.clearCacheClips();
          $location.path("/");
        });
    }

    function getTrustedThumbnailSrc(id) {
      return trustLink(getThumbnailSrc(id));
    }

    function trustLink(src) {
      return $sce.trustAsResourceUrl(src);
    }

    function getThumbnailSrc(videoId) {
      return 'http://img.youtube.com/vi/' + videoId + '/mqdefault.jpg';
    }


  }
})();
