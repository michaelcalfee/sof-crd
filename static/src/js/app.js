//app.js

(function($) {

	var app = window.app || (window.app = {});
	
	app.util = {
		log: function(value) {
			if (window.console && typeof console.log == "function") {
				console.log(value);
			}
		},
		error: function(value) {
			if (window.console && typeof console.error == "function") {
				console.error(value);
			}
		},
		createCookie: function (name, value, days, domain, path) {
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			}
			var cookieDomain = "";
			if (domain) {
				cookieDomain = ";domain=" + domain;
			}
			var cookiePath = ";path=/";
			if (path) {
				cookiePath = ";path=" + path;
			}		
			document.cookie = name + "=" + value + expires + cookiePath + cookieDomain;
		},
		readCookie: function (name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		},
		eraseCookie: function(name) {
			this.createCookie(name, "", -1);
		},
		resolve: function(str, createIfNotExists) {
			if (!str) {
				return null;
			}
			else {
				var basis = window,
					last = basis,
					names = str.split("."),
					name,
					i,
					j;
				for (i = 0, j = names.length; i < j; i++) {
					name = names[i];
					basis = basis[name];
					if (!basis) {
						if (createIfNotExists) {
							basis = last[name] = {};
						}
						else {
							return null;
						}
					}
					last = basis;
				}
			}
			return basis;
		},
		extend: function(supertype, subtype, overrides) {
			var ctor = function() { },
				name;
			ctor.prototype = supertype.prototype;
			subtype.prototype = new ctor();
			for (name in overrides) {
				subtype.prototype[name] = overrides[name];
			}
			subtype.prototype.constructor = supertype;
		},
		init: function(pageType, root, params) {
			var pageConstructor = app.util.resolve(pageType);
			if (!pageType) {
				app.util.log("ERROR: Unable to initialize type " + pageType);
			}
			else {
				app.util.log("pageType: " + pageType);
				var page = new pageConstructor(root, params);
				page.init();
			}
		}
	};
	
})(jQuery);