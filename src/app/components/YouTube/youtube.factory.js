(function() {

	'use strict';

	angular
	.module('musicHead')
	.factory('youtube', youtube);

	youtube.$inject = ['$http','youtubeDataService'];

	function youtube($http, youtubeDataService) {

	// Accessible members

		var factory = {
			initConnection: initConnection,
			showItems: showItems
		};

	// Returning object of functions

		return factory;

	// Functions declatarions

		function initConnection() { 

			return $http({
				method: 'GET',
				url: 'https://content.googleapis.com/youtube/v3/search?',
				params: {
						q:'madonna',
						part:'snippet',
						key: 'AIzaSyC9Ye6LYcxQHxyMRECr_kFNoCJ13QJHinA'
					}
				});
		};

		function showItems(query) {
			var ytRequestObject = youtubeDataService.getDataObject("search", query);
			return $http({
                method: 'GET',
                url: ytRequestObject.url,
                params: ytRequestObject.params
            });
		};
	}
})();