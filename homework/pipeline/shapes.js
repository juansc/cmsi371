/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */

var Shapes = {
    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.525731112119133606,
            Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    },

    n_cylinder: function(n) {
        // These give the location of all the
        // vertices.
        var myvertices = [];
        // These define triangles based off of
        // counterclockwise rule.
        var myindices = [];
        var x, y, v;
        var numOfVertices = 2 * n;

        // Add the vertices and all the side faces
        // of the cylinder.
        for(var i = 0; i < n; i += 1) {
            v = i * 2; 
            x = Math.cos(2*Math.PI*i/n)*0.3;
            y = Math.sin(2*Math.PI*i/n)*0.3;
            console.log(x);
            console.log(y);
            myvertices.push([ x, y , 0.25]);
            myvertices.push([ x, y , -0.25]);
            myindices.push([v + 0, v + 1, (v + 3) % numOfVertices]);
            myindices.push([v + 0, (v + 3) % numOfVertices, (v + 2) % numOfVertices]);
        }
        // Add the both bases.
        for(var i = 0; i < n - 2; i += 1){
            myindices.push([ 0, (i + 1) * 2, (i + 2) * 2]);
            myindices.push([ 1, (i + 1) * 2 + 1, (i + 2) * 2 + 1])
        }
        console.log("Vertices are ");
        console.log(myvertices);
        console.log("Indices are ");        
        console.log(myindices);

        return {
            vertices: myvertices,
            indices: myindices
        }
    },    

    cube: function (){
        return {
            indices: [
                [ 0, 0, 0 ],
                [ 0.5, 0, 0 ],
                [ 0.5, 0.5, 0 ],
                [ 0, 0.5, 0 ],
                [ 0, 0, 0.5 ],
                [ 0.5, 0, 0.5 ],
                [ 0.5, 0.5, 0.5 ],
                [ 0, 0.5, 0.5 ],
                [ 0.25, 0.25, 0.5 ],
                [ 0.25, 0.25, 0 ]

            ],
            vertices: [
                [ 1, 6, 5 ],
                [ 1, 2, 6 ],
                [ 0, 4, 3 ],
                [ 7, 3, 4 ],
                [ 4, 8, 7 ],
                [ 8, 5, 6 ]
            ]
        }
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
                        indexedVertices.indices[i][j]
                    ]
                );
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
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    }

};
