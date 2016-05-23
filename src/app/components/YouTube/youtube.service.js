// Service will be returning data object that will be use for making a requests in
// youtube factory, for specific data from YT.

(function() {
	'use strict';

	angular
    .module('musicHead')
    .service('youtubeDataService', youtubeDataService);

	function youtubeDataService() {
		var vm = this;

		vm.getUrl = getUrl;
		vm.getDataObject = getDataObject;

		function getUrl(command) {
			var url = "https://content.googleapis.com/youtube/v3/";
      return command ? url + command +'?' : url;
		}

		function getDataObject(command, query) {
			var ytRequestObject = {
				url: vm.getUrl(command),
				params: {
					q: encodeURIComponent(query).replace(/%20/g, "+"),
					part: 'snippet',
					type: 'video',
					videoCategoryId: 10,
					videoDuration: 'medium',
					maxResults: 4,
					order: 'viewCount',
					key: "AIzaSyA-CgKHZFkogn14QSaYrxuCRRCvqPaQ3hI"
				}
			}
			return ytRequestObject;
		}
	}
})();
