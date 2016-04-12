(function() {
  'use strict';

  angular
    .module('musicHead')
    .directive('youtubeList', youtubeList);

  /** @ngInject */
  function youtubeList() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/YouTube/youtubeList.html',
      controller: 'youtubeListController',
      controllerAs: 'ytlCtrl',
      bindToController: true
    };
    return directive;
  }

})();