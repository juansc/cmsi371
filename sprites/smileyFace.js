var smileyFace = function (ctx, options) {
    ctx.save();
    var color = "yellow";
    var radius = (options && options.radius) ? options.radius : 50;
    ctx.translate(300, 100);

    var face = function (ctx, options) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };

    var eyes = function (ctx, options) {
        ctx.save();
        var eyeSize = radius / 5;
        var eyeColor = (options && options.color) ? options.color : "white";
        var side = (options && options.side) ? ((options.side.toLowerCase() === "left") ? -1 : 1) : 1;

        // Expects number from 0 to 1.
        var pupilSize = (options && options.pupilSize) ? options.pupilSize : 0.25;

        // Angle must be in degrees.
        // Distance must be 0 to 1.
        var pAngle = (options && options.pAngle) ? options.pAngle : 0;
        var pDist = (options && options.pDist) ? options.pDist : 0;

        var pupilX = Math.cos(pAngle * Math.PI / 180) * pDist * eyeSize * (1 - pupilSize);
        var pupilY = Math.sin(pAngle * Math.PI / 180) * pDist * eyeSize * (1 - pupilSize);

        var lowerLid = (options && options.lowerLid) ? options.lowerLid : 0;
        var upperLid = (options && options.upperLid) ? options.upperLid : 0;

        // Transform.
        ctx.scale(1, 2);
        ctx.translate(side * radius / 4, -radius / 4);

        // Draw the white
        ctx.fillStyle = eyeColor;
        ctx.beginPath();
        ctx.arc(0, 0, eyeSize, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();

        // Draw the pupil
        ctx.beginPath();
        ctx.arc(pupilX, pupilY, eyeSize * pupilSize, 0, Math.PI * 2, true);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        // Draw the lower eyelid
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(0, 0, eyeSize, Math.PI / 2 * (1 - lowerLid), Math.PI / 2 * (1 + lowerLid), false);
        ctx.fill();
        ctx.closePath();

        // Draw the upper eyelid
        ctx.beginPath();
        ctx.arc(0, 0, eyeSize, -Math.PI / 2 * (1 - upperLid), -Math.PI / 2 * (1 + upperLid), true);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    };

    face(ctx);
    eyes(ctx, {
        side: "left",
        pAngle: -45,
        pDist: 0.5
    });
    eyes(ctx, {
        side: "ride"
    });
    ctx.restore();
};

smileyFace(ctx, {
    radius: 50,
    leftEyeProperties: {
        pAngle: -45,
        pDist: 0.5
    },
    rightEyeProperties: {
        pDist: 1,
        pAngle: 90
    }
});