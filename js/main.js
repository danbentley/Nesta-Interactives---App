require.config({
	shim: {
		'boxbox': ['box2dweb']
	},
	paths: {
		'boxbox': 'lib/boxbox/boxbox.min',
		'box2dweb': 'lib/boxbox/Box2dWeb-2.1.a.3.min'
	}
});

require(['src/app'], function(app) {
	app.init();
});
