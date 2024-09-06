class Level{
    enemies;
    water;
    background;
    poisons;
    coins;
    levelEnd_x = 2880;
    
    /**
     * Creates a new Level.
     * @param {*} enemies 
     * @param {*} water 
     * @param {*} background 
     * @param {*} poisons 
     * @param {*} coins 
     */
    constructor(enemies, water, background, poisons, coins){
        this.enemies = enemies;
        this.water = water;
        this.background = background;
        this.poisons = poisons;
        this.coins = coins;
    }
}