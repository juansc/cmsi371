var smileyFace = function (ctx, options) {
    ctx.save();
    var color = (options && options.color) ? options.color : "yellow";
    var radius = (options && options.radius) ? options.radius : 50;
    var xPos = (options && options.xPos) ? options.xPos : 300;
    var yPos = (options && options.yPos) ? options.yPos : 100;
    var leftEyeAttributes = (options && options.leftEyeProperties) ? options.leftEyeProperties : {
        side: "left"
    };
    var rightEyeAttributes = (options && options.rightEyeProperties) ? options.rightEyeProperties : {
        side: "right"
    };
    var mouthAttributes = (options && options.mouthProperties) ? options.mouthProperties : {};

    ctx.translate(xPos, yPos);

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
        var pupilSize = (options && options.pupilSize) ? options.pupilSize : 0.25;

        // Angle must be in degrees.
        // Distance must be 0 to 1.
        var pAngle = (options && options.pAngle) ? options.pAngle : 0;
        var pDist = (options && options.pDist) ? options.pDist : 0;

        var pupilX = Math.cos(pAngle * Math.PI / 180) * pDist * eyeSize * (1 - pupilSize);
        var pupilY = Math.sin(pAngle * Math.PI / 180) * pDist * eyeSize * (1 - pupilSize);

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
            ctx.arc(0, 0, eyeSize, eyeLidSide * Math.PI / 2 * (1 - lidSize), eyeLidSide * Math.PI / 2 * (1 + lidSize), isTop);
            ctx.fill();
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

        var MOUTH_SCALE = 0.5;

        //Goes from 0 to 1.
        var mouthSize = (options && options.size) ? options.size : 0.2;

        var isOpen = (options && options.isOpen) ? options.isOpen : false;
        var isHappy = (options && options.isHappy) ? options.isHappy : false;

        if (!isHappy) {
            ctx.rotate(Math.PI);
            ctx.translate(0, -radius * MOUTH_SCALE);
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, radius * MOUTH_SCALE, Math.PI / 2 * (1 - mouthSize), Math.PI / 2 * (1 + mouthSize), false);
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

smileyFace(ctx, {
    radius: 50,
    color: "blue",
    leftEyeProperties: {
        side: "left",
        pAngle: 90,
        pDist: 1
    },
    rightEyeProperties: {
        side: "right",
        pDist: 1,
        pAngle: 90
    },
    mouthProperties: {
        size: 0.5,
        isHappy: true,
        isOpen: false
    }
});