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
    constructor(x, y,facilities, conquered, name) {
        this.x = x;
        this.y = y;
        this.facilities = facilities;
        this.conquered = conquered;
        this.name = name;
    }

    updateResources(){
        for (let i = 0; i < this.facilities.length; i++)
            this.facilities[i].updateResources();
    }

}

class Facility {
    constructor(lvl, maxLvl, type, stats) {
        this.lvl = lvl;
        this.maxLvl = maxLvl;
        this.stats = stats;
        this.type = type;
        switch (type) {
            case "Campo":
                this.resource = "food";
                break;
            case "Carpintaria":
                this.resource = "wood";
                break;
            case "Mina de Ferro":
                this.resource = "iron";
                break;
            case "Mina de Ouro":
                this.resource = "gold";
                break;
            case "Pedreira":
                this.resource = "rock";
                break;
            case "Ferreiro":
                this.resource = undefined;
                break;
            case "Habitações":
                this.resource = undefined;
                break;
        }
    }

    updateResources(){
        if(this.resource !== undefined)
            this.stats[this.resource] += Values[this.resource][this.lvl];
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
