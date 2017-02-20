var STANDART_TRIANGLE_X1 = -100;
var STANDART_TRIANGLE_Y1 = 100;

var STANDART_TRIANGLE_X2 = 100;
var STANDART_TRIANGLE_Y2 = 100;

var STANDART_TRIANGLE_X3 = 0;
var STANDART_TRIANGLE_Y3 = 0;

class Triangle
{
    constructor()
    {
        this.prototype = Object.create(new Shape());
        this.x1 = STANDART_TRIANGLE_X1;
        this.y1 = STANDART_TRIANGLE_Y1;
        this.x2 = STANDART_TRIANGLE_X2;
        this.y2 = STANDART_TRIANGLE_Y2;
        this.x3 = STANDART_TRIANGLE_X3;
        this.y3 = STANDART_TRIANGLE_Y3;
    }

    setCoordinates(x1, y1, x2, y2, x3, y3)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
    }

    draw()
    {
        var canvas = document.getElementById("drawing_area");
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.strokeStyle = this.prototype.getOutlineColor();
        ctx.lineWidth = this.prototype.getOutlineThickness() * 2;
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x3, this.y3);
        ctx.lineTo(this.x1, this.y1);
        ctx.fillStyle = this.prototype.getFillColor();
        ctx.stroke();
        ctx.fill();
    }
}