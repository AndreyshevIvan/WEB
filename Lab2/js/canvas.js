var DRAWING_AREA_ID = "drawing_area";
var DRAWING_AREA_WIDTH = 630;
var DRAWING_AREA_HEIGHT = 600;

function initDrawingArea()
{
    var drawingArea = document.getElementById(DRAWING_AREA_ID);
    var ctx = drawingArea.getContext("2d");

    drawingArea.width = DRAWING_AREA_WIDTH;
    drawingArea.height = DRAWING_AREA_HEIGHT;

    ctx.translate(DRAWING_AREA_WIDTH / 2, DRAWING_AREA_HEIGHT / 2);

    ctx.lineJoin = "miter";
    ctx.lineCap = "square";
}

function resetDrawingArea()
{
    var drawingArea = document.getElementById(DRAWING_AREA_ID);
    var ctx = drawingArea.getContext("2d");

    ctx.clearRect(-drawingArea.width / 2, -drawingArea.height / 2, drawingArea.width, drawingArea.height);
}