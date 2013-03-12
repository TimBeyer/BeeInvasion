window.beeInvasion = (function (beeInvasion) {
    beeInvasion.utils = {
        loadImage: function (imageSrc, onload) {
            var image = new Image();
            image.onload = function () {
                onload(image);
            };
            image.src = imageSrc;
        },

        getAngle: function (v2) {
            //var angleRad = Math.acos( (v1[0] * v2[0] + v1[1] * v2[1]) / ( Math.sqrt(v1[0]*v1[0] + v1[1]*v1[1]) * Math.sqrt(v2[0]*v2[0] + v2[1]*v2[1]) ) );
            //angleRad += 2 * Math.PI;
            var angleRad = - Math.atan2(v2[0], v2[1]);
            var angleDeg = angleRad * 180 / Math.PI;
            return angleDeg;
        },

        addVectors: function () {
            return _.reduce(arguments, function (memo, vector) {
                memo[0] += vector[0];
                memo[1] += vector[1];
                return memo;
            }, [0,0]);
        },

        subtractVectors: function () {
            var args = _.toArray(arguments);
            return _.reduce(_.rest(arguments), function (memo, vector) {
                memo[0] -= vector[0];
                memo[1] -= vector[1];
                return memo;
            }, _.clone(_.first(arguments)));
        },

        scaleVector: function (vector, scale) {
            return _.map(vector, function (component) {
                return component * scale;
            });
        },

        vectorLength: function (vector) {
            var sumOfSquares = _.reduce(vector, function (memo, component) {
                return memo + Math.pow(component, 2);
            }, 0);
            return Math.sqrt(sumOfSquares);
        },

        normalizeVector: function (vector) {
            var length = beeInvasion.utils.vectorLength(vector);
            return _.map(vector, function (component) {
                return component / length;
            });
        }
    };
    
    var TO_RADIANS = Math.PI/180; 

    beeInvasion.drawUtils = {
        drawRotatedImage: function (context, image, x, y, angle, width, height) { 
            context.save(); 
         
            // move to the middle of where we want to draw our image
            context.translate(x, y);
         
            // rotate around that point, converting our 
            // angle from degrees to radians 
            context.rotate(angle * TO_RADIANS);
         
            // draw it up and to the left by half the width
            // and height of the image 
            if( width && height) {
                context.drawImage(image, -(width/2), -(height/2), width, height);
            }
            else {
                context.drawImage(image, -(image.width/2), -(image.height/2));
            }
         
            // and restore the co-ords to how they were when we began
            context.restore(); 
        }
    };

    return beeInvasion;
}(window.beeInvasion || {}));