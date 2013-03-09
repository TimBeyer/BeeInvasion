

window.beeInvasion = (function (beeInvasion) {

    beeInvasion.Game = function (options) {
        var canvas = options.canvas;
        var ctx = canvas.getContext("2d");
        // Assume array [x,y]
        var canvasSize = options.canvasSize;
        canvas.width = canvasSize[0];
        canvas.height = canvasSize[1];

        var entities = [];

        this.addEntity = function (entity) {
            entities.push(entity);
        };

        this.clearScreen = function () {
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(0,0,canvasSize[0], canvasSize[1]);
        };

        this.drawEntities = function () {
            _.each(entities, function (entity) {
                entity.draw(ctx);
            });
        };

        this.run = function () {
            this.clearScreen();
            this.drawEntities();
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

        game.addEntity(new beeInvasion.entities.Bee({
            pos: [50,50]
        }));
        game.run();

    });
}());