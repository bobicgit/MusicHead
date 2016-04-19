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
        templateUrl: 'app/AllArtistsPage/allArtists.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/allArtists/:artist', {
        templateUrl: 'app/ArtistPage/artist.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();
