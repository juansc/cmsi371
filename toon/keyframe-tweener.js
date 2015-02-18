/*
 * A simple keyframe-tweening animation module for 2D
 * canvas elements.
 */
var KeyframeTweener = {
    // The module comes with a library of common easing functions.
    linear: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        return distance * percentComplete + start;
    },

    quadEaseIn: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        return distance * percentComplete * percentComplete + start;
    },

    quadEaseOut: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        return -distance * percentComplete * (percentComplete - 2) + start;
    },

    quadEaseInAndOut: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / (duration / 2);
        return (percentComplete < 1) ?
                (distance / 2) * percentComplete * percentComplete + start :
                (-distance / 2) * ((percentComplete - 1) * (percentComplete - 3) - 1) + start;
    },

    // These tweening functions are from
    // Robert Penner. Check out his work at 
    // http://www.robertpenner.com/easing/
    easeInQuad: function (t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function ( t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158; 
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (t, b, c, d) {
        return c - easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (t, b, c, d) {
        if (t < d/2) return easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    },



    // The big one: animation initialization.  The settings parameter
    // is expected to be a JavaScript object with the following
    // properties:
    //
    // - renderingContext: the 2D canvas rendering context to use
    // - width: the width of the canvas element
    // - height: the height of the canvas element
    // - sprites: the array of sprites to animate
    // - frameRate: number of frames per second (default 24)
    //
    // In turn, each sprite is a JavaScript object with the following
    // properties:
    //
    // - draw: the function that draws the sprite
    // - keyframes: the array of keyframes that the sprite should follow
    //
    // Finally, each keyframe is a JavaScript object with the following
    // properties.  Unlike the other objects, defaults are provided in
    // case a property is not present:
    //
    // - frame: the global animation frame number in which this keyframe
    //          it to appear
    // - ease: the easing function to use (default is KeyframeTweener.linear)
    // - tx, ty: the location of the sprite (default is 0, 0)
    // - sx, sy: the scale factor of the sprite (default is 1, 1)
    // - rotate: the rotation angle of the sprite (default is 0)
    //
    // Initialization primarily calls setInterval on a custom-built
    // frame-drawing (and updating) function.

    initialize: function (settings) {
        // We need to keep track of the current frame.

        var propType = {
            leftEyeProperties: "object",
            rightEyeProperties: "object",
            mouthProperties: "object",
            color: "string",
            side: "string",
            eyeColor: "string",
            angles: "array"
        }

        var tweenScalar = function(currentTweenFrame, initialValue, finalValue, duration, ease){
            return ease(currentTweenFrame,initialValue, finalValue - initialValue, duration);
        };

        var tweenArray = function(currentTweenFrame, initialArray, finalArray, duration, ease){
            var tweenedArray = new Array(finalArray.length);
            for(var i = 0; i < tweenedArray.length; i++){
                tweenedArray[i] = ease(currentTweenFrame, initialArray[i], finalArray[i] - initialArray[i], duration);
            }
            return tweenedArray;
        };

        var tweenObject = function(currentTweenFrame, propArr, duration, ease){
            var tweenedObject = {};
            for(var i = 0; i < propArr.length; i++){
                var prop = propArr[i],
                    type = propType[prop["name"]] || "scalar";
                if(type === "object"){
                    tweenedObject[prop["name"]] = tweenObject(currentTweenFrame, prop["properties"], duration, ease);
                }else if(type === "array"){
                    tweenedObject[prop["name"]] = tweenArray(currentTweenFrame, prop["initialValue"], prop["finalValue"], duration, ease);
                }else if(type === "scalar"){
                    tweenedObject[prop["name"]] = tweenScalar(currentTweenFrame, prop["initialValue"], prop["finalValue"], duration, ease);
                }
            }
            return tweenedObject;
        };

        var currentFrame = 0,

            // Avoid having to go through settings to get to the
            // rendering context and sprites.
            renderingContext = settings.renderingContext,
            width = settings.width,
            height = settings.height,
            sprites = settings.sprites;

        setInterval(function () {

            var createPropertyArray = function(){
                var propertyArray = [];
                var initialObject = sprites[i].draw.defaultValues();
                var finalObject = sprites[i].draw.defaultValues();

                for(prop in startKeyframe.properties){
                    initialObject[prop] = startKeyframe.properties[prop]; 
                }
                for(prop in endKeyframe.properties){
                    finalObject[prop] = endKeyframe.properties[prop];
                }

                for(prop in finalObject){
                    // We handle subcases
                    if(["leftEyeProperties","rightEyeProperties", "mouthProperties"].indexOf(prop) !== -1){
                        var subpropArray = createSubpropertyArray(prop, initialObject[prop], finalObject[prop]);
                        propertyArray.push({name:prop, properties: subpropArray});
                        continue;
                    }
                    propertyArray.push({name:prop, initialValue: initialObject[prop], finalValue: finalObject[prop]})
                }

                return propertyArray;
            };

            var createSubpropertyArray = function (prop, initialState, finalState){
                var propertyArray = [];
                var initialObject = (sprites[i].draw.defaultValues())[prop];
                var finalObject = (sprites[i].draw.defaultValues())[prop];
                for(prop in initialState){
                    initialObject[prop] = initialState[prop]; 
                }
                for(prop in finalState){
                    finalObject[prop] = finalState[prop]
                }
                for(prop in finalObject){
                    propertyArray.push({name:prop, initialValue: initialObject[prop], finalValue: finalObject[prop]})                
                }
                return propertyArray;
            };            
            // Some reusable loop variables.
            var i,
                j,
                maxI,
                maxJ,
                ease,
                startKeyframe,
                endKeyframe,
                txStart,
                txDistance,
                tyStart,
                tyDistance,
                sxStart,
                sxDistance,
                syStart,
                syDistance,
                rotateStart,
                rotateDistance,
                currentTweenFrame,
                duration;

            // Clear the canvas.
            renderingContext.clearRect(0, 0, width, height);

            // For every sprite, go to the current pair of keyframes.
            // Then, draw the sprite based on the current frame.
            for (i = 0, maxI = sprites.length; i < maxI; i += 1) {
                for (j = 0, maxJ = sprites[i].keyframes.length - 1; j < maxJ; j += 1) {
                    // We look for keyframe pairs such that the current
                    // frame is between their frame numbers.
                    if ((sprites[i].keyframes[j].frame <= currentFrame) &&
                            (currentFrame <= sprites[i].keyframes[j + 1].frame)) {
                        // Point to the start and end keyframes.
                        var startKeyframe = sprites[i].keyframes[j],
                            endKeyframe = sprites[i].keyframes[j + 1];

                        // Save the rendering context state.
                        renderingContext.save();

                        // Set up our start and distance values, using defaults
                        // if necessary.
                        var ease = startKeyframe.ease || KeyframeTweener.linear,
                            txStart = startKeyframe.tx || 0,
                            txDistance = (endKeyframe.tx || 0) - txStart,
                            tyStart = startKeyframe.ty || 0,
                            tyDistance = (endKeyframe.ty || 0) - tyStart,
                            sxStart = startKeyframe.sx || 1,
                            sxDistance = (endKeyframe.sx || 1) - sxStart,
                            syStart = startKeyframe.sy || 1,
                            syDistance = (endKeyframe.sy || 1) - syStart,
                            rotateStart = (startKeyframe.rotate || 0) * Math.PI / 180,
                            rotateDistance = (endKeyframe.rotate || 0) * Math.PI / 180 - rotateStart,
                            currentTweenFrame = currentFrame - startKeyframe.frame,
                            duration = endKeyframe.frame - startKeyframe.frame + 1;



                        // Build our transform according to where we should be.
                        renderingContext.translate(
                            ease(currentTweenFrame, txStart, txDistance, duration),
                            ease(currentTweenFrame, tyStart, tyDistance, duration)
                        );
                        renderingContext.scale(
                            ease(currentTweenFrame, sxStart, sxDistance, duration),
                            ease(currentTweenFrame, syStart, syDistance, duration)
                        );
                        renderingContext.rotate(
                            ease(currentTweenFrame, rotateStart, rotateDistance, duration)
                        );

                        // Draw the sprite.
                        var propertyArray = createPropertyArray();
                        sprites[i].draw(renderingContext, tweenObject(currentTweenFrame, propertyArray, duration, ease));

                        // Clean up.
                        renderingContext.restore();

                    }
                }
            }

            // Move to the next frame.
            currentFrame += 1;
            if(currentFrame > 100) currentFrame = 0;
        }, 1000 / (settings.frameRate || 24));
    }
};