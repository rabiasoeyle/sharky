class World{
    character = new Character();
    level = level1;
    ctx;//context
    canvas;
    keyboard;
    camera_x = 0

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this; 
        //damit der charakter auf die variablen, die in der game.js der world übergeben werden zugreufen kann, z.B. keypress
    }

    draw(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height); 
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.water);
        this.addObjectToMap(this.level.background);
        this.addObjectToMap(this.level.enemies);
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
                this.ctx.save();
                this.ctx.translate(mo.width, 0);
                this.ctx.scale(-1,1);
                mo.x = mo.x * -1; 
                //mit translate wird das bild umgedreht, aber auch der startwert der x-achse wechselt seiten,
                //um dies anzupassen wird * -1 gerechnet
            }
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        //zuerst wird das img eingefügt, dann die position auf x und y achse und dann höhe und breite.
        if(mo.otherDirection){
            this.ctx.restore();
            mo.x = mo.x * -1
        }
        }
        
    }
}