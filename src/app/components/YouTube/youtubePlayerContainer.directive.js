(function() {

  'use strict';

  angular
    .module('musicHead')
    .directive('youtubePlayerContainer', youtubePlayerContainer);

    //youtubePlayerContainer.$inject = ['$window','YT_event','youtube'];

    function youtubePlayerContainer() { 

    return {
      restrict: "E",
      templateUrl: 'app/components/YouTube/Templates/playerContainer.html',
      // scope: {},
      controller: function() {
        var vm = this;

        vm.currentTime;
        vm.duration;
      },
      controllerAs: 'ytContainer'

    }
  }
})();