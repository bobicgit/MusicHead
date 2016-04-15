(function() {

	'use strict';

	angular
		.module('musicHead')
		.directive('appForm', appForm); 

			function appForm(){
				return{
					restrict: 'E',
					templateUrl: 'app/components/Form/form.html'
				};
			}
})();