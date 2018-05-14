"use strict";

window.addEventListener("load", mainscreen);

function click() {
    alert("teste");
    return undefined;
}

function mainscreen() {
    let canvas = document.getElementById("canvas");
    let w = canvas.width = 1280;
    let h = canvas.height = 720;
    let stage = new createjs.Stage(canvas);
    stage.enableMouseOver();

    //criacao dos territorios
    let bAcores = new TerritoryButton(100, 100, click);
    let bBojador = new TerritoryButton(405, 175, click);
    let bMadeira = new TerritoryButton(375, 120, click);
    let bCaboverde = new TerritoryButton(320, 260, click);
    let bAngola = new TerritoryButton(650, 500, click);

    //inicializacao dos objetos do jogo
    let bojador = new Territory([], false, "Bojador", "", bBojador);
    let acores = new Territory([], false, "Açores", "", bAcores);
    let madeira = new Territory([], false, "Madeira", "", bMadeira);
    let caboverde = new Territory([], false, "Cabo Verde", "", bCaboverde);
    let angola = new Territory([], false, "Angola", "", bAngola);

    let main = new MainScreen([bojador, acores, madeira, caboverde, angola], "Images/rsz_sat.jpg", {});
    stage.addChild(main);
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);
}

