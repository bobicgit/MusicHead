(function() {
  'use strict';

  angular
    .module('musicHead')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/allArtists', {
        templateUrl: 'app/main/allArtists.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/allArtists/:artist', {
        templateUrl: 'app/main/artist.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
