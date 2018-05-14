"use strict";

class Game {
    constructor(territories, expeditions, events, stats) {
        this.territories = territories;
        this.expeditions = expeditions;
        this.events = events;
        this.stats = stats;
    }
}

class Expedition {
    constructor(minTripulation, hexmap, player, fleet, enemies) {
        this.minTripulation = minTripulation;
        this.hexmap = hexmap;
        this.player = player;
        this.fleet = fleet;
        this.enemies = enemies;
    }
}

class Territory {
    constructor(facilities, conquered, name, img, button) {
        this.facilities = facilities;
        this.conquered = conquered;
        this.name = name;
        this.img = img;
        this.button = button;
    }
}

class Facility {
    constructor(lvl, maxLvl, res) {
        this.lvl = lvl;
        this.maxLvl = maxLvl;
        this.res = res;
    }
}

class Stats {
    constructor(resources, territories, difficulty) {
        this.resources = resources;
        this.territories = territories;
        this.difficulty = difficulty;
    }
}

class Player {
    constructor(x, y, stats) {
        this.x = x;
        this.y = y;
        this.stats = stats;
    }
}

class Ship {
    constructor(tripulation, size, firepower) {
        this.tripulation = tripulation;
        this.size = size;
        this.firepower = firepower;
    }
}

class Enemy {
    constructor(firepower, gold, resources) {
        this.firepower = firepower;
        this.gold = gold;
        this.resources = resources;
    }
}
