/*eslint angular/document-service: 1*/
(function() {

  'use strict';

  angular
      .module('musicHead')
      .service('FBApiService', FBApi);

  FBApi.$inject = ['$q','$location', 'cachingFactory'];

  function FBApi($q, $location, cachingFactory) {

    var self = this,
        logged = false;

    self.logIn = logIn;
    self.logOut = logOut;
    self.fbArtistsArray = [];
    self.checkStatus = checkStatus;
    self.musicRequest = musicRequest;
    self.pictureRequest = pictureRequest;


      function checkStatus() {
        var defer = $q.defer();
        FB.getLoginStatus(function(response) {
          if(response.status === 'connected') {
            defer.resolve(response);
          } else {
            defer.reject();
          }
        });
        return defer.promise;
      }


    function logIn() {
      var defer = $q.defer();
      FB.login(function(response) {
        if(response.authResponse) {
            logged = true;
            cachingFactory.cacheFacebookLogFlag(logged);
            pictureRequest()
              .then(function(picture) {
                cachingFactory.cacheFacebookProfilePicture(picture);
              })
            musicRequest()
              .then(function(fbArtistsArray) {
                defer.resolve(fbArtistsArray);
              });
        } else {
          defer.reject();
        }
      }, {scope: 'user_likes'} );
      return defer.promise;
    }

    function logOut() {
      var defer = $q.defer();
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            FB.logout(function() {
              defer.resolve();
            });
        } else {
          defer.reject();
        }
      });
      return defer.promise;
    }

    function musicRequest() {
      var defer = $q.defer();
        FB.api('/me/music', 'GET', {}, function(response) {
          if (!response || response.error) {
            defer.reject(response.error.data)
          } else {
            self.fbArtistsArray = [];
            angular.forEach(response.data, function(value) {
              self.fbArtistsArray.push(value.name)
            })
            cachingFactory.clearCachedUrlId();
            cachingFactory.clearCachedArray();
            cachingFactory.cacheArray(self.fbArtistsArray);
            defer.resolve(self.fbArtistsArray);            
          }
        });
        return defer.promise;
    }

    function pictureRequest() {
      var defer = $q.defer();
      FB.api('/me/picture', 'GET', {}, function(picture) {
        if (!picture || picture.error) {
          defer.reject(picture.error.data)
        } else {
          defer.resolve(picture);
        }  
      });
      return defer.promise;
    }
  }
})();


///        // ////
        // FB.api("https://graph.facebook.com/v2.6/1065979653474352/music?access_token=EAALYpwp0yqwBAOIgcaYyMJwYk3LPo7tzM4J5J2wMEwZBsPq1Hk9P05vEJ6BWahIQKShoXtNXZACg2oBTSNk0ZAQxdGgHIzLnfECV7CoNmqYx1j5OOg8zF8ZBBfH2JZC87rD4kGAVv7fm5tthzM6qTznxxfo5uIgzEtV3fY7lSQgZDZD&pretty=0&limit=25&after=MzA5NzU2ODc2ODIZD",
        //   function(response){console.log(response)});
        // ////
