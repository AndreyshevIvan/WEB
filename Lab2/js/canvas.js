var DRAWING_AREA_ID = "drawing_area";
var DRAWING_AREA_WIDTH = 700;
var DRAWING_AREA_HEIGHT = 700;
var AXIS_IMAGE_OFFSET_X = 7;
var AXIS_IMAGE_OFFSET_Y = 94;
var AXIS_IMAGE_OPACITY = 0.15;

function initDrawingArea()
{
    var drawingArea = document.getElementById(DRAWING_AREA_ID);
    var ctx = drawingArea.getContext("2d");

    drawingArea.width = DRAWING_AREA_WIDTH;
    drawingArea.height = DRAWING_AREA_HEIGHT;

    ctx.translate(DRAWING_AREA_WIDTH / 2, DRAWING_AREA_HEIGHT / 2);

    ctx.lineJoin = "miter";
    ctx.lineCap = "square";

    resetDrawingArea();
}

function resetDrawingArea()
{
    var drawingArea = document.getElementById(DRAWING_AREA_ID);
    var ctx = drawingArea.getContext("2d");

    ctx.clearRect(-drawingArea.width / 2, -drawingArea.height / 2, drawingArea.width, drawingArea.height);
    setAxisImage();
}

function setAxisImage()
{
    var drawingArea = document.getElementById(DRAWING_AREA_ID);
    var ctx = drawingArea.getContext("2d");

    var axis = new Image();
    axis.src = "../images/axis.png";
    axis.opacity = 0.3;
    axis.onload = function()
    {
        ctx.globalAlpha = AXIS_IMAGE_OPACITY;
        ctx.drawImage(axis, -AXIS_IMAGE_OFFSET_X, -AXIS_IMAGE_OFFSET_Y, 100, 100);
        ctx.globalAlpha = 1;
    };
}