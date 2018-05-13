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

        let tileClick = function (ev) {
            let tile = ev.currentTarget;
            if (tile.clickable) {
                if (tile.menu !== undefined)
                    tile.menu.show(1000);
                else {
                    let enemy_move = function () {
                        for (let i = 0; i < enemies.length; i++)
                            enemies[i].move();
                    };
                    char.moveTo(tile).call(enemy_move);
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
            enemy = new Enemy(expedition.tilesize,enemy.x,enemy.y,enemy.img,hexg,char,4,enemy.firepower,enemy.hp,enemy.prize);
            enemies.push(enemy);
            navArea.addChild(enemy);
        }

        navArea.addChild(char);
        this.addChild(navArea);

        hexg.updateClickable(char);
    }
}