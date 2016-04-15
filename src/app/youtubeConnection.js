(function() {

  var player;

  console.log('a');
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('vid-container', {
      height: '390',
      width: '640',
      videoId: 'M7lc1UVf-VE',
      events: {
        'onReady': onPlayerReady
      }
    });
  }

  function onPlayerReady(event) {
    event.target.playVideo();
  }

})();

