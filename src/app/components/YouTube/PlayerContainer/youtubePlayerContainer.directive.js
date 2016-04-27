// Container which hold youtube player and controlls of that player.
// It has its own controller, to changing flag when api ready
// and to declare functionallity that we will use in youtubeplayer directive

(function() {

  'use strict';

  angular
    .module('musicHead')
    .directive('youtubePlayerContainer', youtubePlayerContainer);

    youtubePlayerContainer.$inject = ['ytPlayerApi','YT_event','youtubeFactory', 'dataService', '$routeParams'];

    function youtubePlayerContainer(ytPlayerApi, YT_event) {

    return {
      restrict: "E",
      templateUrl: 'app/components/YouTube/PlayerContainer/playerContainer.html',
      controller: ytContainerController,
      controllerAs: 'ytContainerCtrl'
    }

    function ytContainerController($scope, youtubeFactory, dataService, $routeParams) {
      var vm = this,
          routeArtist = $routeParams.artist;

      vm.apiReady = false;
      vm.currentTime;
      vm.duration;
      vm.play = play;
      vm.stop = stop;
      vm.pause = pause;
      vm.next = next;
      vm.currentPage = 0;
      vm.pageSize = 4;
      vm.currentDuration;
      vm.progress = 0;
      vm.getProgressValue = getProgressValue;
      vm.volume = 100;
      vm.setVolume = setVolume;
      vm.fullScreen = fullScreen;
      vm.link = link;
      vm.filterThumbnails = filterThumbnails();
      vm.mute = mute;

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
        $scope.$broadcast(YT_event.NEXT);
      }

      function getProgressValue() {
        $scope.$broadcast('progress', vm.progress);
      }

      function setVolume() {
        $scope.$broadcast('volume', vm.volume)
      }

      function fullScreen() { // NOT WORKING
        $scope.$broadcast(YT_event.FULLSCREEN);
      }

      function mute() {
        vm.volume === 0 ? vm.volume = 100 : vm.volume = 0;
        $scope.$broadcast(YT_event.MUTE);
      }

      $scope.$on('currentVideoDuration', function () {
        vm.currentDuration = arguments[1];
      });

      function link(id) {
        return dataService.getTrustedThumbnailSrc(id);
      }

      function filterThumbnails() {
        return {snippet: {title: routeArtist || ''}};
      }


    }
  }
})();
