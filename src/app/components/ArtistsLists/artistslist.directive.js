(function() {

	'use strict';

	angular
		.module('musicHead')
		.directive('appArtistslist', appArtistslist); 

			function appArtistslist(){
				return{
					restrict: 'E',
					templateUrl: 'app/components/ArtistsLists/ArtistsList.html'
				};
			}
})();