"use strict";
window.addEventListener("load", testing);

function testing() {
    let canvas = document.getElementById("canvas");
    let h = canvas.height;
    let w = canvas.width;
    let stage = new createjs.Stage(canvas);
    stage.enableMouseOver();
    let context = stage.canvas.getContext("2d");
    context.webkitImageSmoothingEnabled = context.mozImageSmoothingEnabled = true;

    let nav = new Navigation(test1);

    stage.addChild(nav);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}


function main() {

    let char;

    let canvas = document.getElementById("canvas");
    let h = canvas.height;
    let w = canvas.width;

    let selectedTile;



    let stop = function () {
        moving = false;
        hexg.updateClickable(char);
        let text = new createjs.Text(String(selectedTile.cost), "20px Helvetica", "red");
        text.x = 0;
        text.y = 0;
        char.addChild(text);
        let clean = function(){char.removeChild(text)};
        createjs.Tween.get(text).to({y:-tilesize,alpha:0},1000).call(clean);
    };

    let tilesize = 75;

    let tileClick = function (ev) {
        if(ev.currentTarget.clickable)
            char.moveTo(ev.currentTarget);
        /*
        if (!moving && !inmenu && ev.currentTarget.clickable) {
            inmenu = true;
            hexg.disableClickable();
            selectedTile = ev.currentTarget;
            menu.show(1000);
        }
        */
    };

    let move = function () {
        moving = true;
        char.hex_x = selectedTile.hex_x;
        char.hex_y = selectedTile.hex_y;
        selectedTile.dispatchEvent(new Event("mouseout"));
        createjs.Tween.get(char).to({
            x: selectedTile.x,
            y: selectedTile.y
        }, dist(char.x, char.y, selectedTile.x, selectedTile.y), createjs.Ease.sineInOut).call(stop);
    };

    let yesClick = function () {
        inmenu = false;
        menu.hide(250).call(move);
    };

    let noClick = function () {
        inmenu = false;
        menu.hide(250).call(stop);
    };

    let moving = false;
    let inmenu = false;

    let margin = 100;

    let yesButton = new Button(0, 0, 400, 100, "Yes", {
        fill: "turquoise",
        stroke: "black",
        round: 5
    }, {font: "Helvetica", size: "30", color: "black"}, {color: "green", alpha: 0.5}, yesClick);
    let noButton = new Button(0, 150, 400, 100, 'bananas', {
        fill: "turquoise",
        stroke: "black",
        round: 5
    }, {font: "Helvetica", size: "30", color: "black"}, {color: "green", alpha:0.5},noClick);

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
            hexg.newHex(i, j, Math.round(Math.random()*40), {gold: 10}, tileClick);
    }

    char = new Unit(tilesize, 0, 0, 0, 0, "Images/boat.png",hexg);

    let navArea = new NavArea(hexg, "Images/sat.jpg", {x: -2250, y: -1000, scale: 1.2});

    navArea.addChild(char);
    stage.addChild(navArea);
    stage.addChild(menu);

    hexg.updateClickable(char);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

}