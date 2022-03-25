/* Desgined by leejunghun */
;(function() {

	module.exports = function() {

		function loadNodeModules() {
			_g = {};
			_g.express = require('express');
			_g.app = require('express')();
			_g.bodyParser = require('body-parser');
			_g.mysql = require('mysql');
		}

		function loadRoute() {
			var route = require('./Route.js')(_g);
			route.route();
		}

		function initialize() {
			const app = _g.app;
			app.set('view engine', 'ejs');
			app.engine('html', require('ejs').renderFile);
			app.use('/assets', _g.express.static(__dirname + '/../assets'));
			app.use(_g.bodyParser.urlencoded({
			    extended: true
			}));
			app.use(_g.bodyParser.json());
		}

		function doInBackend() {
			loadNodeModules();
			initialize();
			loadRoute();
		}

		return {
			doInBackend:doInBackend,
		};
	}

})();

