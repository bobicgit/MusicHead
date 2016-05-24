/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('musicHead')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('YT_event', {
        STOP:0,
        PLAY:1,
        PAUSE:2,
        NEXT:3,
        PREVIOUS:4,
        MUTE: 5,
        VOLUME: 6,
        REPEAT: 7
    });
})();
