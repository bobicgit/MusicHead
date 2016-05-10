// Container which hold youtube player and controlls of that player.
// It has its own controller, to changing flag when api ready
// and to declare functionallity that we will use in youtubeplayer directive

(function() {

  'use strict';

  angular
    .module('musicHead')
    .directive('youtubePlayerContainer', youtubePlayerContainer);

    youtubePlayerContainer.$inject = ['ytPlayerApi','youtubeFactory', 'dataService', '$routeParams'];

    function youtubePlayerContainer(ytPlayerApi) {

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
      vm.currentDuration;
      vm.currentPage = 1;
      vm.currentTime;
      vm.duration;
      vm.filterThumbnails = filterThumbnails();
      vm.getProgressValue = getProgressValue;
      vm.link = link;
      vm.pageSize = 4;
      vm.progress = 0;
      vm.volume = 100;

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
