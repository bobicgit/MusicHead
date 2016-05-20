(function() {
  'use strict';

  describe('dataService', function() {
    var dataService,
        cachingFactory,
        rootScope,
        $q;

    beforeEach(module('musicHead'));
    beforeEach(inject(function(_dataService_, _cachingFactory_,_$rootScope_,_$q_) {
      dataService = _dataService_;
      cachingFactory = _cachingFactory_;
      rootScope = _$rootScope_;
      $q = _$q_;
    }));

    describe('getArtists function', function() {
      it('should read input artists form cache factory, when user is not connected to Facebook', function() {
        var connected = false,
            promise;

        spyOn(cachingFactory,'readInputArrayFromCache').and.returnValue('');
        promise = dataService.getArtists(connected);

        promise.then(function() {
          expect(cachingFactory.readInputArrayFromCache).toHaveBeenCalled();
        });
        rootScope.$digest();
      });

      it('should call dataService.getMusicInfoFromFb to get artists, when user is connected to Facebook ', function() {
        var connected = true,
            promise;

        spyOn(dataService,'getMusicInfoFromFb').and.callFake(function() {
          var defer = $q.defer();
          defer.resolve([1,2]);
          return defer.promise;
        });
        promise = dataService.getArtists(connected);

        promise.then(function() {
          expect(dataService.getMusicInfoFromFb).toHaveBeenCalled();
        });
        rootScope.$digest();
      });
    })

  });
})();

