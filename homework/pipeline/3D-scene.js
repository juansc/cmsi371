/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.

    var gl = GLSLUtilities.getGL(canvas), // The WebGL context.

        // This variable stores 3D model information.
        objectsToDraw,
        currentObject,
        // The shader program to use.
        shaderProgram,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,

        // Important state variables.
        currentRotation = 0.0,
        currentInterval,
        rotationMatrix,
        cameraMatrix,
        vertexPosition,
        vertexColor,

        // An individual "draw object" function.
        drawObject,

        // The big "draw scene" function.
        drawScene,

        // Reusable loop variables.
        i,
        maxi,
        j,
        maxj,
        // Constants for interaction
        A_KEY = 65,
        D_KEY = 68,
        E_KEY = 69,
        Q_KEY = 81,
        S_KEY = 83,
        W_KEY = 87,
        DEGREE_TO_RADIANS = Math.PI / 180,
        cameraRadius = 15,
        spinSpeed = 0.1,
        shipStats = $("#ship-stats");

    if (!gl) {
        alert("No WebGL context found...sorry.");
        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    var scene = new Shape();

    var Endurance = Shape.endurance();
    Endurance.setGLMode(gl.TRIANGLES);
    Endurance.translate(0, 0, 0);
    Endurance.setRawMode("trianglearray");
    Endurance.setColor({r:0.9, g: 0.9, b: 0.9});
    Endurance.transformNormals(true);

    var star = Shape.sphere(20,20);
    star.setGLMode(gl.TRIANGLES).setRawMode("trianglearray");
    star.setColor({r:1, g: 0.8, b: 0.6});
    star.translate(0, 0, -25);
    star.scale(2,2,2);

    var space = Shape.sphere(50, 50);
    space.scale(200,200,200);
    space.setGLMode(gl.TRIANGLES);
    space.setRawMode("trianglearray");
    space.setColor({r:0, g: 0, b: 0});
    space.invertFaces().transformNormals(true);

    scene.addChild(Endurance).addChild(star).addChild(space).verticesToWebGl(gl);   

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    //vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    //gl.enableVertexAttribArray(vertexColor);
    vertexDiffuseColor = gl.getAttribLocation(shaderProgram, "vertexDiffuseColor");
    gl.enableVertexAttribArray(vertexDiffuseColor);
    vertexSpecularColor = gl.getAttribLocation(shaderProgram, "vertexSpecularColor");
    gl.enableVertexAttribArray(vertexSpecularColor);
    normalVector = gl.getAttribLocation(shaderProgram, "normalVector");    
    gl.enableVertexAttribArray(normalVector);

    // How we see the world
    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    cameraMatrix = gl.getUniformLocation(shaderProgram, "cameraMatrix");

    // Things to do with light
    lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
    lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
    shininess = gl.getUniformLocation(shaderProgram, "shininess");
    transformNormals = gl.getUniformLocation(shaderProgram, "transformNormals");

    // Set up our one light source and its colors.
    gl.uniform4fv(lightPosition, [0.0, 0.0, -25, 1.0]);
    gl.uniform3fv(lightDiffuse, [1, 1, 1]);
    gl.uniform3fv(lightSpecular, [0.5, 0.5, 0.5]); 

    /*
     * Displays the scene.
     */

    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var lookAt = Matrix.cameraMatrix(Math.sin(currentRotation * DEGREE_TO_RADIANS) * cameraRadius,
                                            0,
                                            Math.cos(currentRotation * DEGREE_TO_RADIANS) * cameraRadius,

                                            0,
                                            0,
                                            0,

                                            0,
                                            1,
                                            0);
        gl.uniformMatrix4fv(cameraMatrix, gl.FALSE, lookAt.formatForWebGl());

        scene.draw(gl, modelViewMatrix, vertexDiffuseColor, vertexPosition, transformNormals);

        // All done.
        gl.flush();
    };


    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, Matrix.perspectiveProjMatrix(
        -2 * (canvas.width / canvas.height) ,
        2 * (canvas.width / canvas.height) ,
        -2 ,
        2 ,
        5,
        1000
    ).formatForWebGl());    

    // Draw the initial scene.
    drawScene();

    var keyArr = [];
    $(document).keydown(function(e) {
        keyArr[e.keyCode] = true;
    });
    $(document).keyup(function(e) {
        keyArr[e.keyCode] = false;
    });

    var rollAccel,
        yawAccel,
        pitchAccel,
        rollVel = 0;//Math.random() * 6 - 3,
        yawVel = 0;//Math.random() * 6 - 3,
        pitchVel = 0;//Math.random() * 6 - 3;

    var updateShipStats = function () {
        var rollStat = rollVel.toFixed(2);
        var yawStat = yawVel.toFixed(2);
        var pitchStat = pitchVel.toFixed(2);

        var rollStr = "Roll Velocity = " + ((rollVel < 0) ?  "" : " ") + rollStat;
        var yawStr = "Yaw Volocity = " + ((yawVel < 0) ?  "" : " ") + yawStat;
        var pitchStr = "Pitch Velocity = " + ((pitchVel < 0) ?  "" : " ") + pitchStat;

        shipStats.html("<pre>" + rollStr + " " + yawStr + " " + pitchStr + "</pre>");
    };

    var spinScene = function() {
        requestAnimationFrame(spinScene);
        currentRotation += spinSpeed;
        if (currentRotation >= 360) {
            currentRotation = -360;
        }
        rollAccel = yawAccel = pitchAccel = 0;
        if (keyArr[A_KEY]) {
            rollAccel += 0.01;
        }
        if (keyArr[Q_KEY]) {
            rollAccel -= 0.01;
        }
        if (keyArr[S_KEY]) {
            yawAccel += 0.01;
        }
        if (keyArr[W_KEY]) {
            yawAccel -= 0.01;
        }
        if (keyArr[D_KEY]) {
            pitchAccel += 0.01;
        }
        if (keyArr[E_KEY]) {
            pitchAccel -= 0.01;
        }
        rollVel += rollAccel;
        yawVel += yawAccel;
        pitchVel += pitchAccel;

        Endurance.rotateAxisOnX(rollVel);
        Endurance.rotateAxisOnY(yawVel);
        Endurance.rotateAxisOnZ(pitchVel);

        updateShipStats();

        drawScene();        
    };

    spinScene();

}(document.getElementById("hello-webgl")));