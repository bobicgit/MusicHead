!function(){"use strict";angular.module("musicHead",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngRoute","ui.bootstrap","toastr","angularSpinners"])}(),function(){"use strict";function t(t){function a(a,i,e,n){function r(){a.$broadcast("progress",l.progress)}function s(t){return e.getTrustedThumbnailSrc(t)}function o(){return{snippet:{title:c||""}}}var l=this,c=n.artist;l.apiReady=!1,l.currentDuration,l.currentPage=1,l.currentTime,l.duration,l.filterThumbnails=o(),l.getProgressValue=r,l.link=s,l.pageSize=4,l.progress=0,l.volume=100,t.onReady().then(function(){l.apiReady=!0}),a.$on("currentVideoDuration",function(){l.currentDuration=arguments[1]})}return a.$inject=["$scope","youtubeFactory","dataService","$routeParams"],{restrict:"E",templateUrl:"app/components/YouTube/PlayerContainer/playerContainer.html",controller:a,controllerAs:"ytContainerCtrl"}}angular.module("musicHead").directive("youtubePlayerContainer",t),t.$inject=["ytPlayerApi","youtubeFactory","dataService","$routeParams"]}(),function(){"use strict";function t(t,a,i,e,n,r){var s;return{restrict:"E",scope:{videoid:"="},require:"^youtubePlayerContainer",template:"<div></div>",link:function(t,o,l,c){function u(){d(),v(),t.$emit("currentVideoDuration",s.getDuration()),i.cancel(a);var a=i(function(){d(),v()},1e3)}function d(){s.getCurrentTime&&(c.currentTime=n.formatTime(s.getCurrentTime()),c.duration=n.formatTime(s.getDuration()))}function v(){s.getCurrentTime&&(c.progress=s.getCurrentTime()/s.getDuration()*100)}function g(a){if(a.data==YT.PlayerState.ENDED){var i;angular.forEach(f,function(a){a.id.videoId===t.videoid?i=f.indexOf(a)+1:!1}),i===f.length?(i=0,c.currentPage=0):!1,s.cueVideoById(f[i].id.videoId),s.playVideo(),t.videoid=f[i].id.videoId,i%c.pageSize===0?c.currentPage++:!1}}function p(){var t=f.filter(function(t){return m=t.snippet.title.toLowerCase(),y=y.toLowerCase(),m.indexOf(y)>-1?!0:void 0});return t}var m,f=e.readCache(),y=r.artist;0!==f.length&&angular.isDefined(y)?f=p():void 0,s=new YT.Player(o.children()[0],{videoId:t.videoid,playerVars:{html5:1,modesbranding:1,iv_load_policy:3,showinfo:1,controls:0,autoplay:1,fs:1},events:{onReady:u,onStateChange:g}}),t.$watch("videoid",function(a,i){a!=i&&(s.cueVideoById(t.videoid),t.$emit("newId",t.videoid),s.playVideo())}),t.$on(a.STOP,function(){s.seekTo(0),s.stopVideo()}),t.$on(a.PLAY,function(){s.playVideo()}),t.$on(a.PAUSE,function(){s.pauseVideo()}),t.$on(a.NEXT,function(){s.seekTo(s.getDuration())}),t.$on(a.MUTE,function(){s.isMuted()?s.unMute():s.mute()}),t.$on("progress",function(){var t=s.getDuration()*(c.progress/100);s.seekTo(t)}),t.$on(a.VOLUME,function(t,a){s.setVolume(a)}),t.$on(a.FULLSCREEN,function(){s.requestFullScreen()})}}}angular.module("musicHead").directive("youtubePlayer",t),t.$inject=["$window","YT_event","$interval","youtubeFactory","helpersFactory","$routeParams"]}(),function(){"use strict";function t(t,a,i,e){function n(){localStorage.favourites&&(f.favourites.playlists=angular.fromJson(localStorage.favourites).playlists),localStorage.activePlaylist&&(f.activePlaylist.activePlaylist=angular.fromJson(localStorage.activePlaylist)),m()}function r(t){if("no playlist created"===f.activePlaylist.activePlaylist.name)e.info("You have to create and select playlist in order to add artist to it");else{for(var a=0;a<f.activePlaylist.activePlaylist.artists.length;a++)if(f.activePlaylist.activePlaylist.artists[a].name===t)return;f.activePlaylist.activePlaylist.artists.push({name:t,active:!0}),localStorage.activePlaylist=angular.toJson(f.activePlaylist.activePlaylist),localStorage.favourites=angular.toJson(f.favourites),m()}}function s(t){for(var a=0;a<f.activePlaylist.activePlaylist.artists.length;a++)if(f.activePlaylist.activePlaylist.artists[a].name===t)return f.activePlaylist.activePlaylist.artists[a].active=!f.activePlaylist.activePlaylist.artists[a].active,localStorage.activePlaylist=angular.toJson(f.activePlaylist.activePlaylist),void m()}function o(t){for(var a=0;a<f.favourites.playlists.length;a++)f.favourites.playlists[a].name===t&&(f.activePlaylist.activePlaylist=f.favourites.playlists[a]);localStorage.activePlaylist=angular.toJson(f.activePlaylist.activePlaylist),m()}function l(t){for(var a=0;a<f.favourites.playlists.length;a++)if(f.favourites.playlists[a].name===t)return;f.favourites.playlists.push({name:t,artists:[]}),localStorage.favourites=angular.toJson(f.favourites)}function c(t){i(function(){angular.isUndefined(f.favourites.playlists[t])?e.info("You have just deleted a playlist!"):(f.favourites.playlists[t].showX=!1,f.favourites.playlists[t].showXtimeout===!0&&(f.favourites.playlists[t].showX=!0))},1e3),f.favourites.playlists[t].showXtimeout=!0}function u(t){f.favourites.playlists[t].showXtimeout=!1,f.favourites.playlists[t].showX=!1}function d(t){i(function(){angular.isUndefined(f.activePlaylist.activePlaylist.artists[t])?e.info("You have just deleted all artists from playlist!"):(f.activePlaylist.activePlaylist.artists[t].showX=!1,f.activePlaylist.activePlaylist.artists[t].showXtimeout===!0&&(f.activePlaylist.activePlaylist.artists[t].showX=!0))},1e3),f.activePlaylist.activePlaylist.artists[t].showXtimeout=!0}function v(t){f.activePlaylist.activePlaylist.artists[t].showXtimeout=!1,f.activePlaylist.activePlaylist.artists[t].showX=!1}function g(t){var a=f.favourites.playlists[t].name;f.favourites.playlists.splice(t,1),f.activePlaylist.activePlaylist.name===a&&(f.activePlaylist.activePlaylist={name:"no playlist created"},localStorage.activePlaylist=""),localStorage.favourites=angular.toJson(f.favourites),m()}function p(t){f.activePlaylist.activePlaylist.artists.splice(t,1),localStorage.activePlaylist=angular.toJson(f.activePlaylist.activePlaylist),m()}function m(){if(localStorage.activePlaylist){var t=[],a=angular.fromJson(localStorage.activePlaylist).artists;a.forEach(function(a){a.active===!0&&t.push(a.name)}),localStorage.artists=t}else localStorage.artists=""}var f=this;f.favourites={playlists:[]},f.activePlaylist={activePlaylist:{name:"no playlist created"}},f.checkLocalStorage=n,f.addToFavourites=r,f.toggleActive=s,f.setActivePlaylist=o,f.addNewPlaylist=l,f.makeXshowPlaylist=c,f.makeXhidePlaylist=u,f.makeXshowArtist=d,f.makeXhideArtist=v,f.removePlaylist=g,f.removeArtist=p,f.updateLocalStorageString=m}angular.module("musicHead").service("favouritesService",t),t.$inject=["$window","$location","$timeout","toastr"]}(),function(){"use strict";function t(){function t(t,a,i,e,n,r,s){function o(){p.artistsVisible===!1&&(p.playlistsVisible=!0,p.playlistsVisibleTimeout=!1)}function l(){p.playlistsVisibleTimeout=!0,t(function(){p.playlistsVisibleTimeout&&(p.playlistsVisible=!1)},200)}function c(){p.artistsVisible=!0,p.artistsVisibleTimeout=!1}function u(){p.artistsVisibleTimeout=!0,t(function(){p.artistsVisibleTimeout&&(p.artistsVisible=!1)},200)}function d(t){p.playlistsVisible=!1,s.setActivePlaylist(t)}function v(){p.addingNewPlaylistStatus=!0,p.newPlaylist=""}function g(a){a&&s.addNewPlaylist(a),t(function(){p.addingNewPlaylistStatus=!1},50)}var p=this;p.playlists=s.favourites,p.activePlaylist=s.activePlaylist,p.toggleActive=s.toggleActive,p.setActivePlaylist=d,p.addNewPlaylist=g,p.addingNewPlaylistStatus=!1,p.addingNewPlaylist=v,p.makeXshowPlaylist=s.makeXshowPlaylist,p.makeXhidePlaylist=s.makeXhidePlaylist,p.makeXshowArtist=s.makeXshowArtist,p.makeXhideArtist=s.makeXhideArtist,p.removePlaylist=s.removePlaylist,p.removeArtist=s.removeArtist,p.showPlaylists=o,p.hidePlaylists=l,p.playlistsVisible=!1,p.playlistsVisibleTimeout=!1,p.showArtists=c,p.hideArtists=u,p.artistsVisible=!1,p.artistsVisibleTimeout=!1,s.checkLocalStorage()}return t.$inject=["$timeout","dataService","YT_event","$scope","cachingFactory","toastr","favouritesService"],{restrict:"E",templateUrl:"app/components/NavBar/FavouriteListsFeature/favourite.template.html",controller:t,controllerAs:"fvCtrl"}}angular.module("musicHead").directive("favourite",t),t.$inject=["YT_event","cachingFactory","toastr"]}(),function(){"use strict";function t(t,a){function i(){return n.promise}function e(){var t=document.createElement("script");t.src="https://www.youtube.com/iframe_api";var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(t,i),a.onYouTubeIframeAPIReady=function(){n.resolve()}}var n=t.defer();e(),this.onReady=i}angular.module("musicHead").service("ytPlayerApi",t),t.$inject=["$q","$window"]}(),function(){"use strict";function t(t,a){function i(i){function e(t){return s=s.concat(t.data.items),t.data.items}function n(t){return t.data}var r=a.getDataObject("search",i);return t({method:"GET",url:r.url,params:r.params}).then(e)["catch"](n)}function e(t){o.cache=t,s=t}function n(){return s}function r(){o.cache=[],s=[]}var s=[],o={cache:[],showItems:i,saveCache:e,readCache:n,clearCacheClips:r};return o}angular.module("musicHead").factory("youtubeFactory",t),t.$inject=["$http","youtubeDataService"]}(),function(){"use strict";function t(){function t(t){var a="https://content.googleapis.com/youtube/v3/";return t?a+t+"?":a}function a(t,a){var e={url:i.getUrl(t),params:{q:encodeURIComponent(a).replace(/%20/g,"+"),part:"snippet",type:"video",videoCategoryId:10,videoDuration:"medium",maxResults:4,order:"viewCount",key:"AIzaSyA-CgKHZFkogn14QSaYrxuCRRCvqPaQ3hI"}};return e}var i=this;i.getUrl=t,i.getDataObject=a}angular.module("musicHead").service("youtubeDataService",t)}(),function(){"use strict";function t(){function t(t,a,i,e,n,r){function s(t){return f.facebookLogFlag="connected"===t.status,f.facebookLogFlag}function o(t){return t?a.getProfilePicture():void 0}function l(t){t&&(f.profilePictureUrl=t.data.url)}function c(){a.logOutFromFb()}function u(){e.$broadcast(i.PAUSE)}function d(){e.$broadcast(i.PLAY)}function v(){e.$broadcast(i.STOP)}function g(){e.$broadcast(i.NEXT)}function p(){e.$broadcast(i.VOLUME,f.volume)}function m(){f.muted=!f.muted,e.$broadcast(i.MUTE)}var f=this;f.logOut=c,f.pause=u,f.play=d,f.stop=v,f.next=g,f.setVolume=p,f.mute=m,f.muted=!1,f.volume=100,f.profilePictureUrl,f.facebookLogFlag,f.inputApproachFlag=n.approachFlag,a.checkLogStatus().then(s).then(o).then(l)["catch"](function(t){r.error(t)})}return t.$inject=["$timeout","dataService","YT_event","$scope","cachingFactory","toastr"],{restrict:"E",templateUrl:"app/components/NavBar/navBar.template.html",controller:t,controllerAs:"navBarCtrl"}}angular.module("musicHead").directive("navBar",t),t.$inject=["YT_event","cachingFactory","toastr"]}(),function(){"use strict";function t(){function t(t){var a=[];return angular.forEach(t,function(t){t=t.trim(),-1===a.indexOf(t)&&a.push(t)}),a}function a(t){for(var a,i,e=t.length;0!==e;)i=Math.floor(Math.random()*e),e-=1,a=t[e],t[e]=t[i],t[i]=a;return t}function i(t){t=Math.round(t);var a=Math.floor(t/60),i=t-60*a;return i=10>i?"0"+i:i,a+":"+i}var e={trimmingArray:t,shuffle:a,formatTime:i};return e}angular.module("musicHead").factory("helpersFactory",t)}(),function(){"use strict";function t(t,a,i,e){function n(){var a=t.defer();return FB.getLoginStatus(function(t){"connected"===t.status?a.resolve(t):"unknown"===t.status?a.resolve(t):a.reject("You are logged out from Facebook!")}),a.promise}function r(){var a=t.defer();return FB.login(function(t){t.authResponse?(u=!0,i.cacheFacebookLogFlag(u),l().then(function(t){i.cacheFacebookProfilePicture(t)}),o().then(function(t){a.resolve(t)})):a.reject("Facebook has a problem with login function")},{scope:"user_likes"}),a.promise}function s(){e.show("mySpinner");var a=t.defer();return FB.getLoginStatus(function(t){"connected"===t.status?FB.logout(function(){a.resolve()}):a.reject("Facebook can't get your login status")}),a.promise}function o(){var a=t.defer();return FB.api("/me/music","GET",{},function(t){!t||t.error?a.reject(t.error.data):(c.fbArtistsArray=[],angular.forEach(t.data,function(t){c.fbArtistsArray.push(t.name)}),i.clearCachedUrlId(),i.clearCachedArray(),i.cacheArray(c.fbArtistsArray),a.resolve(c.fbArtistsArray))}),a.promise}function l(){var a=t.defer();return FB.api("/me/picture","GET",{},function(t){!t||t.error?a.reject(t.error.data):a.resolve(t)}),a.promise}var c=this,u=!1;c.logIn=r,c.logOut=s,c.fbArtistsArray=[],c.checkStatus=n,c.musicRequest=o,c.pictureRequest=l}angular.module("musicHead").service("FBApiService",t),t.$inject=["$q","$location","cachingFactory","spinnerService"]}(),function(){"use strict";window.fbAsyncInit=function(){FB.init({appId:"801161899985580",cookie:!0,xfbml:!0,version:"v2.5"}),angular.element(document).ready(function(){angular.bootstrap(document.body,["musicHead"])})},function(t,a,i){var e,n=t.getElementsByTagName(a)[0];t.getElementById(i)||(e=t.createElement(a),e.id=i,e.src="//connect.facebook.net/en_US/sdk.js",n.parentNode.insertBefore(e,n))}(document,"script","facebook-jssdk")}(),function(){"use strict";function t(t,a,i,e,n){function r(){function r(){t.logIn().then(s.changePath)["catch"](function(t){n.error(t)})}function o(){i.logOutFromFb(),s.facebookLogFlag=!1}function l(){a.path("/allArtists")}function c(t){s.facebookLogFlag="connected"===t.status}e.show("mySpinner"),s.logIn=r,s.facebookLogFlag=!1,s.logOut=o,s.changePath=l,i.checkLogStatus().then(c).then(function(){e.hide("mySpinner")})["catch"](function(t){n.error(t),e.hide("mySpinner")})}var s=this;s.getResource=r}angular.module("musicHead").controller("FacebookController",t),t.$inject=["FBApiService","$location","dataService","spinnerService","toastr"]}(),function(){"use strict";function t(t,a,i,e,n,r,s,o,l,c){function u(){o.show("mySpinner"),h.artistsArrayTrimmed,h.favourites=[],h.clips,h.videoId,h.facebookLogFlag,h.changeVideo=m,h.routeArtist=r.artist,h.keepPage=f,h.addToFavourites=y,h.inputApproachFlag=i.approachFlag,h.currentPage,h.pageSize=9,h.currentClipTitle,d()}function d(){a.checkLogStatus().then(function(t){if("connected"!==t.status&&!P)return void s.path("/");h.facebookLogFlag="connected"===t.status;var i="connected"===t.status;a.getArtists(i).then(v).then(g).then(p).then(function(){o.hide("mySpinner")})["catch"](function(t){l.error(t),o.hide("mySpinner")})}),c.checkLocalStorage()}function v(t){return h.artistsArrayTrimmed=t,t}function g(t){var i;return i=h.routeArtist?[h.routeArtist]:t,a.getMusicVideosFromYt(i)}function p(t){if(h.currentPage=i.readCurrentPaginationPage(),t.length>1||t[0].length){var e=a.getVideosAndPlayId(t);h.clips=e.clips,h.videoId=e.id,h.currentClipTitle=h.clips[0].snippet.title}else a.getVideosAndPlayId(t)}function m(t){h.videoId=t.id.videoId}function f(){i.saveCurrentPaginationPage(h.currentPage)}function y(t){c.addToFavourites(t)}var h=this,P=i.readInputApprachFlag();h.getSpinner=u,t.$on("newId",function(t,a){var i=h.clips.filter(function(t){return t.id.videoId===a});h.currentClipTitle=i[0].snippet.title})}angular.module("musicHead").controller("MainController",t),t.$inject=["$scope","dataService","cachingFactory","helpersFactory","youtubeFactory","$routeParams","$location","spinnerService","toastr","favouritesService"]}(),function(){"use strict";function t(t,a,i,e,n,r,s){function o(){function o(){u=!0,r.checkLogStatus().then(function(t){"connected"===t.status?n.logOut().then(l)["catch"](function(t){s.error(t)}):l()})}function l(){a.clearCachedUrlId(),t.clearCacheClips(),localStorage.artists&&(c.artistsList=c.artistsList+","+localStorage.artists),c.artistsList&&(c.artistsList=c.artistsList.split(","),c.artistsList=e.trimmingArray(c.artistsList),("undefined"===c.artistsList[0]||""===c.artistsList[0])&&c.artistsList.splice(0,1),a.cacheArray(c.artistsList),a.cacheInputApprachFlag(u),c.artistsList="",i.path("/allArtists"))}var c=this,u=!1;c.artistsList,c.getArtists=o}return{restrict:"E",templateUrl:"app/StartPage/input.template.html",controller:o,controllerAs:"startCtrl"}}angular.module("musicHead").directive("appInput",t),t.$inject=["youtubeFactory","cachingFactory","$location","helpersFactory","FBApiService","dataService","toastr"]}(),function(){"use strict";function t(){function t(t){y=t}function a(){return y}function i(t){p=t}function e(){return p}function n(t){m=t,b.approachFlag.approachFlag=!1}function r(){return m}function s(){p=void 0}function o(){y=[]}function l(t){f=t,b.approachFlag.approachFlag=t}function c(){return f}function u(t){h=t}function d(){return h}function v(t){P=t}function g(){return P}var p,m,f,y=[],h=1,P={},b={approachFlag:{approachFlag:""},cacheArray:t,readInputArrayFromCache:a,cacheUrlId:i,readCacheUrlId:e,clearCachedUrlId:s,clearCachedArray:o,cacheFacebookLogFlag:n,readFacebookLogFlag:r,cacheInputApprachFlag:l,readInputApprachFlag:c,saveCurrentPaginationPage:u,readCurrentPaginationPage:d,cacheFacebookProfilePicture:v,readFacebookProfilePicture:g};return b}angular.module("musicHead").factory("cachingFactory",t)}(),function(){"use strict";function t(t){t.debug("runBlock end")}angular.module("musicHead").run(t),t.$inject=["$log"]}(),function(){"use strict";function t(t){t.when("/",{templateUrl:"app/StartPage/startPage.html",controller:"FacebookController",controllerAs:"fbCtrl"}).when("/allArtists",{templateUrl:"app/main/allArtists.html",controller:"MainController",controllerAs:"main"}).when("/allArtists/:artist",{templateUrl:"app/main/artist.html",controller:"MainController",controllerAs:"main"}).otherwise({redirectTo:"/"})}angular.module("musicHead").config(t),t.$inject=["$routeProvider"]}(),function(){"use strict";angular.module("musicHead").constant("malarkey",malarkey).constant("moment",moment).constant("YT_event",{STOP:0,PLAY:1,PAUSE:2,NEXT:3,FULLSCREEN:4,MUTE:5,VOLUME:6})}(),function(){"use strict";function t(t,a){t.debugEnabled(!0),a.allowHtml=!0,a.timeOut=3e3,a.positionClass="toast-top-right",a.preventDuplicates=!0,a.progressBar=!0}angular.module("musicHead").config(t),t.$inject=["$logProvider","toastrConfig"]}(),function(){"use strict";function t(t,a,i,e,n,r,s,o,l){function c(t){var a=[];if(t.length>0){for(var e=0;e<t.length;e++)a.push(u(t[e]));return i.all(a)}return i.reject("No artists, my friend")}function u(t){return a.showItems(t)}function d(t){var i={},n=[];return angular.forEach(t,function(t){angular.forEach(t,function(t){n.push(t)})}),n.length>0?(e.shuffle(n),a.saveCache(n),y=n[0].id.videoId,i={clips:n,id:y}):void o.info("There are no clips for display")}function v(t){var a=i.defer();return t?h.getMusicInfoFromFb().then(a.resolve)["catch"](a.reject):a.resolve(s.readInputArrayFromCache()),a.promise}function g(){t.logOut().then(function(){a.clearCacheClips(),r.path("/"),l.hide("mySpinner")})["catch"](function(t){o.error(t)})}function p(t){return m(f(t))}function m(t){return n.trustAsResourceUrl(t)}function f(t){return"http://img.youtube.com/vi/"+t+"/mqdefault.jpg"}var y,h=this;h.checkLogStatus=t.checkStatus,h.getMusicInfoFromFb=t.musicRequest,h.getMusicVideosFromYt=c,h.getVideosAndPlayId=d,h.getTrustedThumbnailSrc=p,h.logOutFromFb=g,h.getArtists=v,h.getProfilePicture=t.pictureRequest}angular.module("musicHead").service("dataService",t),t.$inject=["FBApiService","youtubeFactory","$q","helpersFactory","$sce","$location","cachingFactory","toastr","spinnerService"]}(),angular.module("musicHead").run(["$templateCache",function(t){t.put("app/StartPage/input.template.html",'<section id=form><form name=artistsForm ng-submit=startCtrl.getArtists()><h1>Write music artists. We will generate playlist.</h1><p>(Artists have to be seperated by coma.)</p><input class=form-control placeholder="Type here..." ng-model=startCtrl.artistsList ng-trim=true><button type=submit class="btn btn-danger">Generate</button></form></section><!-- /#form -->'),t.put("app/StartPage/startPage.html",'<div class=container><spinner name=mySpinner on-loaded=fbCtrl.getResource()><div class=overlay><div class=spinner><div class=double-bounce1></div><div class=please-wait>Please Wait...</div><div class=double-bounce2></div></div></div></spinner></div><!-- /.container --><div class="container start"><section id=header><a href=#/ ><div id=logoStart></div></a></section><!-- /#header --><div class=row><div class=col-md-6><app-input></app-input></div><div class=col-md-6><div ng-show=!fbCtrl.facebookLogFlag><h1>Login with Facebook</h1><p>(We will get your music likes. Nothing will be post on your wall.)</p><button class=fbLogin ng-click=fbCtrl.logIn()>Login with Facebook</button></div><div ng-show=fbCtrl.facebookLogFlag><h1>You are logged in</h1><button class="btn btn-danger" ng-click=fbCtrl.changePath()>Go to player</button> <button class=fbLogoutStart ng-click=fbCtrl.logOut()>LogOut from Facebook</button></div></div><!-- /.col-md-6 --></div><!-- /.row --></div><!-- /.container start -->'),t.put("app/main/allArtists.html",'<div class=container><spinner name=mySpinner on-loaded=main.getSpinner()><div class=overlay><div class=spinner><div class=double-bounce1></div><div class=please-wait>Please Wait...</div><div class=double-bounce2></div></div></div></spinner><nav-bar></nav-bar><div class=row><div class=col-md-12><section id=linkContainer><div class=currentPlaying>Now playing: {{main.currentClipTitle}}</div><div class=row ng-show="main.artistsArrayTrimmed.length > 0"><div uib-collapse=main.isCollapsed><a href=#/allArtists class="btn btn-danger btn-lg allArt" role=button ng-class="{currentArtist : !main.routeArtist}">All Artists</a><div class="col-sm-4 col-xs-6 artistBtn" ng-repeat="artist in main.artistsArrayTrimmed\n                              | limitTo: main.pageSize:(main.currentPage - 1)*main.pageSize"><a ng-click=main.keepPage() href=#/allArtists/{{artist}} class="btn btn-danger btn-lg specificArtistLink" role=button ng-class="{currentArtist : main.routeArtist  == artist}">{{artist}} </a><span class=add-to-favourites ng-show=main.inputApproachFlag.approachFlag ng-click=main.addToFavourites(artist);$event.stopPropagation();>V</span></div><!-- /.artistBtn --></div><!-- /uib-collapse --></div><!-- /.row --><div class=arrows><div class=arrow-left id=linkLeftArrow ng-if="main.currentPage != 1"><span class="glyphicon glyphicon-chevron-left" ng-click="main.currentPage=main.currentPage - 1"></span></div><div class=arrow-right id=linkRightArrow ng-if="main.currentPage < main.artistsArrayTrimmed.length/main.pageSize "><span class="glyphicon glyphicon-chevron-right" ng-click="main.currentPage = main.currentPage + 1"></span></div></div><!-- /.arrows --><div class=rangePaginationBar ng-if="main.artistsArrayTrimmed.length > main.pageSize "><uib-pagination direction-links=false boundary-link-numbers=true rotate=true max-size=5 items-per-page=main.pageSize total-items=main.artistsArrayTrimmed.length ng-model=main.currentPage></uib-pagination></div></section><!-- /#linkContainer --></div><!-- /.col-md-12 --></div><!-- /.row --><youtube-player-container></youtube-player-container></div><!-- /.container -->'),t.put("app/main/artist.html",'<div class=container><spinner name=mySpinner on-loaded=main.getSpinner()><div class=overlay><div class=spinner><div class=double-bounce1></div><div class=please-wait>Please Wait...</div><div class=double-bounce2></div></div></div></spinner><nav-bar></nav-bar><div class=row><div class=col-md-12><section id=linkContainer><div class=currentPlaying>Now playing: {{main.currentClipTitle}}</div><div class=row ng-show="main.artistsArrayTrimmed.length > 0"><div uib-collapse=main.isCollapsed><a href=#/allArtists class="btn btn-danger btn-lg allArt" role=button ng-class="{currentArtist : !main.routeArtist}">All Artists</a><div class="col-sm-4 col-xs-6 artistBtn" ng-repeat="artist in main.artistsArrayTrimmed\n                              | limitTo: main.pageSize:(main.currentPage - 1)*main.pageSize"><a ng-click=main.keepPage() href=#/allArtists/{{artist}} class="btn btn-danger btn-lg specificArtistLink" role=button ng-class="{currentArtist : main.routeArtist  == artist}">{{artist}} </a><span class=add-to-favourites ng-show=main.inputApproachFlag.approachFlag ng-click=main.addToFavourites(artist);$event.stopPropagation();>V</span></div><!-- /.artistBtn --></div><!-- /uib-collapse --></div><!-- /.row --><div class=arrows><div class=arrow-left id=linkLeftArrow ng-if="main.currentPage != 1"><span class="glyphicon glyphicon-chevron-left" ng-click="main.currentPage=main.currentPage - 1"></span></div><div class=arrow-right id=linkRightArrow ng-if="main.currentPage < main.artistsArrayTrimmed.length/main.pageSize "><span class="glyphicon glyphicon-chevron-right" ng-click="main.currentPage = main.currentPage + 1"></span></div></div><!-- /.arrows --><div class=rangePaginationBar ng-if="main.artistsArrayTrimmed.length > main.pageSize "><uib-pagination direction-links=false boundary-link-numbers=true rotate=true max-size=5 items-per-page=main.pageSize total-items=main.artistsArrayTrimmed.length ng-model=main.currentPage></uib-pagination></div></section><!-- /#linkContainer --></div><!-- /.col-md-12 --></div><!-- /.row --><youtube-player-container></youtube-player-container></div><!-- /.container -->'),t.put("app/components/NavBar/navBar.template.html",'<div class=row><nav class="navbar navbar-default"><div class=container><a class=logo href=#/ ><img src=./assets/images/logo.png class=logoImg> </a><!-- /.favourite-playlist --><div class=player-controlls><span class="glyphicon glyphicon-play controlls" ng-click=navBarCtrl.play()></span> <span class="glyphicon glyphicon-pause controlls" ng-click=navBarCtrl.pause()></span> <span class="glyphicon glyphicon-stop controlls" ng-click=navBarCtrl.stop()></span> <span class="glyphicon glyphicon-fast-forward controlls" ng-click=navBarCtrl.next()></span><div class=volume-wrapper><span class="glyphicon controlls" ng-click=navBarCtrl.mute(); ng-class="{\'glyphicon-volume-up\' : !navBarCtrl.muted, \'glyphicon-volume-off\' : navBarCtrl.muted  }"></span> <input type=range min=0 max=100 step=1 class=volumeInput ng-model=navBarCtrl.volume ng-change=navBarCtrl.setVolume()></div><!-- /.favourite-playlist --></div><!-- /.player-controlls --><favourite ng-show=navBarCtrl.inputApproachFlag.approachFlag></favourite><img id=profilePicture ng-src={{navBarCtrl.profilePictureUrl}} ng-if=navBarCtrl.facebookLogFlag> <button ng-show=navBarCtrl.facebookLogFlag ng-click=navBarCtrl.logOut() class=fbLogout><img src=./assets/images/fbIcon.png></button></div><!-- /.container --></nav><!-- /.navbar navbar-default --></div><!-- /.row -->'),t.put("app/components/NavBar/FavouriteListsFeature/favourite.template.html",'<div class=playlist-wrapper><span class="glyphicon glyphicon-star navbar-right" ng-mouseenter=fvCtrl.showArtists() ng-mouseleave=fvCtrl.hideArtists()></span> <span class=playlist-header ng-mouseenter=fvCtrl.showPlaylists() ng-mouseleave=fvCtrl.hidePlaylists()>{{fvCtrl.activePlaylist.activePlaylist.name}}</span><div class=playlists ng-mouseenter=fvCtrl.showPlaylists() ng-mouseleave=fvCtrl.hidePlaylists()><div class=favourite-playlist ng-if=fvCtrl.playlistsVisible><div class=favourite-playlist ng-repeat="playlist in fvCtrl.playlists.playlists" ng-click=fvCtrl.setActivePlaylist(playlist.name) ng-mouseover=fvCtrl.makeXshowPlaylist($index) ng-mouseleave=fvCtrl.makeXhidePlaylist($index)><span class="glyphicon glyphicon-ok glyph" ng-if=playlist.active></span> <span class=playlist>{{playlist.name}}</span> <span class=remove-favourite ng-show=playlist.showX ng-click=fvCtrl.removePlaylist($index)>x</span></div><!-- /.favourite-playlist --><div class=favourite-playlist ng-click=fvCtrl.addingNewPlaylist()><span class="playlist plus">+</span> <input class=new-playlist-input ng-show=fvCtrl.addingNewPlaylistStatus ng-model=fvCtrl.newPlaylist ng-keypress="($event.which === 13)?fvCtrl.addNewPlaylist(fvCtrl.newPlaylist):0"></div><!-- /.favourite-playlist --></div><!-- /.favourite-playlist --><div class=favourite ng-if=fvCtrl.artistsVisible ng-mouseenter=fvCtrl.showArtists() ng-mouseleave=fvCtrl.hideArtists()><div class=favourite-artist ng-repeat="artist in fvCtrl.activePlaylist.activePlaylist.artists" ng-mouseover=fvCtrl.makeXshowArtist($index) ng-mouseleave=fvCtrl.makeXhideArtist($index) ng-click=fvCtrl.toggleActive(artist.name)><span class="glyphicon glyphicon-ok glyph" ng-if=artist.active></span> <span class=artist>{{artist.name}}</span> <span class=remove-favourite ng-show=artist.showX ng-click=fvCtrl.removeArtist($index)>x</span></div><!-- /.favourite-artist --></div><!-- /.favourite --></div><!-- /.playlists --></div><!-- /.playlist-wrapper -->'),t.put("app/components/YouTube/PlayerContainer/playerContainer.html",'<section id=player><div class=row><div class=col-md-12 ng-if="!ytContainerCtrl.apiReady && !main.videoId">LOADING</div><div class=col-md-12 ng-if="ytContainerCtrl.apiReady && main.videoId"><div class=vid-container><div id=current-time>{{ ytContainerCtrl.currentTime }} / {{ ytContainerCtrl.duration }}</div><input type=range id=progress-bar value=0 min=0 max=ytContainerCtrl.currentDuration ng-model=ytContainerCtrl.progress ng-change=ytContainerCtrl.getProgressValue()><div id=player><youtube-player videoid=main.videoId></youtube-player></div><div class=vid-list-container><div class=vid-list><div class="vid-item col-md-3 col-sm-6 col-xs-6" ng-repeat="clip in main.clips\n                              | filter: ytContainerCtrl.filterThumbnails\n                              | limitTo: ytContainerCtrl.pageSize : (ytContainerCtrl.currentPage - 1)*ytContainerCtrl.pageSize" ng-click=main.changeVideo(clip) ng-class="{selected : main.videoId == clip.id.videoId}"><div class=thumbnails><img frameborder=0 ng-src={{ytContainerCtrl.link(clip.id.videoId)}}></div><div class=description><p class=descTitle>{{clip.snippet.title}}</p></div></div><!-- /.vid-item --></div><!-- /.vid-list --></div><!-- /.vid-list-container --><div class=arrows><div class=arrow-left id=vidLeftArrow ng-if="ytContainerCtrl.currentPage != 1"><span class="glyphicon glyphicon-chevron-left" ng-click="ytContainerCtrl.currentPage=ytContainerCtrl.currentPage - 1"></span></div><div class=arrow-right id=vidRightArrow ng-if="ytContainerCtrl.currentPage < main.clips.length/ytContainerCtrl.pageSize "><span class="glyphicon glyphicon-chevron-right" ng-click="ytContainerCtrl.currentPage = ytContainerCtrl.currentPage + 1"></span></div></div><!-- /.arrows --><div class=rangePaginationBarVideos ng-if="main.clips.length > ytContainerCtrl.pageSize"><uib-pagination total-items=main.clips.length ng-model=ytContainerCtrl.currentPage max-size=5 boundary-links=false rotate=false items-per-page=ytContainerCtrl.pageSize direction-links=false></uib-pagination></div><!-- /.rangePaginationBarVideos --></div><!-- /. vid-container --></div><!-- /.col-md-12 --></div><!-- /.row --><div class=row id=footerContainer><div class=col-md-12><div id=footer><p>Maciej Mańko &copy; 2016r.</p></div><!-- /#footer --></div></div><!-- /#footerContainer --></section><!-- /#player -->')}]);
//# sourceMappingURL=../maps/scripts/app-1896a8f46f.js.map
