/*
 * This demo script uses the NanoshopNeighborhood module to apply a
 * "pixel neighborhood" filter on a canvas drawing.
 */
(function() {
    var canvas = $("#picture")[0],
        renderingContext = canvas.getContext("2d"),
        gradient;

    var image = new Image();

    image.onload = function() {
        renderingContext.drawImage(image, 0, 0);
        // Set a little event handler to apply the filter.
        $("#apply-filter-button").click(function() {
            // Filter time.
            renderingContext.putImageData(
                NanoshopNeighborhood.applyFilter(
                    renderingContext,
                    renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                    NanoshopNeighborhood.func5 // JD: 3
                    //NanoshopNeighborhood.averager // Convenience comment for easy switching.
                ),
                0, 0
            );
        });

        $("#hor-blur-button").click(function() {
            // Filter time.
            renderingContext.putImageData(
                NanoshopNeighborhood.applyFilter(
                    renderingContext,
                    renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                    NanoshopNeighborhood.func2 // JD: 3
                ),
                0, 0
            );
        });
    }

    image.src = "../Alejandra\ and\ Me.jpg";



}());