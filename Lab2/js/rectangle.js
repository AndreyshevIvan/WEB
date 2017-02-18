var STANDART_RECTANGLE_LEFT_TOP_X = -40;
var STANDART_RECTANGLE_LEFT_TOP_Y = -40;

var STANDART_RECTANGLE_RIGHT_BOTTOM_X = 40;
var STANDART_RECTANGLE_RIGHT_BOTTOM_Y = 40;

class Rectangle
{
    constructor()
    {
        this.prototype = Object.create(new Shape());
        this.x1 = STANDART_RECTANGLE_LEFT_TOP_X;
        this.y1 = STANDART_RECTANGLE_LEFT_TOP_Y;
        this.x2 = STANDART_RECTANGLE_RIGHT_BOTTOM_X;
        this.y2 = STANDART_RECTANGLE_RIGHT_BOTTOM_Y;

        this.width = 0;
        this.height = 0;

        this.calculateSize();
    }

    calculateSize()
    {
        this.width = Math.abs(this.x2 - this.x1);
        this.height = Math.abs(this.y2 - this.y1);
    }

    setCoordinates(x1, y1, x2, y2)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.calculateSize();
    }

    draw()
    {
        var canvas = document.getElementById("drawing_area");
        var ctx = canvas.getContext("2d");
        var offset = this.x2 - this.x1;

        ctx.beginPath();
        ctx.strokeStyle = this.prototype.getOutlineColor();
        ctx.lineWidth = this.prototype.getOutlineThickness() * 2;
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x1 + offset, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x2 - offset, this.y2);
        ctx.lineTo(this.x1, this.y1);
        ctx.stroke();
        ctx.fill();
    }
}