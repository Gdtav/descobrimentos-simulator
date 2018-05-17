function facilityInstance(f,stats) {
    return new Facility(f.lvl,f.maxLvl,f.type,stats);
}

function territoryInstance(territory,stats){
    let facilities = [];
    for(let i = 0; i < territory.facilities.length; i++)
        facilities.push(facilityInstance(territory.facilities[i],stats));
    return new Territory(territory.x,territory.y,facilities,territory.conquered,territory.name);
}