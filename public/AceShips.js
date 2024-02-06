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
        this.configureHandlers();
    }
    configureHandlers() {
        this.onclick = (event) => {
            console.log('clicked', this.name);
        };
        this.onglobalmousemove = (event) => {
            console.log('globalmousemove', this.name);
        };
        this.onglobalpointermove = (event) => {
            console.log('globalpointermove', this.name);
        };
        this.onglobaltouchmove = (event) => {
            console.log('globaltouchmove', this.name);
        };
        this.onmousedown = (event) => {
            console.log('mousedown', this.name);
        };
        this.onmousenter = (event) => { console.log('mouseenter', this.name) };
        this.onmouseleave = (event) => { console.log('mouseleave', this.name) };
        this.onmousemove = (event) => { console.log('mousemove', this.name) };
        this.onmouseout = (event) => { console.log('mouseout', this.name) };
        this.onmouseover = (event) => { console.log('mouseover', this.name) };
        this.onmouseup = (event) => { console.log('mouseup', this.name) };
        this.onmouseupoutside = (event) => { console.log('mouseupoutside', this.name) };
        this.onpointercancel = (event) => { console.log('pointercancel', this.name) };
        this.onpointerdown = (event) => { console.log('pointerdown', this.name) };
        this.onpointerenter = (event) => { console.log('pointerenter', this.name) };
        this.onpointerleave = (event) => { console.log('pointerleave', this.name) };
        this.onpointermove = (event) => { console.log('pointermove', this.name) };
        this.onpointerout = (event) => { console.log('pointerout', this.name) };
        this.onpointerover = (event) => { console.log('pointerover', this.name) };
        this.onpointertap = (event) => { console.log('pointertap', this.name) };
        this.onpointerupoutside = (event) => { console.log('pointerupoutside', this.name) };
        this.onrightclick = (event) => { console.log('rightclick', this.name) };
        this.onrightdown = (event) => { console.log('rightdown', this.name) };
        this.onrightup = (event) => { console.log('rightup', this.name) };
        this.onrightupoutside = (event) => { console.log('rightupoutside', this.name) };
        this.ontap = (event) => { console.log('tap', this.name) };
        this.ontouchcancel = (event) => { console.log('touchcancel', this.name) };
        this.ontouchend = (event) => { console.log('touchend', this.name) };
        this.ontouchendoutside = (event) => { console.log('touchendoutside', this.name) };
        this.ontouchmove = (event) => { console.log('touchmove', this.name) };
        this.ontouchstart = (event) => { console.log('touchstart', this.name) };
        this.onwheel = (event) => { console.log('wheel', this.name) };
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
        this.hitArea = new PIXI.Polygon(path);
        this.interactive = true;
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
        this.moveShips();
    }
}