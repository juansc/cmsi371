/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */

var Shape = {
    /*
     * Constructor for arbitrary shape.
     */
    shape: function (options) {
        this.vertices = options.vertices || [];
        this.color = options.color || { r: 1.0, g: 1.0, b: 0.0 };
        this.indices = options.indices || [];
        this.children = options.children || [];
    },

    // Example code from Dondi which needs to be modified.
    draw = function (parentTransform) {
        var t = calculateTransform() * (parentTransform || identity);
        renderVertices();
        children.forEach(function() {
            children.draw(t);
        });
    },

    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.525731112119133606,
            Z = 0.850650808352039932;

        return {
            vertices: [
                [  -X, 0.0,   Z ],
                [   X, 0.0,   Z ],
                [  -X, 0.0,  -Z ],
                [   X, 0.0,  -Z ],
                [ 0.0,   Z,   X ],
                [ 0.0,   Z,  -X ],
                [ 0.0,  -Z,   X ],
                [ 0.0,  -Z,  -X ],
                [   Z,   X, 0.0 ],
                [  -Z,   X, 0.0 ],
                [   Z,  -X, 0.0 ],
                [  -Z,  -X, 0.0 ]
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
        };
    },

    /*
     * Returns a sphere where m is number of longitudinal lines
     * and n is the number of latitudinal lines. 
     */
    sphere: function (m, n) {
        var numLong = m || 10,
            numLat = n || 10,
            DEGREES_TO_RADIANS = Math.PI / 180,
            myVertices = [],
            myIndices = [],
            x, // The coordinate of a point.
            y,
            z,
            v, // The index of the current vertex.
            maxVertex = numLong * numLat + 1; // The index of the last vertex, at the north pole.
            deltaPhi = 180 / (numLat + 1), // deltaPhi is the angle difference between one latitude line to the next.
            deltaTheta = 360 / numLong; // deltaTheta is the angle difference between one longitude line to the next.            

        // We push the point at the south pole
        myVertices.push([0, 0, -1]);

        // Generate all vertices by going through all the
        // latitudinal lines                  
        for (var phi = -90 + deltaPhi; phi < 90; phi += deltaPhi) {
            z = Math.sin(phi * DEGREES_TO_RADIANS);
            for (var theta = 0; theta < 360; theta += deltaTheta) {
                x = Math.cos(theta * DEGREES_TO_RADIANS) * Math.cos(phi * DEGREES_TO_RADIANS);
                y = Math.sin(theta * DEGREES_TO_RADIANS) * Math.cos(phi * DEGREES_TO_RADIANS);
                myVertices.push([x, y, z]);
            }
        }
        // We push the point at the north pole last.
        myVertices.push([0, 0, 1]);

        // We push the triangles at the south pole
        for (var i = 1; i <= numLong; i += 1) {
            myIndices.push([0, i, (i % numLong) + 1]);
        }

        // Generate all triangles going up the sphere
        // from the south pole to the north pole
        for (i = 0; i < numLat - 1; i += 1) {
            for (var j = 0; j < numLong - 1; j += 1) {
                v = i * numLong + 1 + j;
                myIndices.push([v, v + numLong, v + numLong + 1]);
                myIndices.push([v, v + numLong + 1, v + 1]);
            }
            myIndices.push([(i + 1) * numLong, (i + 2) * numLong, (i + 1) * numLong + 1]);
            myIndices.push([(i + 1) * numLong, (i + 1) * numLong + 1, i * numLong + 1]);
        }

        // We push the triangles at the south pole.
        for (i = 0; i < numLong - 1; i += 1) {
            v = numLong * (numLat - 1) + 1 + i;
            myIndices.push([v, v + 1, maxVertex]);
        }
        // We add the very last triangle.
        v = numLong * (numLat - 1) + 1;
        myIndices.push([v + numLong - 1, v, maxVertex]);

        return {
            vertices: myVertices,
            indices: myIndices,
            children: []
        };
    },

    n_cylinder: function (n) {

        var numOfSides = n || 20;
            myVertices = [],
            myIndices = [],
            HEIGHT = 0.25, // 
            SCALE = 0.3,
            x, y, v,
            numOfVertices = 2 * numOfSides,        
            deltaTheta = 2 * Math.PI / numOfSides;


        // Add the vertices and all the side faces
        // of the cylinder.
        for (var i = 0; i < numOfSides; i += 1) {
            v = i * 2;
            x = Math.cos(deltaTheta * i) * SCALE;
            y = Math.sin(deltaTheta * i) * SCALE;

            myVertices.push([x, y, HEIGHT]);
            myVertices.push([x, y, -HEIGHT]);
            myIndices.push([v + 0, v + 1, (v + 3) % numOfVertices]);
            myIndices.push([v + 0, (v + 3) % numOfVertices, (v + 2) % numOfVertices]);
        }
        // Add both bases.
        for (i = 0; i < numOfSides - 2; i += 1) {
            myIndices.push([0, (i + 1) * 2, (i + 2) * 2]);
            myIndices.push([1, (i + 1) * 2 + 1, (i + 2) * 2 + 1]);
        }

        return {
            vertices: myVertices,
            indices: myIndices,
            children: []
        };
    },

    trapezoidalCube: function (baseRatio, angle, dist ){
        var ratio = baseRatio || 1,
            phi = angle || 0,
            radius = dist || 0,
            DEGREES_TO_RADIANS = Math.PI / 180,
            xOffSet = Math.cos(DEGREES_TO_RADIANS * phi) * radius,
            yOffSet = Math.sin(DEGREES_TO_RADIANS * phi) * radius;

        var myVertices = [
            [  0.25, 0.25, -0.25 ],
            [ -0.25, 0.25, -0.25 ],
            [ -0.25, -0.25, -0.25 ],
            [  0.25, -0.25, -0.25 ],
            [  0.25 * ratio + xOffSet, 0.25 * ratio + yOffSet, 0.25 ],
            [ -0.25 * ratio + xOffSet, 0.25 * ratio + yOffSet, 0.25 ],
            [ -0.25 * ratio + xOffSet, -0.25 * ratio + yOffSet, 0.25 ],
            [ 0.25 * ratio + xOffSet, -0.25 * ratio + yOffSet, 0.25 ]
        ];

        var myIndices = [
            [ 0, 1, 5 ],
            [ 0, 5, 4 ],
            [ 1, 2, 6 ],
            [ 1, 6, 5 ],
            [ 2, 3, 7 ],
            [ 2, 7, 6 ],
            [ 3, 0, 4 ],
            [ 3, 4, 7 ],
            [ 4, 5, 6 ],
            [ 4, 6, 7 ],
            [ 0, 1, 2 ],
            [ 0, 2, 3 ]
        ];

        return {
            vertices: myVertices,
            indices: myIndices,
            children: []
        };        
    },
    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                indexedVertices.vertices[
                indexedVertices.indices[i][j]]);
            }
        }

        return result;
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                indexedVertices.vertices[
                indexedVertices.indices[i][j]],

                indexedVertices.vertices[
                indexedVertices.indices[i][(j + 1) % maxj]]);
            }
        }

        return result;
    }

};