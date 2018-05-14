"use strict";

function click() {
    alert("teste");
    return undefined;
}

class MainScreen extends createjs.Container {
    constructor(territories, backgr, stats) {
        super();
        this.territories = territories;
        let bg = new Image();
        let background = new createjs.Bitmap(bg);
        bg.src = backgr;
        this.addChild(background);
        for (let i = 0; i < territories.length; i++) {
            this.addChild(territories[i].button);
        }
        let hud = new createjs.Container();
    }

}
