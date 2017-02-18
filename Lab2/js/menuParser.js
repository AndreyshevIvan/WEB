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