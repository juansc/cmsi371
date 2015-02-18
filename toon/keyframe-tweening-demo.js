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
                draw: JuanSprites.smileyFace,
                keyframes: [
                    {
                        frame: 0,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.linear,
                        properties: {
                            blush: 0,
                            angle: 45,
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
                        angles: [30,30,30,30,30,30],
                        ease: KeyframeTweener.linear,
                        properties: {
                            blush: 1,
                            angle: 90,
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: true,
                            }
                        }
                    },

                    {
                        frame: 50,
                        tx: 500,
                        ty: 500,
                        angles: [-50,60,-20,-20,45,-30],
                        ease: KeyframeTweener.linear,
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
                        frame: 60,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.linear,
                        properties: {
                            blush: 0.5,
                            angle: 200,
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
