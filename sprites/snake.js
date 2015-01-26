var snake = function (ctx, options) {
    var xPos = (options && options.xPos) ? options.xPos : 0;
    var yPos = (options && options.yPos) ? options.yPos : 0;
    var color = (options && options.color) ? options.color : "green";
    var facingLeft = (options && options.facingLeft) ? options.facingLeft : true;
    var scale = (options && options.scale) ? options.scale : 0.5;
    var segmentLength = (options && options.segmentLength) ? options.segmentLength : 50;
    var girth = (options && options.girth) ? options.girth : 18;
    var headSize = (options && options.headSize) ? options.headSize : 15;
    var angles = (options && options.angles) ? options.angles : [0,0,45,45];

    ctx.fillStyle = color;

    ctx.translate(200, 200);

    var drawHead = function () {
        ctx.save();
        ctx.scale(1.5, 1);
        ctx.beginPath();
        ctx.arc(headSize / 2 * scale, 0, headSize * scale, 0, Math.PI * 2, true);
        ctx.closePath();
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