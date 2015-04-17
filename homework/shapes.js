/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */

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
        this.mode = options.mode || WebGLRenderingContext.LINES;
        this.axis = options.axis || {
            x: 0,
            y: 0,
            z: 1
        };
        this.axis = options.axis || {x: 0, y: 1, z: 0};
        this.xAxis = options.xAxis || [1, 0, 0];
        this.yAxis = options.yAxis || [0, 1, 0];
        this.zAxis = options.zAxis || [0, 0, 1];
    };

    shape.prototype.draw = function(gl, modelViewMatrix, vertexColor, currentRotation, vertexPosition) {
        var identityMatrix = new Matrix();

        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(this.axis ?
            Matrix.rotateAxis(currentRotation, this.axis.x, this.axis.y, this.axis.z).elements :
            identityMatrix.elements
        ));
        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(this.mode, 0, this.WebGLvertices.length / 3);
    };

    shape.prototype.scale = function(sx, sy, sz) {
        this.applyTransform(Matrix.scaleMatrix(sx, sy, sz));
        return this;
    };

    shape.prototype.translate = function(dx, dy, dz) {
        this.applyTransform(Matrix.translateMatrix(dx, dy, dz));
        return this;
    };

    shape.prototype.rotate = function(angle, Vx, Vy, Vz) {
        this.applyTransform(Matrix.rotateAxis(angle, Vx, Vy, Vz));
        return this;
    };

    shape.prototype.setAxis = function(coordinate, vector) {
        var currentShape = this;
        var axisFunctions = {
            "x": function (axis) {
                currentShape.xAxis = axis;
                return currentShape;
            },
            "y": function (axis) {
                currentShape.yAxis = axis;
                return currentShape;
            },
            "z": function (axis) {
                currentShape.zAxis = axis;
                return currentShape;
            },
        };
        axisFunctions[coordinate](vector);
        for (var ind = 0, maxInd = this.children.length; ind < maxInd; ind += 1) {
            this.children[ind].setAxis(coordinate, vector);
        }
        return this;        
    };

    shape.prototype.setRawMode = function(mode) {
        this.rawMode = mode;
        for (var ind = 0, maxInd = this.children.length; ind < maxInd; ind += 1) {
            this.children[ind].setRawMode(mode);
        }
        return this;
    };

    shape.prototype.setColor = function(color) {
        this.color = color;
        for (var ind = 0, maxInd = this.children.length; ind < maxInd; ind += 1) {
            this.children[ind].setColor(color);
        }
        return this;
    };

    shape.prototype.setGLMode = function(mode) {
        this.mode = mode;
        for (var ind = 0, maxInd = this.children.length; ind < maxInd; ind += 1) {
            this.children[ind].setGLMode(mode);
        }
        return this;
    };

    shape.prototype.invertFaces = function() {
        var temp,
            currentArr,
            ind,
            maxInd;
        for (ind = 0, maxInd = this.indices.length; ind < maxInd; ind += 1) {
            currentArr = this.indices[ind];
            temp = currentArr[1];
            currentArr[1] = currentArr[2];
            currentArr[2] = temp;
        }
        for (ind = 0, maxInd = this.children.length; ind < maxInd; ind += 1) {
            this.children[ind].invertFaces();
        }
        return this;
    };

    // Here we make a copy of the vertices, extend them to 4 dimensions,
    // work on them, and return the value.
    shape.prototype.applyTransform = function(matrix) {
        var vertex;
        for (var ind = 0, maxInd = this.vertices.length; ind < maxInd; ind += 1) {
            vertex = new Matrix(this.vertices[ind].concat([1]), 4, 1);
            this.vertices[ind] = matrix.mult(vertex).elements.slice(0, 3);
        }
        for (var i = 0, maxi = this.children.length; i < maxi; i += 1) {
            this.children[i].applyTransform(matrix);
        }
    };

    shape.prototype.addChild = function(child) {
        this.children.push(child);
        return this;
    };

    shape.prototype.setMode = function(mode) {
        this.mode = mode;
        return this;
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
                result = result.concat(this.vertices[this.indices[i][j]]);
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
                    this.vertices[this.indices[i][j]],

                    this.vertices[this.indices[i][(j + 1) % maxj]]);
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