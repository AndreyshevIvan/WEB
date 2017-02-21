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
    resetDrawingArea();
    var shape = getShapeFromMenuAndUpdateThem();
    shape.draw();
    setShapeCharacteristicsToMenu(shape);

    delete shape;
}