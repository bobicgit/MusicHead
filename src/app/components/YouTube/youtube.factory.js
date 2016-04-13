(function() {

	'use strict';

	angular
		.module('musicHead')
		.factory('youtube', youtube);

	youtube.$inject = ['$http','youtubeDataService'];

	function youtube($http, youtubeDataService) {

	// Accessible members
		var cache = [];
		var cacheInput = [];
		var cacheUrlId = '';
		var factory = {
			showItems: showItems,
			readCache: readCache,
			cacheArray: cacheArray,
			readInputFromCache: readInputFromCache,
			cacheUrl: cacheUrl,
			readCacheUrlId: readCacheUrlId
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
		};

		function readCache() {
			return cache;
		};

		function cacheArray(arr) {
			cacheInput = arr;
		};

		function readInputFromCache() {
			return cacheInput;
		};

		function cacheUrl(id) {
			cacheUrlId = id;
		};

		function readCacheUrlId() {
			return cacheUrlId;
		}
	}
})();