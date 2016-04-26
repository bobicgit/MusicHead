(function() {
  'use strict';

  angular
    .module('musicHead')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/StartPage/startPage.html',
        controller: "FacebookController",
        controllerAs: 'fbCtrl'

      })
      .when('/allArtists', {
        templateUrl: 'app/main/allArtists.html',
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
