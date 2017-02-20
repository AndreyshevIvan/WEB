function resetMenu()
{
    var elemets = [
        document.getElementById("shape_fill_color"),
        document.getElementById("shape_outline_color"),
        document.getElementById("shape_outline_thickness"),
        document.getElementById("circle_radius"),
        document.getElementById("circle_x"),
        document.getElementById("circle_y"),
        document.getElementById("triangle_x_first"),
        document.getElementById("triangle_x_second"),
        document.getElementById("triangle_x_third"),
        document.getElementById("triangle_y_first"),
        document.getElementById("triangle_y_second"),
        document.getElementById("triangle_y_third"),
        document.getElementById("rect_x_first"),
        document.getElementById("rect_y_first"),
        document.getElementById("rect_x_second"),
        document.getElementById("rect_y_second")
    ];

    for(var i = 0; i < elemets.length; i++)
    {
        elemets[i].value = "";
    }
}

function getShapeName()
{
    return document.getElementById("shape_selector").value;
}

function getFillColor()
{
    var color = document.getElementById("shape_fill_color").value;
    if (color == "")
    {
        var shape = new Shape();
        color = shape.getFillColor();
    }

    return color;
}

function getOutlineColor()
{
    var color = document.getElementById("shape_outline_color").value;
    if (color == "")
    {
        var shape = new Shape();
        color = shape.getOutlineColor();
    }

    return color;
}

function getOutlineThickness()
{
    var thickness = document.getElementById("shape_outline_thickness").value;
    if (thickness == "")
    {
        var shape = new Shape();
        thickness = shape.getOutlineThickness();
    }

    return Number(thickness);
}

function getValueFromFormIfItExists(fieldName, standartValue)
{
    var readingVal = document.getElementById(fieldName).value;
    if (readingVal == "")
    {
        readingVal = standartValue;
    }

    return readingVal;
}

function getCircleFromMenu()
{
    var circle = new Circle();

    circle.prototype.setFillColor(getFillColor());
    circle.prototype.setOutlineColor(getOutlineColor());
    circle.prototype.setOutlineThickness(getOutlineThickness());

    circle.setRadius(getValueFromFormIfItExists("circle_radius", circle.radius));

    circle.setPosition(
        getValueFromFormIfItExists("circle_x", circle.centerX),
        -getValueFromFormIfItExists("circle_y", circle.centerY)
    );

    return circle;
}

function getRectangleFromMenu()
{
    var rectangle = new Rectangle();

    rectangle.prototype.setFillColor(getFillColor());
    rectangle.prototype.setOutlineColor(getOutlineColor());
    rectangle.prototype.setOutlineThickness(getOutlineThickness());

    rectangle.setCoordinates(
        getValueFromFormIfItExists("rect_x_first", rectangle.x1),
        -getValueFromFormIfItExists("rect_y_first", rectangle.y1),
        getValueFromFormIfItExists("rect_x_second", rectangle.x2),
        -getValueFromFormIfItExists("rect_y_second", rectangle.y2)
    );

    return rectangle;
}

function getTriangleFromMenu()
{
    var triangle = new Triangle();

    triangle.prototype.setFillColor(getFillColor());
    triangle.prototype.setOutlineColor(getOutlineColor());
    triangle.prototype.setOutlineThickness(getOutlineThickness());

    triangle.setCoordinates(
        getValueFromFormIfItExists("triangle_x_first", triangle.x1),
        -getValueFromFormIfItExists("triangle_y_first", triangle.y1),
        getValueFromFormIfItExists("triangle_x_second", triangle.x2),
        -getValueFromFormIfItExists("triangle_y_second", triangle.y2),
        getValueFromFormIfItExists("triangle_x_third", triangle.x3),
        -getValueFromFormIfItExists("triangle_y_third", triangle.y3)
    );

    return triangle;
}

function getShapeFromMenuAndUpdateThem()
{
    var shapeName = getShapeName();
    var shape;

    if (shapeName == "circle")
    {
        shape = getCircleFromMenu();
        UpdateCircleMenu();
    }
    else if (shapeName == "rectangle")
    {
        shape = getRectangleFromMenu();
        UpdateRectangleMenu();
    }
    else if (shapeName == "triangle")
    {
        shape = getTriangleFromMenu();
        UpdateTriangleMenu();
    }

    return shape;
}

function setNewMenu()
{
    var type = document.getElementById("shape_selector").value;

    var circleMenu = document.getElementById("circle_settings");
    var triangleMenu = document.getElementById("triangle_settings");
    var rectangleMenu = document.getElementById("rectangle_settings");

    circleMenu.style.display = "none";
    triangleMenu.style.display = "none";
    rectangleMenu.style.display = "none";

    if (type == "circle")
    {
        circleMenu.style.display = "block";
    }
    if (type == "triangle")
    {
        triangleMenu.style.display = "block";
    }
    if (type == "rectangle")
    {
        rectangleMenu.style.display = "block";
    }
}

function isFormsDataValid()
{
    return true;
}