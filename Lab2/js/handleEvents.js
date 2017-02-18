function init()
{
    initDrawingArea();
    selectShapeMenu();

    var circle = new Circle();
    circle.draw();
}

function selectShapeMenu()
{
    resetMenu();
    setNewMenu()
}

function draw()
{
    console.log("draw!");
}