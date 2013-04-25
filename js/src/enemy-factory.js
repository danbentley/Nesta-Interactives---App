define(['src/enemy'], function(Enemy) {

    // To get around the limitation of having to execute the parents
    // constructor method when creating a child object, wrap the protoype
    // in a function to capture the parent function and execute on creation
    var constructorWrap = (function(parent) {
        function enemy() {};
        enemy.prototype = parent.prototype;
        return new enemy();
    })(Enemy);

    BlueEnemy.prototype = constructorWrap;
    function BlueEnemy(options) {

        var defaults = {
            width: 2,
            height: 1.7,
            imageOffsetX: -.45,
            imageOffsetY: -.4,
            image: 'img/enemy/blue.png'
        }
        $.extend(options, defaults);

        return Enemy.apply(this, [options]);
    }

    RedEnemy.prototype = constructorWrap;
    function RedEnemy(options) {

        var defaults = {
            width: 1.2,
            height: 1,
            imageOffsetX: -.25,
            imageOffsetY: -.27,
            image: 'img/enemy/red.png'
        }
        $.extend(options, defaults);

        return Enemy.apply(this, [options]);
    }

    YellowEnemy.prototype = constructorWrap;
    function YellowEnemy(options) {

        var defaults = {
            width: 1.5,
            height: 2.8,
            imageOffsetX: -.35,
            imageOffsetY: -.68,
            image: 'img/enemy/yellow.png'
        }
        $.extend(options, defaults);

        return Enemy.apply(this, [options]);
    }

    GreenEnemy.prototype = constructorWrap;
    function GreenEnemy(options) {

        var defaults = {
            width:2.79,
            height:3.4,
            imageOffsetX:-.68,
            imageOffsetY:-0.86,
            image: 'img/enemy/green.png'
        }
        $.extend(options, defaults);

        return Enemy.apply(this, [options]);
    }

    function EnemyFactory(options) {

        var instance = null;

        switch (options.enemyType) {
            case 'blue':
            default:
                instance = new BlueEnemy(options);
                break;
            case 'red':
                instance = new RedEnemy(options);
                break;
            case 'yellow':
                instance = new YellowEnemy(options);
                break;
            case 'green':
                instance = new GreenEnemy(options);
                break;
        }

        return instance;
    };

    return EnemyFactory;
});
