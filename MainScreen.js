"use strict";

function click(){
    alert("teste");
    return undefined;
}

function mainscreen() {
    let canvas = document.getElementById("canvas");
    let w = canvas.width = 1280;
    let h = canvas.height = 720;
    let stage = new createjs.Stage(canvas);

    stage.enableMouseOver();
    let bg = new Image();
    let background = new createjs.Bitmap(bg);
    bg.src = "Images/rsz_sat.jpg";
    let bojador = new Button(405,175,10,10,"",{round: 5, fill: "red", },{}, {color: "orange", alpha: 0.7}, click);
    let angola = new Button(650,500,10,10,"",{round: 5, fill: "red", },{}, {color: "orange", alpha: 0.7}, click);
    stage.addChild(background);
    stage.addChild(bojador);
    stage.addChild(angola);

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);
}