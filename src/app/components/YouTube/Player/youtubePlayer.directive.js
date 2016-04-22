(function() {

  'use strict';

  angular
    .module('musicHead')
    .directive('youtubePlayer', youtubePlayer);

    youtubePlayer.$inject = ['$window','YT_event','$interval','youtubeFactory','helpersFactory'];

    function youtubePlayer($window, YT_event, $interval, youtubeFactory, helpersFactory) {

      var myPlayer;

      return {
        restrict: "E",
        scope: {
          videoid: "="
        },
        require: '^youtubePlayerContainer',
        template: '<div></div>',
        link: function(scope, element, attributes, youtubePlayerContainerCtrl) {
          var myClips;
          var i = 0;

          myPlayer =  new YT.Player(element.children()[0], {
            height: '390',
            width: '640',
            videoId: scope.videoid,
            playerVars: {
              html5: 1,
              modesbranding: 1,
              iv_load_policy: 3,
              showinfo: 1,
              controls: 1,
              autoplay: 1
            },
            events: {
              'onReady': initialize,
              'onStateChange': changeVideo
            }
          });

          // Function called by 'onReady' youtube player event

          function initialize() {
            updateTimerDisplay();
            updateProgressBar();
            // Clear any old interval.
            clearInterval(time_update_interval);
            // Start interval to update elapsed time display and
            // the elapsed part of the progress bar every second.
            var time_update_interval = $interval(function () {
              updateTimerDisplay();
              updateProgressBar();
            }, 1000);
          }

        // This function is called by initialize()

          function updateTimerDisplay() {
            youtubePlayerContainerCtrl.currentTime = helpersFactory.formatTime(myPlayer.getCurrentTime());
            youtubePlayerContainerCtrl.duration = helpersFactory.formatTime(myPlayer.getDuration());
          }

          function updateProgressBar() {
            youtubePlayerContainerCtrl.progress = ((myPlayer.getCurrentTime() / myPlayer.getDuration()) * 100);
          }

         // Function called by 'onStateChange' youtube player event

          function changeVideo(event) {
            myClips = youtubeFactory.readCache();
            if(event.data == YT.PlayerState.ENDED) {
              (i === myClips.length - 1) ? i=0 : i++;
              myPlayer.cueVideoById(myClips[i].id.videoId);
              myPlayer.playVideo();
              scope.videoid = myClips[i].id.videoId;
            }
          }

          // Watching if videoId have changed, generally. If it has, placeing new Id in player.
          scope.$watch('videoid', function(newValue, oldValue) {
            if (newValue == oldValue) {
              return;
            }
            myPlayer.cueVideoById(scope.videoid);
            myPlayer.playVideo();
          });

          // Handlers for player controlls.
          scope.$on(YT_event.STOP, function () {
            myPlayer.seekTo(0);
            myPlayer.stopVideo();
          });

          scope.$on(YT_event.PLAY, function () {
            myPlayer.playVideo();
          });

          scope.$on(YT_event.PAUSE, function () {
            myPlayer.pauseVideo();
          });

          scope.$on(YT_event.NEXT, function () {
            myPlayer.seekTo(myPlayer.getDuration());
          });

          scope.$on('progress', function () {
            var newTime = myPlayer.getDuration() * (youtubePlayerContainerCtrl.progress / 100)
            myPlayer.seekTo(newTime);
          });
        }
    };
  }
})();
