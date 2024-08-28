class Level{
    enemies;
    water;
    background;
    poison;
    coins;
    levelEnd_x = 2880;
    
    constructor(enemies, water, background){
        this.enemies = enemies;
        this.water = water;
        this.background = background;
    }
}