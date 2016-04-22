/*eslint angular/document-service: 1*/
(function() {

    'use strict';

    angular
        .module('musicHead')
        .service('ytPlayerApi', ytPlayerApi);

    function ytPlayerApi($q, $window) {

        var apiReady = $q.defer();

        activate();

        this.onReady = onReady;

        function onReady() {
          return apiReady.promise;
        }

        function activate() {
          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          $window.onYouTubeIframeAPIReady = function () {
            apiReady.resolve();
              // $timeout(apiReady.resolve, 500);
          }
        }
    }
})();
