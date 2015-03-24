/*
 * Unit tests for our vector object.
 */
$(function () {

    // This suite checks instantiation basics.
    test("Creation and Data Access", function () {});

    test("Addition and Subtraction", function () {
        // Examples
        equal(vresult.dimensions(), 2, "Vector sum size check");
        equal(vresult.x(), -6, "Vector sum first element");
        equal(vresult.y(), 9, "Vector sum second element");

        v1 = new Vector(0, -2, 3, 5);
        v2 = new Vector(-2, 1, 0, 7);
        vresult = v1.subtract(v2);
        // Check for equality
        equal(vresult.dimensions(), 4, "Vector difference size check");
        equal(vresult.x(), 2, "Vector difference first element");
        equal(vresult.y(), -3, "Vector difference second element");
        equal(vresult.z(), 3, "Vector difference third element");
        equal(vresult.w(), -2, "Vector difference fourth element");

        // Check for errors.
        v1 = new Vector(5, 8, 10, 2);
        v2 = new Vector(1, 2, 2);

        // We can actually check for a *specific* exception, but
        // we won't go that far for now.
        throws(
            function () {
                return v1.add(v2);
            },
            "Check for vectors of different sizes"
        );
    });

});
