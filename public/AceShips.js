class AceShip extends PIXI.Graphics {
    constructor(name, shipClass, x = 0, y = 0, color, visible = true) {
        super();
        this.name = name;
        this.shipClass = shipClass;
        this.x = x;
        this.y = y;
        this.color = color;
        this.visible = visible;
    }
}
