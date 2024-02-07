class AceShip extends PIXI.Container {
    constructor(name, shipClass, x = 0, y = 0, pointer, tink, color = 'white', visible = true) {
        super();
        this.pointer = pointer;
        this.tink = tink;
        this.selected = false;
        this.name = name;
        this.shipClass = shipClass;
        //this.x = x;
        //this.y = y;
        this.position.set(x, y);
        this.vx = 0;
        this.vy = 0;
        this.pivot.x = this.width / 2;
        this.pivot.y = this.height / 2;
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
        this.configureHandlers();
    }
    select() {
        this.selected = !this.selected;
        if (this.selected) {
            this.graphic.alpha = 0.5;
        } else {
            this.graphic.alpha = 1;
        }
    }
    configureHandlers() {
        // this.onclick = (event) => {
        //     console.log('clicked', this.name);
        //     this.select();
        // };
        // this.onmousenter = (event) => { console.log('mouseenter', this.name); this.pointer.cursor = 'pointer'; };
        // this.onmouseleave = (event) => { console.log('mouseleave', this.name); this.pointer.cursor = 'default'; };
        // this.onmouseout = (event) => { console.log('mouseout', this.name); this.pointer.cursor = 'default'; };
        // this.onmouseover = (event) => { console.log('mouseover', this.name); this.pointer.cursor = 'pointer'; };
        // this.onmouseup = (event) => { console.log('mouseup', this.name); };
        this.tink.makeInteractive(this);
        this.press = (event) => {
            console.log('pressed', this.name);
            this.select();
        };
        this.release = (event) => {
            console.log('released', this.name);
        };
        this.tap = (event) => {
            console.log('tapped', this.name);
        };
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
        graphic.hitArea = new PIXI.Polygon(path);
        //graphic.interactive = true;
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
}

class AceManager {
    constructor(pointer) {
        this.pointer = pointer;
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
    update() {
        this.moveShips();
    }
}