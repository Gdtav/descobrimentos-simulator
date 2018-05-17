function getScreenDimensions() {
    let canvas = document.getElementById("canvas");
    return {w: canvas.width, h: canvas.height};
}

function centerText(text) {
    text.x = -(text.getBounds().width / 2);
    text.y = -(text.getBounds().height / 2);
    return text;
}

class CenteredText extends createjs.Container {
    constructor(text, font, color) {
        super();
        this.textElement = centerText(new createjs.Text(text, font, color));
        this.addChild(this.textElement);
    }
}

class Sprite extends createjs.Container {

    constructor(path, x, y, size) {
        let img = new Image();
        super(img);
        this.x = x;
        this.y = y;
        let self = this;
        img.onload = function () {
            let map = new createjs.Bitmap(img);
            map.scale = Math.min(size / img.naturalWidth, size / img.naturalHeight);
            map.x = -map.getBounds().width * map.scale / 2;
            map.y = -map.getBounds().height * map.scale / 2;
            self.addChild(map);
        };
        img.src = path;
    }
}

class SpriteButton extends Sprite {
    constructor(path, x, y, size, action) {
        super(path, x, y, size);
        this.addEventListener("click", action);
    }
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
        let textObj = new CenteredText(text, textProps.size + "px " + textProps.font, textProps.color);
        this.addChild(graphic);
        this.addChild(textObj);
        this.addEventListener("click", action);
        let self = this;
        if (tint !== undefined) {
            let hit = new createjs.Shape();
            hit.graphics.beginFill("black").drawRoundRect(-w / 2, -h / 2, w, h, props.round);
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
        let size = getScreenDimensions();
        return createjs.Tween.get(this).to({alpha: 1, x: size.w / 2, y: size.h / 2}, time, createjs.Ease.sineOut);
    }

    hide(time) {
        let size = getScreenDimensions();
        return createjs.Tween.get(this).to({alpha: 0, x: size.w / 2, y: -size.h / 2}, time, createjs.Ease.sineIn);
    }
}

class Box extends createjs.Shape {
    constructor(w, h, stroke, fill, margin) {
        super();
        this.x = 0;
        this.y = 0;
        this.graphics.beginStroke(stroke).beginFill(fill).drawRect(-w / 2 - margin, -h / 2 - margin, w + 2 * margin, h + 2 * margin);
    }
}

class AttackMenu extends Menu {
    constructor(char, stats, enemy, gameOverMenu) {
        let self;
        let attack = function () {
            let shoot = function () {
                enemy.shoot();
            };
            self.hide(1000).call(shoot);
        };

        let cancel = function () {
            let clean = function () {
                char.moving = false;
            };
            self.hide(1000).call(clean);
        };

        let margin = 100;
        let box_margin = 10;

        let playerStats = new CenteredText("Jogador:\nPoder de fogo: " + stats.firepower + "\nHP: " + stats.hp, "20px Helvetica", "black");
        let boxPlayer = new Box(playerStats.getBounds().width, playerStats.getBounds().height, "black", "white", box_margin);
        let playerInfo = new createjs.Container();
        playerInfo.x = -100;
        playerInfo.y = 0;
        playerInfo.addChild(boxPlayer);
        playerInfo.addChild(playerStats);

        let enemyStats = new CenteredText("Inimigo:\nPoder de fogo: " + enemy.firepower + "\nHP: " + enemy.hp, "20px Helvetica", "black");
        let boxEnemy = new Box(enemyStats.getBounds().width, enemyStats.getBounds().height, "black", "white", box_margin);
        let enemyInfo = new createjs.Container();
        enemyInfo.x = 100;
        enemyInfo.y = 0;
        enemyInfo.addChild(boxEnemy);
        enemyInfo.addChild(enemyStats);

        let attackButton = new Button(-150, 150, 200, 60, "Atacar", {
            fill: "turquoise",
            stroke: "black",
            round: 5
        }, {font: "Helvetica", size: 20, color: "black"}, {color: "green", alpha: 0.5}, attack);
        let cancelButton = new Button(150, 150, 200, 60, "Cancelar", {
            fill: "turquoise",
            stroke: "black",
            round: 5
        }, {font: "Helvetica", size: 20, color: "black"}, {color: "green", alpha: 0.5}, cancel);
        super(700, 500, "Abordagem!", [attackButton, cancelButton, playerInfo, enemyInfo], {
            stroke: "black",
            fill: "beige",
            b_y: -getScreenDimensions().h / 2 + margin * 2
        }, {
            color: "black",
            size: 30,
            font: "Helvetica"
        });
        self = this;
        this.playerStats = playerStats;
        this.enemyStats = enemyStats;
        this.stats = stats;
        this.enemy = enemy;
    }

    updatePlayerText() {
        this.playerStats.text = "Jogador:\nPoder de fogo: " + this.stats.firepower + "\nHP: " + this.stats.hp;
    }

    updateEnemyText() {
        this.enemyStats.text = "Inimigo:\nPoder de fogo: " + this.enemy.firepower + "\nHP: " + this.enemy.hp;
    }

    show(time) {
        this.updatePlayerText();
        this.updateEnemyText();
        super.show(time)
    }
}

class GameOverMenu extends Menu {
    constructor(navWindow, mainScreen) {
        let exitClick = function () {
            navWindow.hide(1000);
            mainScreen.show(1000);
        };
        let margin = 20;

        let exitButton = new Button(0, 150, 300, 100, "Ecrã Principal", {
            stroke: "black",
            fill: "Crimson",
            round: 8
        }, {font: "Helvetica", size: 35, color: "black"}, {color: "LightPink", alpha: 0.5}, exitClick);

        super(700, 500, "GAME OVER", [exitButton], {fill:"beige",stroke:"black",b_y: -200},{
            color: "DarkRed",
            size: 100,
            font: "Pirata One"
        });
    }
}

class WinMenu extends Menu {
    constructor(navWindow, mainScreen) {
        let exitClick = function () {
            navWindow.hide(1000);
            mainScreen.show(1000);
        };
        let margin = 20;

        let exitButton = new Button(0, 150, 300, 100, "Ecrã Principal", {
            stroke: "black",
            fill: "Green",
            round: 8
        }, {font: "Helvetica", size: 35, color: "black"}, {color: "LightGreen", alpha: 0.5}, exitClick);

        super(700, 500, "PARABÉNS!", [exitButton], {fill:"beige",stroke:"black",b_y: -200},{
            color: "DarkGreen",
            size: 100,
            font: "Pirata One"
        });
    }
}

class TerritoryButton extends Button {
    constructor(x, y, action) {
        super(x, y, 10, 10, " ", {round: 5, fill: "red",}, {}, {color: "orange", alpha: 0.7}, action);
    }
}

class FacilityButton extends Button {
    constructor(x, y, w, h, margin, facility) {
        super(x, y, w, h, facility.type, {
            fill: "beige",
            stroke: "black",
            round: 0
        }, {font: "Helvetica", size: h - 2 * margin, color: "black"}, {color: "turquoise", alpha: 0.5});
        let iconpath = "Images/Icons/";
        switch (facility.type) {
            case "Campo":
                iconpath += "Trigo";
                break;
            case "Carpintaria":
                iconpath += "Lumber Mill";
                break;
            case "Mina de Ferro":
                iconpath += "Ferro";
                break;
            case "Mina de Ouro":
                iconpath += "Ouro";
                break;
            case "Pedreira":
                iconpath += "Pedra";
                break;
            case "Ferreiro":
                iconpath += "Ferreiro";
                break;
            case "Habitações":
                iconpath += "Casas";
                break;
        }
        iconpath += ".png";
        this.icon = new Sprite(iconpath, h / 2 - w / 2, 0, h - 2 * margin);
        this.addChild(this.icon)
    }
}

class TerritoryMenu extends createjs.Container {
    constructor(x, y, w, item_h, arrow_size, territory) {
        super();
        let s_h = getScreenDimensions().h;
        this.x = x;
        this.y = y;
        let mainWindow = new createjs.Shape();
        let left = x - w - arrow_size > 0;
        let height = item_h * (territory.facilities.length + 1);
        let window_y = Math.min(s_h - height - y, -arrow_size);

        let margin = 2;

        let self = this;

        let cancelButton;

        let cancelClick = function () {
            self.hide(500)
        };

        let title = new CenteredText(territory.name, (item_h - 2 * margin) + "px Pirata One", "black");

        if (left) {
            mainWindow.graphics.beginStroke("black").beginFill("beige").lineTo(-arrow_size, -arrow_size).lineTo(-arrow_size, arrow_size).lineTo(0, 0);
            mainWindow.graphics.beginStroke("black").beginFill("beige").rect(-w - arrow_size, window_y, w, height);
            cancelButton = new SpriteButton("Images/Icons/cancel.png", item_h / 2 - w - arrow_size, item_h / 2 + window_y, item_h - 2 * margin, cancelClick);
            title.x = -w / 2 - arrow_size;
        }
        else {
            mainWindow.graphics.beginStroke("black").beginFill("beige").lineTo(arrow_size, -arrow_size).lineTo(arrow_size, arrow_size).lineTo(0, 0);
            mainWindow.graphics.beginStroke("black").beginFill("beige").rect(arrow_size, window_y, w, height);
            cancelButton = new SpriteButton("Images/Icons/cancel.png", item_h / 2 + arrow_size, item_h / 2 + window_y, item_h - 2 * margin, cancelClick);
            title.x = w / 2 + arrow_size;

        }
        title.y = (1 / 2) * item_h + window_y;

        this.addChild(mainWindow);
        this.addChild(title);
        this.addChild(cancelButton);

        for (let i = 0; i < territory.facilities.length; i++) {
            let button;
            if (left)
                button = new FacilityButton(-w / 2 - arrow_size, (i + 3 / 2) * item_h + window_y, w, item_h, margin, territory.facilities[i]);
            else
                button = new FacilityButton(w / 2 + arrow_size, (i + 3 / 2) * item_h + window_y, w, item_h, margin, territory.facilities[i]);
            this.addChild(button);
        }
        this.hide(0);


    }

    show(time) {
        return createjs.Tween.get(this).to({alpha: 1, scale: 1}, time, createjs.Ease.sineOut);
    }

    hide(time) {
        return createjs.Tween.get(this).to({alpha: 0, scale: 0}, time, createjs.Ease.sineIn);
    }
}