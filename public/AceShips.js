class AceShip extends PIXI.Container {
    constructor(name, shipClass, x = 0, y = 0, color = 'white', visible = true) {
        super();
        this.name = name;
        this.shipClass = shipClass;
        this.x = x;
        this.y = y;
        //this.position.set(x, y);
        this.vx = 0;
        this.vy = 0;
//        this.pivot.x = this.width / 2;
//        this.pivot.y = this.height / 2;
        this.color = color;
        this.visible = visible;
        this.circular = true;
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
        //console.debug(this.name + ' moved to ' + this.x + ', ' + this.y)
    }
    drawShip(path) {
        const graphic = this.graphic;
        graphic.clear();
        graphic.lineStyle(1, this.color);
        graphic.beginFill(this.color);
        //graphic.drawRect(this.x, this.y, 17, 10);
        graphic.position.set(this.x, this.y);
        graphic.drawPolygon(path);
        graphic.endFill();
        graphic.pivot.x = graphic.width / 2;
        graphic.pivot.y = graphic.height / 2;
        console.log('drawShip', this.x, this.y, graphic.width, graphic.height);
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
        this.drawShip(path);
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
        this.drawShip(path);
    }

    drawMine() {
        const path = [
            this.x - 8, this.y + 10,
            this.x + 8, this.y + 10,
            this.x, this.y
        ];
        this.drawShip(path);
    }

    select(pointer) {
        if (pointer.isDown) {
            if (pointer.isDown && pointer.hitTestSprite(this)) {
                this.selected = true;
                this.alpha = 0.5;
            } else {
                this.selected = false;
                this.alpha = 1.0;
            }
        }
    }
    fire() {
        // if (this.shipClass === 'frigate') {
        //     this.fireFrigate();
        // } else if (this.shipClass === 'battleship') {
        //     this.fireBattleShip();
        // }
        //console.debug(this.name + ' fired!');
    }
}

class AceManager {
    constructor(pointer) {
        this.pointer = pointer
        this.ships = [];
        this.mines = [];
    }
    addShip(ship) {
        this.ships.push(ship);
    }
    moveShips() {
        this.ships.forEach((ship) => {
            ship.move();
        });
    }
    addMine(mine) {
        this.mines.push(mine);
    }
    fireMines() {
        this.mines.forEach((mine) => {
            mine.fire();
        });
    }
    fireShips() {
        this.ships.forEach((ship) => {
            ship.fire();
        });
    }
    selectShips() {
        this.ships.forEach((ship) => {
            ship.select(this.pointer);
        });
    }
    update() {
        this.selectShips();
        this.fireShips();
        this.moveShips();
    }
}