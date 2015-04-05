(function () {
    window.JuanSprites = window.JuanSprites || { };
    window.JuanSprites.cog = function(ctx, options) {
        ctx.save();
        var numOfTeeth = (options && options.numOfTeeth) ? options.numOfTeeth : 10;
        var xPos = (options && options.xPos) ? options.xPos : 0;
        var yPos = (options && options.yPos) ? options.yPos : 0;
        var radius = (options && options.radius) ? options.radius : numOfTeeth * 4;
        var color = (options && options.color) ? options.color : "grey";
        var angle = (options && options.angle) ? options.angle*Math.PI/180 : 0;
        var teethLength = (options && options.teethLength) ? options.teethLength : 10;
        var teethWidth = (options && options.teethWidth) ? options.teethWidth : 10; 
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.translate(xPos, yPos);
        ctx.arc(0, 0, radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
        for (var i = 1; i < numOfTeeth + 1; i+= 1) {
            ctx.save();
            ctx.rotate(Math.PI * 2 * i / numOfTeeth + angle);
            ctx.translate(0, radius);
            ctx.fillRect(-teethWidth/2, -teethLength/5, teethWidth, teethLength);
            ctx.restore();
        }
        ctx.restore();
    };
    window.JuanSprites.cog.defaultValues = function (){ // JD: 3
        return { 
            numOfTeeth: 10,
            xPos: 0,
            yPos: 0,
            radius: 100,
            color: "grey",
            angle: 0,
            teethLength: 10,
            teethWidth: 10,
        };
    };
}());