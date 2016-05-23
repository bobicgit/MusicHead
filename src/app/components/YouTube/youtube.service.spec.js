(function() {
  'use strict';

  describe('youtubeDataService', function() {
    var youtubeDataService;

    beforeEach(module('musicHead'));
    beforeEach(inject(function(_youtubeDataService_) {
      youtubeDataService = _youtubeDataService_;
    }));

    describe('getUrl function', function() {
      it('should return a string without argument', function() {
        var isThisString = youtubeDataService.getUrl()
        expect(typeof isThisString).toBe('string');
      });
// konkrenty string
      it('should return a string wit argument', function() {
        var command = "search",
            isThisString = youtubeDataService.getUrl(command)
        expect(typeof isThisString).toBe('string');
      });
    })

    describe('getDataObject function', function() {
      it('should return an object', function() {
        var query = "moloko",
            command = "search",
            isThisObject = youtubeDataService.getDataObject(command, query);
        expect(isThisObject).toEqual(jasmine.any(Object));
      });

      it('returned object has two keys', function() {
        var query = "moloko",
            command = "search",
            isThisObject = youtubeDataService.getDataObject(command, query);
        expect(Object.keys(isThisObject).length).toEqual(2);
      });

      it('"params" key in returned object has 8 keys', function() {
        var query = "moloko",
            command = "search",
            isThisObject = youtubeDataService.getDataObject(command, query);
        expect(Object.keys(isThisObject.params).length).toEqual(8);
      });
    })

  });
})();
