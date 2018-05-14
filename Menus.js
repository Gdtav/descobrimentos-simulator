var s_w, s_h;

window.addEventListener("load", function () {
    let canvas = document.getElementById("canvas");
    s_w = canvas.width;
    s_h = canvas.height;
});

function centerText(text) {
    text.x = -(text.getMeasuredWidth() / 2);
    text.y = -(text.getMeasuredHeight() / 2);
    return text;
}

class Button extends createjs.Container {
    constructor(x, y, w, h, text, props, textProps, tint, action) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.clickable = true;
        let graphic = new createjs.Shape();
        graphic.graphics.beginFill(props.fill).beginStroke(props.stroke).drawRoundRect(-w / 2, -h / 2, w, h, props.round);
        let textObj = centerText(new createjs.Text(text, textProps.size + "px " + textProps.font, textProps.color));
        this.addChild(graphic);
        this.addChild(textObj);
        this.addEventListener("click", action);
        let self = this;
        if (tint !== undefined) {
            let hit = new createjs.Shape();
            hit.graphics.beginFill("black").drawRoundRect(-w / 2, -h / 2, w, h, props.round)
            this.hitArea = hit;
        }
        let tintTile = function (ev) {
            console.log(text);
            if (self.clickable && ev.type === "mouseover")
                createjs.Tween.get(self.tint).to({alpha: self.tintAlpha}, 75);
            else
                createjs.Tween.get(self.tint).to({alpha: 0}, 75);
        };

        if (typeof(tint) !== "undefined") {
            this.tintAlpha = tint.alpha;
            this.tint = new createjs.Shape();
            this.tint.graphics.beginFill(tint.color).drawRoundRect(-w / 2, -h / 2, w, h, props.round);
            this.tint.alpha = 0;
            this.tint.x = 0;
            this.tint.y = 0;
            this.addEventListener("mouseover", tintTile);
            this.addEventListener("mouseout", tintTile);
            this.addChild(this.tint);
        }
    }
}

class TerritoryButton extends Button {
    constructor(x,y, action) {
        super(x,y,10,10,"",{round: 5, fill: "red", },{}, {color: "orange", alpha: 0.7},action);
    }
}

class Menu extends createjs.Container {
    constructor(w, h, title, elements, props, textProps) {
        super();
        let mainWindow = new createjs.Shape();
        mainWindow.graphics.beginStroke(props.stroke).beginFill(props.fill).drawRect(-w / 2, -h / 2, w, h);
        mainWindow.x = 0;
        mainWindow.y = 0;
        this.addChild(mainWindow);
        let banner = new createjs.Text(title, textProps.size + "px " + textProps.font, textProps.color);
        banner.textAlign = "center";
        banner.x = 0;
        banner.y = props.b_y;
        this.addChild(banner);
        for (let i = 0; i < elements.length; i++)
            this.addChild(elements[i]);
        this.hide(0);

    }

    show(time) {
        return createjs.Tween.get(this).to({alpha: 1, x: s_w / 2, y: s_h / 2}, time, createjs.Ease.sineOut);
    }

    hide(time) {
        return createjs.Tween.get(this).to({alpha: 0, x: s_w / 2, y: -s_h / 2}, time, createjs.Ease.sineIn);
    }
}

class AttackMenu extends Menu {
    constructor(char, stats, enemy, hpbar, gameOverMenu) {
        let self;
        let attack = function () {
            let shoot = function () {
                if (stats.hp > 0 && enemy.hp > 0) {
                    stats.hp -= enemy.firepower;
                    enemy.hp -= stats.firepower;
                    hpbar.update(stats.hp);
                    char.fadeText(-enemy.firepower);
                    enemy.fadeText(-stats.firepower).call(shoot);
                }
                else {
                    if (enemy.hp <= 0) {
                        enemy.die();
                    }
                }
            };
            self.hide(1000).call(shoot);
        };
        let margin = 100;
        let playerStats = new createjs.Text("Jogador:\nPoder de fogo: " + stats.firepower + "\nHP: " + stats.hp, "20px Helvetica", "black");
        playerStats.x = -300;
        playerStats.y = -200;
        let enemyStats = new createjs.Text("Inimigo:\nPoder de fogo: " + enemy.firepower + "\nHP: " + enemy.hp, "20px Helvetica", "black");
        enemyStats.x = 300;
        enemyStats.y = -200;
        let attackButton = new Button(-300, 100, 400, 100, "Atacar", {fill: "turquoise", stroke: "black", round: 5},{font:"Helvetica",size:20, color:"black"},{color: "green", alpha: 0.5},attack);
        let cancelButton = new Button(300, 100, 400, 100, "Cancelar", {fill: "turquoise", stroke: "black", round: 5},{font:"Helvetica",size:20, color:"black"},{color: "green", alpha: 0.5});
        super(s_w - 2 * margin, s_h - 2 * margin, "Avançar para esta casa?", [attackButton, cancelButton, playerStats, enemyStats], {
            stroke: "black",
            fill: "beige",
            b_y: -s_h / 2 + margin * 2
        }, {
            color: "black",
            size: 30,
            font: "Helvetica"
        });
        self = this;
        this.playerStats = playerStats;
        this.stats = stats;
    }

    updatePlayerText() {
        this.playerStats.text = "Jogador:\nPoder de fogo: " + this.stats.firepower + "\nHP: " + this.stats.hp;
    }

    show(time) {
        this.updatePlayerText();
        super.show(time)
    }
}