var canvas = $('#drawing-area')[0];
var ctx = canvas.getContext('2d');

var cog = function(ctx, options){
    ctx.save();
    var numOfTeeth = (options && options.numOfTeeth) ? options.numOfTeeth : 10;
    var left = (options && options.left) ? options.left : 0;
    var top = (options && options.top) ? options.top : 0;
    var radius = (options && options.radius) ? options.radius : numOfTeeth * 4;
    var color = (options && options.color) ? options.color : "green";
    var angle = (options && options.angle) ? options.angle : 0; 
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.translate(left,top);
    ctx.arc(0, 0, radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
    for(var i = 1; i < numOfTeeth + 1; i++){
        ctx.save();
        ctx.rotate(Math.PI*2*i/numOfTeeth + angle);        
        ctx.translate(0,radius);
        ctx.fillRect(-5,-2, 10, 10);
        ctx.restore();
    }
    ctx.restore();
};

cog(ctx,{numOfTeeth:1, left: 40, top: 50});
cog(ctx,{numOfTeeth:20, left: 100, top: 200,color:"red"});
cog(ctx,{numOfTeeth:5, left: 200, top: 200,color:"black", angle: Math.PI/4});