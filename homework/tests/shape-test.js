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

        var cubeLowerBounds = [
                                [  0.99, -0.01,  0.249 ],        
                                [  0.99, -0.01, -0.251 ],
                                [ -0.01,  0.99,  0.249 ],
                                [ -0.01,  0.99, -0.251 ],
                                [ -1.01, -0.01,  0.249 ],
                                [ -1.01, -0.01, -0.251 ],
                                [ -0.01, -1.01,  0.249 ],                                                                
                                [ -0.01, -1.01, -0.251 ],
                            ];
        var cubeUpperBounds = [
                                [  1.01,  0.01,  0.251 ],                                        
                                [  1.01,  0.01, -0.249 ],
                                [  0.01,  1.01,  0.251 ],
                                [  0.01,  1.01, -0.249 ],
                                [ -0.99,  0.01,  0.251 ],
                                [ -0.99,  0.01, -0.249 ],
                                [  0.01, -0.99,  0.251 ],
                                [  0.01, -0.99, -0.249 ],
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

        var lowerBound,
            upperBound;

        for(var i = 0; i < cube.vertices.length; i += 1) {
            for(var j = 0; j < 3; j += 1) {
                lowerBound = cubeLowerBounds[i][j];
                upperBound = cubeUpperBounds[i][j];
                ok(  lowerBound < cube.vertices[i][j] && cube.vertices[i][j] < upperBound, 
                    "Generated Vertices are correct.");
            }
        }
    });

});
