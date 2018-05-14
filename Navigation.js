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
        
        let curStats = stats;

        let tileClick = function (ev) {
            let target = ev.currentTarget;
            if (!char.moving && HexGrid.isAdjacent(char.hex_x,char.hex_y,target.hex_x,target.hex_y) && (target.clickable)) {
                char.moving = true;
                if (target.menu !== undefined)
                    target.menu.show(1000);
                else {
                    let finish_move = function () {
                        curStats.hp -= target.cost;
                        bar.update(curStats.hp);
                        for (let i = 0; i < hexg.enemies.length; i++)
                            hexg.enemies[i].move();
                        if (hexg.enemies.length === 0)
                            char.moving = false;
                        hexg.updateClickable(char);
                    };
                    char.moveTo(target).call(finish_move);
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

        let hud = new createjs.Container();
        let bar = new Bar(10,200,100,10,curStats.hp,"red");
        hud.addChild(bar);

        for (let i = 0; i < expedition.enemies.length; i++){
            let enemy = expedition.enemies[i];
            enemy = new Enemy(expedition.tilesize,enemy.x,enemy.y,enemy.img,hexg,char,enemy.radar,enemy.firepower,enemy.hp,enemy.prize);
            enemy.addEventListener("click",tileClick);
            enemy.menu = new AttackMenu(char,stats,enemy,bar);
            hexg.addEnemy(enemy);
        }

        hexg.addChild(char);
        this.addChild(navArea);

        this.addChild(hud);
        for (let i = 0; i < hexg.enemies.length; i++) {
            this.addChild(hexg.enemies[i].menu);
        }

        hexg.updateClickable(char);
    }
}