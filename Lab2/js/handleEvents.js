function init()
{
    initDrawingArea();
    selectShapeMenu();
}

function selectShapeMenu()
{
    resetDrawingArea();
    resetMenu();
    setNewMenu()
}

function drawShape()
{
    resetDrawingArea();
    if (isFormsDataValid())
    {
        var shape = getShapeFromMenuAndUpdateThem();
        shape.draw();
        setShapeCharacteristics(shape);

        delete shape;
    }
}