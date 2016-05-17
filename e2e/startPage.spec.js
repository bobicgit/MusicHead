'use strict';

describe('The startPage view', function () {
  var page;

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./startPage.po');
    browser.ignoreSynchronization = true;
  });

  describe('StartPage, first view of application', function() {
    xit('generate button on my startPage page should have btn-danger class', function() {
      expect(page.generateButton.getAttribute('class')).toEqual('btn btn-danger');
    });

    xit('facebook button on my startPage page should have fbLogin class', function() {
      expect(page.fbLogInBtn.getAttribute('class')).toEqual('fbLogin');
    });

    xit('should redirect after click button, with filled input.', function() {
      page.input.sendKeys('pink floyd');
      page.generateButton.click().then(function() {
        expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:3000/index.html#/allArtists');
      });
    });

    xit('should not redirect after click button, without filling input.', function() {
      page.generateButton.click().then(function() {
        expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:3000/index.html#/');
      });
    });
  });
});
