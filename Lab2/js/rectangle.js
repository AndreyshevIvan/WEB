var STANDART_RECTANGLE_LEFT_TOP_X = 20;
var STANDART_RECTANGLE_LEFT_TOP_Y = 40;

var STANDART_RECTANGLE_RIGHT_BOTTOM_X = -50;
var STANDART_RECTANGLE_RIGHT_BOTTOM_Y = 100;

class Rectangle
{
    constructor()
    {
        this.prototype = Object.create(new Shape());
        this.leftTopX = STANDART_RECTANGLE_LEFT_TOP_X;
        this.leftTopY = STANDART_RECTANGLE_LEFT_TOP_Y;
        this.rightBottomX = STANDART_RECTANGLE_RIGHT_BOTTOM_X;
        this.rightBottomY = STANDART_RECTANGLE_RIGHT_BOTTOM_Y;

        this.width = 0;
        this.height = 0;

        this.calculateSize();
    }

    calculateSize()
    {
        this.width = this.rightBottomX - this.leftTopX;
        this.height = this.rightBottomY - this.leftTopY;
    }

    setCoordinates(leftTopX, leftTopY, rightBottomX, rightBottomY)
    {
        this.leftTopX = leftTopX;
        this.leftTopY = leftTopY;
        this.rightBottomX = rightBottomX;
        this.rightBottomY = rightBottomY;
        this.calculateSize();
    }

    draw()
    {
        var canvas = document.getElementById("drawing_area");
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.strokeStyle = this.prototype.getOutlineColor();
        ctx.lineWidth = this.prototype.getOutlineThickness() * 2;
        ctx.moveTo(this.leftTopX, this.leftTopY);
        ctx.lineTo(this.leftTopX + this.width, this.leftTopY);
        ctx.lineTo(this.rightBottomX, this.rightBottomY);
        ctx.lineTo(this.rightBottomX - this.width, this.rightBottomY);
        ctx.lineTo(this.leftTopX, this.leftTopY);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillRect(this.leftTopX, this.leftTopY, this.width, this.height);
        ctx.fillStyle = this.prototype.getFillColor();
        ctx.fill();
    }
}