(function() {
  'use strict';

  angular
    .module('musicHead')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, youtube, toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1460370332351;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      //getWebDevTec();
      return youtube
            .initConnection()
            .then(function(data) {
              vm.awesomeThings.push(data);
            });
    }

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
