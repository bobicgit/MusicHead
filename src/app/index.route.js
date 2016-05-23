(function() {
  'use strict';

  angular
    .module('musicHead')
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

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
        templateUrl: 'app/main/artist.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();
