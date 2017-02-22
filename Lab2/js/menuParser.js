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

    var circleMenu = document.getElementById("circle_settings");
    var triangleMenu = document.getElementById("triangle_settings");
    var rectangleMenu = document.getElementById("rectangle_settings");

    circleMenu.style.display = "none";
    triangleMenu.style.display = "none";
    rectangleMenu.style.display = "none";

    for (var elemNum = 0; elemNum < elemets.length; elemNum += 1)
    {
        elemets[elemNum].value = "";
    }

    resetShapeCharacteristics();
}

function getShapeName()
{
    return document.getElementById("shape_selector").value;
}

function getValueFromFormIfItExists(fieldName, standartValue)
{
    var readingVal = document.getElementById(fieldName).value;
    if (readingVal === "")
    {
        readingVal = standartValue;
    }

    return readingVal;
}

function getFillColor()
{
    var shape = new Shape();
    var fillColor = getValueFromFormIfItExists("shape_fill_color", shape.getFillColor());

    return fillColor;
}

function getOutlineColor()
{
    var shape = new Shape();
    var outlineColor = getValueFromFormIfItExists("shape_outline_color", shape.getOutlineColor());

    return outlineColor;
}

function getOutlineThickness()
{
    var shape = new Shape();
    var thickness = Number(getValueFromFormIfItExists("shape_outline_thickness", shape.getOutlineThickness()));

    return thickness;
}

function getCircleFromMenu()
{
    var circle = new Circle();

    circle.prototype.setFillColor(getFillColor());
    circle.prototype.setOutlineColor(getOutlineColor());
    circle.prototype.setOutlineThickness(getOutlineThickness());

    circle.setRadius(getValueFromFormIfItExists("circle_radius", circle.getRadius()));

    circle.setPosition(
        getValueFromFormIfItExists("circle_x", circle.getPositionX()),
        -1 * getValueFromFormIfItExists("circle_y", circle.getPositionY())
    );

    return circle;
}

function getRectangleFromMenu()
{
    var rectangle = new Rectangle();

    rectangle.prototype.setFillColor(getFillColor());
    rectangle.prototype.setOutlineColor(getOutlineColor());
    rectangle.prototype.setOutlineThickness(getOutlineThickness());

    rectangle.setFirstPointCoordinates(
        getValueFromFormIfItExists("rect_x_first", rectangle.getCoordinateX1()),
        -1 * getValueFromFormIfItExists("rect_y_first", rectangle.getCoordinateY1())
    );
    rectangle.setSecondPointCoordinates(
        getValueFromFormIfItExists("rect_x_second", rectangle.getCoordinateX2()),
        -1 * getValueFromFormIfItExists("rect_y_second", rectangle.getCoordinateY2())
    );

    return rectangle;
}

function getTriangleFromMenu()
{
    var triangle = new Triangle();

    triangle.prototype.setFillColor(getFillColor());
    triangle.prototype.setOutlineColor(getOutlineColor());
    triangle.prototype.setOutlineThickness(getOutlineThickness());

    triangle.setFirstPointCoordinates(
        getValueFromFormIfItExists("triangle_x_first", triangle.getCoordinateX1()),
        -1 * getValueFromFormIfItExists("triangle_y_first", triangle.getCoordinateY1())
    );
    triangle.setSecondPointCoordinates(
        getValueFromFormIfItExists("triangle_x_second", triangle.getCoordinateX2()),
        -1 * getValueFromFormIfItExists("triangle_y_second", triangle.getCoordinateY2())
    );
    triangle.setThirdPointCoordinates(
        getValueFromFormIfItExists("triangle_x_third", triangle.getCoordinateX3()),
        -1 * getValueFromFormIfItExists("triangle_y_third", triangle.getCoordinateY3())
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

    document.getElementById("circle_radius").value = shape.getRadius();
    document.getElementById("circle_x").value = shape.getPositionX();
    document.getElementById("circle_y").value = -1 * shape.getPositionY();
}

function updateRectangleMenu(shape)
{
    updateCommonMenu(shape);

    document.getElementById("rect_x_first").value = shape.getCoordinateX1();
    document.getElementById("rect_y_first").value = -1 * shape.getCoordinateY1();
    document.getElementById("rect_x_second").value = shape.getCoordinateX2();
    document.getElementById("rect_y_second").value = -1 * shape.getCoordinateY2();
}

function updateTriangleMenu(shape)
{
    updateCommonMenu(shape);

    document.getElementById("triangle_x_first").value = shape.getCoordinateX1();
    document.getElementById("triangle_x_second").value = shape.getCoordinateX2();
    document.getElementById("triangle_x_third").value = shape.getCoordinateX3();
    document.getElementById("triangle_y_first").value = -1 * shape.getCoordinateY1();
    document.getElementById("triangle_y_second").value = -1 * shape.getCoordinateY2();
    document.getElementById("triangle_y_third").value = -1 * shape.getCoordinateY3();
}

function getShapeFromMenuAndUpdateThem()
{
    var shapeName = getShapeName();
    var shape = new Shape();

    if (shapeName === "circle")
    {
        shape = getCircleFromMenu();
        updateCircleMenu(shape);
    }
    else if (shapeName === "rectangle")
    {
        shape = getRectangleFromMenu();
        updateRectangleMenu(shape);
    }
    else if (shapeName === "triangle")
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

    if (type === "circle")
    {
        circleMenu.style.display = "block";
    }
    if (type === "triangle")
    {
        triangleMenu.style.display = "block";
    }
    if (type === "rectangle")
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

    perimeterTab.innerHTML = "Perimeter: ".concat("<strong>", perimeter, "</strong>");
    areaTab.innerHTML = "Area size: ".concat("<strong>", areaSize, "</strong>");
}