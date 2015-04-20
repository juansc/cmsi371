/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
// JD: 1(a)
var Shape = (function() {
    /*
     * Constructor for arbitrary shape.
     */
    var shape = function(options) {
        this.vertices = options.vertices || [];
        this.color = options.color || {
            r: 1.0,
            g: 1.0,
            b: 0.0
        };
        this.indices = options.indices || [];
        this.children = options.children || [];
        this.rawMode = options.drawingMode || "linearray";
        this.mode = options.mode;
        this.axis = options.axis || {x: 0, y: 0, z: 1};
    };

    // Here we make a copy of the vertices, extend them to 4 dimensions,
    // work on them, and return the value.
    // JD: 4(a)
    shape.prototype.applyTransform = function(matrix) {
        var vertex;
        for (var ind = 0, maxInd = this.vertices.length; ind < maxInd; ind += 1) {
            vertex = new Matrix(this.vertices[ind].concat([1]), 4, 1);
            this.vertices[ind] = matrix.mult(vertex).elements.slice(0, 3);
        }
        for (var i = 0, maxi = this.children.length; i < maxi; i+= 1) {
            this.children[i].applyTransform(matrix);
        }
    };

    // JD: 5(a)
    shape.prototype.addChild = function(child) {
        this.children.push(child);
    };

    shape.prototype.setMode = function(mode) {
        this.mode = mode;
    };

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */

    shape.prototype.toRawTriangleArray = function() {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    this.vertices[
                        this.indices[i][j]]);
            }
        }

        return result;
    };

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    shape.prototype.toRawLineArray = function() {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    this.vertices[
                        this.indices[i][j]],

                    this.vertices[
                        this.indices[i][(j + 1) % maxj]]);
            }
        }

        return result;
    };

    shape.prototype.toRawFunctions = function(str) {
        var funcStr = str.toLowerCase();
        if (funcStr === "linearray") {
            return this.toRawLineArray();
        } else if (funcStr === "trianglearray") {
            return this.toRawTriangleArray();
        } else {
            throw new Error("Not a valid function.");
        }
    };

    return shape;

})();