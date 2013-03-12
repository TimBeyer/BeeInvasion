window.beeInvasion = (function (beeInvasion) {
    beeInvasion.entities = {
        Player: function (options) {
            var image, width, height;
            this.pos = options.pos || [0,0];
            var aimPoint = [0,0];
            var targetVector = [0,0];
            
            var dx = 1;
            var dy = 1;

            var direction = [0,0];

            var scale = 0.25;

            var angle = 90;

            var spawnBullet = false;

            document.addEventListener('keydown', function (e) {
                switch (e.keyCode) {
                    // W
                    case 87:
                        //console.log("W");
                        direction[1] = -1;
                        break;
                    // A
                    case 65:
                        //console.log("A");
                        direction[0] = -1;
                        break;
                    // S
                    case 83:
                        //console.log("S");
                        direction[1] = 1;
                        break;
                    // D
                    case 68:
                        //console.log("D");
                        direction[0] = 1;
                        break;
                } 
            });

            document.addEventListener('keyup', function (e) {
                direction = [0,0];
            });

            document.addEventListener('mousemove', _.bind(function (e) {
                aimPoint = [e.x, e.y];
                targetVector =  beeInvasion.utils.subtractVectors(aimPoint, this.pos);
                var angleToAimpoint = beeInvasion.utils.getAngle(targetVector);
                angle = angleToAimpoint;
            },this));

            document.addEventListener('mousedown', function (e) {
                spawnBullet = true;
            });

            document.addEventListener('mouseup', function (e) {
                spawnBullet = false;
            });

            beeInvasion.utils.loadImage(beeInvasion.assets.Player, function(loadedImage) {
                image = loadedImage;
                width = image.width;
                height = image.height;
            });

            this.act = function (world) {

                this.pos[0] += direction[0] * dx;
                this.pos[1] += direction[1] * dy;

                if (spawnBullet) {
                    world.addEntity(new beeInvasion.entities.Projectile({
                        pos: this.pos,
                        direction: beeInvasion.utils.normalizeVector(targetVector)
                    }));

                    console.log(world.getEntitiesInRadius(this, 50));
                }

            };

            this.draw = function (ctx) {
                if (image) {
                    ctx.save();

                    var drawWidth = Math.floor(width*scale);
                    var drawHeight = Math.floor(height*scale);

                    beeInvasion.drawUtils.drawRotatedImage(ctx, image, this.pos[0], this.pos[1], angle, drawWidth, drawHeight);
                    ctx.restore();
                }
            };
        },

        Bee: function (options) {
            var image, width, height;
            this.pos = options.pos || [0,0];
            var direction = options.direction || [0,0];
            var speed = 2;

            var angle = beeInvasion.utils.getAngle(direction);
            var scale = options.scale || 0.4;

            var energy = 100;

            var tick = 0;

            beeInvasion.utils.loadImage(beeInvasion.assets.BeeSmall, function(loadedImage) {
                image = loadedImage;
                width = image.width;
                height = image.height;
            });

            this.act = function (world) {
                tick = tick + 1;
                if(tick % 10 == 0) {
                    direction = [2 * Math.random() - 1, 2 * Math.random() - 1];
                }
                this.pos = beeInvasion.utils.addVectors(this.pos, beeInvasion.utils.scaleVector(direction, speed));
                angle = beeInvasion.utils.getAngle(direction) + 90;

                var entitiesAround = world.getEntitiesInRadius(this, 25);
                var bulletsHit = _.filter(entitiesAround, function (entity) {
                    return entity instanceof beeInvasion.entities.Projectile;
                });

                _.each(bulletsHit, function (bullet) {
                    console.log("Got hit by bullet", bullet, "Current Energy: ", energy);
                    energy -= bullet.damage;
                    world.removeEntity(bullet);
                });

                if (energy <= 0) {
                    world.removeEntity(this);
                }
            };

            this.draw = function (ctx) {
                if (image) {
                    var drawWidth = Math.floor(width*scale);
                    var drawHeight = Math.floor(height*scale);
                    beeInvasion.drawUtils.drawRotatedImage(ctx, image, this.pos[0], this.pos[1], angle, drawWidth, drawHeight);

                    //ctx.drawImage(image, this.pos[0], this.pos[1], drawWidth, drawHeight);
                }
            };
        },

        Projectile: function (options) {
            this.damage = options.damage || 2;
            // lifetime in ticks
            var lifeTime = options.lifeTime || 1000;
            this.pos = options.pos || [0,0];
            var direction = options.direction || [0,1];
            var speed = 2;

            var angle = beeInvasion.utils.getAngle(direction);
            var scale = options.scale || 1;

            var image, width, height;

            beeInvasion.utils.loadImage(beeInvasion.assets.Bullet, function(loadedImage) {
                image = loadedImage;
                width = image.width;
                height = image.height;
            });

            this.act = function (world) {
                this.pos = beeInvasion.utils.addVectors(this.pos, beeInvasion.utils.scaleVector(direction, speed));
                angle = beeInvasion.utils.getAngle(direction) + 90;
                lifeTime -= 1;
                if (lifeTime <= 0) {
                    world.removeEntity(this);
                }
            };

            this.draw = function (ctx) {
                if (image) {
                    ctx.save();

                    var drawWidth = Math.floor(width*scale);
                    var drawHeight = Math.floor(height*scale);

                    beeInvasion.drawUtils.drawRotatedImage(ctx, image, this.pos[0], this.pos[1], angle, drawWidth, drawHeight);
                    ctx.restore();
                }
            };

        }
    };

    return beeInvasion;
}(window.beeInvasion || {}));