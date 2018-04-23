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

class Menu extends createjs.Container {
    constructor(w, h, title, buttons, props, textProps) {
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
        for (let i = 0; i < buttons.length; i++)
            this.addChild(buttons[i]);
        this.hide(0);

    }

    show(time) {
        return createjs.Tween.get(this).to({alpha: 1, x: s_w / 2, y: s_h / 2}, time, createjs.Ease.sineOut);
    }

    hide(time) {
        return createjs.Tween.get(this).to({alpha: 0, x: s_w / 2, y: -s_h / 2}, time, createjs.Ease.sineIn);
    }
}