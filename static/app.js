

window.beeInvasion = (function (beeInvasion) {

    beeInvasion.GameWorld = function () {
        this.entities = [];
        this.playerEntities = [];

        this.addEntity = function (entity) {
            this.entities.push(entity);
        };

        this.addPlayerEntity = function (player) {
            this.playerEntities.push(player);
            this.entities.push(player);
        };

        this.getPlayerEntities = function () {
            return this.playerEntities;
        };

        this.removeEntity = function (entity) {
            this.entities = _.without(this.entities, entity);
            this.playerEntities = _.without(this.playerEntities, entity);
        };

        this.getEntities = function () {
            return this.entities;
        };

        this.getEntitiesByClass = function (_class) {
            return _.filter(this.entities, function (entity) {
                return entity instanceof _class;
            });
        };

        this.getEntitiesInRadius = function (centerEntity, radius) {
            var pos = centerEntity.pos;
            var entitiesInRadius = _.filter(_.without(this.entities, centerEntity), function (entity) {
                var entityX = entity.pos[0];
                var entityY = entity.pos[1];
                var posX = pos[0];
                var posY = pos[1];

                if (entityX > posX - radius && entityX < posX + radius) {
                    if (entityY > posY - radius && entityY < posY + radius) {
                        return true;
                    }
                }
            });
            return entitiesInRadius;
        }
    };

    beeInvasion.Game = function (options) {
        var canvas = options.canvas;
        var ctx = canvas.getContext("2d");
        // Assume array [x,y]
        var canvasSize = options.canvasSize;
        canvas.width = canvasSize[0];
        canvas.height = canvasSize[1];

        this.world = new beeInvasion.GameWorld();

        this.clearScreen = function () {
            ctx.fillStyle = "rgba(0,0,0,0)";
            ctx.clearRect(0,0,canvasSize[0], canvasSize[1]);
        };

        var patternLoaded = false;
        var pattern = new Image();

        var createPattern = function () {
            pattern.onload = function () {
                patternLoaded = true;
            };
            pattern.src = beeInvasion.assets.Grass;
        };

        createPattern();

        this.drawBackground = function () {
            if (patternLoaded) {
                ctx.beginPath();
                ctx.lineWidth = 16;
                ctx.strokeStyle = ctx.createPattern(pattern, 'repeat');
                ctx.moveTo(0, 0);
                ctx.lineTo(canvasSize[0], 0);
                ctx.stroke();
            }
        };

        this.doEntities = function () {
            var entities = this.world.getEntities();
            //console.log(this.world.getEntitiesByClass(beeInvasion.entities.Projectile));

            console.log("#entities", entities.length);
            _.each(entities, function (entity) {
                if (entity.act) {
                    entity.act(this.world);
                }
                entity.draw(ctx);
            }, this);
        };

        this.run = function () {
            this.clearScreen();
            //this.drawBackground();
            this.doEntities();
            window.requestAnimationFrame(_.bind(this.run, this));
        };
    };

    return beeInvasion;
}(window.beeInvasion || {}));

(function () {
    $(function () {
        var body = $('body');
        var bodyWidth = body.width();
        var bodyHeight = body.height();

        var game = new beeInvasion.Game({
            canvas: $('#gameCanvas')[0],
            canvasSize: [bodyWidth, bodyHeight]
        });

        var numBees = 100;
        _.times(numBees, function () {
            var pos = [0,0];
            pos[0] = Math.floor(Math.random() * bodyWidth);
            pos[1] = Math.floor(Math.random() * bodyHeight);
            game.world.addEntity(new beeInvasion.entities.Bee({
                pos: pos
            }));
        });

        game.world.addPlayerEntity(new beeInvasion.entities.Player({
            pos: [100,100]
        }));
        game.run();

    });
}());