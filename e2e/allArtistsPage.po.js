/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var allArtistsPage = function() {
  this.EC = protractor.ExpectedConditions;
  this.generateButton = element(by.css('.btn-danger'));
  this.input = element(by.model('startCtrl.artistsList'));
  this.leftArrow = element(by.className('glyphicon-chevron-left'));
  this.rightArrow = element(by.className('glyphicon-chevron-right'));
  this.clips = element.all(by.repeater('clip in main.clips'));
  this.artistsDivs = element.all(by.repeater('artist in main.artistsArrayTrimmed'));
  this.videoItemContainer = element(by.className('vid-item'));
  this.artistsBtnsContainer = element(by.id('linkContainer'));
  this.artistBtnDiv = element(by.className('artistBtn'));
  this.specificArtistLink = element(by.css('.specificArtistLink'));
  this.navBarPlayerControllsContainer = element(by.className('player-controlls'));
  this.videoTimeContainer = element(by.id('current-time'));
  this.volumeInput = element(by.model('navBarCtrl.volume'));
  this.allArtistsButton = element(by.css('.allArt'));
  this.navBarDirective = element(by.tagName('nav-bar'));
  this.nextButton = this.navBarDirective.element(by.css('.glyphicon.glyphicon-fast-forward.controlls'));
  this.stopButton = this.navBarDirective.element(by.css('.glyphicon.glyphicon-stop.controlls'));
  this.pauseButton = this.navBarDirective.element(by.css('.glyphicon.glyphicon-pause.controlls'));
  this.playButton = this.navBarDirective.element(by.css('.glyphicon.glyphicon-play.controlls'));
  this.volumeButtonUp = this.navBarDirective.element(by.css('.glyphicon.glyphicon-volume-up'));
  this.volumeButtonOff = this.navBarDirective.element(by.css('.glyphicon.glyphicon-volume-off'));
};

module.exports = new allArtistsPage();
