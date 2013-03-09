window.beeInvasion = (function (beeInvasion) {
    beeInvasion.entities = {
        Player: function (options) {
            var pos = options.pos || [0,0];
            var dx = 1;
            var dy = 1;

            this.draw = function (ctx) {
                ctx.beginPath();
                ctx.arc(75,75,50,0,Math.PI*2,true); // Outer circle
                ctx.moveTo(110,75);
                ctx.arc(75,75,35,0,Math.PI,false);   // Mouth (clockwise)
                ctx.moveTo(65,65);
                ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye
                ctx.moveTo(95,65);
                ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye
                ctx.stroke();
            };
        },

        Bee: function (options) {
            var width, height;
            var pos = options.pos || [0,0];
            var imageSrc = beeInvasion.assets.BeeSmall;
            var image = new Image();

            image.onload = function () {
                width = image.width;
                height = image.height;
            };

            image.src = imageSrc;

            var scale = 1;

            this.draw = function (ctx) {
                var drawWidth = Math.floor(width*scale);
                var drawHeight = Math.floor(height*scale);
                console.log(drawWidth, drawHeight);
                ctx.drawImage(image, pos[0], pos[1], drawWidth, drawHeight);
            };
        }
    };

    return beeInvasion;
}(window.beeInvasion || {}));