/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var StartPage = function() {
  this.EC = protractor.ExpectedConditions;
  this.generateButton = element(by.css('.btn-danger'));
  this.input = element(by.model('startCtrl.artistsList'));
  this.fbLogInBtn = element(by.css('.fbLogin'));
};

module.exports = new StartPage();
