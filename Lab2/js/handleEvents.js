function initDrawing()
{
    initDrawingArea();
    syncShapeMenu();
}

function syncShapeMenu()
{
    resetDrawingArea();
    resetMenu();
    setNewMenu();
}

function drawShape()
{
    var shape = getShapeFromMenuAndUpdateThem();
    resetDrawingArea();
    shape.draw();
    setShapeCharacteristicsToMenu(shape);
}