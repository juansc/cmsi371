(function() {
    window.Shape = window.Shape || {};
    /*
     * Returns a sphere where m is number of longitudinal lines
     * and n is the number of latitudinal lines.
     */
    window.Shape.endurance = function() {

        var RADIANS_TO_DEGREES = 180 / Math.PI;

        // All the parts of the Endurance are children
        // of a shape object with no vertices of its own
        var myChildren = [];

        // Create body of ship
        var leftEar = new Shape(Shape.cylinder(6));
        leftEar.scale(0.6, 0.3, 0.01).translate(-0.2, 0, -0.2);

        var rightEar = new Shape(Shape.cylinder(6));
        rightEar.scale(0.6, 0.3, 0.01).translate(-0.2, 0, 0.2);

        var tube1 = new Shape(Shape.cylinder(20));
        tube1.scale(0.05, 0.05, 0.5).rotate(90, 1, 0, 0);

        var tube2 = new Shape(Shape.cylinder(20));
        tube2.scale(0.05, 0.05, 0.9).translate(0, 0, 0.3);

        myChildren.push(leftEar, rightEar, tube1, tube2);

        // Create modules
        var currentModule,
            angle,
            deltaTheta = Math.PI * 2 / 12;

        for (var i = 0; i < 12; i += 1) {
            angle = i * deltaTheta;
            currentModule = new Shape(Shape.cylinder(4));
            currentModule.translate(0, 0, 0);
            currentModule.rotate(45, 0, 0, 1).scale(0.2, 0.4, 0.2);
            currentModule.rotate(angle * RADIANS_TO_DEGREES, 1, 0, 0);
            currentModule.translate(0, Math.cos(angle) * 1.1, Math.sin(angle) * 1.1);
            myChildren.push(currentModule);
        }

        var offset = Math.PI * 2 / 24;
        // Create cylinders connecting modules
        for (var i = 0; i < 12; i += 1) {
            angle = i * deltaTheta + offset;
            currentModule = new Shape(Shape.cylinder(20));
            currentModule.translate(0, 0, 0).scale(0.1, 0.1, 0.3);
            currentModule.rotate(angle * RADIANS_TO_DEGREES, 1, 0, 0);
            currentModule.translate(0, Math.cos(angle) * 1.1, Math.sin(angle) * 1.1);
            myChildren.push(currentModule);
        }

        return {
            children: myChildren
        };
    };
}());