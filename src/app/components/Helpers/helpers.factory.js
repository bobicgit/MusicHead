(function() {

  'use strict';

  angular
    .module('musicHead')
    .factory('helpersFactory', helpersFactory);

  function helpersFactory() {

  // Accessible members

    var factory = {
      trimmingArray: trimmingArray,
      shuffle: shuffle,
      formatTime: formatTime
    };

  // Returning object of functions

    return factory;

  // Functions declatarions

    function trimmingArray(arr) {
      var trimmedArray = [];
      angular.forEach(arr, function(item) {
        item = item.trim();
        if (-1 === trimmedArray.indexOf(item)){
          trimmedArray.push(item);
        }
      });
      return trimmedArray;
    }

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
      // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    // Function for formating time into minutes and seconds

      function formatTime(time) {
        time = Math.round(time);
        var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return minutes + ":" + seconds;
      }

  }
})();
