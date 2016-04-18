(function() {

	'use strict';

	angular
		.module('musicHead')
		.factory('cachingFactory', cachingFactory);

	function cachingFactory() {

	// Accessible members
		var cacheInput = [];
		var cachedUrlId = '';
		var cachedFlag = false;

		var factory = {
			cacheArray: cacheArray,
			readInputFromCache: readInputFromCache,
			cacheUrlId: cacheUrlId,
			readCacheUrlId: readCacheUrlId
		};

	// Returning object of functions

		return factory;

	// Functions declatarions

		function cacheArray(arr) {
			cacheInput = arr;
		}

		function readInputFromCache() {
			return cacheInput;
		}

		function cacheUrlId(id) {
			cachedUrlId = id;
		}

		function readCacheUrlId() {
			return cachedUrlId;
		}
	}
})();