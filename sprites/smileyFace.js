//
(function () {
    var smileyFace = function (ctx, options) {
        ctx.save();
        var color = (options && options.color) ? options.color : "yellow";
        var radius = (options && options.radius) ? options.radius : 50;
        var xPos = (options && options.xPos) ? options.xPos : 300;
        var yPos = (options && options.yPos) ? options.yPos : 100;
        // Angle is in degrees.
        var angle = (options && options.angle) ? options.angle : 0;
        var leftEyeAttributes = (options && options.leftEyeProperties) ? options.leftEyeProperties : {
            side: "left"
        };
        var rightEyeAttributes = (options && options.rightEyeProperties) ? options.rightEyeProperties : {
            side: "right"
        };
        var mouthAttributes = (options && options.mouthProperties) ? options.mouthProperties : {};

        ctx.translate(xPos, yPos);
        ctx.rotate(Math.PI/180*angle);

        var drawFace = function (ctx, options) {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };

        var drawEye = function (ctx, options) {
            ctx.save();
            var eyeSize = radius / 5;
            var eyeColor = (options && options.color) ? options.color : "black";
            var side = (options && options.side) ? ((options.side.toLowerCase() === "left") ? -1 : 1) : 1;

            // Expects number from 0 to 1.
            var pupilSize = (options && options.size) ? options.size : 0.25;

            // Angle must be in degrees.
            // Distance must be 0 to 1.
            var angle = (options && options.angle) ? options.angle : 0;
            var dist = (options && options.dist) ? options.dist : 0;

            var pupilX = Math.cos(angle * Math.PI / 180) * dist * eyeSize * (1 - pupilSize);
            var pupilY = Math.sin(angle * Math.PI / 180) * dist * eyeSize * (1 - pupilSize);

            var lowerLidSize = (options && options.lowerLid) ? options.lowerLid : 0;
            var upperLidSize = (options && options.upperLid) ? options.upperLid : 0;

            // Transform.
            ctx.scale(1, 2);
            ctx.translate(side * radius / 4, -radius / 4);

            // Draw the white
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(0, 0, eyeSize, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();

            // Draw the pupil
            ctx.beginPath();
            ctx.arc(pupilX, pupilY, eyeSize * pupilSize, 0, Math.PI * 2, true);
            ctx.fillStyle = eyeColor;
            ctx.fill();
            ctx.closePath();

            // Draw the lower eyelid
            var drawEyeLid = function (ctx, lidSize, isTop) {
                var eyeLidSide = isTop ? -1 : 1;
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.strokeStyle = color;            
                ctx.arc(0, 0, eyeSize, eyeLidSide * Math.PI / 2 * (1 - lidSize), eyeLidSide * Math.PI / 2 * (1 + lidSize), isTop);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            };

            // Draw the lower eyelid
            drawEyeLid(ctx, lowerLidSize, false);
            // Draw the upper eyelid
            drawEyeLid(ctx, upperLidSize, true);
            ctx.restore();

        };

        var drawMouth = function (ctx, options) {
            //Goes from 0 to 1.
            var mouthScale = (options && options.scale) ? options.scale : 0.9;
            var mouthWidth = (options && options.width) ? options.width : 0.2;

            var isOpen = (options && options.isOpen) ? options.isOpen : false;
            var isHappy = (options && options.isHappy) ? options.isHappy : false;

            if (!isHappy) {
                ctx.rotate(Math.PI);
                ctx.translate(0, -radius * mouthScale);
            }

            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, radius * mouthScale, Math.PI / 2 * (1 - mouthWidth), Math.PI / 2 * (1 + mouthWidth), false);
            ctx.strokeStyle = "black";
            ctx.lineWidth = "2";
            ctx.stroke();
            ctx.closePath();
            if (isOpen) {
                ctx.fillStyle = "black";
                ctx.fill();
            }
            ctx.restore();

        };

        drawFace(ctx);
        drawEye(ctx, leftEyeAttributes);
        drawEye(ctx, rightEyeAttributes);
        drawMouth(ctx, mouthAttributes);
        ctx.restore();
    };

    window.smileyFace = smileyFace;
}());