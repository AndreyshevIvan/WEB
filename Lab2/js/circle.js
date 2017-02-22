var STANDART_CIRCLE_RADIUS = 40;

function Circle()
{
    this.prototype = Object.create(new Shape());
    this.radius = STANDART_CIRCLE_RADIUS;
    this.centerX = 0;
    this.centerY = 0;

    this.setPosition = function(coordinateX, coordinateY)
    {
        this.centerX = Number(coordinateX);
        this.centerY = Number(coordinateY);
    }

    this.getAreaSize = function()
    {
        var areaSize = Math.PI * Math.pow(this.radius, 2);

        return areaSize;
    }

    this.getRadius = function()
    {
        return this.radius;
    }

    this.getPositionX = function()
    {
        return this.centerX;
    }

    this.getPositionY = function()
    {
        return this.centerY;
    }

    this.getPerimeter = function()
    {
        var perimeter = 2 * Math.PI * this.radius;

        return perimeter;
    }

    this.setRadius = function(radius)
    {
        if (radius >= 0)
        {
            this.radius = radius;
        }
    }

    this.draw = function()
    {
        var canvas = document.getElementById("drawing_area");
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.strokeStyle = this.prototype.getOutlineColor();
        ctx.lineWidth = this.prototype.getOutlineThickness() * 2;
        ctx.fillStyle = this.prototype.getFillColor();
        ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, true);
        ctx.stroke();
        ctx.fill();
    }
}