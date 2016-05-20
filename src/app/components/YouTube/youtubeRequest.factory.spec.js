(function() {
  'use strict';

  describe('youtubeFactoryRequest', function() {
    var youtubeFactory,
        youtubeDataService;

    beforeEach(module('musicHead'));
    beforeEach(inject(function(_youtubeFactory_,_youtubeDataService_) {
      youtubeFactory = _youtubeFactory_;
      youtubeDataService = _youtubeDataService_;
    }));

// saveCache function tests

    describe('saveCache function', function() {
      it('should fill an array', function() {
        var arr = ['maciek'];
        youtubeFactory.saveCache(arr);

        expect(youtubeFactory.cache.length).toBeGreaterThan(0);
      });
    })

// clearCacheClips function tests

    describe('clearCacheClips function', function() {
      it('should empty an array', function() {
        var arr = ['maciek'];
        youtubeFactory.saveCache(arr);
        youtubeFactory.clearCacheClips()
        expect(youtubeFactory.cache.length).toBe(0);
      });
    })

// showItems function tests

    describe('showItems function', function() {
      it('youtubeDataService.getDataObject should been called', function() {
        var query = "moloko";
        spyOn(youtubeDataService,'getDataObject').and.returnValue({url:'',params:''});
        youtubeFactory.showItems(query);

        expect(youtubeDataService.getDataObject).toHaveBeenCalled();
      });

      it('youtubeDataService.getUrl should been called', function() {
        var query = "moloko";
        spyOn(youtubeDataService,'getUrl').and.returnValue('');
        youtubeFactory.showItems(query);

        expect(youtubeDataService.getUrl).toHaveBeenCalled();
      });

      it('showItems should return an object', function() {
        var query = "moloko",
            request = youtubeFactory.showItems(query);

        expect(request).toEqual(jasmine.any(Object));
      });
    })
  });
})();

