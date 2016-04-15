(function() {

	'use strict';

	angular
		.module('musicHead')
		.directive('ytList', ytList); 

			function ytList(){
				return{
					restrict: 'E',
					templateUrl: 'app/components/YouTube/Directives_Templates/ytList.html'
				};
			}
})();