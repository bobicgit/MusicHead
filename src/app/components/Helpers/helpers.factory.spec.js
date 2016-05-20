(function() {
  'use strict';

  describe('factory Helpers', function() {
    var helpersFactory;

    beforeEach(module('musicHead'));
    beforeEach(inject(function(_helpersFactory_) {
      helpersFactory = _helpersFactory_;
    }));

    describe('trimmingArray function', function() {

      it('should return an array', function() {
        //console.log(helpersFactory);
        var arr = ['maciek','michal','arek '],
            newArr;
        newArr = helpersFactory.trimmingArray(arr);
        expect(newArr).toEqual(jasmine.any(Object));
      });

      it('should not return duplicates elements', function() {
        var arr = ['maciek','michal','arek ','maciek'],
            newArr;
        newArr = helpersFactory.trimmingArray(arr);
        expect(newArr).toEqual(['maciek','michal','arek']);
      });

      it('should remove spaces from elements', function() {
        var arr = ['maciek   ','   michal','                   arek '],
            newArr;
        newArr = helpersFactory.trimmingArray(arr);
        expect(newArr).toEqual(['maciek','michal','arek']);
      });

    })

    describe('shuffle function', function() {

      it('should return an array', function() {
        var arr = ['maciek','michal','arek '],
            newArr;
        newArr = helpersFactory.shuffle(arr);
        expect(newArr).toEqual(jasmine.any(Object));
      });

      it('should change order of elements in array', function() {
        var arr = ['maciek','michal','arek','kinga'],
            newArr;
        newArr = helpersFactory.shuffle(arr);
        expect(newArr).not.toEqual(['maciek','michal','arek','kinga']);
      });

    })
  });
})();
