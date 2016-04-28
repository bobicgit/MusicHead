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
      vm.currentPage = 1;
      vm.pageSize = 4;
      vm.currentDuration;
      vm.progress = 0;
      vm.getProgressValue = getProgressValue;
      vm.volume = 100;

      vm.link = link;
      vm.filterThumbnails = filterThumbnails();


// Changing the flag, that informs youtube api is ready. in this way, api will be ready
// when this directive is loaded, and will be ready even on another route.

      ytPlayerApi.onReady()
        .then(function() {
            vm.apiReady = true;
      })

// Sending controlls to youutubeplayer directive for events


      function getProgressValue() {
        $scope.$broadcast('progress', vm.progress);
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
