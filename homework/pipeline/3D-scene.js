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

    // We set up a sphere which has a cylinder child.
    //var spaceBackground = new Shape(Shape.sphere(20,20));
    //spaceBackground.applyTransform(Matrix.scaleMatrix(5,5,5));
    //spaceBackground.invertFaces();
    //spaceBackground.mode = gl.TRIANGLES;
    //spaceBackground.rawMode = "trianglearray";

    /*var mySphere = new Shape(Shape.sphere(20,20));
    mySphere.applyTransform(Matrix.scaleMatrix(0.5,0.5,0.5));
    mySphere.mode = gl.LINES;
    mySphere.axis = {x: 1, y: 0, z: 1};

    var leftWing = new Shape(Shape.cylinder(20));
    leftWing.applyTransform(Matrix.scaleMatrix(1,1,0.1));
    leftWing.applyTransform(Matrix.translateMatrix(0,0,0.5));
    leftWing.mode = gl.LINES;
    leftWing.rawMode = "linearray";

    var rightWing = new Shape(Shape.cylinder(20));
    rightWing.applyTransform(Matrix.scaleMatrix(1,1,0.1));
    rightWing.applyTransform(Matrix.translateMatrix(0,0,-0.5));    
    rightWing.mode = gl.LINES;
    rightWing.rawMode = "linearray";

    mySphere.addChild(leftWing);
    mySphere.addChild(rightWing);
    mySphere.applyTransform(Matrix.translateMatrix(1,0,0));
    mySphere.setAxis({x: 1, y: 0, z: 1});*/

    var Endurance = new Shape(Shape.endurance());
    console.log("About to call this shit.");
    Endurance.setMode(gl.TRIANGLES);
    console.log("Call this shit.");    
    Endurance.setRawMode("trianglearray");
    Endurance.setAxis({x:0, y:0, z:1});


    // Build the objects to display.
    objectsToDraw = [
            Endurance
    ];

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
    };

    for(i = 0, maxi = objectsToDraw.length; i < maxi; i+= 1){
        currentObject = objectsToDraw[i];
        verticesToWebGl(currentObject);
        for(j = 0, maxj = currentObject.children.length; j < maxj; j += 1){
            verticesToWebGl(currentObject.children[j]);
        }
    }

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

    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            objectsToDraw[i].draw(gl, modelViewMatrix, vertexColor, currentRotation, vertexPosition);
            for(j = 0, maxj = objectsToDraw[i].children.length ; j < maxj; j+= 1) {
                objectsToDraw[i].children[j].draw(gl, modelViewMatrix, vertexColor, currentRotation, vertexPosition);
            }
        }

        // All done.
        gl.flush();
    };

    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(Matrix.orthoProjectMatrix(
        -2 * (canvas.width / canvas.height),
        2 * (canvas.width / canvas.height),
        -2,
        2,
        -10,
        10
    ).elements));    // Draw the initial scene.

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