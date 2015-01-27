var snake = function (ctx, options) {
    var xPos = (options && options.xPos) ? options.xPos : 0;
    var yPos = (options && options.yPos) ? options.yPos : 0;
    var color = (options && options.color) ? options.color : "green";
    var facingLeft = (options && options.facingLeft) ? options.facingLeft : true;
    var scale = (options && options.scale) ? options.scale : 0.5;
    var segmentLength = (options && options.segmentLength) ? options.segmentLength : 50;
    var girth = (options && options.girth) ? options.girth : 18;
    var headSize = (options && options.headSize) ? options.headSize : 15;
    var angles = (options && options.angles) ? options.angles : [0, 0, 45, 45];

    ctx.fillStyle = color;

    ctx.translate(200, 200);

    var drawHead = function () {
        ctx.save();
        ctx.translate(-10, 0);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(0, -6, 14, -5, 26, -5);
        ctx.lineTo(30, -5);
        ctx.lineTo(30, 0);
        ctx.lineTo(14, 4);
        ctx.bezierCurveTo(14, 5, 0, 10, 0, 0);
        ctx.closePath();
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.translate(5, 2);
        ctx.beginPath();
        ctx.arc(0, 0, 4, Math.PI / 2, 3 / 2 * Math.PI, false);
        ctx.lineTo(22, -2);
        ctx.lineTo(22, 2);
        ctx.lineTo(0, 4);
        ctx.closePath();
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.restore();
    };

    var drawBody = function () {
        angles.forEach(function (angle, index, array) {
            ctx.rotate(angle * Math.PI / 180);
            ctx.translate(-segmentLength * scale, 0);
            ctx.fillRect(0, -girth * scale / 2, segmentLength * scale, girth * scale);
            ctx.beginPath();
            ctx.arc(0, 0, girth / 2 * scale, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        });
    };

    drawHead();
    drawBody();
};