(function(){
    window.Shape = window.Shape || { };
    /*
     * Returns a sphere where m is number of longitudinal lines
     * and n is the number of latitudinal lines. 
     */
    window.Shape.sphere =  function (m, n) {
        if(m < 2 || n < 1){
            throw "Must have at least two lines of longitude and at least one line of latitude.";
        }
        var numLong = m || 10,
            numLat = n || 10,
            DEGREES_TO_RADIANS = Math.PI / 180,
            myVertices = [],
            myIndices = [],
            myColors = [],
            x, // The coordinate of a point.
            y,
            z,
            v, // The index of the current vertex.
            phi,
            theta,
            maxVertex = numLong * numLat + 1, // The index of the last vertex, at the north pole.
            deltaPhi = 180 / (numLat + 1),    // Angle between one latitude line to the next.
            deltaTheta = 360 / numLong;       // Angle between one longitude line to the next.

                    

        // We push the point at the south pole
        myVertices.push([0, 0, -1]);

        // Generate all vertices by going through all the
        // latitudinal lines                  
        for (i = 0; i < numLat; i += 1) {
            phi = -90 + deltaPhi * (i + 1);
            z = Math.sin(phi * DEGREES_TO_RADIANS);
            for (j = 0; j < numLong; j += 1) {
                theta = deltaTheta * j;
                x = Math.cos(theta * DEGREES_TO_RADIANS) * Math.cos(phi * DEGREES_TO_RADIANS);
                y = Math.sin(theta * DEGREES_TO_RADIANS) * Math.cos(phi * DEGREES_TO_RADIANS);
                myVertices.push([x, y, z]);
            }
        }        // We push the point at the north pole last.
        myVertices.push([0, 0, 1]);

        // We push the triangles at the south pole
        for (var i = 1; i <= numLong; i += 1) {
            myIndices.push([0, i, (i % numLong) + 1]);
        }

        // Generate all triangles going up the sphere
        // from the south pole to the north pole
        for (i = 0; i < numLat - 1; i += 1) {
            for (var j = 0; j < numLong - 1; j += 1) {
                v = i * numLong + 1 + j;
                myIndices.push([v, v + numLong, v + numLong + 1]);
                myIndices.push([v, v + numLong + 1, v + 1]);
            }
            myIndices.push([(i + 1) * numLong, (i + 2) * numLong, (i + 1) * numLong + 1]);
            myIndices.push([(i + 1) * numLong, (i + 1) * numLong + 1, i * numLong + 1]);
        }

        // We push the triangles at the south pole.
        for (i = 0; i < numLong - 1; i += 1) {
            v = numLong * (numLat - 1) + 1 + i;
            myIndices.push([v, v + 1, maxVertex]);
        }
        // We add the very last triangle.
        v = numLong * (numLat - 1) + 1;
        myIndices.push([v + numLong - 1, v, maxVertex]);




        return {
            vertices: myVertices,
            indices: myIndices,
            children: []
        };
    };
}());