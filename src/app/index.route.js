(function() {
  'use strict';

  angular
    .module('musicHead')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/:artist?', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
