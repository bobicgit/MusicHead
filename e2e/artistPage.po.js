/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var artistPage = function() {
  this.EC = protractor.ExpectedConditions;
  this.generateButton = element(by.css('.btn-danger'));
  this.input = element(by.model('startCtrl.artistsList'));
  this.artistBtnDiv = element(by.className('artistBtn'));
  this.specificArtistLink = element(by.css('.specificArtistLink'));
  this.leftArrow = element(by.className('glyphicon-chevron-left'));
  this.rightArrow = element(by.className('glyphicon-chevron-right'));
  this.clips = element.all(by.repeater('clip in main.clips'));
  this.clipDescription = element(by.css('.descTitle'));
};

module.exports = new artistPage();
