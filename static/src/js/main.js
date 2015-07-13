//main.js

(function($) {

	var app = window.app || (window.app = {});

	app.page = function(root, params) {

	}

	app.page.prototype = {
		init: function() {
			//initialize the page
		}
	}

}(jQuery));

$(window).ready(function() {
	app.util.init("app.page", window.document, {});
});