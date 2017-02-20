var STANDART_FILL_COLOR = "#3498DB";
var STANDART_OUTLINE_COLOR = "#2C3E50";
var STANDART_OUTLINE_THICKNESS = 10;

class Shape
{
    constructor()
    {
        this.fillColor = STANDART_FILL_COLOR;
        this.outlineColor = STANDART_OUTLINE_COLOR;
        this.outlineThickness = STANDART_OUTLINE_THICKNESS;
    }

    setFillColor(color)
    {
        this.fillColor = color;
    }

    setOutlineColor(color)
    {
        this.outlineColor = color;
    }

    setOutlineThickness(outlineThickness)
    {
        this.outlineThickness = outlineThickness;
    }

    getFillColor()
    {
        return this.fillColor;
    }

    getOutlineColor()
    {
        return this.outlineColor;
    }

    getOutlineThickness()
    {
        return this.outlineThickness;
    }
}