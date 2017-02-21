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

    getAreaSize()
    {
        var firstRect = (this.x1 - this.x3) * (this.y2 - this.y3);
        var secondRect = (this.x2 - this.x3) * (this.y1 - this.y3);
        var areaSize = (firstRect - secondRect) / 2;

        return areaSize;
    }

    getPerimeter()
    {
        var side12 = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2));
        var side23 = Math.sqrt(Math.pow(this.x3 - this.x1, 2) + Math.pow(this.y3 - this.y1, 2));
        var side31 = Math.sqrt(Math.pow(this.x3 - this.x2, 2) + Math.pow(this.y3 - this.y2, 2));
        var perimeter = side12 + side23 + side31;

        return perimeter;
    }

    setFirstPointCoordinates(x1, y1)
    {
        this.x1 = Number(x1);
        this.y1 = Number(y1);
    }

    setSecondPointCoordinates(x2, y2)
    {
        this.x2 = Number(x2);
        this.y2 = Number(y2);
    }

    setThirdPointCoordinates(x3, y3)
    {
        this.x3 = Number(x3);
        this.y3 = Number(y3);
    }

    getCoordinateX1()
    {
        return this.x1;
    }

    getCoordinateX2()
    {
        return this.x2;
    }

    getCoordinateX3()
    {
        return this.x3;
    }

    getCoordinateY1()
    {
        return this.y1;
    }

    getCoordinateY2()
    {
        return this.y2;
    }

    getCoordinateY3()
    {
        return this.y3;
    }

    draw()
    {
        var canvas = document.getElementById("drawing_area");
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.strokeStyle = this.prototype.getOutlineColor();
        ctx.fillStyle = this.prototype.getFillColor();
        ctx.lineWidth = this.prototype.getOutlineThickness() * 2;
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x3, this.y3);
        ctx.lineTo(this.x1, this.y1);
        ctx.stroke();
        ctx.fill();
    }
}