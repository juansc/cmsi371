(function(){
    window.Shape = window.Shape || { };
    /*
     * Returns a cylinder whose bases are regular
     * n-gons.
     */
    window.Shape.cylinder =  function (n) {

        var numOfSides = n || 20,
            myVertices = [],
            myIndices = [],
            HEIGHT = 0.25, // 
            SCALE = 0.3,
            x, y, v,
            numOfVertices = 2 * numOfSides,        
            deltaTheta = 2 * Math.PI / numOfSides;


        // Add the vertices and all the side faces
        // of the cylinder.
        for (var i = 0; i < numOfSides; i += 1) {
            v = i * 2;
            x = Math.cos(deltaTheta * i) * SCALE;
            y = Math.sin(deltaTheta * i) * SCALE;

            myVertices.push([x, y, HEIGHT]);
            myVertices.push([x, y, -HEIGHT]);
            myIndices.push([v + 0, v + 1, (v + 3) % numOfVertices]);
            myIndices.push([v + 0, (v + 3) % numOfVertices, (v + 2) % numOfVertices]);
        }
        // Add both bases.
        for (i = 0; i < numOfSides - 2; i += 1) {
            myIndices.push([0, (i + 1) * 2, (i + 2) * 2]);
            myIndices.push([1, (i + 1) * 2 + 1, (i + 2) * 2 + 1]);
        }

        return {
            vertices: myVertices,
            indices: myIndices,
            children: []
        };
    };
    
}());