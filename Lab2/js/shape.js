class Shape
{
    constructor()
    {
        this.fillColor = "#00FFBB";
        this.outlineColor = "#000000";
        this.outlineThickness = 10;
    }

    setFillColor(color)
    {
        this.fillColor = color;
    }

    setOutlineColor(color)
    {
        this.outlineColor = color;
    }

    getFillColor()
    {
        return this.fillColor;
    }

    getOutlineColor()
    {
        return this.outlineColor;
    }
}