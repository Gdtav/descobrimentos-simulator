class Bar extends createjs.Container {
    constructor(x, y, width, height, maxVal, color) {
        super();
        let margin = 0.5 * height;
        this.width = width;
        this.maxVal = maxVal;
        this.curText = new createjs.Text(String(maxVal), height + "px Helvetica", "red");
        this.curText.x = 0;
        this.curText.y = 0;
        this.addChild(this.curText);
        let frame = new createjs.Shape();
        frame.graphics.beginStroke(color).drawRect(0, 0, width, height);
        frame.x = this.curText.getBounds().width + margin;
        frame.y = 0;
        this.addChild(frame);
        this.bar = new createjs.Shape();
        this.bar.graphics.beginFill(color).drawRect(0, 0, width, height);
        this.bar.x = this.curText.getBounds().width + margin;
        this.bar.y = 0;
        this.addChild(this.bar);
        let maxText = new createjs.Text(String(maxVal), height + "px Helvetica", "red");
        maxText.x = frame.x + width + margin;
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

class Counter extends createjs.Container {
    constructor(x,y, size, iconPath, initValue) {
        super();
        let self = this;
        this.x = x;
        this.y = y;
        this.size = size;
        let image = new Sprite(iconPath,size/2,size/2,size);
        this.text = new createjs.Text(String(initValue), size + "px Helvetica", "red");
        this.text.x = size + 2;
        this.text.y = 0;
        this.addChild(image);
        this.addChild(this.text);
    }

    update(value) {
        this.text.text = String(Math.round(value));
    }

}

class HUD extends createjs.Container {
    constructor(y,size,stats){
        super();
        this.stats = stats;
        let icons = "Images/Icons/";
        let i = 0;
        this.addChild(this.foodCounter = new Counter(0,y + i++ * size,size,icons + "bread.png",0));
        this.addChild(this.woodCounter = new Counter(0,y + i++ * size,size,icons + "madeira.png",0));
        this.addChild(this.ironCounter = new Counter(0,y + i++ * size,size,icons + "Ferro.png",0));
        this.addChild(this.goldCounter = new Counter(0,y + i++ * size,size,icons + "Ouro.png",0));
        this.addChild(this.rockCounter = new Counter(0,y + i * size,size,icons + "Pedra.png",0));
    }

    updateCounters(){
        this.foodCounter.update(this.stats.food);
        this.woodCounter.update(this.stats.wood);
        this.ironCounter.update(this.stats.iron);
        this.goldCounter.update(this.stats.gold);
        this.rockCounter.update(this.stats.rock);
    }
}