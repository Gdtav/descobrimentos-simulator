class Bar extends createjs.Container {
    constructor(x, y, width, height, maxVal, color) {
        super();
        this.width = width;
        this.maxVal = maxVal;
        this.curText = new createjs.Text(String(maxVal), height + "px Helvetica", "red");
        this.curText.x = 0;
        this.curText.y = 0;
        this.addChild(this.curText);
        let frame = new createjs.Shape();
        frame.graphics.beginStroke(color).drawRect(0, 0, width, height);
        frame.x = this.curText.getBounds().width + 2;
        frame.y = 0;
        this.addChild(frame);
        this.bar = new createjs.Shape();
        this.bar.graphics.beginFill(color).drawRect(0, 0, width, height);
        this.bar.x = this.curText.getBounds().width + 2;
        this.bar.y = 0;
        this.addChild(this.bar);
        let maxText = new createjs.Text(String(maxVal), height + "px Helvetica", "red");
        maxText.x = frame.x + width + 2;
        maxText.y = 0;
        this.addChild(maxText);
        this.x = x;
        this.y = y;
    }

    update(val) {
        createjs.Tween.get(this.bar).to({scaleX : Math.max(val,0) / this.maxVal},200);
        this.curText.text = String(Math.max(val,0));
    }
}