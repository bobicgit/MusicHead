(function() {

	'use strict';

	angular
		.module('musicHead')
		.directive('appLogo', appLogo); 

			function appLogo(){
				return{
					restrict: 'E',
					templateUrl: 'app/components/Logo/appLogo.html'
				};
			}
})();