class AceShip extends PIXI.Container {
    constructor(name, shipClass, x = 0, y = 0, color = 'white', visible = true) {
        super();
        this.name = name;
        this.shipClass = shipClass;
        this.position.set(x, y);
        this.vx = 0;
        this.vy = 0;
        this.color = color;
        this.visible = visible;
        const graphic = new PIXI.Graphics();

        this.graphic = graphic;
        this.addChild(this.graphic);
        if (this.shipClass === 'frigate') {
            this.drawFrigate();
        } else if (this.shipClass === 'battleship') {
            this.drawBattleShip();
        } else if (this.shipClass === 'mine') {
            this.drawMine();
        }
        this.nameGraphic = new PIXI.Text(this.name, { fontFamily: 'Arial', fontSize: 6, fill: 'black', align: 'center' });
        graphic.addChild(this.nameGraphic);
    }
    move(vX = 0, vY = 0) {
        this.x += this.vx + vX;
        this.y += this.vy + vY;
    }
    drawFrigate() {
        const path = [
            this.x, this.y,
            this.x + 10, this.y,
            this.x + 14, this.y - 4,
            this.x + 10, this.y - 8,
            this.x, this.y - 8,
            this.x - 4, this.y - 4
        ]
        const graphic = this.graphic;
        graphic.clear();
        graphic.lineStyle(1, this.color);
        graphic.beginFill(this.color);
        //graphic.drawRect(this.x, this.y, 17, 10);
        graphic.drawPolygon(path);
        graphic.position.set(this.x, this.y);
        graphic.endFill();
    }
    drawBattleShip() {
        const path = [
            this.x, this.y,
            this.x + 25, this.y,
            this.x + 31, this.y - 5,
            this.x + 25, this.y - 10,
            this.x, this.y - 10,
            this.x - 6, this.y - 5
        ]
        const graphic = this.graphic;
        graphic.clear();
        graphic.lineStyle(1, this.color);
        graphic.beginFill(this.color);
        graphic.drawPolygon(path);
        graphic.position.set(this.x, this.y);
        graphic.endFill();
    }

    drawMine() {
        const path = [
            this.x - 8, this.y + 10,
            this.x + 8, this.y + 10,
            this.x, this.y
        ];
        const graphic = this.graphic;
        graphic.clear();
        graphic.lineStyle(1, this.color);
        graphic.beginFill(this.color);
        graphic.drawPolygon(path);
        graphic.position.set(this.x, this.y);
        graphic.endFill();
    }
}

class AceManager {
    constructor() {
        this.ships = [];
    }
    addShip(ship) {
        this.ships.push(ship);
    }
    moveShips() {
        this.ships.forEach((ship) => {
            ship.move();
        })
    }
}