var g_canvas = document.getElementById("drawing_area");
var g_ctx = g_canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
g_canvas.width = CANVAS_WIDTH;
g_canvas.height = CANVAS_HEIGHT;
var g_pixels = g_ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);

window.onload = function() {
    var startTime = performance.now();
    var callsCount = 0;
    var endFunc = function (e) {
        callsCount++;

        g_pixels.data[4 * (e.data.y * CANVAS_WIDTH + e.data.x) + 2] = Math.round(e.data.blue);
        g_pixels.data[4 * (e.data.y * CANVAS_WIDTH + e.data.x) + 3] = 0xFF;

        if (callsCount >= 160000) {
            g_ctx.putImageData(g_pixels, 0, 0);
            var timeTaken = performance.now() - startTime;
            alert("Time taken: " + Math.round(timeTaken) + " ms");
        }
    }

    {
        var worker_1 = new Worker("js/worker.js");
        worker_1.postMessage({startX: 0, startY: 0, endX: 400, endY: 400});
        worker_1.onmessage = endFunc;
        /*
        var worker_2 = new Worker("js/worker_2.js");
        worker_2.postMessage({startX: 400, startY: 400, endX: 800, endY: 800});
        worker_2.onmessage = endFunc;

        var worker_3 = new Worker("js/worker.js");
        worker_3.postMessage({startX: 400, startY: 0, endX: 800, endY: 400});
        worker_3.onmessage = endFunc;

        var worker_4 = new Worker("js/worker.js");
        worker_4.postMessage({startX: 0, startY: 400, endX: 400, endY: 800});
        worker_4.onmessage = endFunc;
         */
    }
};