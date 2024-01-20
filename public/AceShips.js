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
        }
        this.nameGraphic = new PIXI.Text(this.name, {fontFamily: 'Arial', fontSize: 6, fill: 'black', align: 'center'});
        graphic.addChild(this.nameGraphic);
    }
    drawFrigate() {
        const graphic = this.graphic;
        graphic.clear();
        graphic.lineStyle(1, this.color);
        graphic.beginFill(this.color);
        graphic.drawRect(this.x, this.y, 17, 10);
        graphic.endFill();
   }
   drawBattleShip() {
       const graphic = this.graphic;
       graphic.clear();
       graphic.lineStyle(1, this.color);
       graphic.beginFill(this.color);
       graphic.drawRect(this.x, this.y, 25, 10);
       graphic.endFill();
   }
   move(vX = 0, vY = 0) {
       this.x += this.vx + vX;
       this.y += this.vy + vY;
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