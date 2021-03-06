"use strict";

window.addEventListener("load", main);

function startGame() {
    mainscreen();
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
    if (confirm("Tem a certeza que deseja sair?"))
        window.close();
}

function main() {
    let canvas = document.getElementById("canvas");
    let w = canvas.width = 1280;
    let h = canvas.height = 720;
    let stage = new createjs.Stage(canvas);

    stage.enableMouseOver();

    let title = new createjs.Text("Descobrimentos\n\tSimulator", "100px Pirata One", "black");
    title.x = 200;
    title.y = 50;
    let bg = new Image();
    let background = new createjs.Bitmap(bg);
    bg.onload = function () {
        background.scale = w / bg.naturalWidth;
    };
    bg.src = "Images/backgroundMainMenu.jpg";
    let playButton = new Button(300, 300, 140, 60, "Jogar", {round: 5}, {
        font: "Pirata One",
        size: "50"
    }, {color: "yellow", alpha: 0.3}, startGame);
    let optionsButton = new Button(300, 380, 180, 60, "Opções", {round: 5}, {
        font: "Pirata One",
        size: "50"
    }, {color: "yellow", alpha: 0.3}, optionsMenu);
    let creditsButton = new Button(300, 470, 180, 60, "Créditos", {round: 5}, {
        font: "Pirata One",
        size: "50"
    }, {color: "yellow", alpha: 0.3}, showCredits);
    let exitButton = new Button(300, 540, 100, 60, "Sair", {round: 5}, {
        font: "Pirata One",
        size: "50"
    }, {color: "yellow", alpha: 0.3}, exit);
    let chest = new Image();
    let treasureChest = new createjs.Bitmap(chest);
    chest.onload = function () {
        treasureChest.scale = 0.5;
    };
    chest.src = "Images/chest.png";
    treasureChest.x = 900;
    treasureChest.y = 500;
    stage.addChild(background);
    stage.addChild(title);
    stage.addChild(playButton);
    stage.addChild(optionsButton);
    stage.addChild(creditsButton);
    stage.addChild(exitButton);
    stage.addChild(treasureChest);

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);
    treasureChest.addEventListener("click", function () {
        alert("teste");
    });
}