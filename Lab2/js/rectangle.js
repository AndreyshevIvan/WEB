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

    getAreaSize()
    {
        var sideX = Math.abs(this.x1 - this.x2);
        var sideY = Math.abs(this.y1 - this.y2);
        var areaSize = sideX * sideY;

        return areaSize;
    }

    getPerimeter()
    {
        var sideX = Math.abs(this.x1 - this.x2);
        var sideY = Math.abs(this.y1 - this.y2);
        var perimeter = 2 * (sideX + sideY);

        return perimeter;
    }

    getCoordinateX1()
    {
        return this.x1;
    }

    getCoordinateX2()
    {
        return this.x2;
    }

    getCoordinateY1()
    {
        return this.y1;
    }

    getCoordinateY2()
    {
        return this.y2;
    }

    draw()
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