/*
 * Unit tests for our vector object.
 */
$(function () {

    // This suite checks instantiation basics.
    test("Creating a Matrix", function () {
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
        deepEqual(testMatrix.getElements(), [1, 2, 3, 4, 5, 6] , "Correct elements");
        
    });

    
    test("Rows and Columns", function () {
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
    	deepEqual(testMatrix.getRow(0), [1,3,5], "Correct first row.");
    	deepEqual(testMatrix.getRow(1), [2,4,6], "Correct first row.");
    	deepEqual(testMatrix.getColumn(0), [1,2], "Correct 1st column.");
    	deepEqual(testMatrix.getColumn(1), [3,4], "Correct 2nd column.");
    	deepEqual(testMatrix.getColumn(2), [5,6], "Correct 3rd column.");
    });

});
