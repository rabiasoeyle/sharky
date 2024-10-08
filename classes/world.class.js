
class World{
    character = new Character();
    level;
    ctx;//context
    canvas;
    keyboard;
    camera_x = 0;
    statusbar = [new Heart(), new Coins(), new Poison(), new HeartBoss()];
    throwable = [];
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
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
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
            gameOver() 
            cancelAnimationFrame(myReq);
        }
    }

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
            let poisonBulb = new ThrowableObject(this.character.x +60 , this.character.y +120)
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
            this.statusbar[3].setPercentage(enemy.livePoints)
            enemyHurted = true;
        }else if(enemy.type == "jellyfish"){
            enemy.livePoints -= 1;
        }else if(enemy.type == "pufferfish"){
             enemy.livePoints -= 1;
        }
    }

    /**
     * Checks Collisions with main character.
     */
    checkCollisions(){
        this.level.enemies.forEach((enemy, enemyIndex)=>{
            if(enemy.type == "pufferfish"){ 
                this.pufferIsCollidingWCharacter(enemy, enemyIndex)
            }else if(enemy.type == "jellyfish"){
                this.jellyIsCollidingWithCharacter(enemy, enemyIndex);
            }else if(enemy.type == "endboss"){
                this.endbossIsCollidingWithCharacter(enemy, enemyIndex);
            }
        })
    }

    /**
     * endboss collides width character
     * @param {*} enemy 
     * @param {*} enemyIndex 
     */
    endbossIsCollidingWithCharacter(enemy, enemyIndex){
        if(this.character.isColliding(enemy) && this.character.finAttack){
            enemy.livePoints -= 1;
            this.checkIfDead(enemy, enemyIndex);
        }else
        if(this.character.isColliding(enemy)){
            this.character.hitByEndboss();
            this.statusbar[0].setPercentage(this.character.energy);
        }
    }

    /**
     * jelly is colliding with character
     * @param {*} enemy 
     * @param {*} enemyIndex 
     */
    jellyIsCollidingWithCharacter(enemy, enemyIndex){
        if(this.character.isColliding(enemy) && this.character.finAttack){
            enemy.livePoints -= 1;
            this.checkIfDead(enemy, enemyIndex);
        }else
        if(this.character.isColliding(enemy)){
            this.character.hitByJelly();
            this.statusbar[0].setPercentage(this.character.energy);
        }
    }

    /**
     * Puffer is colliding with character
     * @param {*} enemy 
     * @param {*} enemyIndex 
     */
    pufferIsCollidingWCharacter(enemy, enemyIndex){
        if(this.character.isColliding(enemy) && this.character.finAttack){
            enemy.livePoints -= 1;
            this.checkIfDead(enemy, enemyIndex);
        }else
        if(this.character.isColliding(enemy)){
            this.character.hit();
            this.statusbar[0].setPercentage(this.character.energy);
        }
    }

    /**
     * Checks if enemy is dead.
     * @param {*} enemy 
     * @param {*} enemyIndex 
     */
    checkIfDead(enemy, enemyIndex){
        if(enemy.livePoints == 0){
            if(enemy.type == "jellyfish"){
                setTimeout(() => {this.level.enemies.splice(enemyIndex, 1);}, 2000); 
            }else if(enemy.type == "pufferfish"){
                setTimeout(() => {this.level.enemies.splice(enemyIndex, 1);}, 2000); 
            }else if(enemy.type == "endboss"){
                setTimeout(() => {this.level.enemies.splice(enemyIndex, 1);}, 1000);
                setTimeout(()=>{gameEnds()},500)
                // cancelAnimationFrame(myReq);
            }
        }
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
                    allSounds[8].play();
                }
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
        myReq = requestAnimationFrame(function (){
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
     * With translate is turns to the other direction
     * But the startvalue of the x-axis changes too, so we added *-1
     * @param {*} mo 
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x * -1; 
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