"use strict";

function click() {
    alert("teste");
    return undefined;
}

class MainScreen extends createjs.Container {
    constructor(territories, backgr, stats, timeout) {
        super();
        this.territories = territories;
        let bg = new Image();
        let background = new createjs.Bitmap(bg);
        bg.src = backgr;
        this.addChild(background);
        for (let i = 0; i < territories.length; i++) {
            let t = territories[i];

            let menu = new TerritoryMenu(t.x,t.y,300,30,20,t);
            let openMenu = function () {
                menu.show(500);
            };
            let button = new TerritoryButton(t.x,t.y,openMenu);
            this.addChildAt(button,1);
            this.addChild(menu);
        }
        let hud = new HUD(200,30,stats);
        let updateResources = function () {
            console.log("updating...");
            for (let i = 0; i < territories.length; i++)
                territories[i].updateResources();
            hud.updateCounters();
        };

        window.setInterval(updateResources,timeout);
        this.addChild(hud);
    }

}
