/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */

var Shape = (function () {
    /*
     * Constructor for arbitrary shape.
     */
    var shape = function (options) {
        this.vertices = options.vertices || [];
        this.color = options.color || { r: 1.0, g: 1.0, b: 0.0 };
        this.indices = options.indices || [];
        this.children = options.children || [];
    };

    // Example code from Dondi which needs to be modified.
    shape.prototype.draw =  function (parentTransform) {
        var t = calculateTransform() * (parentTransform || identity);
        renderVertices();
        children.forEach(function() {
            children.draw(t);
        });
    };

    shape.prototype.addChild = function (child) {
        this.children.push(child);
    };

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    shape.prototype.toRawTriangleArray =  function () {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                this.vertices[
                this.indices[i][j]]);
            }
        }

        return result;
    };

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    shape.prototype.toRawLineArray =  function () {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                this.vertices[
                this.indices[i][j]],

                this.vertices[
                this.indices[i][(j + 1) % maxj]]);
            }
        }

        return result;
    };

    return shape;

})();