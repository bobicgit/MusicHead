(function() {

	'use strict';

	angular
		.module('musicHead')
		.directive('appFooter', appFooter); 

			function appFooter(){
				return{
					restrict: 'E',
					templateUrl: 'app/components/Footer/footer.html'
				};
			}
})();