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

function getShape()
{
    var shape = getShapeFromMenu();
    shape.draw();

    delete shape;
}