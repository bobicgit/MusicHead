// Factory that store functions and data for displaying some info in my app.
// It caches input with artists, and id video that have to be play. Also clear functions are included.

(function() {

	'use strict';

	angular
		.module('musicHead')
		.factory('cachingFactory', cachingFactory);

	function cachingFactory() {

	// Accessible members
		var
    cacheInputArray = [],
    cachedUrlId,
    facebookLogFlag,
    inputApproachFlag;

		var factory = {
			cacheArray: cacheArray,
			readInputArrayFromCache: readInputArrayFromCache,
			cacheUrlId: cacheUrlId,
			readCacheUrlId: readCacheUrlId,
      clearCachedUrlId: clearCachedUrlId,
      clearCachedArray: clearCachedArray,
      cacheFacebookLogFlag: cacheFacebookLogFlag,
      readFacebookLogFlag: readFacebookLogFlag,
      cacheInputApprachFlag:cacheInputApprachFlag,
      readInputApprachFlag: readInputApprachFlag

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

    function cacheFacebookLogFlag(flag) {
      facebookLogFlag = flag;
    }

    function readFacebookLogFlag() {
      return facebookLogFlag;
    }

    function clearCachedUrlId() {
      cachedUrlId = undefined;
    }

    function clearCachedArray() {
      cacheInputArray = [];
    }

    function cacheInputApprachFlag(flag) {
      inputApproachFlag = flag;
    }

    function readInputApprachFlag() {
      return inputApproachFlag;
    }
	}
})();
