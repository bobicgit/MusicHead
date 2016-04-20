(function() {

	'use strict';

	angular
		.module('musicHead')
		.factory('youtubeFactory', youtubeFactory);

	youtubeFactory.$inject = ['$http','youtubeDataService'];

	function youtubeFactory($http, youtubeDataService) {

	// Accessible members
		var cache = [];
		var player;

		var factory = {
			showItems: showItems,
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
                params: ytRequestObject.params
            })
            .then(function(response) {
            	cache = cache.concat(response.data.items);
            	return response.data.items;
            })
		}

		function readCache() {
			return cache;
		}

		function clearCacheClips() {
			cache = [];
		}
	}
})();