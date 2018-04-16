var s_w, s_h;

window.addEventListener("load", function () {
    let canvas = document.getElementById("canvas");
    s_w = canvas.width;
    s_h = canvas.height;
});

function centerText(text) {
    let b = text.getBounds();
    text.x = -(b.width / 2);
    text.y = -(b.height / 2);
    return text;
}

class Button extends createjs.Container {
    constructor(x, y, w, h, text, props, textProps, action) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        let graphic = new createjs.Shape();
        graphic.graphics.beginFill(props.fill).beginStroke(props.stroke).drawRoundRect(-w / 2, -h / 2, w, h, props.round);
        let textObj = centerText(new createjs.Text(text, textProps.size + "px " + textProps.font, textProps.color));
        this.addChild(graphic);
        this.addChild(textObj);
        this.addEventListener("click", action);
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
        let self = this;
        let banner = new createjs.Text(title, textProps.size + "px " + textProps.font, textProps.color);
        banner.textAlign = "center";
        banner.x = 0;
        banner.y = props.b_y;
        this.addChild(banner);
        buttons.forEach(function (item,index) {
            self.addChild(item);
        });
        this.hide(0);

    }

    show(time) {
        return createjs.Tween.get(this).to({alpha: 1, x: s_w / 2, y: s_h / 2}, time, createjs.Ease.sineOut);
    }

    hide(time) {
        return createjs.Tween.get(this).to({alpha: 0, x: s_w / 2, y: -s_h / 2}, time, createjs.Ease.sineIn);
    }
}