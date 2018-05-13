const hex_fac = Math.sqrt(3);

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function angle(vertex_x, vertex_y, p1_x, p1_y, p2_x, p2_y) {
    function dist2(x1, y1, x2, y2) {
        return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    }

    let P12 = dist2(vertex_x, vertex_y, p1_x, p1_y), P13 = dist2(vertex_x, vertex_y, p2_x, p2_y),
        P23 = dist2(p1_x, p1_y, p2_x, p2_y);
    return Math.acos(Math.max(-1,Math.min(1,(P12 + P13 - P23) / (2 * Math.sqrt(P12 * P13)))));
}

function convertToXY(tilesize, hex_x, hex_y) {
    let x = hex_x * 3 * tilesize + (3 / 2) * tilesize * (hex_y % 2);
    let y = hex_y * hex_fac * tilesize / 2;
    return {x: x, y: y};
}

class Hexagon extends createjs.Container {
    constructor(tilesize, hex_x, hex_y, tint = undefined, fill = undefined, clickable = false) {
        super();
        let self = this;
        this.tilesize = tilesize;
        this.hex_x = hex_x;
        this.hex_y = hex_y;
        let pos = convertToXY(tilesize, hex_x, hex_y);
        this.x = pos.x;
        this.y = pos.y;
        this.clickable = clickable;
        if (typeof(fill) === "object") {
            if (typeof(fill.img) !== "undefined") {
                let img = new Image();
                this.map = new createjs.Bitmap(img);
                img.onload = function () {
                    self.map.scale = Math.min((tilesize * 2) / img.naturalWidth, (tilesize * hex_fac) / img.naturalHeight);
                    self.map.x = -self.map.getBounds().width * self.map.scale / 2;
                    self.map.y = -self.map.getBounds().height * self.map.scale / 2;
                    self.addChild(self.map);
                };
                img.src = fill.img;
            }
            if (typeof(fill.frame) !== "undefined") {
                let frm = new createjs.Shape();
                frm.graphics.beginStroke(fill.frame).drawPolyStar(0, 0, tilesize, 6, 0, 120);
                this.addChild(frm);
            }
        }

        let hit = new createjs.Shape();
        hit.graphics.beginFill("rgba(0,0,0,255)").drawPolyStar(0, 0, tilesize, 6, 0, 120);
        hit.x = 0;
        hit.y = 0;
        this.hitArea = hit;
        let tintTile = function (ev) {
            if (self.clickable && ev.type === "mouseover")
                createjs.Tween.get(self.tint).to({alpha: self.tintAlpha}, 75);
            else
                createjs.Tween.get(self.tint).to({alpha: 0}, 75);
        };

        if (typeof(tint) !== "undefined") {
            this.tintAlpha = tint.alpha;
            this.tint = new createjs.Shape();
            this.tint.graphics.beginFill(tint.color).drawPolyStar(0, 0, tilesize, 6, 0, 120);
            this.tint.alpha = 0;
            this.tint.x = 0;
            this.tint.y = 0;
            this.addEventListener("mouseover", tintTile);
            this.addEventListener("mouseout", tintTile);
            this.addChild(this.tint);
        }
    }
}

class Tile extends Hexagon {
    constructor(tilesize, hex_x, hex_y, cost, dev, prize, tint = undefined, frame, img, clickable = false, menu) {
        super(tilesize, hex_x, hex_y, tint, {frame: frame, img: img}, false);
        this.filled = false;
        this.cost = cost;
        this.dev = dev;
        this.prize = prize;
        this.menu = menu;
    }
}

class Unit extends Hexagon {
    constructor(tilesize, hex_x, hex_y, img, hexg) {
        super(tilesize, hex_x, hex_y, undefined, {img: img}, true);
        this.hexg = hexg;
        this.curTile = hexg.getTile(hex_x, hex_y);
        this.curTile.filled = true;
    }

    moveTo(tile) {
        this.hexg.disableClickable();
        let self = this;
        let stop = function () {
            self.hexg.updateClickable(self);
            let text = new createjs.Text(String(-tile.cost), "20px Helvetica", "red");
            text.x = 0;
            text.y = 0;
            self.addChild(text);
            let clean = function () {
                self.removeChild(text)
            };
            createjs.Tween.get(text).to({y: -50, alpha: 0}, 500).call(clean);
        };

        this.hex_x = tile.hex_x;
        this.hex_y = tile.hex_y;
        this.curTile.filled = false;
        this.curTile = tile;
        tile.filled = true;
        tile.dispatchEvent(new Event("mouseout"));
        return createjs.Tween.get(this).to({
            x: tile.x,
            y: tile.y
        }, 1000, createjs.Ease.sineInOut).call(stop);
    }
}

class Enemy extends Unit {
    constructor(tilesize, hex_x, hex_y, img, hexg, char, radar, firepower, hp, prize) {
        super(tilesize, hex_x, hex_y, img, hexg);
        this.char = char;
        this.radar = radar;
        this.firepower = firepower;
        this.hp = hp;
        this.prize = prize;
    }

    move() {
        let final = undefined;
        let tiles = this.hexg.getAdjacent(this.hex_x, this.hex_y);
        if (dist(this.char.x, this.char.y, this.x, this.y) < this.radar * this.tilesize) {
            let ang = 360;
            for (let i = 0; i < tiles.length; i++) {
                let a = angle(this.x, this.y, this.char.x, this.char.y, tiles[i].x, tiles[i].y);
                if (a < ang) {
                    ang = a;
                    final = tiles[i];
                }
            }
            console.log(ang);
        }
        else {
            final = tiles[Math.floor(Math.random() * (tiles.length))]

        }
        if (final !== undefined) {
            this.curTile.filled = false;
            this.curTile = final;
            final.filled = true;
            this.hex_x = final.hex_x;
            this.hex_y = final.hex_y;
            createjs.Tween.get(this).to({
                x: final.x,
                y: final.y
            }, 1000, createjs.Ease.sineInOut).call(stop);
        }
    }
}

class HexGrid extends createjs.Container {
    constructor(tilesize, tint, frame) {
        super();
        this.tilesize = tilesize;
        this.frame = frame;
        this.tint = tint;
        this.tiles = [];
    }

    /*
    static isAdjacent(t1, t2) {
        switch (t1.hex_y - t2.hex_y) {
            case 2:
            case -2:
                return t1.hex_x === t2.hex_x;
            case 1:
            case -1:
                return t1.hex_x === t2.hex_x || (t2.hex_x === t1.hex_x + 1 && t1.hex_y % 2 === 1) || (t2.hex_x === t1.hex_x - 1 && t1.hex_y % 2 === 0);
        }
        return false;
    }

    static isAdjacent(hex_x, hex_y, tile) {
        switch (tile.hex_y - hex_y) {
            case 2:
            case -2:
                return tile.hex_x === hex_x;
            case 1:
            case -1:
                return tile.hex_x === hex_x || (hex_x === tile.hex_x + 1 && tile.hex_y % 2 === 1) || (hex_x === tile.hex_x - 1 && tile.hex_y % 2 === 0);
        }
        return false;
    }
    */

    static isAdjacent(hex_x1, hex_y1, hex_x2, hex_y2) {
        switch (hex_y1 - hex_y2) {
            case 2:
            case -2:
                return hex_x1 === hex_x2;
            case 1:
            case -1:
                return hex_x1 === hex_x2 || (hex_x2 === hex_x1 + 1 && hex_y1 % 2 === 1) || (hex_x2 === hex_x1 - 1 && hex_y1 % 2 === 0);
        }
        return false;
    }

    updateClickable(char) {
        for (let i = 0; i < this.tiles.length; i++)
            this.tiles[i].clickable = HexGrid.isAdjacent(char.hex_x, char.hex_y, this.tiles[i].hex_x, this.tiles[i].hex_y) && !this.tiles[i].filled;
    }

    disableClickable() {
        for (let i = 0; i < this.tiles.length; i++)
            this.tiles[i].clickable = false;
    }

    newHex(hex_x, hex_y, cost, dev, prize, click, img = undefined, menu = undefined) {
        let hex = new Tile(this.tilesize, hex_x, hex_y, cost, dev, prize, this.tint, this.frame, img, menu);
        this.tiles.push(hex);
        hex.addEventListener("click", click);
        this.addChild(hex);
    }

    getAdjacent(hex_x, hex_y) {
        let tiles = [];
        for (let i = 0; i < this.tiles.length; i++) {
            if (!this.tiles[i].filled && HexGrid.isAdjacent(hex_x, hex_y, this.tiles[i].hex_x, this.tiles[i].hex_y))
                tiles.push(this.tiles[i]);
        }
        return tiles;
    }

    getTile(hex_x, hex_y) {
        for (let i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].hex_x === hex_x && this.tiles[i].hex_y === hex_y)
                return this.tiles[i];
        }
        return null;
    }
}