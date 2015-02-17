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
                draw: JuanSprites.snake,
                keyframes: [
                    {
                        frame: 0,
                        tx: 500,
                        ty: 500,
                        angles: [0,0,0,0,0,0],
                        ease: KeyframeTweener.easeOutBounce
                    },

                    {
                        frame: 30,
                        tx: 500,
                        ty: 300,
                        angles: [30,30,30,30,30,30],
                        ease: KeyframeTweener.easeOutBounce
                    },

                    {
                        frame: 50,
                        tx: 500,
                        ty: 500,
                        angles: [-50,60,-20,-20,45,-30],
                        ease: KeyframeTweener.easeOutBounce
                    },                    

                    // The last keyframe does not need an easing function.
                    {
                        frame: 100,
                        tx: 500,
                        ty: 0,
                        angles: [30,-45,-45,45,30,-45],
                        ease: KeyframeTweener.linear
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
