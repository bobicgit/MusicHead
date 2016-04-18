(function() {

  'use strict';

  angular
    .module('musicHead')
    .factory("youTubeApiFactory", youTubeApiFactory)

    youTubeApiFactory.$inject = ['$q','$window'];

    function youTubeApiFactory($q, $window) {

      var deferred = $q.defer();
      var apiReady = deferred.promise;

      var factory = {
        onReady: onReady
      }
      $window.onYouTubeIframeAPIReady = function() {
        deferred.resolve();
      }

    
      function onReady(callback) {
        apiReady.then(callback);
      }

      return factory;
    }
})();