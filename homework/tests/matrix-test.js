/*
 * Unit tests for our vector object.
 */
$(function () {

    // This suite checks instantiation basics.
    test("Creating a Matrix", function () {
        var identity = new Matrix();

        equal(identity.width, 4, "Correct width for identity matrix.");
        equal(identity.height, 4, "Correct height for identity matrix.");
        deepEqual(identity.elements, [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ], "Correct elements in matrix.");

        
    });

    
    test("Cube Test", function () {});

    test("Sphere Test", function () {});

    test("Children", function () {});

    test("Transforms", function () {});    

    test("Invalid Constructor Arguments", function(){});
});
