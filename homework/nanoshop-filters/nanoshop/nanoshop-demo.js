/*
 * This demo script uses the Nanoshop module to apply a simple
 * filter on a canvas drawing.
 */
(function() {
    var canvas = $("#picture")[0],
        renderingContext = canvas.getContext("2d"),
        gradient;

    var image = new Image();

    image.onload = function() {
        renderingContext.drawImage(image, 0, 0);
        $("#apply-filter-button").click(function() {
            // Filter time.
            console.log("darken");
            renderingContext.putImageData(
                Nanoshop.applyFilter(
                    renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                    // This is a basic "darkener."
                    function(r, g, b, a) {
                        return [r / 2, g / 2, b / 2, a];
                    }
                ),
                0, 0
            );
        });

        $("#contrast-button").click(function() {
            renderingContext.putImageData(
                Nanoshop.applyFilter(
                    renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                    // JD: 2
                    function(r, g, b, a) {
                        return (r + g + b > 255 * 3 * (4 / 6)) ? [255, 255, 255, a] : [0, 0, 0, a];
                    }
                ),
                0, 0
            );
        });

        $("#rotate-color").click(function() {
            renderingContext.putImageData(
                Nanoshop.applyFilter(
                    renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                    function(r, g, b, a) {
                        return [g, b, r, a];
                    }
                ),
                0, 0
            );
        });

        $("#age").click(function() {
            renderingContext.putImageData(
                Nanoshop.applyFilter(
                    renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                    function(r, g, b, a) {
                        var average = (r + g + b) / 3;
                        return [average * 1.2, average, average * 0.5, a];
                    }
                ),
                0, 0
            );
        });
        // Set a little event handler to apply the filter.        
    }
    image.src = "../Alejandra\ and\ Me.jpg";

}());