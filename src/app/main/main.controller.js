(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, youtube, toastr, $sce) {
    var vm = this;

    vm.addArtists = addArtists;
    vm.artistsList = '';
    vm.artistsArray = [];
    vm.classAnimation = '';
    vm.clips = [];
    vm.creationDate = 1460370332351;
  
    vm.showToastr = showToastr;
    vm.splitArtists = splitArtists;
   
    vm.getTrustedIframeSrc = getTrustedIframeSrc;

    // activate();

    // function activate() {
    //   //getWebDevTec();
    //   return youtube
    //         .initConnection()
    //         .then(function(data) {
    //           vm.awesomeThings.push(data);
    //         });
    // }


    function getTrustedIframeSrc(id) {
      return trustLink(getIframeSrc(id));
    }
    function splitArtists() {
      vm.artistsArray = vm.artistsList.split(",");
      console.log(vm.artistsArray);
      for(var i = 0 ; i<vm.artistsArray.length; i++) {
        vm.addArtists(vm.artistsArray[i]);
      }
    }

    function addArtists(artist) {
      vm.clips = [];
      youtube
      .showItems(artist)
      .then(function(response) {
        vm.artistsList = '';
        angular.forEach(response.data.items, function(item, index) {
          vm.clips.push(item);
        });
      })
    }

    function getIframeSrc(videoId) {
      return 'https://www.youtube.com/embed/' + videoId;
    };

    function trustLink(src) {
      return $sce.trustAsResourceUrl(src);
    };

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    // function getWebDevTec() {
    //   //vm.awesomeThings = webDev 
    //   angular.forEach(vm.awesomeThings, function(awesomeThing) {
    //     awesomeThing.rank = Math.random();
    //   });
    // }
  }
})();
