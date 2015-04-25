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
        W_KEY = 87;


    

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

    var star = Shape.sphere(10,10);
    star.setGLMode(gl.TRIANGLES).setRawMode("trianglearray");
    star.setColor({r:1, g: 0.6, b: 0.2});
    star.translate(0, 0, -10);

    scene.addChild(Endurance).addChild(star).verticesToWebGl(gl);

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

    /*
     * Displays the scene.
     */
    var DEGREE_TO_RADIANS = Math.PI / 180;

    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var rotation = Matrix.rotateAxis(currentRotation, 0, 1, 0);
        var translation = Matrix.translateMatrix(0, 0, -15);
        var finalTransform = translation.mult(rotation);

        var lookAt = Matrix.cameraMatrix(Math.sin(0 * DEGREE_TO_RADIANS) * 7,
                                            0,
                                            Math.cos(0 * DEGREE_TO_RADIANS) * 7,

                                            0,
                                            0,
                                            0,

                                            0,
                                            1,
                                            0);
        gl.uniformMatrix4fv(cameraMatrix, gl.FALSE, lookAt.formatForWebGl());

        scene.draw(gl, modelViewMatrix, vertexDiffuseColor, vertexPosition);

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

    // Set up our one light source and its colors.
    gl.uniform4fv(lightPosition, [0.0, -2.0, -5.0, 1.0]);
    gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);
    gl.uniform3fv(lightSpecular, [1.0, 1.0, 1.0]);

    // Draw the initial scene.
    drawScene();

    var keyArr = [];
    $(document).keydown(function(e) {
        keyArr[e.keyCode] = true;
    });
    $(document).keyup(function(e) {
        keyArr[e.keyCode] = false;
    });

    var deltaXDeg = 0,
        deltaYDeg = 0,
        deltaZDeg = 0;

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        } else {
            currentInterval = setInterval(function () {
                deltaXDeg = deltaYDeg = deltaZDeg = 0;
                if(keyArr[A_KEY]){deltaXDeg += 1;}
                if(keyArr[Q_KEY]){deltaXDeg -= 1;}
                if(keyArr[S_KEY]){deltaYDeg += 1;}
                if(keyArr[W_KEY]){deltaYDeg -= 1;}
                if(keyArr[D_KEY]){deltaZDeg += 1;}
                if(keyArr[E_KEY]){deltaZDeg -= 1;}
                Endurance.rotateAxisOnX(deltaXDeg);
                Endurance.rotateAxisOnY(deltaYDeg);
                Endurance.rotateAxisOnZ(deltaZDeg);
                drawScene();
            }, 30);
        }
    });

}(document.getElementById("hello-webgl")));