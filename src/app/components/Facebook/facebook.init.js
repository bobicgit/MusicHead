/*eslint angular/document-service: 1*/
/*eslint angular/window-service: 1*/
(function() {

  'use strict';

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '801161899985580',
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.5' // use graph api version 2.5
    });

    angular.element(document).ready(function() {
          angular.bootstrap(document.body, ['musicHead']);
      });
  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
})();
