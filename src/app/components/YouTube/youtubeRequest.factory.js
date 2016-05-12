// Factory taht handles youtube request and cache response from server. This cache only takes objects from youtube.

(function() {

    'use strict';

    angular
        .module('musicHead')
        .factory('youtubeFactory', youtubeFactory);

    youtubeFactory.$inject = ['$http','youtubeDataService'];

    function youtubeFactory($http, youtubeDataService) {

    // Accessible members
      var cache = [];

      var factory = {
          cache : [],
          showItems: showItems,
          saveCache: saveCache,
          readCache: readCache,
          clearCacheClips: clearCacheClips
      };

    // Returning object of functions

      return factory;

    // Functions declatarions

      function showItems(query) {
          var ytRequestObject = youtubeDataService.getDataObject("search", query);
          return $http({
              method: 'GET',
              url: ytRequestObject.url,
              params: ytRequestObject.params })
          .then(showItemsComplete)
          .catch(showItemsFail);

        function showItemsComplete(response) {
          cache = cache.concat(response.data.items);
          return response.data.items;
        }

        function showItemsFail(error) {
          return error.data;
        }
      }

      function saveCache(arr) {
        factory.cache = arr;
        cache = arr;
      }

      function readCache() {
          return cache;
      }

      function clearCacheClips() {
          factory.cache = [];
          cache = [];
      }
    }
})();
