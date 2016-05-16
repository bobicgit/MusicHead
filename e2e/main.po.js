/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.EC = protractor.ExpectedConditions;
  this.generateButton = element(by.css('.btn-danger'));
  this.input = element(by.model('startCtrl.artistsList'));
  this.leftArrow = element(by.className('glyphicon-chevron-left'));
  this.rightArrow = element(by.className('glyphicon-chevron-right'));
  this.clips = element.all(by.repeater('clip in main.clips'));

  this.navBarDirective = element(by.tagName('nav-bar'));
  this.nextButton = this.navBarDirective.element(by.css('.glyphicon.glyphicon-fast-forward.controlls'));
  this.fbLogInBtn = element(by.css('.fbLogin'));
  this.artistsDivs = element.all(by.repeater('artist in main.artistsArrayTrimmed'));
  this.videoItemContainer = element(by.className('vid-item'));
  this.artistsBtnsContainer = element(by.id('linkContainer'));
  this.artistBtn = element(by.className('artistBtn'));
  this.navBarPlayerControllsContainer = element(by.className('player-controlls'));
  // this.artistsLinks = this.artistsDivs.element(by.tagName('a'));

};

module.exports = new MainPage();
