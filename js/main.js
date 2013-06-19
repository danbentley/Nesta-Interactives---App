require.config({
    shim: {
	'boxbox': ['box2dweb'],
	'slider': ['jquery']
    },
    paths: {
	'jquery': 'lib/jquery.min',
	'boxbox': 'lib/boxbox/boxbox.min',
	'box2dweb': 'lib/boxbox/Box2dWeb-2.1.a.3.min',
	'configHandler': 'src/config-handler',
        'slider': 'lib/jquery-ui-1.10.3-custom.min'
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
    require(['src/app', 'src/asset-preloader'], function(app, imagePreloader) {
	imagePreloader.preload([
	    'img/player/player-0.png',
	    'img/player/player-1.png',
	    'img/player/player-2.png',
	    'img/player/player-3.png',
	    'img/player/player-4.png',
	    'img/player/player-5.png',
	    'img/player/player-6.png',
	    'img/player/player-7.png',
	    'img/player/player-8.png',
	    'img/player/player-9.png',
	    'img/enemy/blue.png',
	    'img/enemy/blue-dead.png',
	    'img/enemy/blue-dying.png',
	    'img/enemy/green.png',
	    'img/enemy/green-dead.png',
	    'img/enemy/green-dying.png',
	    'img/enemy/red.png',
	    'img/enemy/red-dead.png',
	    'img/enemy/red-dying.png',
	    'img/enemy/yellow.png',
	    'img/enemy/yellow-dead.png',
	    'img/enemy/yellow-dying.png',
	]);
	
	app.init();
    });
}

require(['configHandler'], function(configHandler) {
    $(document).ready(function() {
        configHandler.init();
    });
});

require(['lib/jquery-ui-slider-range-polyfill'], function() { });
