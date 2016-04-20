// Container which hold youtube player and controlls of that player.
// It has its own controller, to changing flag when api ready.

(function() {

  'use strict';

  angular
    .module('musicHead')
    .directive('youtubePlayerContainer', youtubePlayerContainer);

    youtubePlayerContainer.$inject = ['ytPlayerApi','YT_event','youtubeFactory','cachingFactory', '$routeParams'];

    function youtubePlayerContainer(ytPlayerApi, YT_event, $scope, youtubeFactory, cachingFactory, $routeParams ) {

    return {
      restrict: "E",
      templateUrl: 'app/components/YouTube/PlayerContainer/playerContainer.html',
      controller: ytContainerController,
      controllerAs: 'ytContainerCtrl',
      link: ytContainerLink
    }

    function ytContainerController($scope, youtubeFactory, cachingFactory, $routeParams) {
      var vm = this,
          routeArtist = $routeParams.artist;



      vm.apiReady = false;
      vm.currentTime;
      vm.duration;
      vm.play = play;
      vm.stop = stop;
      vm.pause = pause;
      vm.clips = [];
      vm.currentPage = 0;
      vm.pageSize = 4;
      vm.clips = youtubeFactory.readCache();

// Changing the flag, that informs youtube api is ready. in this way, api will be ready
// when this directive is loaded, and will be ready even on another route.

      ytPlayerApi.onReady()
        .then(function() {
            vm.apiReady = true;
      })

// Sending controlls to youutubeplayer directive for events

      function play() {
        $scope.$broadcast(YT_event.PLAY);
      }

      function stop() {
        $scope.$broadcast(YT_event.STOP);
      }

      function pause() {
        $scope.$broadcast(YT_event.PAUSE);
      }

    }

    function ytContainerLink() {
      var vm = this;




      }

  }
})();
