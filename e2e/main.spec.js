'use strict';

describe('The main view', function () {
  var page,
      Q;

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./main.po');
    Q = require('q');
    browser.ignoreSynchronization = true;
  });

  xit('generate button on my main page should have btn-danger class', function() {
    expect(page.generateButton.getAttribute('class')).toEqual('btn btn-danger');
  });

  xit('facebook button on my main page should have fbLogin class', function() {
    expect(page.fbLogInBtn.getAttribute('class')).toEqual('fbLogin');
  });

  xit('should redirect after click button, with filled input.', function() {
    page.input.sendKeys('pink floyd');
    page.generateButton.click();
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return (/allArtists/).test(url);
      });
    });
    expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:3000/index.html#/allArtists');
  });

  xit('should not redirect after click button, without filling input.', function() {
    page.generateButton.click();
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl();
      });
    expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:3000/index.html#/');
  });

//////////////CLIPS PAGINATION////////////////////////

  xit('right arrow should be visible', function() {
    var currentUrl;
    page.input.sendKeys('pink floyd,moloko');
    page.generateButton.click().then(function() {
      browser.wait(page.EC.visibilityOf(page.rightArrow), 2000);
      expect(page.rightArrow.isPresent()).toBe(true);
      return;
      });
    }); 

  xit('left arrow should be visible, after clicking once right arrow', function() {
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

  xit('when there is two or less artists in input, left arrow should be visible, and right arrow should dissapear. After clicking once right arrow', function() {
    page.input.sendKeys('pink floyd,moloko');
    page.generateButton.click().then(function() {
      browser.wait(page.EC.visibilityOf(page.rightArrow), 2000);
      page.rightArrow.click().then(function() {
        //browser.wait(page.EC.visibilityOf(page.leftArrow), 2000); // no more need for waiting 
        expect(page.rightArrow.isPresent()).toBe(false);
        expect(page.leftArrow.isPresent()).toBe(true);
        return;
      });
    });
  });

  xit('when there is three or more artists in input, left and right arrow should be visible. After clicking once right arrow', function() {
    page.input.sendKeys('pink floyd,moloko,m83');
    page.generateButton.click().then(function() {
      browser.wait(page.EC.visibilityOf(page.rightArrow), 2000);
      page.rightArrow.click().then(function() {
        //browser.wait(page.EC.visibilityOf(page.leftArrow), 2000); // no more need for waiting 
        expect(page.rightArrow.isPresent()).toBe(true);
        expect(page.leftArrow.isPresent()).toBe(true);
        return;
      });
    });
  });

  xit('when there is only one artist given, no arrows should appear', function() {
    page.input.sendKeys('pink floyd');
    page.generateButton.click().then(function() {
      browser.wait(page.EC.visibilityOf(page.videoItemContainer), 2000);
        //browser.wait(page.EC.visibilityOf(page.leftArrow), 2000); // no more need for waiting 
      expect(page.rightArrow.isPresent()).toBe(false);
      expect(page.leftArrow.isPresent()).toBe(false);
      return;
    });
  });


//////////////CLIPS////////////////////////

  xit('number of visible clips on one page should be 4. No matter how many artists is given.', function() {
    page.input.sendKeys('pink floyd, m83, moloko');
    page.generateButton.click().then(function() {
      browser.wait(page.EC.visibilityOf(page.videoItemContainer), 2000);
      page.clips.then(function(clips) {
        expect(clips.length).toEqual(4);
        return;
      });
    });
  });

//////////////ARTISTS LINKS////////////////////////


  xit('create links to the artists', function() {
    page.input.sendKeys('pink floyd, m83, moloko');
    page.generateButton.click().then(function() {
    browser.wait(page.EC.visibilityOf(page.artistsBtnsContainer), 2000);
      page.artistsDivs.then(function(artists) {
        expect(artists.length).toBe(3);
        return;
      });
    });
  });

  xit('create links with artists texts', function() {
    page.input.sendKeys('pink floyd, m83, moloko');
    page.generateButton.click().then(function() {
      browser.wait(page.EC.visibilityOf(page.artistBtn), 2000);
      page.artistBtn.getText().then(function(text) {
        expect(text).toContain('pink floyd');
      })
    });
  });




  it('after clicking next button, next video from list should gain "selected" class', function() {
    page.input.sendKeys('pink floyd,moloko');
    page.generateButton.click().then(function() {
      browser.wait(page.EC.visibilityOf(page.navBarPlayerControllsContainer), 2000);
      var isClickable = page.EC.elementToBeClickable(page.nextButton);
      browser.wait(isClickable, 5000);
      page.nextButton.click().then(function() {
        page.clips.then(function(clips) {
          browser.sleep(2000);
          var nextClip = clips[1];
          expect(nextClip.getAttribute('class')).toContain('selected');
        });      
      })
    });
  });


});
