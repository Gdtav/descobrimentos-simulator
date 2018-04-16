"use strict";

window.addEventListener("load", main);

function startGame() {
    alert("teste1");
    return undefined;
}

function optionsMenu() {
    alert("teste2");
    return undefined;
}

function showCredits() {
    alert("teste3");
    return undefined;

}

function exit() {

    alert("teste4");
    return undefined;
}

function main() {
    let canvas = document.getElementById("canvas");
    let w = canvas.width = 1280;
    let h = canvas.height = 720;
    let stage = new createjs.Stage(canvas);
    let title = new createjs.Text("Descobrimentos\n\tSimulator", "100px Pirata One", "black");
    title.x = 200;
    title.y = 50;
    let bg = new Image();
    let background = new createjs.Bitmap(bg);
    bg.onload = function () {
        background.scale = w / bg.naturalWidth;
    };
    bg.src = "../Assets/backgroundMainMenu.jpg";
    let playButton = new Button(300, 300, 120, 60, "Jogar", {}, {
        font: "Pirata One",
        size: "50"
    }, startGame);
    let optionsButton = new Button(300, 380, 180, 60, "Opções", {}, {
        font: "Pirata One",
        size: "50"
    }, optionsMenu);
    let creditsButton = new Button(300, 470, 180, 60, "Créditos", {}, {
        font: "Pirata One",
        size: "50"
    }, showCredits);
    let exitButton = new Button(300, 540, 100, 60, "Sair", {}, {
        font: "Pirata One",
        size: "50"
    }, exit);
    let chest = new Image();
    let treasureChest = new createjs.Bitmap(chest);
    chest.onload = function () {
        treasureChest.scale = 0.5;
    };
    chest.src = "../Assets/chest.png";
    treasureChest.x = 900;
    treasureChest.y = 500;
    stage.addChild(background);
    stage.addChild(title);
    stage.addChild(playButton);
    stage.addChild(optionsButton);
    stage.addChild(creditsButton);
    stage.addChild(exitButton);
    stage.addChild(treasureChest);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
    treasureChest.addEventListener("click", function () {
        alert("teste");
    })
}