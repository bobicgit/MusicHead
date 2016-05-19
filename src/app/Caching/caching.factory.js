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
    inputApproachFlag,
    currentPage=1,
    facebookProfilePicture = {};

		var factory = {
      approachFlag: {approachFlag:''},
			cacheArray: cacheArray,
			readInputArrayFromCache: readInputArrayFromCache,
			cacheUrlId: cacheUrlId,
			readCacheUrlId: readCacheUrlId,
      clearCachedUrlId: clearCachedUrlId,
      clearCachedArray: clearCachedArray,
      cacheFacebookLogFlag: cacheFacebookLogFlag,
      readFacebookLogFlag: readFacebookLogFlag,
      cacheInputApprachFlag:cacheInputApprachFlag,
      readInputApprachFlag: readInputApprachFlag,
      saveCurrentPaginationPage: saveCurrentPaginationPage,
      readCurrentPaginationPage: readCurrentPaginationPage,
      cacheFacebookProfilePicture: cacheFacebookProfilePicture,
      readFacebookProfilePicture: readFacebookProfilePicture

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
      factory.approachFlag.approachFlag = false;
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
      factory.approachFlag.approachFlag = flag;
    }

    function readInputApprachFlag() {
      return inputApproachFlag;
    }

    function saveCurrentPaginationPage(page) {
      currentPage = page;
    }

    function readCurrentPaginationPage() {
      return currentPage
    }

    function cacheFacebookProfilePicture(picObj) {
      facebookProfilePicture = picObj;
    }

    function readFacebookProfilePicture() {
      return facebookProfilePicture
    }
	}
})();
