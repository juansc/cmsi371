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
                        frame: 550,
                        properties: {
                            xOffset: 200,
                        }
                    },
                    {
                        frame: 600,
                        properties: {
                            xOffset: 0
                        }
                    },                                         
                ]
            },
            {
                draw: KeyframeTweener.drawBackground,
                keyframes:[
                    {
                        frame: 1250,
                        properties:{ // JD: 3
                            xOffset: -10
                        }
                    },
                    {
                        frame: 1251,
                        properties: {
                            xOffset:-80,
                        }
                    },
                    {
                        frame: 1260,
                        properties: {
                            xOffset: -800
                        }
                    },                                        
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
                            leftEyeProperties:{ // JD: 3
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
                            leftEyeProperties:{ // JD: 3
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
                            leftEyeProperties:{ // JD: 3
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
                            leftEyeProperties:{ // JD: 3
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
                            leftEyeProperties:{ // JD: 3
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
                            leftEyeProperties:{  // JD: 3...etc. etc. etc.
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
                    },
                    {
                        frame: 350,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.easeInCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 210,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 210,
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
                        frame: 400,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.easeInCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 210,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 210,
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
                        frame: 401,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.easeInCubic,
                        properties: { 
                            leftEyeProperties:{
                                angle: 210,
                                dist: 1,
                            },
                            rightEyeProperties:{
                                angle: 210,
                                dist:1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                        
                    },
                    {
                        frame: 405,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.linear,
                        properties: { 
                            leftEyeProperties:{
                                angle: 210,
                                dist: 1,
                                lowerLid:1
                            },
                            rightEyeProperties:{
                                angle: 210,
                                dist:1,
                                lowerLid: 1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: false,
                                isOpen: true,
                            }
                        }
                    },
                    {
                        frame: 415,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.linear,
                        properties: { 
                            angle:20,
                            leftEyeProperties:{
                                angle: 210,
                                dist: 1,
                                lowerLid:1
                            },
                            rightEyeProperties:{
                                angle: 210,
                                dist:1,
                                lowerLid: 1
                            },                            
                            mouthProperties: {
                                scale: 0.5,
                                width: 0.9,
                                isHappy: false,
                                isOpen: true,
                            }
                        }
                    },
                    {
                        frame: 450,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.linear,
                        properties: { 
                            angle:20,
                            leftEyeProperties:{
                                angle: 210,
                                dist: 1,
                                lowerLid:1
                            },
                            rightEyeProperties:{
                                angle: 210,
                                dist:1,
                                lowerLid: 1
                            },                            
                            mouthProperties: {
                                scale: 0.7,
                                width: 0.9,
                                isHappy: false,
                                isOpen: true,
                            }
                        }
                    },
                    {
                        frame: 470,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.linear,
                        properties: { 
                            angle:20,
                            leftEyeProperties:{
                                angle: 210,
                                dist: 1,
                                lowerLid:1
                            },
                            rightEyeProperties:{
                                angle: 210,
                                dist:1,
                                lowerLid: 1
                            },                            
                            mouthProperties: {
                                scale: 0.7,
                                width: 0.9,
                                isHappy: false,
                                isOpen: true,
                            }
                        }
                    },                    
                    {
                        frame: 500,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.linear,
                        properties: { 
                            angle:0,
                            leftEyeProperties:{
                                angle: 360,
                                dist: 1,
                                lowerLid:1
                            },
                            rightEyeProperties:{
                                angle: 360,
                                dist:1,
                                lowerLid: 1
                            },                            
                            mouthProperties: {
                                scale: 0.7,
                                width: 0.9,
                                isHappy: false,
                                isOpen: true,
                            }
                        }
                    },
                    {
                        frame: 501,
                        tx: 500,
                        ty: 500,
                        ease: KeyframeTweener.linear,
                        properties: { 
                            angle:0,
                            leftEyeProperties:{
                                angle: 360,
                                dist: 1,
                                lowerLid:1
                            },
                            rightEyeProperties:{
                                angle: 360,
                                dist:1,
                                lowerLid: 1
                            },                            
                            mouthProperties: {
                                scale: 0.7,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        }
                    },                    
                    {
                        frame:510,
                        tx: 500,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 370,
                                dist: 1,
                                lowerLid: 0.8
                            },
                            rightEyeProperties: {
                                angle: 370,
                                dist: 1,
                                lowerLid: 0.8
                            },
                            mouthProperties: {
                                scale: 0.7,
                                width: 0.8,
                                isHappy: false,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame:530,
                        tx: 500,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 380,
                                size: 0.8,
                                dist: 1,
                                lowerLid: 0.8
                            },
                            rightEyeProperties: {
                                angle: 380,
                                size: 0.8,
                                dist: 1,
                                lowerLid: 0.8
                            },
                            mouthProperties: {
                                scale: 0.7,
                                width: 0.3,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                    {
                        frame:550,
                        tx: 500,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 380,
                                size: 0.8,
                                dist: 1,
                                lowerLid: 0.8
                            },
                            rightEyeProperties: {
                                angle: 380,
                                size: 0.8,
                                dist: 1,
                                lowerLid: 0.8
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                    {
                        frame:555,
                        tx: 450,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 380,
                                size: 0.8,
                                dist: 1,
                                lowerLid: 1,
                                upperLid: 1
                            },
                            rightEyeProperties: {
                                angle: 380,
                                size: 0.8,
                                dist: 1,
                                lowerLid: 1,
                                upperLid: 1
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                    {
                        frame:560,
                        tx: 300,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 20,
                                size: 0.8,
                                dist: 1,
                                lowerLid: 0.3,
                                upperLid: 0.3
                            },
                            rightEyeProperties: {
                                angle: 20,
                                size: 0.8,
                                dist: 1,
                                lowerLid: 0.3,
                                upperLid: 0.3
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                    {
                        frame:565,
                        tx: 500,
                        ty: 350,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {
                            leftEyeProperties: {
                                angle: 90,
                                size: 0.8,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 90,
                                size: 0.8,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                    {
                        frame:570,
                        tx: 700,
                        ty: 500,
                        ease: KeyframeTweener.easeInCubic,
                        properties: {
                            leftEyeProperties: {
                                angle: 90,
                                size: 0.8,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 90,
                                size: 0.8,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                    {
                        frame:575,
                        tx: 725,
                        ty: 375,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {
                            leftEyeProperties: {
                                angle: 135,
                                size: 0.8,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 135,
                                size: 0.8,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                    {
                        frame:580,
                        tx: 750,
                        ty: 500,
                        ease: KeyframeTweener.easeInCubic,
                        properties: {
                            leftEyeProperties: {
                                angle: 180,
                                size: 0.8,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 180,
                                size: 0.8,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                    {
                        frame:585,
                        tx: 800,
                        ty: 375,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {
                            leftEyeProperties: {
                                angle: 180,
                                size: 0.8,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 180,
                                size: 0.8,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                    {
                        frame:590,
                        tx: 850,
                        ty: 500,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {
                            leftEyeProperties: {
                                angle: 180,
                                size: 0.8,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 180,
                                size: 0.8,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                    {
                        frame:595,
                        tx: 875,
                        ty: 375,
                        ease: KeyframeTweener.easeInCubic,
                        properties: {
                            leftEyeProperties: {
                                angle: 180,
                                size: 0.8,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 180,
                                size: 0.8,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                    {
                        frame:600,
                        tx: 900,
                        ty: 500,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {
                            leftEyeProperties: {
                                angle: 180,
                                size: 0.8,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 180,
                                size: 0.8,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                     {
                        frame:630,
                        tx: 900,
                        ty: 500,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {
                            leftEyeProperties: {
                                angle: 180,
                                size: 0.8,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 180,
                                size: 0.8,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                     {
                        frame:640,
                        tx: 900,
                        ty: 500,
                        ease: KeyframeTweener.easeInSine,
                        properties: {
                            leftEyeProperties: {
                                angle: 135,
                                size: 0.8,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 135,
                                size: 0.8,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                     {
                        frame:650,
                        tx: 900,
                        ty: 500,
                        ease: KeyframeTweener.easeInSine,
                        properties: {
                            leftEyeProperties: {
                                angle: 180,
                                size: 0.8,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 180,
                                size: 0.8,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.9,
                                isHappy: false,
                                isOpen: false,
                            }
                        },
                    },
                     {
                        frame:660,
                        tx: 900,
                        ty: 500,
                        ease: KeyframeTweener.easeInSine,
                        properties: {
                            leftEyeProperties: {
                                angle: 180,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 180,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.3,
                                isHappy: false,
                                isOpen: false,
                            }
                        }
                    },
                    {
                        frame:700,
                        tx: 900,
                        ty: 500,
                        ease: KeyframeTweener.easeInSine,
                        properties: {
                            leftEyeProperties: {
                                angle: 90,
                                upperLid: 1,
                                dist: 1,
                                size: 0.5
                            },
                            rightEyeProperties: {
                                upperLid: 1,
                                angle: 90,
                                dist: 1,
                                size: 0.5
                            },
                            mouthProperties: {
                                scale: 0.3,
                                width: 0.7,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    },
                    {
                        frame:700,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 90,
                                upperLid: 1,
                                dist: 1,
                                size: 0.5
                            },
                            rightEyeProperties: {
                                upperLid: 1,
                                angle: 90,
                                dist: 1,
                                size: 0.5
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.4,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    },
                    {
                        frame:750,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 90,
                                upperLid: 1,
                                dist: 1,
                                size: 0.5
                            },
                            rightEyeProperties: {
                                upperLid: 1,
                                angle: 90,
                                dist: 1,
                                size: 0.5
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.4,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    },
                    {
                        frame:760,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 90,
                                upperLid: 1,
                                lowerLid: 1,
                                dist: 1,
                                size: 0.5
                            },
                            rightEyeProperties: {
                                upperLid: 1,
                                lowerLid: 1,
                                angle: 90,
                                dist: 1,
                                size: 0.5
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.4,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    },
                    {
                        frame:770,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 90,
                                upperLid: 1,
                                dist: 1,
                                size: 0.5
                            },
                            rightEyeProperties: {
                                upperLid: 1,
                                angle: 90,
                                dist: 1,
                                size: 0.5
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.4,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    },
                    {
                        frame:800,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 90,
                                upperLid: 1,
                                dist: 1,
                                size: 0.5
                            },
                            rightEyeProperties: {
                                upperLid: 1,
                                angle: 90,
                                dist: 1,
                                size: 0.5
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.4,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    },
                    {
                        frame:805,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 90,
                                upperLid: 1,
                                lowerLid: 1,
                                dist: 1,
                                size: 0.5
                            },
                            rightEyeProperties: {
                                upperLid: 1,
                                lowerLid: 1,
                                angle: 90,
                                dist: 1,
                                size: 0.5
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.4,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    },
                    {
                        frame:810,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 90,
                                upperLid: 1,
                                dist: 1,
                                size: 0.5
                            },
                            rightEyeProperties: {
                                upperLid: 1,
                                angle: 90,
                                dist: 1,
                                size: 0.5
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.4,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    }, 
                    {
                        frame:850,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 90,
                                upperLid: 1,
                                dist: 1,
                                size: 0.5
                            },
                            rightEyeProperties: {
                                upperLid: 1,
                                angle: 90,
                                dist: 1,
                                size: 0.5
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.4,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    },
                     {
                        frame:851,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 90,
                                upperLid: 1,
                                lowerLid: 1,
                                dist: 1,
                                size: 0.5
                            },
                            rightEyeProperties: {
                                upperLid: 1,
                                lowerLid: 1,
                                angle: 90,
                                dist: 1,
                                size: 0.5
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.4,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    },
                     {
                        frame:852,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 0,
                                upperLid: 1,
                                lowerLid: 1,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                upperLid: 1,
                                lowerLid: 1,
                                angle: 0,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.4,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    },
                     {
                        frame:855,
                        tx: 900,
                        ty: 500,
                        properties: {
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.1,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    },
                    {
                        frame:900,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 180
                            },
                            rightEyeProperties: {
                                angle: 180
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.1,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    },
                    {
                        frame:920,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 180,
                                dist: 1
                            },
                            rightEyeProperties: {
                                angle: 180,
                                dist: 1
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.1,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    },
                    {
                        frame:960,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 180,
                                dist: 1
                            },
                            rightEyeProperties: {
                                angle: 180,
                                dist: 1
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.1,
                                isHappy: false,
                                isOpen: false,
                            }
                        }                      
                    }, 
                   {
                        frame: 975,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 135,
                                dist: 1
                            },
                            rightEyeProperties: {
                                angle: 135,
                                dist: 1
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.1,
                                isHappy: false,
                                isOpen: false,
                            }
                        } 
                    },
                   {
                        frame: 1000,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 135,
                                dist: 1
                            },
                            rightEyeProperties: {
                                angle: 135,
                                dist: 1
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.1,
                                isHappy: false,
                                isOpen: false,
                            }
                        } 
                    },
                   {
                        frame: 1050,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 225,
                                dist: 1,
                                size: 0.1
                            },
                            rightEyeProperties: {
                                angle: 225,
                                dist: 1,
                                size: 0.1
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.9,
                                isHappy: false,
                                isOpen: true,
                            }
                        } 
                    },
                   {
                        frame: 1150,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 225,
                                dist: 1,
                                size: 0.1
                            },
                            rightEyeProperties: {
                                angle: 225,
                                dist: 1,
                                size: 0.1
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.9,
                                isHappy: false,
                                isOpen: true,
                            }
                        } 
                    },
                   {
                        frame: 1152,
                        tx: 900,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 360,
                                dist: 1,
                                size: 0.1
                            },
                            rightEyeProperties: {
                                angle: 360,
                                dist: 1,
                                size: 0.1
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.9,
                                isHappy: false,
                                isOpen: true,
                            }
                        } 
                    },
                   {
                        frame: 1154,
                        tx: 1200,
                        ty: 370,
                        properties: {
                            leftEyeProperties: {
                                angle: 360,
                                dist: 1,
                                size: 0.1
                            },
                            rightEyeProperties: {
                                angle: 360,
                                dist: 1,
                                size: 0.1
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.9,
                                isHappy: false,
                                isOpen: true,
                            }
                        } 
                    }, 
                   {
                        frame: 1399,
                        tx: 1200,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 360,
                                dist: 1,
                                size: 0.1
                            },
                            rightEyeProperties: {
                                angle: 360,
                                dist: 1,
                                size: 0.1
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.9,
                                isHappy: false,
                                isOpen: true,
                            }
                        } 
                    }                                                                                                                                                                                                                                                                                                                            
                ]
            },
            {
                draw: JuanSprites.smileyFace,
                keyframes: [
                    {
                        frame: 1250,
                        tx: 810,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 0,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 0,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.7,
                                isHappy: false,
                                isOpen: true,
                            }
                        } 
                    },                    
                   {
                        frame: 1251,
                        tx: 810,
                        ty: 500,
                        properties: {
                            leftEyeProperties: {
                                angle: 0,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 0,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.7,
                                isHappy: false,
                                isOpen: true,
                            }
                        } 
                    },
                   {
                        frame: 1255,
                        tx: 600,
                        ty: 500,
                        ease: KeyframeTweener.linear,
                        properties: {
                            angle: 10,
                            leftEyeProperties: {
                                angle: 0,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 0,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.7,
                                isHappy: false,
                                isOpen: true,
                            }
                        } 
                    }, 
                   {
                        frame: 1257,
                        tx: 800,
                        ty: 350,
                        ease: KeyframeTweener.easeInCubic,
                        properties: {
                            angle: -10,
                            leftEyeProperties: {
                                angle: 0,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 0,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.7,
                                isHappy: false,
                                isOpen: true,
                            }
                        } 
                    },
                   {
                        frame: 1260,
                        tx: 810,
                        ty: 500,
                        ease: KeyframeTweener.easeOutCubic,
                        properties: {
                            angle: 10,
                            leftEyeProperties: {
                                angle: 0,
                                dist: 1,
                            },
                            rightEyeProperties: {
                                angle: 0,
                                dist: 1,
                            },
                            mouthProperties: {
                                scale: 0.8,
                                width: 0.7,
                                isHappy: false,
                                isOpen: true,
                            }
                        } 
                    },     
                ]
            },
            {
                draw: JuanSprites.snake,
                keyframes: [
                    {
                        frame: 1250,
                        properties: {
                mouthAngle: -45, // JD: 4
                headAngle: 30,
                xPos: 270,
                yPos: 340,
                angles: [-30,-30,-30,-45,0,75,0,35,0] // JD: 3
                        } 
                    },                    
                    {
                        frame: 1251,
                        properties: {
                            mouthAngle: -45,
                            headAngle: 30,
                            xPos: 350,
                            yPos: 425,
                            angles: [10,-30,-30,-45,0,45,0,35,0]                             
                        }
                    },
                    {
                        frame: 1255,
                        properties: {
                            mouthAngle: -0,
                            headAngle: 0,
                            xPos: 425,
                            yPos: 500,
                            angles: [40,-10,-10,-35,-10,0,0,35,0]                           
                        }
                    }, 
                    {
                        frame: 1257,
                        properties: {
                            mouthAngle: -25,
                            headAngle: -30,
                            xPos: 420,
                            yPos: 400,
                            angles: [30,-10,-15,-25,0,35,0,35,0]                             
                        }
                    },
                    {
                        frame: 1260,
                        properties: {
                            mouthAngle: -25,
                            headAngle: 5,
                            xPos: 350,
                            yPos: 350,
                            angles: [-30,-10,-15,-25,0,65,0,35,0] // JD: 3 (etc.)
                        }
                    },     
                ]
            },                                     
            {
                draw: JuanSprites.snake,
                keyframes: [
                    {
                        frame: 385,
                        properties: {
                            headAngle: -30,
                            xPos: -50,
                            yPos: 275,
                            angles: [0,0,0,0,0,0,0,0,0]
                        }
                    },
                    {
                        frame: 395,
                        properties: {
                            headAngle: -30,
                            xPos: -50,
                            yPos: 275,
                            angles: [0,0,0,0,0,0,0,0,0]
                        }
                    },
                    {
                        frame: 400,
                        ease: KeyframeTweener.easeInSine,
                        properties: {
                            headAngle: -30,
                            xPos: 100,
                            yPos: 225,
                            angles: [0,0,0,0,0,0,0,0,0]
                        }
                    },
                    {
                        frame: 405,
                        ease: KeyframeTweener.easeInSine,                        
                        properties: {
                            headAngle: -20,
                            xPos: 103,
                            yPos: 225,
                            angles: [20,0,-20,0,0,0,0,0,0]
                        }
                    },
                    {
                        frame: 410,
                        ease: KeyframeTweener.easeInSine,                        
                        properties: {
                            headAngle: -10,
                            xPos: 100,
                            yPos: 225,
                            angles: [25,0,-25,0,0,0,0,0,0]
                        }
                    },
                    {
                        frame: 415,
                        ease: KeyframeTweener.easeInSine,                        
                        properties: {
                            headAngle: -20,
                            xPos: 103,
                            yPos: 225,
                            angles: [20,0,-20,0,0,0,0,0,0]
                        }
                    },
                    {
                        frame: 420,
                        ease: KeyframeTweener.easeInSine,                        
                        properties: {
                            headAngle: -30,
                            xPos: 100,
                            yPos: 225,
                            angles: [25,0,-25,-30,-30,-30,0,0,0]
                        }
                    },
                    {
                        frame: 425,
                        ease: KeyframeTweener.easeInSine,                        
                        properties: {
                            headAngle: -35,
                            xPos: 103,
                            yPos: 225,
                            angles: [20,20,-20,20,20,20,0,0,0]
                        }
                    },
                    {
                        frame: 430,
                        ease: KeyframeTweener.easeInSine,                        
                        properties: {
                            headAngle: -30,
                            xPos: 100,
                            yPos: 225,
                            angles: [25,0,-25,-30,-30,-30,0,0,0]
                        }
                    },
                    {
                        frame: 435,
                        ease: KeyframeTweener.easeInSine,                        
                        properties: {
                            headAngle: -35,
                            xPos: 103,
                            yPos: 225,
                            angles: [20,20,-20,20,20,20,0,0,0]
                        }
                    },
                    {
                        frame: 440,
                        ease: KeyframeTweener.easeInSine,                        
                        properties: {
                            headAngle: -30,
                            xPos: 100,
                            yPos: 225,
                            angles: [25,0,-25,-30,-30,-30,-30,20,20]
                        }
                    },
                    {
                        frame: 445,
                        ease: KeyframeTweener.easeInSine,                        
                        properties: {
                            headAngle: -35,
                            xPos: 103,
                            yPos: 225,
                            angles: [20,20,-20,20,20,20,45,45,45]
                        }
                    },
                    {
                        frame: 450,
                        ease: KeyframeTweener.easeInSine,                        
                        properties: {
                            headAngle: -30,
                            xPos: 100,
                            yPos: 225,
                            angles: [25,0,-25,-30,-30,-30,-30,0,0]
                        }
                    },
                    {
                        frame: 455,
                        properties: {
                            headAngle:0,
                            xPos: 130,
                            yPos: 225,
                            angles: [0,0,-45,-45,0,0,0,0,0]
                        }
                    },
                    {
                        frame: 460,
                        properties: {
                            headAngle:30,
                            xPos: 130,
                            yPos: 225,
                            angles: [-30,0,-45,-45,0,0,0,0,0]
                        }
                    },
                    {
                        frame: 465,
                        properties: {
                            headAngle:90,
                            xPos: 130,
                            yPos: 225,
                            angles: [-90,0,-45,-45,0,0,0,0,0]
                        }
                    },
                    {
                        frame: 470,
                        properties: {
                            headAngle:90,
                            xPos: 130,
                            yPos: 225,
                            angles: [-90,0,0,0,-45,0,0,0,0]
                        }
                    },
                    {
                        frame: 471,
                        properties: {
                            headAngle:90,
                            xPos: 130,
                            yPos: 225,
                            angles: [-90,0,0,0,0,0,0,0,0]
                        } 
                    },                   
                    {
                        frame: 480,
                        properties:{                            
                            headAngle:90,
                            xPos: 700,
                            yPos: 250,
                            angles: [-30,-30,-30,0,0,0,0,0,0]
                        }
                    },
                    {
                        frame: 485,
                        ease: KeyframeTweener.linear,
                        properties:{                            
                            headAngle:90,
                            xPos: 900,
                            yPos: 500,
                            angles: [-30,-30,-70,40,50,60,-20,50,0]
                        }
                    },
                    {
                        frame: 490,
                        ease: KeyframeTweener.linear,
                        properties: {
                            eyeColor: "green",
                            headAngle: 0,
                            xPos: 910,
                            yPos: 550,
                            angles: [0,0,0,120,60,0,0,0,-45]
                        }
                    },
                    {
                        frame: 500,
                        ease: KeyframeTweener.linear,
                        properties: {
                            eyeColor: "green",
                            headAngle: 0,
                            xPos: 910,
                            yPos: 550,
                            angles: [0,0,0,120,60,0,0,0,-45]
                        }
                    },
                    {
                        frame: 550,
                        ease: KeyframeTweener.linear,
                        properties: {
                            eyeColor: "green",
                            headAngle: 0,
                            xPos: 910,
                            yPos: 550,
                            angles: [0,0,0,120,60,0,0,0,-45]
                        }                        
                    },
                    {
                        frame: 600,
                        ease: KeyframeTweener.linear,
                        properties: {
                            eyeColor: "green",
                            headAngle: 0,
                            xPos: 610,
                            yPos: 550,
                            angles: [0,0,0,120,60,0,0,0,-45]                            
                        }
                    },
                    {
                        frame: 800,
                        properties: {
                            eyeColor: "green",
                            headAngle: 0,
                            xPos: 610,
                            yPos: 550,
                            angles: [0,0,0,120,60,0,0,0,-45]                             
                        }
                    },
                    {
                        frame: 810,
                        ease: KeyframeTweener.easeInSine,
                        properties: {
                            eyeColor: "green",
                            headAngle: 0,
                            xPos: 610,
                            yPos: 550,
                            angles: [0,0,0,120,60,0,0,0,-35]                             
                        }
                    },
                   {
                        frame: 815,
                        ease: KeyframeTweener.easeInSine,
                        properties: {
                            eyeColor: "green",
                            headAngle: 0,
                            xPos: 610,
                            yPos: 550,
                            angles: [0,0,0,120,60,0,0,0,-45]                             
                        }
                    },
                   {
                        frame: 950,
                        properties: {
                            eyeColor: "green",
                            headAngle: 0,
                            xPos: 610,
                            yPos: 550,
                            angles: [0,0,0,120,60,0,0,0,-45]                             
                        }
                    },
                   {
                        frame: 951,
                        properties: {
                            eyeColor: "red",
                            headAngle: 0,
                            xPos: 610,
                            yPos: 550,
                            angles: [0,0,0,120,60,0,0,0,-45]                             
                        }
                    },                    
                   {
                        frame: 955,
                        properties: {
                            headAngle: -30,
                            eyeColor:"red",
                            xPos: 610,
                            yPos: 550,
                            angles: [30,0,0,120,60,0,0,0,-45]                             
                        }
                    },
                   {
                        frame: 975,
                        properties: {
                            headAngle: -30,
                            xPos: 610,
                            yPos: 550,
                            angles: [30,0,0,120,60,0,0,0,-45]                             
                        }
                    },
                   {
                        frame: 1000,
                        properties: {
                            headAngle: -30,
                            xPos: 610,
                            yPos: 550,
                            angles: [30,0,0,120,60,-30,-30,-30,-45]                             
                        }
                    },
                   {
                        frame: 1050,
                        properties: {
                            headAngle: 30,
                            xPos: 570,
                            yPos: 340,
                            angles: [-30,-30,-30,-45,0,75,0,35,0]                             
                        }
                    },
                   {
                        frame: 1070,
                        ease: KeyframeTweener.easeInQuint,                        
                        properties: {
                            headAngle: 30,
                            xPos: 570,
                            yPos: 340,
                            angles: [-30,-30,-30,-45,0,75,0,35,0]                             
                        }
                    },  
                   {
                        frame: 1075,
                        properties: {
                            mouthAngle: -45,
                            headAngle: 30,
                            xPos: 570,
                            yPos: 340,
                            angles: [-30,-30,-30,-45,0,75,0,35,0]                             
                        }
                    },                                       
                   {
                        frame: 1150,
                        properties: {
                            mouthAngle: -45,
                            headAngle: 30,
                            xPos: 570,
                            yPos: 340,
                            angles: [-30,-30,-30,-45,0,75,0,35,0]                             
                        }
                    },
                   {
                        frame: 1155,
                        properties: {
                            headAngle: 30,
                            xPos: 900,
                            yPos: 540,
                            angles: [0,0,0,0,0,0,0,75,35]                             
                        }
                    },
                   {
                        frame: 1160,
                        properties: {
                            headAngle: 0,
                            xPos: 900,
                            yPos: 540,
                            angles: [0,0,0,0,0,0,0,0,0]                             
                        }
                    },
                   {
                        frame: 1200,
                        properties: {
                            headAngle: 0,
                            xPos: 900,
                            yPos: 540,
                            angles: [0,0,0,0,0,0,0,0,0]                             
                        }
                    },
                   {
                        frame: 1200,
                        properties: {
                            headAngle: 0,
                            xPos: 900,
                            yPos: 540,
                            angles: [0,0,0,0,0,0,0,0,0]                             
                        }
                    },
                   {
                        frame: 1205,
                        properties: {
                            headAngle: 30,
                            xPos: 1100,
                            yPos: 435,
                            angles: [-30,-30,0,0,30,30,30,0,-30]                             
                        }
                    },
                   {
                        frame: 1210,
                        properties: {
                            headAngle: 30,
                            xPos: 1500,
                            yPos: 455,
                            angles: [-30,-30,0,0,30,30,30,0,-30]                             
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
                            angle: 160,
                            numOfTeeth: 10,
                            radius: 30
                        }
                    },
                    {
                        frame: 400,
                        properties: {
                            color: "black",
                            xPos: 72,
                            yPos: 265,
                            angle: 1660,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 405,
                        properties: {
                            color: "black",
                            xPos: 72,
                            yPos: 265,
                            angle: 1645,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 410,
                        properties: {
                            color: "black",
                            xPos: 72,
                            yPos: 265,
                            angle: 1660,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 415,
                        properties: {
                            color: "black",
                            xPos: 72,
                            yPos: 265,
                            angle: 1645,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    }, 
                    {
                        frame: 420,
                        properties: {
                            color: "black",
                            xPos: 72,
                            yPos: 265,
                            angle: 1660,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 425,
                        properties: {
                            color: "black",
                            xPos: 72,
                            yPos: 265,
                            angle: 1645,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 430,
                        properties: {
                            color: "black",
                            xPos: 72,
                            yPos: 265,
                            angle: 1660,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 435,
                        properties: {
                            color: "black",
                            xPos: 72,
                            yPos: 265,
                            angle: 1645,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 440,
                        properties: {
                            color: "black",
                            xPos: 72,
                            yPos: 265,
                            angle: 1660,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 445,
                        properties: {
                            color: "black",
                            xPos: 72,
                            yPos: 265,
                            angle: 1645,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    }, 
                    {
                        frame: 450,
                        properties: {
                            color: "black",
                            xPos: 72,
                            yPos: 265,
                            angle: 1660,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 550,
                        properties: {
                            color: "black",
                            xPos: 72,
                            yPos: 265,
                            angle: 2660,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 600,
                        properties: {
                            color: "black",
                            xPos: -322,
                            yPos: 265,
                            angle: 3160,
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
                            angle: -150,
                            numOfTeeth: 10,
                            radius: 30
                        }
                    },
                    {
                        frame: 400,
                        properties: {
                            xPos: 50,
                            yPos: 200,
                            angle: -1650,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 405,
                        properties: {
                            xPos: 50,
                            yPos: 200,
                            angle: -1635,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 410,
                        properties: {
                            xPos: 50,
                            yPos: 200,
                            angle: -1650,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 415,
                        properties: {
                            xPos: 50,
                            yPos: 200,
                            angle: -1635,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    }, 
                    {
                        frame: 420,
                        properties: {
                            xPos: 50,
                            yPos: 200,
                            angle: -1650,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 425,
                        properties: {
                            xPos: 50,
                            yPos: 200,
                            angle: -1635,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 430,
                        properties: {
                            xPos: 50,
                            yPos: 200,
                            angle: -1650,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 435,
                        properties: {
                            xPos: 50,
                            yPos: 200,
                            angle: -1635,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 440,
                        properties: {
                            xPos: 50,
                            yPos: 200,
                            angle: -1650,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 445,
                        properties: {
                            xPos: 50,
                            yPos: 200,
                            angle: -1635,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 450,
                        properties: {
                            xPos: 50,
                            yPos: 200,
                            angle: -1650,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 550,
                        properties: {
                            xPos: 50,
                            yPos: 200,
                            angle: -2650,
                            numOfTeeth: 10,
                            radius: 30                            
                        }
                    },
                    {
                        frame: 600,
                        properties: {
                            xPos: -350,
                            yPos: 200,
                            angle: 0,
                            numOfTeeth: 10,
                            radius: 30
                        }
                    },                                                                                                                
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
