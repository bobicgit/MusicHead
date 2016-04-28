// Container which hold youtube player and controlls of that player.
// It has its own controller, to changing flag when api ready
// and to declare functionallity that we will use in youtubeplayer directive

(function() {

  'use strict';

  angular
    .module('musicHead')
    .directive('navBar', navBar);

    navBar.$inject = ['cachingFactory','dataService','YT_event'];

    function navBar(cachingFactory, dataService) {

    return {
      restrict: "E",
      templateUrl: 'app/components/NavBar/navBar.template.html',
      controller: navBarController,
      controllerAs: 'navBarCtrl'
    }

    function navBarController(cachingFactory, dataService, YT_event, $scope) {

      var vm = this;

      vm.logOut = logOut;
      vm.pause = pause;
      vm.play = play;
      vm.stop = stop;
      vm.next = next;
      vm.setVolume = setVolume;
      vm.mute = mute;
      vm.muted=false;
      vm.volume = 100;

      dataService
        .checkLogStatus()
        .then(function(response) {
            vm.facebookLogFlag = response.status === 'connected';
        })

      function logOut() {
        dataService.logOutFromFb();
      }

      function pause() {
        $scope.$broadcast(YT_event.PAUSE);
      }

      function play() {
        $scope.$broadcast(YT_event.PLAY);
      }

      function stop() {
        $scope.$broadcast(YT_event.STOP);
      }

      function next() {
        $scope.$broadcast(YT_event.NEXT);
      }

      function setVolume() {
        $scope.$broadcast(YT_event.VOLUME, vm.volume);
      }

      function mute() {
        vm.muted=!vm.muted;
        //vm.volume === 0 ? vm.volume = 100 : vm.volume = 0;
        $scope.$broadcast(YT_event.MUTE);
      }

    }
  }
})();
