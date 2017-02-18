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

function tryDrawShape()
{
    resetDrawingArea();
    if (isFormsDataValid())
    {
        var shape = getShapeFromMenu();
        shape.draw();

        delete shape;
    }
}