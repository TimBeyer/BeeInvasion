window.beeInvasion = (function (beeInvasion) {
    beeInvasion.entities = {
        Player: function (options) {
            var image, width, height;
            var pos = options.pos || [0,0];
            var aimPoint = [0,0];
            
            var dx = 1;
            var dy = 1;

            var direction = [0,0];

            var scale = 0.25;

            var angle = 90;

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

            document.addEventListener('mousemove', function (e) {
                aimPoint = [e.x, e.y];
                var targetVector =  beeInvasion.utils.subtractVectors(aimPoint, pos);
                var angleToAimpoint = beeInvasion.utils.getAngle([0,1], targetVector);
                angle = angleToAimpoint;
            });

            beeInvasion.utils.loadImage(beeInvasion.assets.Player, function(loadedImage) {
                image = loadedImage;
                width = image.width;
                height = image.height;
            });

            this.act = function () {

            };

            this.draw = function (ctx) {
                if (image) {
                    ctx.save();

                    var drawWidth = Math.floor(width*scale);
                    var drawHeight = Math.floor(height*scale);

                    pos[0] += direction[0] * dx;
                    pos[1] += direction[1] * dy;

                    beeInvasion.drawUtils.drawRotatedImage(ctx, image, pos[0], pos[1], angle, drawWidth, drawHeight);
                    ctx.restore();
                }
            };
        },

        Bee: function (options) {
            var image, width, height;
            var pos = options.pos || [0,0];

            beeInvasion.utils.loadImage(beeInvasion.assets.BeeSmall, function(loadedImage) {
                image = loadedImage;
                width = image.width;
                height = image.height;
            });

            var scale = 0.8;

            this.act = function () {
                pos[0] += 1;
                pos[1] += 1;
            };

            this.draw = function (ctx) {
                if (image) {
                    var drawWidth = Math.floor(width*scale);
                    var drawHeight = Math.floor(height*scale);
                    ctx.drawImage(image, pos[0], pos[1], drawWidth, drawHeight);
                }
            };
        }
    };

    return beeInvasion;
}(window.beeInvasion || {}));