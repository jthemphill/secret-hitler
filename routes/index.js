let passport = require('passport'), // eslint-disable-line no-unused-vars
	Account = require('../models/account'), // eslint-disable-line no-unused-vars
	socketRoutes = require('./socket/routes'),
	accounts = require('./accounts'),
	ensureAuthenticated = (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		}

		res.redirect('/observe');
	};

module.exports = () => {
	accounts();
	socketRoutes();

	app.get('/', (req, res) => {
		if (req.user) {
			res.render('page-home', {
				username: req.user.username,
				home: true
			});
		} else {
			res.render('page-home');
		}
	});

	app.get('/rules', (req, res) => {
		if (req.user) {
			res.render('page-rules', {
				username: req.user.username,
				rules: true
			});
		} else {
			res.render('page-rules');
		}
	});

	app.get('/how-to-play', (req, res) => {
		if (req.user) {
			res.render('page-howtoplay', {
				username: req.user.username,
				howtoplay: true
			});
		} else {
			res.render('page-howtoplay');
		}
	});

	app.get('/stats', (req, res) => {
		if (req.user) {
			res.render('page-stats', {
				username: req.user.username,
				stats: true
			});
		} else {
			res.render('page-stats');
		}
	});

	app.get('/about', (req, res) => {
		if (req.user) {
			res.render('page-about', {
				username: req.user.username,
				about: true
			});
		} else {
			res.render('page-about');
		}
	});

	app.get('/game', ensureAuthenticated, (req, res) => {
		res.render('game', {
			user: req.user.username,
			game: true,
			isLight: req.user.gameSettings.enableLightTheme
		});
	});

	app.get('/observe', (req, res) => {
		if (req.user) {
			req.session.destroy();
			req.logout();
		}
		res.render('game', {game: true});
	});

	app.get('*', (req, res) => {
		res.render('404');
	});
};