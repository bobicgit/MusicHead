(function() {

	'use strict';

	angular
		.module('musicHead')
		.factory('cachingFactory', cachingFactory);

	function cachingFactory() {

	// Accessible members
		var cacheInputArray = [];
		var cachedUrlId;

		var factory = {
			cacheArray: cacheArray,
			readInputArrayFromCache: readInputArrayFromCache,
			cacheUrlId: cacheUrlId,
			readCacheUrlId: readCacheUrlId,
      clearCachedUrlId: clearCachedUrlId
		};

	// Returning object of functions

		return factory;

	// Functions declatarions

		function cacheArray(arr) {
			cacheInputArray = arr;
		}

		function readInputArrayFromCache() {
			return cacheInputArray;
		}

		function cacheUrlId(id) {
			cachedUrlId = id;
		}

		function readCacheUrlId() {
			return cachedUrlId;
		}

    function clearCachedUrlId() {
      cachedUrlId = undefined;
    }
	}
})();
