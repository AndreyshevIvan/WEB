const CANVAS_WIDTH = 10;
const CANVAS_HEIGHT = 10;

var xMin = -1.7433419053321 - 0.00000000374 / 2; // -1.7433419072021
var xMax = -1.7433419053321 + 0.00000000374 / 2; // -1.7433419034621
var yMin = 0.0000907687489 - 0.00000000374 / 2;
var yMax = 0.0000907687489 + 0.00000000374 / 2;

var TEST_CONST = -1.7433419053321 - 0.00000000374 / 2;

var g_gpu = new GPU();

var properties = {
    dimensions : [CANVAS_WIDTH, CANVAS_HEIGHT],
    //graphical : true,
    mode : "gpu",
    loopMaxIterations : 1000,
    constants : {
        x : "1.7433419072021",
        y : 0.00000000374
    }
}

var initCanvas = function (xxMin, xxMax, yyMin, yyMax) {
    var Cr_step = (xxMax - xxMin) / this.dimensions.x;
    var Ci_step = (yyMax - yyMin) / this.dimensions.y;

    var Cr = xxMin + Cr_step * this.thread.x;
    var Ci = yyMin + Ci_step * this.thread.y;

    var iterations = 1000;
    var escapeRadius = 4;

    var Zr = 0.0;
    var Zi = 0.0;
    var Tr = 0.0;
    var Ti = 0.0;
    var n = 0;

    while (n < iterations && (Tr + Ti) <= escapeRadius) {
        Zi = 2.0 * Zr * Zi + Ci;
        Zr = Tr - Ti + Cr;
        Tr = Math.pow(Zr, 2);
        Ti = Math.pow(Zi, 2);
        n++;
    }

    var blue = 0;

    if (n != iterations) {
        blue = n / iterations;
    }

    return this.constants.x;
}

window.onload = function() {
    var startTime = performance.now();
    var render = g_gpu.createKernel(initCanvas, properties);
    console.log(render(xMin, xMax, yMin, yMax, -1.7433419053321, 0.00000000374, 2));
    console.log(xMin);
    //var canvas = render.getCanvas();
    //document.getElementsByTagName('body')[0].appendChild(canvas);
    var timeTaken = performance.now() - startTime;

    //alert("Time taken: " + Math.round(timeTaken) + " ms");
};