var CHARACTERISTICS_SYMBOLS_COUNT = 10;

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

    resetShapeCharacteristics();
}

function getShapeName()
{
    return document.getElementById("shape_selector").value;
}

function getFillColor()
{
    var shape = new Shape();
    return getValueFromFormIfItExists("shape_fill_color", shape.getFillColor());
}

function getOutlineColor()
{
    var shape = new Shape();
    return getValueFromFormIfItExists("shape_outline_color", shape.getOutlineColor());
}

function getOutlineThickness()
{
    var shape = new Shape();
    return Number(getValueFromFormIfItExists("shape_outline_thickness", shape.getOutlineThickness()));
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

function updateCommonMenu(shape)
{
    document.getElementById("shape_fill_color").value = shape.prototype.getFillColor();
    document.getElementById("shape_outline_color").value = shape.prototype.getOutlineColor();
    document.getElementById("shape_outline_thickness").value = shape.prototype.getOutlineThickness();
}

function updateCircleMenu(shape)
{
    updateCommonMenu(shape);

    document.getElementById("circle_radius").value = shape.radius;
    document.getElementById("circle_x").value = shape.centerX;
    document.getElementById("circle_y").value = -shape.centerY;
}

function updateRectangleMenu(shape)
{
    updateCommonMenu(shape);

    document.getElementById("rect_x_first").value = shape.x1;
    document.getElementById("rect_y_first").value = -shape.y1;
    document.getElementById("rect_x_second").value = shape.x2;
    document.getElementById("rect_y_second").value = -shape.y2;
}

function updateTriangleMenu(shape)
{
    updateCommonMenu(shape);

    document.getElementById("triangle_x_first").value = shape.x1;
    document.getElementById("triangle_x_second").value = shape.x2;
    document.getElementById("triangle_x_third").value = shape.x3;
    document.getElementById("triangle_y_first").value = -shape.y1;
    document.getElementById("triangle_y_second").value = -shape.y2;
    document.getElementById("triangle_y_third").value = -shape.y3;
}

function getShapeFromMenuAndUpdateThem()
{
    var shapeName = getShapeName();
    var shape;

    if (shapeName == "circle")
    {
        shape = getCircleFromMenu();
        updateCircleMenu(shape);
    }
    else if (shapeName == "rectangle")
    {
        shape = getRectangleFromMenu();
        updateRectangleMenu(shape);
    }
    else if (shapeName == "triangle")
    {
        shape = getTriangleFromMenu();
        updateTriangleMenu(shape);
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

function resetShapeCharacteristics()
{
    var perimeterTab = document.getElementById("perimeter");
    var areaTab = document.getElementById("area_size");

    perimeterTab.innerText = "Perimeter";
    areaTab.innerText = "Area size";
}

function setShapeCharacteristicsToMenu(shape)
{
    var perimeterTab = document.getElementById("perimeter");
    var areaTab = document.getElementById("area_size");

    var perimeter = String(shape.getPerimeter()).substr(0, CHARACTERISTICS_SYMBOLS_COUNT);
    var areaSize = String(shape.getAreaSize()).substr(0, CHARACTERISTICS_SYMBOLS_COUNT);

    perimeterTab.innerHTML = "Perimeter: " + "<strong>" + perimeter + "</strong>";
    areaTab.innerHTML = "Area size: " + "<strong>" + areaSize + "</strong>";
}