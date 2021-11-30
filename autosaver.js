// Post Autosaver by Black
// https://code.jfbs.net/?showtopic=81
$(document).ready(function() {
	if(window.location.href.indexOf("act=Post") !== -1 && window.location.href.indexOf("&f=") !== -1 && window.location.href.indexOf("&CODE=08") == -1) {
		var forumParameters = (function(url) {
			var result = {};
			for (var i=0; i<url.length; i++) {
				var parameter = url[i].split('=');
				if (parameter.length != 2) continue;
				result[parameter[0]] = decodeURIComponent(parameter[1].replace(/\+/g, " "));
			}
			return result;
		})(window.location.search.substr(1).split('&'));
		var subDomain = location.hostname.split('.').shift();
		function savePost() {
			if(forumParameters["t"]) {
				localStorage[subDomain + forumParameters["f"] + forumParameters["t"]] = $("textarea[name='Post']").val();
			}
			else {
				localStorage[subDomain + forumParameters["f"]] = $("textarea[name='Post']").val();
			}
		}
		function loadPost() {
			if(forumParameters["t"]) {
				if(forumParameters["p"]) {
					return false;
				}
				$("textarea[name='Post']").val(localStorage[subDomain + forumParameters["f"] + forumParameters["t"]]);
			}
			else {
				$("textarea[name='Post']").val(localStorage[subDomain + forumParameters["f"]]);
			}
		}
		function savePostRepeat() {
			setTimeout(function() {
				savePost();
				savePostRepeat();
			}, 30000);
		}
		$(window).unload(function() {
			savePost();
		});
		$("form[name='REPLIER']").on("submit", function() {
			if(forumParameters["t"]) {
				localStorage.removeItem(subDomain + forumParameters["f"] + forumParameters["t"]);
			}
			else {
				localStorage.removeItem(subDomain + forumParameters["f"]);
			}
		});
		loadPost();
		savePostRepeat();
	}
});