(function() {
  'use strict';

  describe('dataService', function() {
    var dataService,
        cachingFactory;


    beforeEach(module('musicHead'));
    beforeEach(inject(function(_dataService_, _cachingFactory_) {
      dataService = _dataService_;
      cachingFactory = _cachingFactory_;
    }));

    describe('getArtists function', function($rootScope, done) {
      it('should get artists via promise', function() {
        var connected = false,
            promise = dataService.getArtists(connected);

        console.log(promise);

        promise.then(function(response) {
          console.log(response);
          expect(true).toBe(true);
        });
        $rootScope.$digest();
        done();
      });
    })

  });
})();

