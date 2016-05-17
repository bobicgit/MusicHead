'use strict';

describe('The specific artist view', function () {
  var page,
      Q;

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./artistPage.po');
    Q = require('q');
    browser.ignoreSynchronization = true;
  });

  describe('specific artist page, subview of application', function() {
    describe('Redirection to specific route ', function() {
      xit('clicking in artist link, should redirect to route of specific artist', function() {
        page.input.sendKeys('pink floyd, m83, moloko');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.artistBtnDiv), 2000);
          var isClickable = page.EC.elementToBeClickable(page.specificArtistLink);
          browser.wait(isClickable, 5000);
          page.specificArtistLink.click().then(function() {
            expect(page.specificArtistLink.getAttribute('class')).toContain('currentArtist');
            expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:3000/index.html#/allArtists/pink%20floyd');
            return;
          });
        });
      });
    });

    describe('pagination on specific artist route', function() {
      xit('no pagination arrows should appear', function() {
        page.input.sendKeys('pink floyd, m83');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.artistBtnDiv), 2000);
          var isClickable = page.EC.elementToBeClickable(page.specificArtistLink);
          browser.wait(isClickable, 5000);
          page.specificArtistLink.click().then(function() {
            expect(page.rightArrow.isPresent()).toBe(false);
            expect(page.leftArrow.isPresent()).toBe(false);
            return;
          });
        });
      });
    });

    describe('clips on specific artist route', function() {
      it('clips should be only from specific artist', function(done) {
        var promises = [],
            titlesOfSongs = [];
        page.input.sendKeys('pink floyd, m83');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.artistBtnDiv), 2000);
          var isClickable = page.EC.elementToBeClickable(page.specificArtistLink);
          browser.wait(isClickable, 5000);
          page.specificArtistLink.click().then(function() {
            page.clips.then(function(clips) {
var j = 0;
              for(var i = 0; i < clips.length; i++) {
                clips[i].getText().then(function(text) {
                  console.log(text);
                    j++;
                    console.log(j, clips.length, (j === clips.length));
                    expect(text).toContain('Pink Floyd');

                    if(j === (clips.length)) {
                      done();
                    }
                  });
                promises.push(clips[i]);
              }

            //   Q.all(promises).then(function(result) {
            //     return result;
            //   }).then(function(result) {
            //     var j = 0;
            //     if(!result.length){ done();}
            //     for(var i = 0; i < result.length; i++ ) {
            //       result[i].getText().then(function(text) {
            //         j++;
            //         console.log(j, result.length, (j === result.length));
            //         expect(text).toContain('Pink Floyd');

            //         if(j === (result.length)) {
            //           done();
            //         }
            //       });
            //     }
            //   });
            // });
        });
      });
    });
  });
});
});});
