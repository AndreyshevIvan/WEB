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
        document.getElementById("rect_left_top_x"),
        document.getElementById("rect_left_top_y"),
        document.getElementById("rect_right_bottom_x"),
        document.getElementById("rect_right_bottom_y")
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
    return document.getElementById("shape_fill_color").value;
}

function getOutlineColor()
{
    return document.getElementById("shape_outline_color").value;
}

function getOutlineThickness()
{
    return document.getElementById("shape_outline_thickness").value;
}

function getCircleFromMenu()
{
    var circle = new Circle();

    var radius = document.getElementById("circle_radius").value;
    var centerX = document.getElementById("circle_x").value;
    var centerY = document.getElementById("circle_y").value;

    circle.prototype.setFillColor(getFillColor());
    circle.prototype.setOutlineColor(getOutlineColor());
    circle.prototype.setOutlineThickness(getOutlineThickness());
    circle.setRadius(radius);
    circle.setPosition(centerX, centerY);

    return circle;
}

function getRectangleFromMenu()
{
    var rectangle = new Rectangle();

    var topLeftX = document.getElementById("rect_left_top_x").value;
    var topLeftY = document.getElementById("rect_left_top_y").value;
    var bottomRightX = document.getElementById("rect_right_bottom_x").value;
    var bottomRightY = document.getElementById("rect_right_bottom_y").value;

    rectangle.prototype.setFillColor(getFillColor());
    rectangle.prototype.setOutlineColor(getOutlineColor());
    rectangle.prototype.setOutlineThickness(getOutlineThickness());
    rectangle.setCoordinates(topLeftX, topLeftY, bottomRightX, bottomRightY);

    return rectangle;
}

function getTriangleFromMenu()
{
    var triangle = new Triangle();

    var x1 = document.getElementById("triangle_x_first").value;
    var y1 = document.getElementById("triangle_y_first").value;
    var x2 = document.getElementById("triangle_x_second").value;
    var y2 = document.getElementById("triangle_y_second").value;
    var x3 = document.getElementById("triangle_x_third").value;
    var y3 = document.getElementById("triangle_y_third").value;

    triangle.prototype.setFillColor(getFillColor());
    triangle.prototype.setOutlineColor(getOutlineColor());
    triangle.prototype.setOutlineThickness(getOutlineThickness());
    triangle.setCoordinates(x1, y1, x2, y2, x3, y3);

    return triangle;
}

function getShapeFromMenu()
{
    var shapeName = getShapeName();

    if (shapeName == "circle")
    {
        return getCircleFromMenu();
    }
    else if (shapeName == "rectangle")
    {
        return getRectangleFromMenu();
    }
    else if (shapeName == "triangle")
    {
        return getTriangleFromMenu();
    }

    return undefined;
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