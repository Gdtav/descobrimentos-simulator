"use strict";

window.addEventListener("load", main);

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

class NavArea extends createjs.Container {
    constructor(hexGrid, background, propsBackground) {
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

function main() {

    let char;

    let canvas = document.getElementById("canvas");
    let h = canvas.height;
    let w = canvas.width;

    let selectedTile;

    let stage = new createjs.Stage(canvas);
    stage.enableMouseOver();

    let stop = function () {
        moving = false;
        hexg.updateClickable(char);
    };

    let tilesize = 75;

    let yesClick = function () {
        inmenu = false;
        menu.hide(250).call(move);
    };

    let noClick = function () {
        inmenu = false;
        menu.hide(250).call(stop);
    };

    let tileClick = function (ev) {
        if (!moving && !inmenu && ev.currentTarget.clickable) {
            inmenu = true;
            hexg.disableClickable();
            selectedTile = ev.currentTarget;
            menu.show(1000);
        }
    };

    function move() {
        moving = true;
        char.hex_x = selectedTile.hex_x;
        char.hex_y = selectedTile.hex_y;
        selectedTile.dispatchEvent(new Event("mouseout"));
        createjs.Tween.get(char).to({
            x: selectedTile.x,
            y: selectedTile.y
        }, dist(char.x, char.y, selectedTile.x, selectedTile.y), createjs.Ease.sineInOut).call(stop);
    }

    let moving = false;
    let inmenu = false;

    let margin = 100;

    let yesButton = new Button(0, 0, 400, 100, "Yes", {
        fill: "turquoise",
        stroke: "black",
        round: 5
    }, {font: "Helvetica", size: "30", color: "black"}, yesClick);
    let noButton = new Button(0, 150, 400, 100, "No", {
        fill: "turquoise",
        stroke: "black",
        round: 5
    }, {font: "Helvetica", size: "30", color: "black"}, noClick);

    let menu = new Menu(w - 2 * margin, h - 2 * margin, "Avançar para esta casa?", [yesButton, noButton], {
        stroke: "black",
        fill: "beige",
        b_y: -h / 2 + margin * 2
    }, {
        color: "black",
        size: 30,
        font: "Helvetica"
    });

    let hexg = new HexGrid(tilesize, {color: "rgb(255,0,0)", alpha: 0.6}, "red");
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 12; j++)
            hexg.newHex(i, j, 10, {gold: 10}, tileClick);
    }

    char = new Unit(tilesize, 0, 0, 0, 0, "Images/boat.png");

    let navArea = new NavArea(hexg, "Images/sat.jpg", {x: -2250, y: -1000, scale: 1.2});

    navArea.addChildAt(char, 1);
    stage.addChild(navArea);
    stage.addChild(menu);

    hexg.updateClickable(char);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

}