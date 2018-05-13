test1 = {
    start_x: 0,
    start_y: 0,
    tilesize: 50,
    enemies: [
        {
            x: 6, y: 6, firepower: 10, hp: 40, img: "Images/Enemy.png",
            prize: {}
        },
        {
            x: 6, y: 7, firepower: 20, hp: 50, img: "Images/Enemy.png",
            prize: {}
        }
    ],
    hexmap: [
        {x: 0, y: 0, cost: 10},
        {x: 1, y: 0, cost: 20},
        {x: 0, y: 1, cost: 30},
        {x: 6, y: 6, cost: 30},
        {x: 6, y: 7, cost: 30},
        {x: 6, y: 5, cost: 30},
        {x: 6, y: 8, cost: 30},
        {x: 5, y: 6, cost: 30}
    ],
    background: "Images/sat.jpg",
    background_properties: {x: -2250, y: -1000, scale: 1.2},
    tint: {color: "rgb(255,255,0)", alpha: 0.6},
    frame: "red",
    boatImg: "Images/boat.png"
};