var canvas = $('#drawing-area')[0];
var ctx = canvas.getContext('2d');
console.log(ctx);

var Batman = function(ctx, options){
    ctx.save();
    var left = (options && options.left) ? options.left : 0;
    var top = (options && options.top) ? options.top : 0;
    var height = (options && options.height) ? options.height : 300;
    var width = (options && options.height )? options.width : 150;
    ctx.translate(left,top);
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(width*0.2,height/4);
    ctx.lineTo(width - width*0.2,height/4);
    ctx.lineTo(width,0);
    ctx.lineTo(width,height);
    ctx.lineTo(0,height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
};

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