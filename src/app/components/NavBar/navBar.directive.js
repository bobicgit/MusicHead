// Container which hold youtube player and controlls of that player.
// It has its own controller, to changing flag when api ready
// and to declare functionallity that we will use in youtubeplayer directive

(function() {

  'use strict';

  angular
    .module('musicHead')
    .directive('navBar', navBar);

    navBar.$inject = ['YT_event','cachingFactory'];

    function navBar() {

    return {
      restrict: "E",
      templateUrl: 'app/components/NavBar/navBar.template.html',
      controller: navBarController,
      controllerAs: 'navBarCtrl'
    }

    function navBarController(dataService, YT_event, $scope, cachingFactory) {

      var vm = this,
          inputApproach = cachingFactory.readInputApprachFlag();

      vm.logOut = logOut;
      vm.pause = pause;
      vm.play = play;
      vm.stop = stop;
      vm.next = next;
      vm.setVolume = setVolume;
      vm.mute = mute;
      vm.muted=false;
      vm.volume = 100;
      vm.profilePictureUrl;
      vm.facebookLogFlag;

      dataService.checkLogStatus()
        .then(function(response) {
          vm.facebookLogFlag = response.status === 'connected';
          return vm.facebookLogFlag;
        })
        .then(function(facebookLogFlag) {
          if(facebookLogFlag) {
            return dataService.getProfilePicture();
          }
        })
        .then(function(picture){
          if(picture) {
            vm.profilePictureUrl = picture.data.url;
          } else {
            return;
          }  
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
        $scope.$broadcast(YT_event.MUTE);
      }

    }
  }
})();
