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
    var shape = function(shapeOptions) {
        var options = shapeOptions || {};
        this.vertices = options.vertices || [];
        this.color = options.color || {
            r: 1.0,
            g: 1.0,
            b: 0.0
        };
        this.instanceTransform = new Matrix();
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

    shape.prototype.draw = function(gl, modelViewMatrix, vertexColor, vertexPosition) {
        var identityMatrix = new Matrix();

        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, this.instanceTransform.formatForWebGl());

        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(this.mode, 0, this.WebGLvertices.length / 3);

        for (var ind = 0, maxInd = this.children.length; ind < maxInd; ind += 1) {
            this.children[ind].draw(gl, modelViewMatrix, vertexColor, vertexPosition);
        }

    };

    shape.prototype.verticesToWebGl = function(gl, rawMode, mode) {

        // This statement allows children to inherit the 
        // properties of the parent object. 

        this.rawMode = rawMode || this.rawMode;
        this.mode = mode || this.mode;

        this.WebGLvertices = this.toRawFunctions(this.rawMode);
        var vertices = this.WebGLvertices;

        this.buffer = GLSLUtilities.initVertexBuffer(gl,vertices);

        if (!this.colors) {
            // If we have a single color, we expand that into an array
            // of the same color over and over.
            this.colors = [];
            for (var j = 0, maxj = vertices.length / 3;
                    j < maxj; j += 1) {
                this.colors = this.colors.concat(
                    this.color.r,
                    this.color.g,
                    this.color.b
                );
            }
        }
        this.colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                this.colors);

        // Call recursively
        for(var ind = 0, maxInd = this.children.length; ind < maxInd; ind += 1) {
            this.children[ind].verticesToWebGl(gl);
        }        
    }

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
    // JD: 4(a)
    shape.prototype.applyTransform = function(matrix) {
        this.instanceTransform = matrix.mult(this.instanceTransform);
        for (var i = 0, maxi = this.children.length; i < maxi; i += 1) {
            this.children[i].applyTransform(matrix);
        }
    };

    // JD: 5(a)
    shape.prototype.addChild = function(child) {
        this.children.push(child);
        return this;
    };

    shape.prototype.setMode = function(mode) {
        this.mode = mode;
        return this;
    };

    shape.prototype.resetTransform = function(mode) {
        this.instanceTransform = new Matrix ();
        return this;
    };

    shape.prototype.setTransform = function(matrix) {
        this.instanceTransform = matrix;
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
     * Utility function for computing normal vectors based on indexed vertices.
     * The secret: take the cross product of each triangle.  Note that vertex order
     * now matters---the resulting normal faces out from the side of the triangle
     * that "sees" the vertices listed counterclockwise.
     *
     * The vector computations involved here mean that the Vector module must be
     * loaded up for this function to work.
     */
    shape.prototype.toNormalArray =  function () {
        var result = [],
            i,
            j,
            maxi,
            maxj,
            p0,
            p1,
            p2,
            v0,
            v1,
            v2,
            normal;

        // For each face...
        for (i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            // We form vectors from the first and second then second and third vertices.
            p0 = this.vertices[this.indices[i][0]];
            p1 = this.vertices[this.indices[i][1]];
            p2 = this.vertices[this.indices[i][2]];

            // Technically, the first value is not a vector, but v can stand for vertex
            // anyway, so...
            v0 = new Vector(p0[0], p0[1], p0[2]);
            v1 = new Vector(p1[0], p1[1], p1[2]).subtract(v0);
            v2 = new Vector(p2[0], p2[1], p2[2]).subtract(v0);
            normal = v1.cross(v2).unit();

            // We then use this same normal for every vertex in this face.
            for (j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
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