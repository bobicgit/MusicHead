(function() {

  'use strict';

  angular
    .module('musicHead')
    .directive('youtubePlayer', youtubePlayer);

    youtubePlayer.$inject = ['$window','YT_event','$interval'];

    function youtubePlayer($window, YT_event, $interval) {

      var myPlayer;

      return {
        restrict: "E",
        scope: {
          videoid: "="
        },
        require: '^youtubePlayerContainer',
        template: '<div></div>',
        link: function(scope, element, attributes, youtubePlayerContainerCtrl) {
console.log(arguments );
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

          function initialize() {

            updateTimerDisplay();
            // Clear any old interval.
            clearInterval(time_update_interval);
            // Start interval to update elapsed time display and
            // the elapsed part of the progress bar every second.
            var time_update_interval = $interval(function () {
              updateTimerDisplay();
            }, 1000)
          }

        // This function is called by initialize()

          function updateTimerDisplay(){
            youtubePlayerContainerCtrl.currentTime = formatTime(myPlayer.getCurrentTime());
            youtubePlayerContainerCtrl.duration = formatTime(myPlayer.getDuration());
          }

          function formatTime(time){
            time = Math.round(time);
            var minutes = Math.floor(time / 60),
            seconds = time - minutes * 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            return minutes + ":" + seconds;
          }

          function changeVideo(event) {
            if(event.data == YT.PlayerState.ENDED) {
              myClips = youtube.readCache();
              console.log(i, myClips)
              myPlayer.cueVideoById(myClips[i+1].id.videoId);
              i++;
              myPlayer.playVideo();
              if(i === myClips.length - 1) { i = 0; }
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

        }
    };
  }
})();
