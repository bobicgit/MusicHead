/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var artistPage = function() {
  this.EC = protractor.ExpectedConditions;
  this.fbLoginButton = element(by.css('.fbLogin'));
  this.navBarDirective = element(by.tagName('nav-bar'));
  this.profilePicture = this.navBarDirective.element(by.css('#profilePicture'));
};

module.exports = new artistPage();

