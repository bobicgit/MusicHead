// Container which hold youtube player and controlls of that player.
// It has its own controller, to changing flag when api ready
// and to declare functionallity that we will use in youtubeplayer directive

(function() {

  'use strict';

  angular
    .module('musicHead')
    .directive('youtubePlayerContainer', youtubePlayerContainer);

    youtubePlayerContainer.$inject = ['ytPlayerApi','YT_event','youtubeFactory','cachingFactory'];

    function youtubePlayerContainer(ytPlayerApi, YT_event) {

    return {
      restrict: "E",
      templateUrl: 'app/components/YouTube/PlayerContainer/playerContainer.html',
      controller: ytContainerController,
      controllerAs: 'ytContainerCtrl'
    }

    function ytContainerController($scope, youtubeFactory, cachingFactory) {
      var vm = this;
      var i =0;
      vm.apiReady = false;
      vm.currentTime;
      vm.duration;
      vm.play = play;
      vm.stop = stop;
      vm.pause = pause;
      vm.next = next;
      vm.clips = youtubeFactory.readCache();
      vm.currentPage = 0;
      vm.pageSize = 4;

      vm.progress = 0;
      vm.getProgressValue = getProgressValue;

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

      function next() {

        // var id = vm.clips[i+1].id.videoId;
        // i++
        // console.log(id);
        // cachingFactory.cacheUrlId(id);
        $scope.$broadcast(YT_event.NEXT);
      }

      function getProgressValue() {
        $scope.$broadcast('progress',vm.progress);
      }
    }
  }
})();
