(function() {

	'use strict';

	angular
	.module('musicHead')
	.factory('youtube', youtube);

	youtube.$inject = ['$http'];

	function youtube($http) {

	// Accessible members

		var factory = {
			initConnection: initConnection
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
						key: 'AIzaSyDuyfjnT7zY6FDNg5n7_D27RyICBkRAh7k'
					}
				});
		}
	}
})();