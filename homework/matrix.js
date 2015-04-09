/*
 * This is a library that generates matrices. This library can generate
 * arbitrary matrices, but many of the ones that will be created will be
 * 4 x 4 matrices used for transformations needed for a 3-D graphics library.
 *
 * These matrices will be stored as 1 dimensional arrays, but we will use the
 * width and the length of the matrix to identify the shape of the matrix.
 *
 * The matrix will be  coumn oriented, that is, if we have the matrix
 * with the elements [1,2,3,4,5,6,7,8,9,10,11,12] with a height of 3 and a
 * witdh of four, our matrix will look like this.
 *
 *   |  1   4   7  10 |
 *   |  2   5   8  11 |
 *   |  3   6   9  12 |
 *
 * We can also index the element in a matrix using a single number. We just 
 * iterate through the matrix column wise.
 *
 * Of course, the indexes begin at zero. The top, left-most element is 0,0.
 *
 */

var Matrix = (function() {
    // Define the constructor.
    var matrix = function(elements, height, width) {
        this.elements = elements || [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        this.height = height || 4;
        this.width = width || 4;
        this.numOfElements = this.height * this.width;
    };

    var checkIfEqualSize = function(m1, m2) {
        if (m1.height() !== m2.height() || m1.width() !== m2.width()) {
            throw "Matrices have different dimensions";
        }
    };

    var dotProduct = function(v1, v2) {
        if (v1.length !== v2.length) {
            throw "Dimension mismatch for dot products";
        }
        var result = 0,
            ind;

        for (ind = 0, maxInd = v1.length; ind < maxInd; ind += 1) {
            result += v1[ind] * v2[ind];
        }

        return result;
    };

    matrix.prototype.getWidth = function() {
        return this.width;
    };

    matrix.prototype.getHeight = function() {
        return this.height;
    };

    // If this method gets one parameter, it looks for the
    // row wise i-th element. If it is given two parameters
    // it'll treat the first as the row and the second as the 
    // column.
    matrix.prototype.getElement = function(row, column) {
        if (!column) {
            var index = row;
            if (row >= this.width * this.height) {
                throw "Index out of bounds error.";
            }
            return this.elements[index];
        }
        return this.elements[column * this.height + row];
    };

    matrix.prototype.getRow = function(row) {
        if(row >= this.height) {
            throw "Row out of bounds error.";
        }
        var result = [];
        for (var column = 0, maxColumn = this.width; column < maxColumn; column += 1) {
            result.push(this.getElement(row, column));
        }
        return result;
    };

    matrix.prototype.getColumn = function(column) {
        if(column >= this.width) {
            throw "Column out of bounds error.";
        }
        var result = [];
        for (var row = 0, maxRow = this.height; row < maxRow; row += 1) {
            result.push(this.getElement(row, column));
        }
        return result;
    };

    matrix.prototype.add = function(m) {
        checkIfEqualSize(this, m);
        var result = [];
        for (var ind = 0, maxInd = this.numOfElements; ind < maxInd; ind += 1) {
            result[ind] = this.getElement[ind] + m.getElement[ind];
        }
        return new Matrix(result, this.height, this.width);
    };

    matrix.prototype.subtract = function(m) {
        checkIfEqualSize(this, m);
        var result = [];
        for (var ind = 0, maxInd = this.numOfElements; ind < maxInd; ind += 1) {
            result[ind] = this.getElement[ind] - m.getElement[ind];
        }
        return new Matrix(result, this.height, this.width);
    };

    matrix.prototype.scalarAdd = function(scalar) {
        for (var ind = 0, maxInd = this.numOfElements; ind < maxInd; ind += 1) {
            this.elements[ind] += scalar;
        }
    };

    matrix.prototype.scalarMultiply = function(scalar) {
        for (var ind = 0, maxInd = this.numOfElements; ind < maxInd; ind += 1) {
            this.elements[ind] *= scalar;
        }
    };

    matrix.prototype.mult = function(m) {
        if (this.width !== m.height) {
            throw "Invalid dimensions for matrix multiplication.";
        }
        var col,
            row,
            result = [];
        for (row = 0, maxRow = this.height; row < maxRow; row += 1) {
            for (col = 0, maxCol = m.width; col < maxCol; col += 1) {
                result.push(dotProduct(this.getRow(row), m.getColumn(col)));
            }
        }
        return new Matrix(result, this.height, m.width);
    };

    // Returns a matrix in column major form so that it can
    // be used by WebGL
    matrix.prototype.getElements = function(){
        return this.elements;
    };

    matrix.prototype.numOfElements = function(){
        return this.numOfElements;
    };    

    return matrix;
})();


Matrix.scaleMatrix = function(sx, sy, sz) {
    var sX = sx || 1,
        sY = sy || 1,
        sZ = sz || 1;

    return new Matrix(
        [
            sX,
            0.0,
            0.0,
            0.0,

            0.0,
            sY,
            0.0,
            0.0,

            0.0,
            0.0,
            sZ,
            0.0,

            0.0,
            0.0,
            0.0,
            1.0
        ], 4, 4);
};

Matrix.translateMatrix = function(dx, dy, dz) {
    var dX = dx || 0,
        dY = dy || 0,
        dZ = dz || 0;

    return new Matrix(
        [
            1.0,
            0.0,
            0.0,
            0.0,

            0.0,
            1.0,
            0.0,
            0.0,

            0.0,
            0.0,
            1.0,
            0.0,

            dX,
            dY,
            dZ,
            1.0
        ], 4, 4);
};

Matrix.rotXMatrix = function(theta) {
    var angle = theta ? (theta * Math.PI / 180) : 0;
    return new Matrix(
        [
            1.0,
            0.0,
            0.0,
            0.0,

            0.0,
            Math.cos(angle),
            Math.sin(angle),
            0.0,

            0.0,
            -Math.sin(angle),
            Math.cos(angle),
            0.0,

            0.0,
            0.0,
            0.0,
            1.0
        ], 4, 4);
};

Matrix.rotYMatrix = function(theta) {
    var angle = theta ? (theta * Math.PI / 180) : 0;
    return new Matrix(
        [
            Math.cos(angle),
            0.0,
            -Math.sin(angle),
            0.0,

            0.0,
            1.0,
            0.0,
            0.0,

            Math.sin(angle),
            0.0,
            Math.cos(angle),
            0.0,

            0.0,
            0.0,
            0.0,
            1.0
        ], 4, 4);
};

Matrix.rotZMatrix = function(theta) {
    var angle = theta ? (theta * Math.PI / 180) : 0;
    return new Matrix(
        [
            Math.cos(angle),
            Math.sin(angle),
            0.0,
            0.0,

            -Math.sin(angle),
            Math.cos(angle),
            0.0,
            0.0,

            0.0,
            0.0,
            1.0,
            0.0,

            0.0,
            0.0,
            0.0,
            1.0
        ], 4, 4);
};

Matrix.rotateAxis = function(angle, Vx, Vy, Vz) {
    // Adapted from code by Dr. Dionisio.


    var theta = angle ? (angle * Math.PI / 180.0) : 0,
        x = Vx || 0,
        y = Vy || 0,
        z = Vz || 1;

    var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
        s = Math.sin(theta),
        c = Math.cos(theta),
        oneMinusC = 1.0 - c,

        // We can't calculate this until we have normalized
        // the axis vector of rotation.

        x2, // "2" for "squared."
        y2,
        z2,
        xy,
        yz,
        xz,
        xs,
        ys,
        zs;
    // Normalize the axis vector of rotation.
    x /= axisLength;
    y /= axisLength;
    z /= axisLength;

    // *Now* we can calculate the other terms.
    x2 = x * x;
    y2 = y * y;
    z2 = z * z;
    xy = x * y;
    yz = y * z;
    xz = x * z;
    xs = x * s;
    ys = y * s;
    zs = z * s;

    return new Matrix(
        [
            (x2 * oneMinusC) + c,
            (xy * oneMinusC) + zs,
            (xz * oneMinusC) - ys,
            0.0,

            (xy * oneMinusC) - zs,
            (y2 * oneMinusC) + c,
            (yz * oneMinusC) + xs,
            0.0,

            (xz * oneMinusC) + ys,
            (yz * oneMinusC) - xs,
            (z2 * oneMinusC) + c,
            0.0,

            0.0,
            0.0,
            0.0,
            1.0
        ], 4, 4);
};

Matrix.orthoProjectMatrix = function(r, l, t, b, n, f) {
    var left   = l || -1,
        right  = r || 1,
        top    = t || 1,
        bottom = b || -1,
        near   = n || -1,
        far    = f || 1; 

    var width = right - left,
        height = top - bottom,
        depth = far - near;

    return new Matrix([
        2.0 / width,
        0.0,
        0.0,
        0.0,

        0.0,
        2.0 / height,
        0.0,
        0.0,

        0.0,
        0.0,
        -2.0 / depth,
        0.0,

        -(right + left) / width,
        -(top + bottom) / height,
        -(far + near) / depth,
        1.0
    ], 4, 4);
};

Matrix.perspectiveProjMatrix = function(r, l, t, b, n, f) {
    var left   = l || -1,
        right  = r || 1,
        top    = t || 1,
        bottom = b || -1,
        near   = n || -1,
        far    = f || 1; 

    var width = right - left,
        height = top - bottom,
        depth = far - near;

    return new Matrix([
        2.0 * near / width,
        0.0,
        0.0,
        0.0,

        0.0,
        2.0 * near / height,
        0.0,
        0.0,

        (right + left) / width,
        (top + bottom) / height,
        -(far + near) / depth,
        -1.0,

        0.0,
        0.0,
        -2.0 * near * far / depth,
        0.0
    ], 4, 4);
};