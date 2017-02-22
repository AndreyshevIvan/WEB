var STANDART_RECTANGLE_LEFT_TOP_X = -40;
var STANDART_RECTANGLE_LEFT_TOP_Y = -40;

var STANDART_RECTANGLE_RIGHT_BOTTOM_X = 40;
var STANDART_RECTANGLE_RIGHT_BOTTOM_Y = 40;

function Rectangle()
{
    this.prototype = Object.create(new Shape());
    this.x1 = STANDART_RECTANGLE_LEFT_TOP_X;
    this.y1 = STANDART_RECTANGLE_LEFT_TOP_Y;
    this.x2 = STANDART_RECTANGLE_RIGHT_BOTTOM_X;
    this.y2 = STANDART_RECTANGLE_RIGHT_BOTTOM_Y;

    this.setFirstPointCoordinates = function(x1, y1)
    {
        this.x1 = Number(x1);
        this.y1 = Number(y1);
    }

    this.setSecondPointCoordinates = function(x2, y2)
    {
        this.x2 = Number(x2);
        this.y2 = Number(y2);
    }

    this.getWidth = function()
    {
        return Math.abs(this.x1 - this.x2);
    }

    this.getHeight = function()
    {
        return Math.abs(this.y1 - this.y2);
    }

    this.getAreaSize = function()
    {
        var areaSize = this.getWidth() * this.getHeight();

        return areaSize;
    }

    this.getPerimeter = function()
    {
        var perimeter = 2 * (this.getWidth() + this.getHeight());

        return perimeter;
    }

    this.getCoordinateX1 = function()
    {
        return this.x1;
    }

    this.getCoordinateX2 = function()
    {
        return this.x2;
    }

    this.getCoordinateY1 = function()
    {
        return this.y1;
    }

    this.getCoordinateY2 = function()
    {
        return this.y2;
    }

    this.draw = function()
    {
        var ctx = document.getElementById("drawing_area").getContext("2d");
        var offset = this.getCoordinateX2() - this.getCoordinateX1();

        ctx.beginPath();
        ctx.strokeStyle = this.prototype.getOutlineColor();
        ctx.lineWidth = this.prototype.getOutlineThickness() * 2;
        ctx.fillStyle = this.prototype.getFillColor();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x1 + offset, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x2 - offset, this.y2);
        ctx.lineTo(this.x1, this.y1);
        ctx.stroke();
        ctx.fill();
    }
}