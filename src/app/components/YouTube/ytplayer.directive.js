(function() {

	'use strict';

	angular
		.module('musicHead')
		.directive('ytPlayer', ytPlayer); 

			function ytPlayer(){
				return{
					restrict: 'E',
					templateUrl: 'app/components/YouTube/Directives_Templates/ytPlayer.html'
				};
			}
})();