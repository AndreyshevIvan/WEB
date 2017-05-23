var xMin = -1.7433419053321 - 0.00000000374 / 2; // -1.7433419072021
var xMax = -1.7433419053321 + 0.00000000374 / 2; // -1.7433419034621
var yMin = 0.0000907687489 - 0.00000000374 / 2;
var yMax = 0.0000907687489 + 0.00000000374 / 2;

var Cr_step = (xMax - xMin) / 800;
var Ci_step = (yMax - yMin) / 800;

var iterations = 1000;
var escapeRadius = 4;

onmessage = function(e) {
    for (var x = e.data.startX; x < e.data.endX; x++) {
        for (var y = e.data.startY; y < e.data.endY; y++) {
            var Cr = xMin + Cr_step * x;
            var Ci = yMin + Ci_step * y;

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

            var color = n == iterations ? 0 : 0xFF * n / iterations;
            postMessage({x: x, y: y, blue: color});
        }
    }
};