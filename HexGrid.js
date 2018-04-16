const hex_fac = Math.sqrt(3);

class Hexagon extends createjs.Container {
    constructor(tilesize, x, y, hex_x, hex_y, tint = undefined, fill = undefined, clickable = false) {
        super();
        let self = this;
        this.hex_x = hex_x;
        this.hex_y = hex_y;
        this.x = x;
        this.y = y;
        this.clickable = clickable;
        if (typeof(fill) === "object") {
            if (typeof(fill.img) !== "undefined") {
                let img = new Image();
                this.map = new createjs.Bitmap(img);
                img.onload = function () {
                    self.map.scale = (tilesize * 2) / img.naturalWidth;
                    self.map.x = -tilesize;
                    self.map.y = -tilesize / 2 * hex_fac;
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
    constructor(tilesize, x, y, hex_x, hex_y, cost, prize, tint = undefined, frame, img, clickable = false) {
        super(tilesize, x, y, hex_x, hex_y, tint, {frame:frame, img:img}, false);
        this.cost = cost;
        this.prize = prize;
    }
}

class Unit extends Hexagon {
    constructor(tilesize, x, y, hex_x, hex_y, img){
        super(tilesize,x,y,hex_x,hex_y,undefined,{img:img})
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

    isAdjacent(t1, t2) {
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

    updateClickable(char) {
        let self = this;
        this.tiles.forEach(function (item, index) {
            item.clickable = self.isAdjacent(char, item);
        })
    }

    disableClickable() {
        this.tiles.forEach(function (item,intex) {
            item.clickable = false;
        })
    }

    newHex(hex_x, hex_y, cost, prize, click, img = undefined) {
        let x = hex_x * 3 * this.tilesize + (3 / 2) * this.tilesize * (hex_y % 2);
        let y = hex_y * hex_fac * this.tilesize / 2;
        let hex = new Tile(this.tilesize, x, y, hex_x, hex_y, cost, prize, this.tint, this.frame, img);
        this.tiles.push(hex);
        hex.addEventListener("click", click);
        this.addChild(hex);
    }
}