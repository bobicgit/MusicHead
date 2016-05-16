'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./main.po');
    browser.ignoreSynchronization = true;
  });

  it('generate button on my main page should have btn-danger class', function() {
    expect(page.generateButton.getAttribute('class')).toEqual('btn btn-danger');
  });

  it('facebook button on my main page should have fbLogin class', function() {
    expect(page.fbLogInBtn.getAttribute('class')).toEqual('fbLogin');
  });

  it('should redirect after click button, with filled input.', function() {
    page.input.sendKeys('pink floyd');
    page.generateButton.click();
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return (/allArtists/).test(url);
      });
    });
    expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:3000/index.html#/allArtists');
  });

  it('should not redirect after click button, without filling input.', function() {
    page.generateButton.click();
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl();
      });
    expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:3000/index.html#/');
  });

//////////////CLIPS PAGINATION////////////////////////

  it('right arrow should be visible', function() {
    page.input.sendKeys('pink floyd,moloko');
    page.generateButton.click();
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return (/allArtists/).test(url);
      });
    });
    //browser.pause();
    expect(page.rightArrow.isPresent()).toBe(true);
  });

  it('left arrow should be visible, after clicking once right arrow', function() {
    page.input.sendKeys('pink floyd,moloko');
    page.generateButton.click();
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return (/allArtists/).test(url);
      });
    });
    //browser.pause();
    page.rightArrow.click();
    expect(page.leftArrow.isPresent()).toBe(true);
  });

  it('when there is two or less artists in input, left arrow should be visible, and right arrow should dissapear. After clicking once right arrow', function() {
    page.input.sendKeys('pink floyd,moloko');
    page.generateButton.click();
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return (/allArtists/).test(url);
      });
    });
    //browser.pause();
    page.rightArrow.click();
    expect(page.rightArrow.isPresent()).toBe(false);
    expect(page.leftArrow.isPresent()).toBe(true);
  });

  it('when there is three or more artists in input, left and right arrow should be visible. After clicking once right arrow', function() {
    page.input.sendKeys('pink floyd,moloko,m83');
    page.generateButton.click();
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return (/allArtists/).test(url);
      });
    });

    browser.sleep(1000);
    page.rightArrow.click();
    expect(page.rightArrow.isPresent()).toBe(true);
    expect(page.leftArrow.isPresent()).toBe(true);
  });

  it('when there is only one artist given, no arrows should appear', function() {
    page.input.sendKeys('pink floyd');
    page.generateButton.click();
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return (/allArtists/).test(url);
      });
    });

    //browser.pause();
    expect(page.rightArrow.isPresent()).toBe(false);
    expect(page.leftArrow.isPresent()).toBe(false);
  });

//////////////CLIPS////////////////////////

  it('number of visible clips on one page should be 4. No matter how many artists is given.', function() {
    page.input.sendKeys('pink floyd, m83, moloko');
    page.generateButton.click();
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return (/allArtists/).test(url);
      });
    });

    //browser.pause();
    page.clips.then(function(clips) {
      expect(clips.length).toEqual(4);
    });
  });

//////////////ARTISTS LINKS////////////////////////

  it('create links to the artists', function() {
    page.input.sendKeys('pink floyd, m83, moloko');
    page.generateButton.click();
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return (/allArtists/).test(url);
      });
    });

    //browser.pause();
    page.artistsDivs.then(function(artists) {
      expect(artists.length).toBe(3);
    });
  });

  xit('create links with artists texts', function() {
    page.input.sendKeys('pink floyd, m83, moloko');
    page.generateButton.click();
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return (/allArtists/).test(url);
      });
    });

    browser.pause();
    page.artistsDivs.then(function(artists) {
      console.log(element(by.tagName('a')).getAttribute('value'));
      expect(true).toBe(true);
    });
  });




// NIE DZIALA

  xit('after clicking next button, next video from list should gain "selected" class', function() {
    page.input.sendKeys('pink floyd,moloko');
    page.generateButton.click();
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return (/allArtists/).test(url);
      });
    });


    page.nextButton.click();

    page.clips.then(function(clips) {
     var nextClip = clips[1];
     expect(nextClip.getAttribute('class')).toEqual('selected');
    });


  });


});
