(function(){
    window.Shape = window.Shape || { };
    /*
     * Returns a sphere where m is number of longitudinal lines
     * and n is the number of latitudinal lines. 
     */
    window.Shape.trapezoidalCube = function (baseRatio, angle, dist ) {
        if(dist < 0 || baseRatio <= 0 ) {
            throw "Invalid input.";
        }
        var ratio = baseRatio || 1,
            phi = angle || 0,
            radius = dist || 0,
            DEGREES_TO_RADIANS = Math.PI / 180,
            xOffSet = Math.cos(DEGREES_TO_RADIANS * phi) * radius,
            yOffSet = Math.sin(DEGREES_TO_RADIANS * phi) * radius;

        var myVertices = [
            [  0.25, 0.25, -0.25 ],
            [ -0.25, 0.25, -0.25 ],
            [ -0.25, -0.25, -0.25 ],
            [  0.25, -0.25, -0.25 ],
            [  0.25 * ratio + xOffSet, 0.25 * ratio + yOffSet, 0.25 ],
            [ -0.25 * ratio + xOffSet, 0.25 * ratio + yOffSet, 0.25 ],
            [ -0.25 * ratio + xOffSet, -0.25 * ratio + yOffSet, 0.25 ],
            [ 0.25 * ratio + xOffSet, -0.25 * ratio + yOffSet, 0.25 ]
        ];

        var myIndices = [
            [ 0, 1, 5 ],
            [ 0, 5, 4 ],
            [ 1, 2, 6 ],
            [ 1, 6, 5 ],
            [ 2, 3, 7 ],
            [ 2, 7, 6 ],
            [ 3, 0, 4 ],
            [ 3, 4, 7 ],
            [ 4, 5, 6 ],
            [ 4, 6, 7 ],
            [ 0, 1, 2 ],
            [ 0, 2, 3 ]
        ];

        return {
            vertices: myVertices,
            indices: myIndices,
            children: []
        };        
    };
    
}());