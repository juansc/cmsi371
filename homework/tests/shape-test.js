/*
 * Unit tests for our vector object.
 */
$(function () {

    // This suite checks instantiation basics.
    test("Icosahedron", function () {
        // Test the icosahedron, just to be sure ;)
        var myShape = new Shape(Shape.icosahedron());
        deepEqual(
                {
                    vertices: myShape.vertices,
                    indices: myShape.indices,
                    children: myShape.children
                },
                {
                    vertices: [
                        [  -0.525731112119133606, 0.0,   0.850650808352039932 ],
                        [   0.525731112119133606, 0.0,   0.850650808352039932 ],
                        [  -0.525731112119133606, 0.0,  -0.850650808352039932 ],
                        [   0.525731112119133606, 0.0,  -0.850650808352039932 ],
                        [ 0.0,   0.850650808352039932,   0.525731112119133606 ],
                        [ 0.0,   0.850650808352039932,  -0.525731112119133606 ],
                        [ 0.0,  -0.850650808352039932,   0.525731112119133606 ],
                        [ 0.0,  -0.850650808352039932,  -0.525731112119133606 ],
                        [   0.850650808352039932,   0.525731112119133606, 0.0 ],
                        [  -0.850650808352039932,   0.525731112119133606, 0.0 ],
                        [   0.850650808352039932,  -0.525731112119133606, 0.0 ],
                        [  -0.850650808352039932,  -0.525731112119133606, 0.0 ]
                    ],
                    indices: [
                        [  1,  4,  0 ],
                        [  4,  9,  0 ],
                        [  4,  5,  9 ],
                        [  8,  5,  4 ],
                        [  1,  8,  4 ],
                        [  1, 10,  8 ],
                        [ 10,  3,  8 ],
                        [  8,  3,  5 ],
                        [  3,  2,  5 ],
                        [  3,  7,  2 ],
                        [  3, 10,  7 ],
                        [ 10,  6,  7 ],
                        [  6, 11,  7 ],
                        [  6,  0, 11 ],
                        [  6,  1,  0 ],
                        [ 10,  1,  6 ],
                        [ 11,  0,  9 ],
                        [  2, 11,  9 ],
                        [  5,  2,  9 ],
                        [ 11,  2,  7 ]
                    ],
                    children: []
                },
                "Icosahedron Check.");
    });

    

    test("Cube Test", function () {
        // Examples
        var cube = new Shape(Shape.cylinder(4));

        var expectedVertices = [
                                [  1,  0,  0.25 ],
                                [  1,  0, -0.25 ],
                                [  0,  1,  0.25 ],
                                [  0,  1, -0.25 ],
                                [ -1,  0,  0.25 ],
                                [ -1,  0, -0.25 ],
                                [  0, -1,  0.25 ],
                                [  0, -1, -0.25 ],
                            ];
        deepEqual(
                {
                    indices: cube.indices,
                    children: cube.children,
                },
                {
                    indices: [
                        [ 0, 1, 3 ],
                        [ 0, 3, 2 ],
                        [ 2, 3, 5 ],
                        [ 2, 5, 4 ],
                        [ 4, 5, 7 ],
                        [ 4, 7, 6 ],
                        [ 6, 7, 1 ],
                        [ 6, 1, 0 ],
                        [ 0, 2, 4 ],
                        [ 1, 3, 5 ],
                        [ 0, 4, 6 ],
                        [ 1, 5, 7 ]
                      ],
                    children: []
                },
                "Cube Check.");

        for(var i = 0; i < cube.vertices.length; i += 1) {
            for(var j = 0; j < 3; j += 1) {
                ok(  Math.abs(cube.vertices[i][j] - expectedVertices[i][j]) < 0.01, 
                    "Generated Vertices are correct.");
            }
        }
    });

    test("Pentagon Cylinder Test", function () {
        // Examples
        var shape = new Shape(Shape.cylinder(5));

        var expectedVertices = [
                                [      1,      0,  0.25 ], 
                                [      1,      0, -0.25 ],
                                [  0.309,  0.951,  0.25 ],
                                [  0.309,  0.951, -0.25 ],
                                [ -0.809,  0.587,  0.25 ],
                                [ -0.809,  0.587, -0.25 ],
                                [ -0.809, -0.587,  0.25 ],
                                [ -0.809, -0.587, -0.25 ],
                                [  0.309, -0.951,  0.25 ],
                                [  0.309, -0.951, -0.25 ],
                            ];
        deepEqual(
                {
                    indices: shape.indices,
                    children: shape.children,
                },
                {
                    indices: [
                        [ 0, 1, 3 ],
                        [ 0, 3, 2 ],
                        [ 2, 3, 5 ],
                        [ 2, 5, 4 ],
                        [ 4, 5, 7 ],
                        [ 4, 7, 6 ],
                        [ 6, 7, 9 ],
                        [ 6, 9, 8 ],
                        [ 8, 9, 1 ],
                        [ 8, 1, 0 ],
                        [ 0, 2, 4 ],
                        [ 1, 3, 5 ],
                        [ 0, 4, 6 ],
                        [ 1, 5, 7 ],
                        [ 0, 6, 8 ],
                        [ 1, 7, 9 ]
                      ],
                    children: []
                },
                "Pentagon Cylinder Check.");

        for(var i = 0; i < shape.vertices.length; i += 1) {
            for(var j = 0; j < 3; j += 1) {
                ok(  Math.abs(shape.vertices[i][j] - expectedVertices[i][j]) < 0.01, 
                    "Generated Vertices are correct.");
            }
        }
    });

    test("Sphere Test", function () {
        // Examples
        var shape = new Shape(Shape.sphere(3,1));

        var expectedVertices = [
                                [      0,      0,    -1 ],
                                [      1,      0,     0 ],
                                [   -0.5,  0.866,     0 ],
                                [   -0.5, -0.866,     0 ],
                                [      0,      0,     1 ],
                            ];
        deepEqual(
                {
                    indices: shape.indices,
                    children: shape.children,
                },
                {
                    indices: [
                        [ 0, 1, 2 ],
                        [ 0, 2, 3 ],
                        [ 0, 3, 1 ],
                        [ 1, 2, 4 ],
                        [ 2, 3, 4 ],
                        [ 3, 1, 4 ]
                    ],
                    children: []
                },
                "Sphere Check.");

        for(var i = 0; i < shape.vertices.length; i += 1) {
            for(var j = 0; j < 3; j += 1) {
                ok(  Math.abs(shape.vertices[i][j] - expectedVertices[i][j]) < 0.01, 
                    "Generated Vertices are correct.");
            }
        }
    });

    test("Children", function () {
        // Examples
        var shape = new Shape(Shape.sphere(3,3)),
            child1 = new Shape(Shape.icosahedron()),
            child2 = new Shape(Shape.cylinder(6)),
            child3 = new Shape(Shape.trapezoidalCube());
            child4 = new Shape(Shape.sphere(50,50));

        shape.addChild(child1);
        shape.addChild(child2);
        shape.addChild(child3);
        child1.addChild(child4);

        equal(shape.children.length, 3, "Correct number of children.");
        deepEqual(shape.children[0], child1, "First child matches.");
        deepEqual(shape.children[1], child2, "Second child matches.");
        deepEqual(shape.children[2], child3, "Third child matches.");
        deepEqual(shape.children[0].children[0], child4, "Original Shape has more than one level of children.");

    });

    test("Transforms", function () {
        // Examples
        var i,j;
        var shape = new Shape(Shape.sphere(3,1));
        shape.applyTransform(Matrix.translateMatrix(1,1,1));

        var expectedVertices = [
                                [      1,      1,     0 ],
                                [      2,      1,     1 ],
                                [    0.5,  1.866,     1 ],
                                [    0.5,  0.134,     1 ],
                                [      1,      1,     2 ],
                            ];

        for(i = 0; i < shape.vertices.length; i += 1) {
            for(j = 0; j < 3; j += 1) {
                ok(  Math.abs(shape.vertices[i][j] - expectedVertices[i][j]) < 0.01, 
                    "Generated Vertices are correct after translation.");
            }
        }

        shape.applyTransform(Matrix.scaleMatrix(2,1,1)); 
        
        expectedVertices =  [
                                [      2,      1,     0 ],
                                [      4,      1,     1 ],
                                [      1,  1.866,     1 ],
                                [      1,  0.134,     1 ],
                                [      2,      1,     2 ],
                            ];

        for(i = 0; i < shape.vertices.length; i += 1) {
            for(j = 0; j < 3; j += 1) {
                ok(  Math.abs(shape.vertices[i][j] - expectedVertices[i][j]) < 0.01, 
                    "Generated Vertices are correct after scaling.");
            }
        }

        shape = new Shape(Shape.cylinder(4));
        shape.applyTransform(Matrix.rotZMatrix(45));

        expectedVertices = [
                                [  0.707,  0.707,  0.25 ],
                                [  0.707,  0.707, -0.25 ],
                                [ -0.707,  0.707,  0.25 ],
                                [ -0.707,  0.707, -0.25 ],
                                [ -0.707, -0.707,  0.25 ],
                                [ -0.707, -0.707, -0.25 ],
                                [  0.707, -0.707,  0.25 ],
                                [  0.707, -0.707, -0.25 ],
                            ];

        for(i = 0; i < shape.vertices.length; i += 1) {
            for(j = 0; j < 3; j += 1) {
                ok(  Math.abs(shape.vertices[i][j] - expectedVertices[i][j]) < 0.01, 
                    "Generated Vertices are correct after rotation.");
            }
        }                            


    });    

    test("Invalid Constructor Arguments", function(){
        throws(function() { 
            new Shape(Shape.sphere(-1,2));
        }, "Invalid Sphere rejected.");

        throws(function() { 
            new Shape(Shape.sphere(1,2));
        }, "Invalid Sphere rejected.");

        throws(function() { 
            new Shape(Shape.sphere(50,0));
        }, "Invalid Sphere rejected.");

        throws(function() { 
            new Shape(Shape.cylinder(0));
        }, "Invalid Cylinder rejected.");

        throws(function() { 
            new Shape(Shape.cylinder(1));
        }, "Invalid Cylinder rejected.");

        throws(function() { 
            new Shape(Shape.cylinder(2));
        }, "Invalid Cylinder rejected.");                

        throws(function() { 
            new Shape(Shape.trapezoidalCube(2,1,-3));
        }, "Invalid Trapezoidal Cube rejected."); 

        throws(function() { 
            new Shape(Shape.trapezoidalCube(-1,1,-4));
        }, "Invalid Trapezoidal Cube rejected."); 

        throws(function() { 
            new Shape(Shape.trapezoidalCube(0,2,1));
        }, "Invalid Trapezoidal Cube rejected.");                 
    });
});
