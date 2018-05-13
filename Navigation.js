"use strict";

class NavArea extends createjs.Container {
    constructor(hexGrid, background, propsBackground, units) {
        super();
        this.hexGrid = hexGrid;
        this.background = new createjs.Bitmap(background);
        this.background.x = propsBackground.x;
        this.background.y = propsBackground.y;
        this.background.scale = propsBackground.scale;
        this.addChild(this.background);
        this.addChild(this.hexGrid)
    }
}

class Navigation extends createjs.Container {
    constructor(expedition, stats) {
        super();

        this.stats = Object.assign({},stats);

        let tileClick = function (ev) {
            let tile = ev.currentTarget;
            if (tile.clickable) {
                if (tile.menu !== undefined)
                    tile.menu.show(1000);
                else {
                    let finish_move = function () {
                        this.stats.hp -= tile.cost;
                        bar.update(this.stats.hp);
                        for (let i = 0; i < enemies.length; i++)
                            enemies[i].move();
                        hexg.updateClickable(char);
                    };
                    char.moveTo(tile).call(finish_move);
                }
            }
        };
        let hexg = new HexGrid(expedition.tilesize, expedition.tint, expedition.frame);
        for (let i = 0; i < expedition.hexmap.length; i++) {
            let tile = expedition.hexmap[i];
            hexg.newHex(tile.x, tile.y, tile.cost, tile.dev, tile.prize, tileClick);
        }
        let char = new Unit(expedition.tilesize, expedition.start_x, expedition.start_y, expedition.boatImg, hexg);

        let navArea = new NavArea(hexg, expedition.background, expedition.background_properties);

        let enemies = [];
        for (let i = 0; i < expedition.enemies.length; i++){
            let enemy = expedition.enemies[i];
            enemy = new Enemy(expedition.tilesize,enemy.x,enemy.y,enemy.img,hexg,char,enemy.radar,enemy.firepower,enemy.hp,enemy.prize);
            enemies.push(enemy);
            navArea.addChild(enemy);
        }

        navArea.addChild(char);
        this.addChild(navArea);

        let hud = new createjs.Container();
        let bar = new Bar(10,200,100,10,this.stats.hp,"red");
        hud.addChild(bar);

        this.addChild(hud);

        hexg.updateClickable(char);
    }
}