(function() {
  'use strict';

  describe('controllers', function(){
    var vm;
    //var toastr;

    beforeEach(module('musicHead'));
    beforeEach(inject(function(_$controller_) {
      //spyOn(_toastr_, 'info').and.callThrough();

      vm = _$controller_('MainController');
      //toastr = _toastr_;
    }));

    // it('should have a timestamp creation date', function() {
    //   expect(vm.creationDate).toEqual(jasmine.any(Number));
    // });

    // it('should show a Toastr info and stop animation when invoke showToastr()', function() {
    //   vm.showToastr();
    //   expect(toastr.info).toHaveBeenCalled();
    //   expect(vm.classAnimation).toEqual('');
    // });

    // it('should define more than 5 awesome things', function() {
    //   expect(angular.isArray(vm.awesomeThings)).toBeTruthy();
    //   expect(vm.awesomeThings.length === 5).toBeTruthy();
    // });

    it('artistsArrayTrimmed should be undefined', function() {
       expect(vm.artistsArrayTrimmed).toBe(undefined);
    })

    // it('changeVideo function should be called with argument', function() {
    //   console.log(vm.getResource);
    //   var video = {};
    //   spyOn(vm, 'changeVideo');
    //   vm.changeVideo(video);
    //   expect(vm.changeVideo).toHaveBeenCalled();
    // })
  });
})();
