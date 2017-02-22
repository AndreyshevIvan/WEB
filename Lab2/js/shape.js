var STANDART_FILL_COLOR = "#3498DB";
var STANDART_OUTLINE_COLOR = "#2C3E50";
var STANDART_OUTLINE_THICKNESS = 10;

function Shape()
{

    this.fillColor = STANDART_FILL_COLOR;
    this.outlineColor = STANDART_OUTLINE_COLOR;
    this.outlineThickness = STANDART_OUTLINE_THICKNESS;

    this.setFillColor = function(color)
    {
        this.fillColor = color;
    }

    this.setOutlineColor = function(color)
    {
        this.outlineColor = color;
    }

    this.setOutlineThickness = function(outlineThickness)
    {
        this.outlineThickness = outlineThickness;
    }

    this.getFillColor = function()
    {
        return this.fillColor;
    }

    this.getOutlineColor = function()
    {
        return this.outlineColor;
    }

    this.getOutlineThickness = function()
    {
        return this.outlineThickness;
    }
}