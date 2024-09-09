
class World{
    character = new Character();
    level;
    ctx;//context
    canvas;
    keyboard;
    camera_x = 0;
    statusbar = [new Heart(), new Coins(), new Poison()];
    throwable = [];
    throwSound = new Audio('audio/shot.mp3');
    coinSound = new Audio('audio/coin-recieved.mp3');
    poisonSound = new Audio('audio/poison-recieved.mp3');
    id;
    myReq;

    /**
     * Defines ctx.
     * Creates a new Character.
     * Starts draw() for drawing the Characters.
     * Sets World.
     * Starts checking Funktion.
     * @param {*} canvas 
     * @param {*} keyboard 
     * @param {*} levelRow 
     */
    constructor(canvas, keyboard, levelRow){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = levelRow
        
        this.draw();
        this.setWorld();
        this.checkAll();
    }

    /**
     * Sets the world for some Classes which need to use world.
     */
    setWorld(){
        this.character.world = this; 
        //damit der charakter auf die variablen, die in der game.js der world übergeben werden zugreifen kann, z.B. keypress
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
        // Für CollectableCoins
        this.level.coins.forEach(coin => {coin.world = this;});
        this.throwable.world = this;
    }

    /**
     * Creates an interval for checking some Situations all 100ms.
     */
    checkAll(){
        setStoppableInterval(() => this.checkAllAnimation(), 200);
    }

    /**
     * Checks all animations.
     */
    checkAllAnimation(){
        this.checkCollisions();
        this.checkCollisionsWCoins();
        this.checkCollisionsWPoison();
        this.checkCollisionsWPoisonAndEnemy();
        this.checkThrowableObject();
        if (this.checkLivingCharacter()) {
        //    this.deleteSound();
            setTimeout(gameOver,2000);
            cancelAnimationFrame(this.myReq);
        }
    }

    /**
     * Deletes boss attack sound, when character is dead.
     */
    // deleteSound(){
    //     setTimeout(()=>{
    //         this.finalAttackSound = this.level.enemies[0].finalAttack,
    //         this.finalAttackSound.muted = true;
    //     },2000)
    // }

    /**
     * Checks if character is living.
     * @returns  true or false
     */
    checkLivingCharacter(){
        return this.character.energy <= 0
    }
    
    /**
     * Checks if throwable Object is available.
     */
    checkThrowableObject(){
        if(this.keyboard.d == true && this.statusbar[2].poisonPercentage > 0){
            let poisonBulb = new ThrowableObject(this.character.x +60 , this.character.y +40)
            poisonBulb.startX = poisonBulb.x;
            this.throwable.push(poisonBulb);
            if(isMuted == false){
            allSounds[6].play();}
            this.statusbar[2].deletePoisonAmount(1);
        }
        this.throwable.forEach((poisonBulb, index) => {
            if (poisonBulb.y >= 480 || ((poisonBulb.x - poisonBulb.startX) >= 600)) {
                this.throwable.splice(index, 1);  // Giftbirne aus dem Array entfernen
            }})
    }

    /**
     * Checks if poison collides with enemy.
     */
    checkCollisionsWPoisonAndEnemy() {
        this.throwable.forEach((poison, poisonIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if(poison.isColliding(enemy)){
                    if(enemy.livePoints > 0) {
                        this.poisonCollidesWLivingEnemy(enemy, enemyIndex)
                    }if(enemy.livePoints == 0){
                        // this.poisonCollidesWDeadEnemy(enemy, enemyIndex)
                        this.checkIfDead(enemy, enemyIndex)
                    }
                this.throwable.splice(poisonIndex, 1);
    }})})};

    /**
     * Poison collides with living enemy.
     * @param {*} enemy 
     * @param {*} enemyIndex 
     */
    poisonCollidesWLivingEnemy(enemy, enemyIndex){
        if(enemy.type == "endboss"){
            enemy.livePoints -= 1;
            this.level.enemies[enemyIndex].lastHitAtBoss = new Date().getTime();
            this.level.enemies[enemyIndex].hurtBossEnemy(this.level.enemies[enemyIndex].lastHitAtBoss);
        }else if(enemy.type == "jellyfish"){
            enemy.livePoints -= 1;
        }else if(enemy.type == "pufferfish"){
             enemy.livePoints -= 1;
        }
    }

    // /**
    //  * Poison collides with dead enemy.
    //  * @param {*} enemy 
    //  * @param {*} enemyIndex 
    //  */
    // poisonCollidesWDeadEnemy(enemy, enemyIndex){
    //     if(enemy.type == "jellyfish"){
    //         setTimeout(() => {
    //             this.level.enemies.splice(enemyIndex, 1);
    //         }, 2000); 
    //     }else if(enemy.type == "pufferfish"){
    //         setTimeout(() => {
    //             this.level.enemies.splice(enemyIndex, 1);
    //         }, 2000); 
    //     }else if(enemy.type == "endboss"){
    //         this.level.enemies[enemyIndex].endBossIsDead();
    //         // this.levelNumber ++;    
    //         setTimeout(gameEnds,500)
    //     }
    // }

    /**
     * Checks Collisions with main character.
     */
    checkCollisions(){
            this.level.enemies.forEach((enemy, enemyIndex)=>{
                if(enemy.type == "pufferfish"){ 
                    if(this.character.isColliding(enemy) && this.character.finAttack){
                        enemy.livePoints -= 1;
                        this.checkIfDead(enemy, enemyIndex);
                    }else
                    if(this.character.isColliding(enemy)){
                    this.character.hit();
                    this.statusbar[0].setPercentage(this.character.energy);
                    }
                }else if(enemy.type == "jellyfish"){
                    if(this.character.isColliding(enemy) && this.character.finAttack){
                        enemy.livePoints -= 1;
                        this.checkIfDead(enemy, enemyIndex);
                    }else
                    if(this.character.isColliding(enemy)){
                        this.character.hitByJelly();
                        this.statusbar[0].setPercentage(this.character.energy);
                    }
                }else if(enemy.type == "endboss"){
                    if(this.character.isColliding(enemy) && this.character.finAttack){
                        enemy.livePoints -= 1;
                        this.checkIfDead(enemy, enemyIndex);
                    }else
                    if(this.character.isColliding(enemy)){
                        this.character.hitByEndboss();
                        this.statusbar[0].setPercentage(this.character.energy);
                    }
                
            }
        })
    }

    /**
     * Checks if enemy is dead.
     * @param {*} enemy 
     * @param {*} enemyIndex 
     */
    checkIfDead(enemy, enemyIndex){
        if(enemy.livePoints == 0){
            if(enemy.type == "jellyfish"){
                this.level.enemies[enemyIndex].jellyIsDead()
                setTimeout(() => {
                    this.level.enemies.splice(enemyIndex, 1);
                }, 2000); 
            }else if(enemy.type == "pufferfish"){
                    this.level.enemies[enemyIndex].pufferIsDead()
                    setTimeout(() => {
                        this.level.enemies.splice(enemyIndex, 1);
                    }, 2000); 
            }else if(enemy.type == "endboss"){
                    this.level.enemies[enemyIndex].endBossIsDead();
                    setTimeout(() => {
                        this.level.enemies.splice(enemyIndex, 1);
                    }, 2000);
                    // this.deleteSound();
                    setTimeout(gameEnds,2000)
                    cancelAnimationFrame(this.myReq);
            }else{
                
            }}
    }

    /**
     * Checks collisions with coins.
     */
    checkCollisionsWCoins(){
        this.level.coins.forEach((coin, index)=>{
            if(this.character.isColliding(coin)){
                this.statusbar[1].setAmountCoins(1);
                if(isMuted == false){
                allSounds[7].play();}
                this.deleteCoinFromMap(index);
            }
        })
    }

    /**
     * Checks collisions with poison.
     */
    checkCollisionsWPoison(){
        this.level.poisons.forEach((poison, index)=>{
            if(this.character.isColliding(poison)){
                this.statusbar[2].setAmountPoison(1);
                if(isMuted == false){
                allSounds[8].play();}
                this.deletePoisonFromMap(index);
            }
        })
    }

    /**
     * Deletes Coins when they are collected.
     * @param {*} index 
     */
    deleteCoinFromMap(index) {
        this.level.coins.splice(index, 1); // Entfernt die Münze aus dem Array
    }

    /**
     * Deletes Poison when they are collected.
     * @param {*} index 
     */
    deletePoisonFromMap(index) {
        this.level.poisons.splice(index, 1); // Entfernt die Münze aus dem Array
    }

    /**
     * Draw all Elements on the canvas.
     */
    draw(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height); 
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.water);
        this.addObjectToMap(this.level.background);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.poisons);
        this.addObjectToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);//stop camera before statusbar
        this.addObjectToMap(this.statusbar);
        this.ctx.translate(this.camera_x, 0);//start camera after statusbar
        this.addObjectToMap(this.throwable);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        this.myReq = requestAnimationFrame(function (){
            self.draw();
        })
    }

    /**
     * Adds all objects to map.
     * @param {*} object 
     */
    addObjectToMap(object){
        object.forEach(o =>{this.addToMap(o)});
    }

    /**
     * Add all objects to map.
     * @param {*} mo 
     */
    addToMap(mo){
        if(mo.img && mo.img.complete){
            if(mo.otherDirection){
                this.flipImage(mo);
            }
            mo.drawP(this.ctx);
            mo.drawBorder(this.ctx);
            if(mo.otherDirection){
            this.flipImageBack(mo)  
            }
        }
    }

    /**
     * Flip the image when swimming left.
     * @param {*} mo 
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x * -1; 
        //mit translate wird das bild umgedreht, aber auch der startwert der x-achse wechselt seiten,
        //um dies anzupassen wird * -1 gerechnet
    }

    /**
     * Flip image back, when turk right.
     * @param {*} mo 
     */
    flipImageBack(mo){
        this.ctx.restore();
        mo.x = mo.x * -1
    }
}