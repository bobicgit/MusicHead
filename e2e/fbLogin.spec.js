 'use strict';

describe('Check Facebook login', function () {
  var page,
      pass = '111and'

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./fbLogin.po');
    browser.ignoreSynchronization = true;
  });

  describe('Facebook button', function() {
    it('Should login to Facebook, after clicking a button', function() {
      var isClickable = page.EC.elementToBeClickable(page.fbLoginButton);
      browser.wait(isClickable, 4000);
      page.fbLoginButton.click().then(function() {
        return browser.getAllWindowHandles().then(function(handles) {
          if (handles.length === 2) {
            browser.switchTo().window(handles[1]).then(function () {
              browser.sleep(1500);
              browser.driver.findElement(by.id('email')).sendKeys('maciej2222@gmail.com');
              browser.sleep(1500);
              browser.driver.findElement(by.id('pass')).sendKeys(pass);
              browser.driver.findElement(by.id('u_0_2')).click();
            });
            return browser.switchTo().window(handles[0]).then(function() {
              browser.wait(page.EC.visibilityOf(page.profilePicture), 3000);
              expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:3000/index.html#/allArtists');
              expect(page.profilePicture.isPresent()).toBe(true);
              return;
            });
          }
        });
      });
    });
  });
});

