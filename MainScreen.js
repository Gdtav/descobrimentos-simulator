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

    //definicao do background
    let bg = new Image();
    let background = new createjs.Bitmap(bg);
    bg.src = "Images/rsz_sat.jpg";

    //criacao dos territorios
    let bAcores = new Button(100,100,10,10,"",{round: 5, fill: "red", },{}, {color: "orange", alpha: 0.7}, click);
    let bBojador = new Button(405,175,10,10,"",{round: 5, fill: "red", },{}, {color: "orange", alpha: 0.7}, click);
    let bMadeira = new Button(375,120,10,10,"",{round: 5, fill: "red", },{}, {color: "orange", alpha: 0.7}, click);
    let bCaboverde = new Button(320,260,10,10,"",{round: 5, fill: "red", },{}, {color: "orange", alpha: 0.7}, click);
    let bAngola = new Button(650,500,10,10,"",{round: 5, fill: "red", },{}, {color: "orange", alpha: 0.7}, click);
    //inicializacao dos objetos do jogo

    let bojador = new Territory([],false,"Bojador", "");
    let acores = new Territory([], false, "Açores", "");
    let madeira = new Territory([], false, "Madeira", "");
    let caboverde = new Territory([], false, "Cabo Verde", "");
    let angola = new Territory([], false, "Angola", "");
    
    //gestao do stage
    stage.addChild(background);
    stage.addChild(bBojador);
    stage.addChild(bMadeira);
    stage.addChild(bAcores);
    stage.addChild(bCaboverde);
    stage.addChild(bAngola);

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);
}