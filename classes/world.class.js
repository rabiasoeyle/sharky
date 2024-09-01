class World{
    character;
    level = new Level(
        [
            new Pufferfish(),
            new Pufferfish(),
            new Pufferfish(),
            new Endboss(),
            new Jellyfish(),
            new Jellyfish(),
            
        ],
        [
            new Water('img/Background/Layers/Water/L1.png', 0),
            new Water('img/Background/Layers/Water/L1.png',718),
            new Water('img/Background/Layers/Water/L1.png',718*2),
            new Water('img/Background/Layers/Water/L1.png',718*3),
            new Water('img/Background/Layers/Water/L1.png',718*4),
            new Water('img/Background/Layers/Water/L1.png',718*5),
        ],
        [
            new BackgroundObjects('img/Background/Layers/Fondo1/L2.png', -720),
            new BackgroundObjects('img/Background/Layers/Fondo1/D2.png', -720),
            new BackgroundObjects('img/Background/Layers/Floor/D2.png', -720),
    
            new BackgroundObjects('img/Background/Layers/Fondo1/L1.png', 0),
            new BackgroundObjects('img/Background/Layers/Fondo1/D1.png', 0),
            new BackgroundObjects('img/Background/Layers/Floor/D1.png', 0),
    
            new BackgroundObjects('img/Background/Layers/Fondo1/L2.png', 720),
            new BackgroundObjects('img/Background/Layers/Fondo1/D2.png', 720),
            new BackgroundObjects('img/Background/Layers/Floor/D2.png', 720),
    
            new BackgroundObjects('img/Background/Layers/Fondo1/L1.png', 1440),
            new BackgroundObjects('img/Background/Layers/Fondo1/D1.png', 1440),
            new BackgroundObjects('img/Background/Layers/Floor/D1.png', 1440),
    
            new BackgroundObjects('img/Background/Layers/Fondo1/L2.png', 2160),
            new BackgroundObjects('img/Background/Layers/Fondo1/D2.png', 2160),
            new BackgroundObjects('img/Background/Layers/Floor/D2.png', 2160),
    
            new BackgroundObjects('img/Background/Layers/Fondo1/L1.png', 2880),
            new BackgroundObjects('img/Background/Layers/Fondo1/D1.png', 2880),
            new BackgroundObjects('img/Background/Layers/Floor/D1.png', 2880),
        ],
        [
            new CollectablePoison(),
            new CollectablePoison(),
            new CollectablePoison(),
            new CollectablePoison(),
            new CollectablePoison(),
            new CollectablePoison(),
            new CollectablePoison(),
            new CollectablePoison(),
            new CollectablePoison(),
            new CollectablePoison(),
            new CollectablePoison(),
        ],
        [
            new CollectableCoins(),
            new CollectableCoins(),
            new CollectableCoins(),
            new CollectableCoins(),
            new CollectableCoins(),
    
            new CollectableCoins(),
            new CollectableCoins(),
            new CollectableCoins(),
            new CollectableCoins(),
            new CollectableCoins(),
        ]
    );
    ctx;//context
    canvas;
    keyboard;
    camera_x = 0;
    statusbar = [new Heart(), new Coins(), new Poison()];
    throwable = [];
    throwSound = new Audio('audio/shot.mp3');
    coinSound = new Audio('audio/coin-earned.mp3');
    poisonSound = new Audio('audio/poison-earned.mp3');
    id;

    // intervalIds = [];

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        
        this.intervalIds = intervalIds;
        this.setStoppableInterval = (fn, time) => {
            let id = setInterval(fn, time);
            this.intervalIds.push(id);
            return id;
        };
        this.character = new Character();
        this.draw();
        this.setWorld();
        this.checkAll();
    }

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

    checkAll(){
        setStoppableInterval(() => this.checkAllAnimation(), 100);
        // setInterval(()=>{
           
        // },100)
    }
    checkAllAnimation(){
        this.checkCollisions();
           this.checkCollisionsWCoins();
           this.checkCollisionsWPoison();
           this.checkCollisionsWPoisonAndEnemy();
           this.checkThrowableObject();
           if (this.checkLivingCharacter()) {
            gameOver();
        }
    }
    checkLivingCharacter(){
        return this.character.energy <= 0
    }
    
    checkThrowableObject(){
        if(this.keyboard.d == true && this.statusbar[2].poisonPercentage > 0){
                let poisonBulb = new ThrowableObject(this.character.x +60 , this.character.y +40)
                poisonBulb.startX = poisonBulb.x;
                this.throwable.push(poisonBulb);
                this.throwSound.play();
                this.statusbar[2].deletePoisonAmount(1);
        }
        this.throwable.forEach((poisonBulb, index) => {
            if (poisonBulb.y >= 480 || ((poisonBulb.x - poisonBulb.startX) >= 600)) {
                this.throwable.splice(index, 1);  // Giftbirne aus dem Array entfernen
            }})
    }
   
    checkCollisionsWPoisonAndEnemy() {
    this.throwable.forEach((poison, poisonIndex) => {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (poison.isColliding(enemy)){
                if(enemy.livePoints > 0) {
                    if(enemy.type == "endboss"){
                        enemy.livePoints -= 1;
                        this.level.enemies[enemyIndex].lastHitAtBoss = new Date().getTime();
                        this.level.enemies[enemyIndex].hurtBossEnemy(this.level.enemies[enemyIndex].lastHitAtBoss);
                    }else if(enemy.type == "jellyfish"){
                        enemy.livePoints -= 1;
                    }else if(enemy.type == "pufferfish"){
                        enemy.livePoints -= 1;
                    }this.throwable.splice(poisonIndex, 1); 
                }if(enemy.livePoints == 0){
                    if(enemy.type == "jellyfish"){
                        this.level.enemies[enemyIndex].jellyIsDead()
                        setTimeout(() => {
                            this.level.enemies.splice(enemyIndex, 1);
                        }, 1000); 
                    }else if(enemy.type == "pufferfish"){
                            this.level.enemies[enemyIndex].pufferIsDead()
                            setTimeout(() => {
                                this.level.enemies.splice(enemyIndex, 1);
                            }, 1000); 
                    }else if(enemy.type == "endboss"){
                            this.level.enemies[enemyIndex].endBossIsDead();
                        setTimeout(gameEnds,500)
                    }
                   
                }
            this.throwable.splice(poisonIndex, 1);
    }})})};
   
    checkCollisions(){
            this.level.enemies.forEach((enemy)=>{
                if(enemy.type == "pufferfish"){ 
                    if(this.character.isColliding(enemy) && this.character.finAttack){
                        //diese if abfragen funktionieren noch nicht ganz, aber der Ansatz soll sein,
                        //dass wenn auf space gesdrückt und der Gegner attackiert wird,
                        // der Gegner verletzt ist.
                        enemy.livePoints -= 1;
                    }else
                    if(this.character.isColliding(enemy)){
                    this.character.hit();
                    this.statusbar[0].setPercentage(this.character.energy);
                    }
                   
                }else if(enemy.type == "jellyfish"){
                    if(this.character.isColliding(enemy) && this.character.finAttack){
                        enemy.livePoints -= 1;
                    }else
                    if(this.character.isColliding(enemy)){
                        this.character.hitByJelly();
                        this.statusbar[0].setPercentage(this.character.energy);
                        }
                }else if(enemy.type == "endboss"){
                    if(this.character.isColliding(enemy) && this.character.finAttack){
                        enemy.livePoints -= 1;
                    }else
                    if(this.character.isColliding(enemy)){
                        this.character.hitByEndboss();
                        this.statusbar[0].setPercentage(this.character.energy);
                    }
                
            }})
    }

    checkCollisionsWCoins(){
        this.level.coins.forEach((coin, index)=>{
            if(this.character.isColliding(coin)){
                this.statusbar[1].setAmountCoins(1);
                this.coinSound.play();
                this.deleteCoinFromMap(index);
            }
        })
}

checkCollisionsWPoison(){
    this.level.poisons.forEach((poison, index)=>{
        if(this.character.isColliding(poison)){
            this.statusbar[2].setAmountPoison(1);
            this.poisonSound.play();
            this.deletePoisonFromMap(index);
        }
    })
}

deleteCoinFromMap(index) {
    this.level.coins.splice(index, 1); // Entfernt die Münze aus dem Array
}
deletePoisonFromMap(index) {
    this.level.poisons.splice(index, 1); // Entfernt die Münze aus dem Array
}

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
        requestAnimationFrame(function (){
            self.draw();//draw() wird immer wieder aufgerufen
        })
    }

    addObjectToMap(object){
        object.forEach(o =>{this.addToMap(o)});
    }

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

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x * -1; 
        //mit translate wird das bild umgedreht, aber auch der startwert der x-achse wechselt seiten,
        //um dies anzupassen wird * -1 gerechnet
    }

    flipImageBack(mo){
        this.ctx.restore();
        mo.x = mo.x * -1
    }
    // setStoppableInterval(fn,time){
    //     this.id = setInterval(fn, time);
    //     intervalIds.push(id);
    // }
}