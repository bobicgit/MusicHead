(function() {

  'use strict';

  angular
    .module('musicHead')
    .directive('youtubePlayer', youtubePlayer);

  youtubePlayer.$inject = ['$window','YT_event','$interval','youtubeFactory','helpersFactory','$routeParams'];

  function youtubePlayer($window, YT_event, $interval, youtubeFactory, helpersFactory, $routeParams) {

    var myPlayer;

    return {
      restrict: "E",
      scope: {
        videoid: "="
      },
      require: '^youtubePlayerContainer',
      template: '<div></div>',
      link: function(scope, element, attributes, youtubePlayerContainerCtrl) {
        var dbTitle,
            myClips = youtubeFactory.readCache(),
            routeArtist = $routeParams.artist;

  // Condition that checks if we are on a specific artist route

        (myClips.length !== 0 && angular.isDefined(routeArtist)) ?  myClips = getRouteArtists() : void(0);

  // Create Player

        myPlayer =  new YT.Player(element.children()[0], {
          videoId: scope.videoid,
          playerVars: {
            html5: 1,
            modesbranding: 1,
            iv_load_policy: 3,
            showinfo: 1,
            controls: 0,
            autoplay: 1,
            fs: 1
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
          scope.$emit('currentVideoDuration', myPlayer.getDuration());
          // Clear any old interval.
          $interval.cancel(time_update_interval);
          // Start interval to update elapsed time display and
          // the elapsed part of the progress bar every second.
          var time_update_interval = $interval(function() {
            updateTimerDisplay();
            updateProgressBar();
          }, 1000)
        }

      // This function is called by initialize()

        function updateTimerDisplay() {
          if(myPlayer.getCurrentTime) {
            youtubePlayerContainerCtrl.currentTime = helpersFactory.formatTime(myPlayer.getCurrentTime());
            youtubePlayerContainerCtrl.duration = helpersFactory.formatTime(myPlayer.getDuration());
          }
        }

        function updateProgressBar() {
          if(myPlayer.getCurrentTime) {
            youtubePlayerContainerCtrl.progress = ((myPlayer.getCurrentTime() / myPlayer.getDuration()) *100);
          }
        }

    // Function called by 'onStateChange' youtube player event

        function changeVideo(event) {
          if(event.data == YT.PlayerState.ENDED) {
            var nextVideoIndex;
            angular.forEach(myClips, function(item) {
              item.id.videoId === scope.videoid ? nextVideoIndex = myClips.indexOf(item) +1 : false;
            });
            nextVideoIndex === myClips.length ? (nextVideoIndex = 0, youtubePlayerContainerCtrl.currentPage = 0) : false;
            myPlayer.cueVideoById(myClips[nextVideoIndex].id.videoId);
            myPlayer.playVideo();
            scope.videoid = myClips[nextVideoIndex].id.videoId;
            nextVideoIndex % youtubePlayerContainerCtrl.pageSize === 0 ? youtubePlayerContainerCtrl.currentPage++ : false;
          }
        }

    // Function that overwrite vm.clips on specific artist route

        function getRouteArtists() {
          var myRouteClips = myClips.filter(function(clip) {
            dbTitle = clip.snippet.title.toLowerCase();
            routeArtist = routeArtist.toLowerCase();
            if(dbTitle.indexOf(routeArtist) > -1) {
              return true;
            }
          });
          return myRouteClips;
        }

    // Watching if videoId have changed, generally. If it has, placeing new Id in player.

        scope.$watch('videoid', function(newValue, oldValue) {
          if(newValue == oldValue) {
            return;
          }
          myPlayer.cueVideoById(scope.videoid);
          scope.$emit('newId', scope.videoid);
          myPlayer.playVideo();
        });

    // Handlers for player controlls.

        scope.$on(YT_event.STOP, function() {
          myPlayer.seekTo(0);
          myPlayer.stopVideo();
        });

        scope.$on(YT_event.PLAY, function() {
          myPlayer.playVideo();
        });

        scope.$on(YT_event.PAUSE, function() {
          myPlayer.pauseVideo();
        });

        scope.$on(YT_event.NEXT, function() {
          myPlayer.seekTo(myPlayer.getDuration());
        });

        scope.$on(YT_event.MUTE, function() {
          myPlayer.isMuted() ? myPlayer.unMute() : myPlayer.mute();
        });

        scope.$on('progress', function() {
          var newTime = myPlayer.getDuration() * (youtubePlayerContainerCtrl.progress / 100)
          myPlayer.seekTo(newTime);
        });

        scope.$on(YT_event.VOLUME, function(event, volume) {
          myPlayer.setVolume(volume);
        });

        scope.$on(YT_event.FULLSCREEN, function() {
          myPlayer.requestFullScreen();
        });
      }
    };
  }
})();
