(function(){
    window.Shape = window.Shape || { };
    /*
     * Returns a cylinder whose bases are regular
     * n-gons.
     */
    window.Shape.cylinder =  function (n) {
        if(n < 3){
            throw "The base must have at least 3 sides";
        }

        var myVertices = [];
        var numOfSides = n || 20,
            /*myVertices = [],*/
            myIndices = [],
            HEIGHT = Math.sqrt(2) / 2, // 
            x, y, v,
            numOfVertices = 2 * numOfSides,        
            deltaTheta = 2 * Math.PI / numOfSides;

        // Add the vertices and all the side faces
        // of the cylinder.
        for (var i = 0; i < numOfSides; i += 1) {
            v = i * 2;
            x = Math.cos(deltaTheta * i);
            y = Math.sin(deltaTheta * i);

            //console.log(myVertices);
            myVertices.push([x, y, HEIGHT]);
            //throw "Stop"            
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