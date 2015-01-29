(function(){
    window.JuanSprites = window.JuanSprites || { };
    window.JuanSprites.snake = function (ctx, options) {
        var xPos = (options && options.xPos) ? options.xPos : 0;
        var yPos = (options && options.yPos) ? options.yPos : 0;
        var headAngle = (options && options.headAngle) ? options.headAngle : 0;
        var eyeColor = (options && options.eyeColor) ? options.eyeColor : "red";
        var mouthAngle = (options && options.mouthAngle) ? options.mouthAngle : -5;
        var color = (options && options.color) ? options.color : "green";
        var facingLeft = (options && options.facingLeft) ? -1 : 1;
        var scale = (options && options.scale) ? options.scale : 1;
        var segmentLength = (options && options.segmentLength) ? options.segmentLength : 50;
        var girth = (options && options.girth) ? options.girth : 18;
        var headSize = (options && options.headSize) ? options.headSize : 15;
        var angles = (options && options.angles) ? options.angles : [0, 0, 45, 45];

        ctx.fillStyle = color;

        ctx.save();
        ctx.translate(xPos, yPos);
        ctx.scale(facingLeft * scale, scale);
        ctx.rotate(headAngle * Math.PI / 180);

        var drawHead = function () {
            ctx.save();

            // Draw the mandible.
            ctx.save();
            ctx.translate(4, 3);
            ctx.rotate(-Math.PI / 180 * mouthAngle);
            ctx.beginPath();
            ctx.arc(0, 0, 8, Math.PI / 2, 3 / 2 * Math.PI, false);
            ctx.lineTo(44, -4);
            ctx.lineTo(44, 4);
            ctx.lineTo(0, 8);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            // Draw the cranium
            ctx.save();
            ctx.translate(-6, -2);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(0, -12, 28, -10, 52, -10);
            ctx.lineTo(60, -10);
            ctx.lineTo(60, 0);
            ctx.lineTo(55, 0);
            ctx.lineTo(52, 10);
            ctx.lineTo(49, 0);
            ctx.lineTo(28, 8);
            ctx.bezierCurveTo(28, 10, 0, 20, 0, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Draw the eye
            ctx.beginPath();
            ctx.arc(30, -4, 4, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = eyeColor;
            ctx.fill();
            ctx.restore();

            ctx.restore();
        };

        var drawBody = function () {
            ctx.save();
            angles.forEach(function (angle, index, array) {
                ctx.rotate(angle * Math.PI / 180);
                ctx.translate(-segmentLength * scale, 0);
                ctx.fillRect(0, -girth * scale / 2, segmentLength * scale, girth * scale);
                ctx.strokeRect(0, -girth * scale / 2, segmentLength * scale, girth * scale);
                ctx.beginPath();
                ctx.arc(0, 0, girth / 2 * scale, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            });
            //draw tail
            ctx.beginPath();
            ctx.moveTo(0, -girth / 2);
            ctx.lineTo(-segmentLength, 0);
            ctx.lineTo(0, girth / 2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        };
        drawBody();
        drawHead();
        ctx.restore();
    }; 
}()); 