require.config({
	shim: {
		'boxbox': ['box2dweb']
	},
	paths: {
		'boxbox': 'lib/boxbox/boxbox.min',
		'box2dweb': 'lib/boxbox/Box2dWeb-2.1.a.3.min'
	}
});

/**
 * function to check whether js is supported is in main.js rather than the
 * usual app.js because the libraries we import do not offer such a check and
 * will and attempt to run and error on IE<9.
 */
function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

if (isCanvasSupported()) {
	require(['src/app'], function(app) {
		app.init();
	});
}
