test1 = {
    start_x: 0,
    start_y: 0,
    tilesize: 50,
    enemies: [
        {
            x: 1, y: 1, radar: 4, firepower: 10, dev:1,hp: 40, img: "Images/Ship-galleon.png",
            prize: {}
        },
        {
            x: 6, y: 7, radar: 6, firepower: 20, dev:2, hp: 50, img: "Images/Enemy.png",
            prize: {}
        }
    ],
    hexmap: [
        {x: 0, y: 0, cost: 10, dev:1},
        {x: 1, y: 0, cost: 20, dev:2},
        {x: 0, y: 1, cost: 30, dev:3},
        {x: 6, y: 6, cost: 30, dev:3},
        {x: 6, y: 7, cost: 30, dev:3},
        {x: 6, y: 5, cost: 30, dev:3},
        {x: 6, y: 8, cost: 30, dev:3},
        {x: 5, y: 6, cost: 30, dev:3}
    ],
    background: "Images/sat.jpg",
    background_properties: {x: -2250, y: -1000, scale: 1.2},
    tint: {color: "rgb(255,255,0)", alpha: 0.6},
    frame: "green",
    boatImg: "Images/boat.png"
};