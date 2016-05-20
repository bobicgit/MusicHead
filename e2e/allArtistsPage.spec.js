'use strict';

describe('The allArtists view', function () {
  var page;

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./allArtistsPage.po');
    browser.ignoreSynchronization = true;
  });

  describe('allArtists page, main view of application', function() {
    describe('Clips pagination tests', function() {
      it('right arrow should be visible', function() {
        var currentUrl;
        page.input.sendKeys('pink floyd,moloko');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.rightArrow), 2000);
          expect(page.rightArrow.isPresent()).toBe(true);
          return;
        });
      });

      it('left arrow should be visible, after clicking once right arrow', function() {
        page.input.sendKeys('pink floyd,moloko');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.rightArrow), 2000);
          page.rightArrow.click().then(function() {
            browser.wait(page.EC.visibilityOf(page.leftArrow), 2000);
            expect(page.leftArrow.isPresent()).toBe(true);
            return;
          });
        });
      });

      it('when there is two or less artists in input, left arrow should be visible, and right arrow should dissapear. After clicking once right arrow', function() {
        page.input.sendKeys('pink floyd,moloko');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.rightArrow), 2000);
          page.rightArrow.click().then(function() {
            expect(page.rightArrow.isPresent()).toBe(false);
            expect(page.leftArrow.isPresent()).toBe(true);
            return;
          });
        });
      });

      it('when there is three or more artists in input, left and right arrow should be visible. After clicking once right arrow', function() {
        page.input.sendKeys('pink floyd,moloko,m83');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.rightArrow), 2000);
          page.rightArrow.click().then(function() {
            expect(page.rightArrow.isPresent()).toBe(true);
            expect(page.leftArrow.isPresent()).toBe(true);
            return;
          });
        });
      });

      it('when there is only one artist given, no arrows should appear', function() {
        page.input.sendKeys('pink floyd');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.videoItemContainer), 2000);
          expect(page.rightArrow.isPresent()).toBe(false);
          expect(page.leftArrow.isPresent()).toBe(false);
          return;
        });
      });
    });

    describe('Clips tests', function() {
      it('number of visible clips on one page should be 4. No matter how many artists is given.', function() {
        page.input.sendKeys('pink floyd, m83, moloko');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.videoItemContainer), 2000);
          page.clips.then(function(clips) {
            expect(clips.length).toEqual(4);
            return;
          });
        });
      });

      it('gain selected class after click on clip', function() {
        page.input.sendKeys('pink floyd');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.videoItemContainer), 2000);
          page.clips.then(function(clips) {
            var nextClip = clips[1];
            var isClickable = page.EC.elementToBeClickable(nextClip);
            browser.wait(isClickable, 5000);
            nextClip.click().then(function() {
              expect(nextClip.getAttribute('class')).toContain('selected');
              return;
            });
          });
        });
      });
    });

    describe('Link container, link with artits names tests', function() {
      it('should create an all artists button with currentArtist class', function() {
        page.input.sendKeys('pink floyd, m83, moloko');
        page.generateButton.click().then(function() {
        browser.wait(page.EC.visibilityOf(page.artistsBtnsContainer), 2000);
          expect(page.allArtistsButton.isPresent()).toBe(true);
          expect(page.allArtistsButton.getAttribute('class')).toContain('currentArtist');
          return;
        });
      });

      it('create links to the artists', function() {
        page.input.sendKeys('pink floyd, m83, moloko');
        page.generateButton.click().then(function() {
        browser.wait(page.EC.visibilityOf(page.artistsBtnsContainer), 2000);
          page.artistsDivs.then(function(artists) {
            expect(artists.length).toBe(3);
            return;
          });
        });
      });

      it('create links with artists texts', function() {
        page.input.sendKeys('pink floyd, m83, moloko');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.artistBtnDiv), 2000);
          page.artistBtnDiv.getText().then(function(text) {
            expect(text).toContain('pink floyd');
            return;
          });
        });
      });
    });

    describe('Contolls in navBar directive tests', function() {
      it('after clicking next button, next video from list should gain "selected" class', function() {
        page.input.sendKeys('pink floyd,moloko');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.navBarPlayerControllsContainer), 2000);
          var isClickable = page.EC.elementToBeClickable(page.nextButton);
          browser.wait(isClickable, 5000);
          page.clips.then(function(clips) {
            page.nextButton.click().then(function() {
              browser.sleep(2000);
              var nextClip = clips[1];
              expect(nextClip.getAttribute('class')).toContain('selected');
              return;
            });
          });
        });
      });

      it('after click stop button, time of the clip should change to 0:00', function() {
        page.input.sendKeys('pink floyd');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.videoTimeContainer), 2000);
          var isClickable = page.EC.elementToBeClickable(page.stopButton);
          browser.wait(isClickable, 5000);
          page.stopButton.click().then(function() {
            page.videoTimeContainer.getText().then(function(text) {
              expect(text).toContain('0:00');
              return;
            });
          });
        });
      });

      it('after click pause button, time of clips should not reset', function() {
        page.input.sendKeys('pink floyd');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.videoTimeContainer), 2000);
          var isClickable = page.EC.elementToBeClickable(page.pauseButton);
          browser.wait(isClickable, 5000);
          browser.sleep(2000);
          page.pauseButton.click().then(function() {
            page.videoTimeContainer.getText().then(function(text) {
              expect(text).not.toContain('0:00');
              return;
            });
          });
        });
      });

      it('click stop button, then play button, clip should start playing', function() {
        page.input.sendKeys('pink floyd');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.videoTimeContainer), 2000);
          var isClickable = page.EC.elementToBeClickable(page.stopButton);
          browser.wait(isClickable, 5000);
          browser.sleep(2000);
          page.stopButton.click().then(function() {
            page.playButton.click().then(function() {
              browser.sleep(2000);
              page.videoTimeContainer.getText().then(function(text) {
                expect(text).not.toContain('0:00');
                return;
              });
            });
          });
        });
      });

      it('should change volume icon on one click', function() {
        page.input.sendKeys('pink floyd');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.navBarPlayerControllsContainer), 2000);
          var isClickable = page.EC.elementToBeClickable(page.volumeButtonUp);
          browser.wait(isClickable, 5000);
          page.volumeButtonUp.click().then(function() {
            page.volumeButtonOff.getAttribute('class').then(function(classVal) {
              browser.sleep(1000);
              console.log(classVal);
              expect(classVal).toContain('glyphicon-volume-off');
              expect(classVal).not.toContain('glyphicon-volume-up');
              return;
            });
          });
        });
      });

      it('volume range should remember value after two clicks on volume button', function() {
        page.input.sendKeys('pink floyd');
        page.generateButton.click().then(function() {
          browser.wait(page.EC.visibilityOf(page.navBarPlayerControllsContainer), 2000);
          page.volumeInput.getAttribute('value').then(function(volume) {
            var oldVolume = volume;
            var isClickable = page.EC.elementToBeClickable(page.volumeButtonUp);
            browser.wait(isClickable, 5000);
            page.volumeButtonUp.click().then(function() {
              browser.sleep(1000);
              page.volumeButtonOff.click().then(function() {
                page.volumeInput.getAttribute('value').then(function(newVolume) {
                  expect(oldVolume).toEqual(newVolume);
                  return;
                });
              });
            });
          });
        });
      });
    });
  });
});
