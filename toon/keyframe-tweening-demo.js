/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
                draw: KeyframeTweener.drawBackground,
                keyframes:[
                    {
                        frame: 0,
                        properties: {
                            xOffset: 0,
                            yOffset: 0,
                            zoom: 1,
                        }
                    },
                    {
                        frame: 60,
                        properties: {
                            xOffset: -1200,
                            yOffset: 30,
                            zoom: 1,
                        }
                    }
                ]
            },
            {
                draw: JuanSprites.smileyFace,
                keyframes: [
                    {
                        frame: 0,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.quadEaseOut,
                        properties: {
                            blush: 0,
                            angle: 0,
                            mouthProperties: {
                                width: 0.1,
                                isHappy: true,
                                isOpen: true,
                            }
                        }
                    },

                    {
                        frame: 30,
                        tx: 500,
                        ty: 300,
                        ease: KeyframeTweener.quadEaseIn,
                        properties: {
                            blush: 1,
                            angle: 0,
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: true,
                            }
                        }
                    },

                    {
                        frame: 60,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.quadEaseOut,
                        properties: {
                            blush: 0.5,
                            angle: 0,
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.5,
                                isHappy: true,
                                isOpen: true,
                            }
                        }
                    },                    

                    // The last keyframe does not need an easing function.
                    {
                        frame: 61,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.quadEaseIn,
                        properties: {
                            blush: 0.5,
                            angle: 0,
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.5,
                                isHappy: true,
                                isOpen: true,
                            }
                        }
                        //rotate: 60 // Keyframe.rotate uses degrees.
                    }
                ]
            },
            {
                draw: JuanSprites.snake,
                keyframes: [
                    {
                        frame: 0,
                        tx: 100,
                        ty: 100,
                        ease: KeyframeTweener.linear,
                        properties: {
                            angles: [0,0,0,0,0,0],
                        }
                    },

                    {
                        frame: 30,
                        tx: 500,
                        ty: 300,
                        ease: KeyframeTweener.linear,
                        properties: {
                            angles: [30,30,0,-30,30,0],
                        }                    
                    },

                    {
                        frame: 50,
                        tx: 200,
                        ty: 200,
                        ease: KeyframeTweener.linear,
                        properties: {
                            angles: [45,45,0,-45,-30,-45],
                        }
                    },                    

                    // The last keyframe does not need an easing function.
                    {
                        frame: 60,
                        tx: 200,
                        ty: 200,
                        ease: KeyframeTweener.linear,
                        properties: {
                            angles: [0,0,0,0,0,0],
                        }
                        //rotate: 60 // Keyframe.rotate uses degrees.
                    }
                ]
            },
            {
                draw: JuanSprites.cog,
                keyframes: [
                    {
                        frame: 0,
                        tx: 20,
                        ty: 100,
                        ease: KeyframeTweener.linear,
                        properties: {
                            angle: 0,
                            radius: 40
                        }
                    },
                    {
                        frame: 60,
                        tx: 20,
                        ty: 100,
                        ease: KeyframeTweener.linear,
                        properties: {
                            angle: 450,
                            radius: 40
                        }                    
                    }
                ]
            }                        

        ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites,
        frameRate: 24
    });
}());
