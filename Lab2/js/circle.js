var STANDART_CIRCLE_RADIUS = 40;

class Circle
{
    constructor()
    {
        this.prototype = Object.create(new Shape());
        this.radius = STANDART_CIRCLE_RADIUS;
        this.centerX = 0;
        this.centerY = 0;
    }

    setPosition(x, y)
    {
        console.log("test");
        this.centerX = x;
        this.centerY = y;
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
        ctx.lineWidth = this.prototype.getOutlineThickness() * 2;
        ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, true);
        ctx.stroke();

        ctx.beginPath()
        ctx.fillStyle = this.prototype.getFillColor();
        ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }
}