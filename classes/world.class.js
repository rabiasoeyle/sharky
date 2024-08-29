class World{
    character = new Character();
    level = level1;
    ctx;//context
    canvas;
    keyboard;
    camera_x = 0;
    statusbar = [new Heart(), new Coins(), new Poison()];
    throwable = [];

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkAll();

    }

    checkAll(){
        setInterval(()=>{
           this.checkCollisions();
           this.checkCollisionsWCoins();
           this.checkCollisionsWPoison()
           this.checkThrowableObject();
        },100)
    }

    checkThrowableObject(){
        if(this.keyboard.d == true && this.statusbar[2].poisonPercentage > 0){
                let poisonBulb = new ThrowableObject(this.character.x +60 , this.character.y +75)
                this.throwable.push(poisonBulb);
                this.statusbar[2].deletePoisonAmount(1);
        }
    }

    checkCollisions(){
            this.level.enemies.forEach((enemy)=>{
                if(this.character.isColliding(enemy)){
                    this.character.hit();
                    this.statusbar[0].setPercentage(this.character.energy);
                }
            })
    }
    checkCollisionsWCoins(){
        this.level.coins.forEach((coin, index)=>{
            if(this.character.isColliding(coin)){
                this.statusbar[1].setAmountCoins(1);
                this.deleteCoinFromMap(index);
            }
        })
}
checkCollisionsWPoison(){
    this.level.poisons.forEach((poison, index)=>{
        if(this.character.isColliding(poison)){
            this.statusbar[2].setAmountPoison(1);
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

    setWorld(){
        this.character.world = this; 
        //damit der charakter auf die variablen, die in der game.js der world übergeben werden zugreufen kann, z.B. keypress
        // this.endboss.world = this;
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
            // isColliding(mo);
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
}