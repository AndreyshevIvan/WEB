var STANDART_RADIUS = 10;

class Circle
{
    constructor()
    {
        this.prototype = new Shape();
        this.radius = STANDART_RADIUS;
        this.centerX = 0;
        this.centerY = 0;
    }

    setRadius(radius)
    {
        if (radius >= 0)
        {
            this.radius = radius;
        }
    }

    draw()
    {
        var canvas = document.getElementById("drawing_area");
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = this.prototype.getOutlineColor();
        var borderradius = this.prototype.outlineThickness + this.radius;
        ctx.arc(this.centerX, this.centerY, borderradius, 0, 2 * Math.PI, true);
        ctx.fill();

        ctx.beginPath()
        ctx.fillStyle = this.prototype.getFillColor();
        ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }
}