define(['boxbox'], function() {

    function Enemy(options) {

        this.template = {
            name: 'enemy',
            shape: 'square'
        };

        // Whether this enemy is one of:
        // ['', 'dead', 'dying']
        this.status = '';

        // The minimum amount of force required to destroy
        // this enemy
        this.MIN_FORCE = 10;

        // An entity is inactive until the world is created.
        // Inactive enemies cannot be destroyed on impact
        this.active = false;
        this.DESTROY_DELAY = 1000;

        this.world = options.world;
        options.onImpact = $.proxy(function(entity, force) {
            this.onImpact(entity, force)
        }, this);
        this.entity = this.create(options);

        this.addListeners();
    }

    Enemy.prototype.addListeners = function(options) {
        $(window).on('world.ready', $.proxy(function() {
            this.active = true;
        }, this));
    }; 

    Enemy.prototype.create = function(options) {
        return this.world.createEntity(this.template, options);
    }; 

    Enemy.prototype.onImpact = function(entity, force) {
        if (!this.active || !this.isForceStrongEnough(force)) return;
        this.destroy();
    };

    Enemy.prototype.isForceStrongEnough = function(force) {
        return (force > this.MIN_FORCE);
    };

    Enemy.prototype.destroy = function() {
        this.status = 'dying';
        this.updateImage();
        this.startDestroyDelay();
    };

    Enemy.prototype.updateImage = function() {
        var img = this.entity.image();
        if (img.match(new RegExp('dead'))) return;
        if (!img.match(new RegExp(this.status))) {
            this.entity.image(img.replace(/(-dying|-dead)?.png/, '-' + this.status + '.png'));
        }
    };

    Enemy.prototype.startDestroyDelay = function() {
        setTimeout($.proxy(function() {

            this.status = 'dead';
            this.updateImage();

            // Set delay before we remove this enemy from the map
            setTimeout($.proxy(function() {
                this.entity.destroy();
                $(window).trigger('character.destroyed', [this]);
            }, this), this.DESTROY_DELAY);
        }, this), this.DESTROY_DELAY);
    };

    return Enemy;
});
