/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl, // The WebGL context.

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

        // Grab the WebGL rendering context.
        
    gl = GLSLUtilities.getGL(canvas);

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


    var Endurance = new Shape(Shape.endurance());
    Endurance.setGLMode(gl.TRIANGLES);
    Endurance.translate(0, 0, 0);
    Endurance.setRawMode("trianglearray");
    Endurance.setAxis("x", [0, 1, 1]);
    Endurance.setColor({r:1, g: 1, b: 1});

    var star = new Shape(Shape.sphere(30,30));
    star.setGLMode(gl.TRIANGLES).setRawMode("trianglearray");
    star.setColor({r:1, g: 0.6, b: 0.2});
    star.translate(0, 0, -10);

    scene.addChild(Endurance).addChild(star);

    // Prepare the vertices to pass to WebGL.
    verticesToWebGl = function (object, rawMode, mode) {

        // This statement allows children to inherit the 
        // properties of the parent object. 

        object.rawMode = rawMode || object.rawMode;
        object.mode = mode || object.mode;

        object.WebGLvertices = object.toRawFunctions(object.rawMode);
        var vertices = object.WebGLvertices;

        object.buffer = GLSLUtilities.initVertexBuffer(gl,vertices);

        if (!object.colors) {
            // If we have a single color, we expand that into an array
            // of the same color over and over.
            object.colors = [];
            for (var j = 0, maxj = vertices.length / 3;
                    j < maxj; j += 1) {
                object.colors = object.colors.concat(
                    object.color.r,
                    object.color.g,
                    object.color.b
                );
            }
        }
        object.colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                object.colors);

        // Call recursively
        for(var ind = 0, maxInd = object.children.length; ind < maxInd; ind += 1) {
            verticesToWebGl(object.children[ind]);
        }
    };

    verticesToWebGl(scene);

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
    vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);


    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    cameraMatrix = gl.getUniformLocation(shaderProgram, "cameraMatrix");

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

        var lookAt = Matrix.cameraMatrix(Math.sin(currentRotation * DEGREE_TO_RADIANS) * 10,
                                            0,
                                            Math.cos(currentRotation * DEGREE_TO_RADIANS) * 10,

                                            0,
                                            0,
                                            0,

                                            0,
                                            1,
                                            0);
        gl.uniformMatrix4fv(cameraMatrix, gl.FALSE, lookAt.formatForWebGl());

        scene.draw(gl, modelViewMatrix, vertexColor, vertexPosition);

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
    ).formatForWebGl());    // Draw the initial scene.


    drawScene();


    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        } else {
            currentInterval = setInterval(function () {
                currentRotation += 1.0;
                drawScene();
                if (currentRotation >= 360.0) {
                    currentRotation -= 360.0;
                }
            }, 30);
        }
    });

}(document.getElementById("hello-webgl")));