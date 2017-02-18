var STANDART_FILL_COLOR = "#40AAF1";
var STANDART_OUTLINE_COLOR = "#000000";
var STANDART_OUTLINE_THICKNESS = 4;

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