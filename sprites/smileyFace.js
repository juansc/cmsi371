var smileyFace = function(ctx, options){
    ctx.save();
    var color = "yellow";
    var radius = (options && options.radius) ? options.radius : 50;
    ctx.translate(300,100);
    
    var face = function(ctx, options){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(0,0,radius,0, Math.PI*2,true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();        
    };

    // So do the following. Make an eye centered at 0,0, with a radius of 1. Put pupil anywhere 
    // a circle of radius 1-r and r is the pupil's radius. 
    // So the percentage position will be (1-r)*pupilX or (1-r)*pupilY.
    var eyes = function(ctx, options) {
        ctx.save();
        var eyeRadius = radius/5; 
        var eyeColor = (options && options.color) ? options.color : "white";
        var side = (options && options.side) ? (( options.side.toLowerCase() === "left") ? -1 : 1): 1;
        var pupilSize = (options && options.pupilSize) ? options.pupilSize : 0.25;
        var pupilX = (options && options.pupilX) ? (1-pupilSize)*options.pupilX : 0;  
        var pupilY = (options && options.pupilY) ? (1-pupilSize)*options.pupilX : 0;
        var lowerLid = (options && options.lowerLid) ? options.lowerLid : 0;
        var upperLid = (options && options.upperLid) ? options.upperLid : 0;

        ctx.scale(1,2);
        ctx.translate(side*radius/4,-radius/4);
        console.log(eyeRadius + " " +pupilSize)
        // Draw the white
        ctx.fillStyle = eyeColor;
        ctx.beginPath();
        ctx.arc(0,0,eyeRadius,0,Math.PI*2,true);      
        ctx.fill();
        ctx.closePath();

        // Draw the pupil
        ctx.beginPath();
        ctx.arc(pupilX,pupilY,eyeRadius*pupilSize,0,Math.PI*2,true);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        // Draw the lower eyelid
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(0,0,eyeRadius,Math.PI/2*(1-lowerLid),Math.PI/2*(1+lowerLid),false);
        ctx.fill();        
        ctx.closePath();
        // Draw the upper eyelid
        ctx.beginPath();        
        ctx.arc(0,0,eyeRadius,-Math.PI/2*(1-upperLid),-Math.PI/2*(1+upperLid),true);        
        ctx.fill();        
        ctx.closePath();        
        ctx.restore();
    };

    face(ctx);
    eyes(ctx, {side:"left"});
    eyes(ctx, {side:"ride"});
    ctx.restore();
};