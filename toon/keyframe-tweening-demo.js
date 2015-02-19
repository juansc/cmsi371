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
                        frame: 0
                    },
                    {
                        frame: 235,
                    },
                    {
                        frame: 250,
                        properties: {
                            xOffset: 200
                        }
                    },
                    {
                        frame: 1000,
                        properties: {
                            xOffset: 200
                        }
                    }                    
                ]
            },
            {
                draw: JuanSprites.cog,
                keyframes: [
                    {
                        frame: 235,
                        properties: {
                            color: "black",
                            xPos: -322,
                            yPos: 265,
                            angle: 10,
                            numOfTeeth: 10,
                            radius: 30
                        }
                    },
                    {
                        frame: 250,
                        properties: {
                            color: "black",
                            xPos: 72,
                            yPos: 265,
                            angle: -140,
                            numOfTeeth: 10,
                            radius: 30
                        }
                    },
                    {
                        frame: 1000,
                        properties: {
                            color: "black",
                            xPos: 72,
                            yPos: 265,
                            angle: -7640,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    }
                ]
            },
            {
                draw: JuanSprites.cog,
                keyframes: [
                    {
                        frame: 235,
                        properties: {
                            xPos: -350,
                            yPos: 200,
                            angle: 0,
                            numOfTeeth: 10,
                            radius: 30
                        }
                    },
                    {
                        frame: 250,
                        properties: {
                            xPos: 50,
                            yPos: 200,
                            angle: 150,
                            numOfTeeth: 10,
                            radius: 30
                        }
                    },
                    {
                        frame: 1000,
                        properties: {
                            xPos: 50,
                            yPos: 200,
                            angle: 7650,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    }
                ]
            },

            {
                draw: JuanSprites.smileyFace,
                keyframes: [
                    {
                        frame: 30,
                        tx: 1100,
                        ty: 500,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {
                            mouthProperties: {
                                width: 0.1,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },

                    {
                        frame: 40,
                        tx: 900,
                        ty: 300,
                        ease: KeyframeTweener.easeInCubic,
                        properties: {
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },

                    {
                        frame: 50,
                        tx: 700,
                        ty: 500,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.5,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },                    
                    {
                        frame: 60,
                        tx: 500,
                        ty: 300,
                        ease: KeyframeTweener.easeInCubic,
                        properties: {
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.5,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 70,
                        tx: 300,
                        ty: 500,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.5,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 140,
                        tx: 300,
                        ty: 500,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.5,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 141,
                        tx: 300,
                        ty: 500,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.5,
                                isHappy: true,
                                isOpen: true,
                            }
                        }
                    },
                    {
                        frame: 160,
                        tx: 300,
                        ty: 500,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {
                            blush: 1,
                            leftEyeProperties:{
                                lowerLid:1
                            },
                            rightEyeProperties:{
                                lowerLid:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: true,
                            }
                        }
                    },
                    {
                        frame: 200,
                        tx: 300,
                        ty: 500,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {
                            blush: 1,
                            leftEyeProperties:{
                                lowerLid:1
                            },
                            rightEyeProperties:{
                                lowerLid:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: true,
                            }
                        }
                    },    
                    {
                        frame: 220,
                        tx: 300,
                        ty: 500,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {                          
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 230,
                        tx: 300,
                        ty: 500,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                            },
                            rightEyeProperties:{
                                angle: 180,
                            },                           
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 235,
                        tx: 300,
                        ty: 500,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 250,
                        tx: 900,
                        ty: 500,
                        ease: KeyframeTweener.linear,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 255,
                        tx: 875,
                        ty: 450,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 260,
                        tx: 850,
                        ty: 500,
                        ease: KeyframeTweener.easeInCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 265,
                        tx: 825,
                        ty: 450,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 270,
                        tx: 800,
                        ty: 500,
                        ease: KeyframeTweener.easeInCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 275,
                        tx: 775,
                        ty: 450,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 280,
                        tx: 750,
                        ty: 500,
                        ease: KeyframeTweener.easeInCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 285,
                        tx: 725,
                        ty: 450,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 290,
                        tx: 700,
                        ty: 500,
                        ease: KeyframeTweener.easeInCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 295,
                        tx: 675,
                        ty: 450,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 300,
                        tx: 650,
                        ty: 500,
                        ease: KeyframeTweener.easeInCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 305,
                        tx: 625,
                        ty: 450,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 310,
                        tx: 600,
                        ty: 500,
                        ease: KeyframeTweener.easeInCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 315,
                        tx: 575,
                        ty: 450,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 320,
                        tx: 550,
                        ty: 500,
                        ease: KeyframeTweener.easeInCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 325,
                        tx: 525,
                        ty: 450,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame: 330,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.easeInCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 180,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: true,
                                isOpen: false,
                            }
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
