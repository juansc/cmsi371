/*
 * Unit tests for our vector object.
 */
$(function() {

    // This suite checks instantiation basics.
    test("Creating a Matrix", function() {
        var identity = new Matrix();

        equal(identity.getWidth(), 4, "Correct width for identity matrix.");
        equal(identity.getHeight(), 4, "Correct height for identity matrix.");
        deepEqual(identity.getElements(), [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ], "Correct elements in matrix.");

        var testMatrix = new Matrix([1, 2, 3, 4, 5, 6], 2, 3);

        equal(testMatrix.getWidth(), 3, "Correct width for created matrix.");
        equal(testMatrix.getHeight(), 2, "Correct height for created matrix.");
        deepEqual(testMatrix.getElements(), [1, 2, 3, 4, 5, 6], "Correct elements");

    });


    test("Rows and Columns", function() {
        var identity = new Matrix();

        deepEqual(identity.getRow(0), [1, 0, 0, 0], "Correct 1st row.");
        deepEqual(identity.getRow(1), [0, 1, 0, 0], "Correct 2nd row.");
        deepEqual(identity.getRow(2), [0, 0, 1, 0], "Correct 3rd row.");
        deepEqual(identity.getRow(3), [0, 0, 0, 1], "Correct 4th row.");

        deepEqual(identity.getColumn(0), [1, 0, 0, 0], "Correct 1st column.");
        deepEqual(identity.getColumn(1), [0, 1, 0, 0], "Correct 2nd column.");
        deepEqual(identity.getColumn(2), [0, 0, 1, 0], "Correct 3rd column.");
        deepEqual(identity.getColumn(3), [0, 0, 0, 1], "Correct 4th column.");

        var testMatrix = new Matrix([1, 2, 3, 4, 5, 6], 2, 3);
        deepEqual(testMatrix.getRow(0), [1, 3, 5], "Correct first row.");
        deepEqual(testMatrix.getRow(1), [2, 4, 6], "Correct first row.");
        deepEqual(testMatrix.getColumn(0), [1, 2], "Correct 1st column.");
        deepEqual(testMatrix.getColumn(1), [3, 4], "Correct 2nd column.");
        deepEqual(testMatrix.getColumn(2), [5, 6], "Correct 3rd column.");
    });

    test("Matrix Arithmetic", function() {
        var identity = new Matrix();
        var identity2 = new Matrix();

        var sumMatrix = identity.add(identity2);

        deepEqual(sumMatrix.getRow(0), [2, 0, 0, 0], "Correct 1st row.");
        deepEqual(sumMatrix.getRow(1), [0, 2, 0, 0], "Correct 2nd row.");
        deepEqual(sumMatrix.getRow(2), [0, 0, 2, 0], "Correct 3rd row.");
        deepEqual(sumMatrix.getRow(3), [0, 0, 0, 2], "Correct 4th row.");

        var scaledMatrix = identity.scalarMultiply(2);
        deepEqual(scaledMatrix, sumMatrix, "Multiplication test passed.");

        var zeroMatrix = scaledMatrix.subtract(sumMatrix);
        deepEqual(zeroMatrix.getElements(), [
        		0, 0, 0, 0,
        		0, 0, 0, 0,
        		0, 0, 0, 0,
        		0, 0, 0, 0
      	], "Subtraction test passed.");

        var matrix1 = new Matrix([1, 2, 3, 4, 5, 6], 2, 3);
        var matrix2 = new Matrix([-1, -2, -3, -4, -5, -6], 2, 3);

        deepEqual(matrix1.add(matrix2).getElements(), [
               0, 0, 0,
               0, 0, 0
        	], "Subtraction test passes.");

      	var smallMatrix = new Matrix([1, 0, 0, 1], 2, 2);
      	var matrix3 = new Matrix([3, 1, 4, 5], 2, 2);

      	deepEqual(matrix3, smallMatrix.mult(matrix3), "Matrix multiplication passed.");

      	var matrix4 = new Matrix([2, 1, 7, 9], 2, 2);
      	var prodMatrix = matrix3.mult(matrix4);

        deepEqual(prodMatrix.getRow(0), [10, 57], "Correct 1st row.");
        deepEqual(prodMatrix.getRow(1), [7, 52], "Correct 2nd row.");
    });

});