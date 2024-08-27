class World{
    character = new Character();
    enemies = [
    new Pufferfish(),
    new Jellyfish(),
    new Pufferfish(),
    ];
    water = [
        new Water(),
    ]
    background =[
        new BackgroundObjects('../img/3.Background/Layers/3.Fondo1/L1.png', 0),
        new BackgroundObjects('../img/3.Background/Layers/3.Fondo1/D1.png', 0),
        new BackgroundObjects('../img/3.Background/Layers/2.Floor/D1.png', 0),
    ]
    ctx;//context
    canvas;
    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height); 
        this.addObjectToMap(this.water);
        this.addObjectToMap(this.background);
        this.addObjectToMap(this.enemies);
        this.addToMap(this.character);
        let self = this;
        requestAnimationFrame(function (){
            self.draw();//draw() wird immer wieder aufgerufen
        })
    }

    addObjectToMap(object){
        object.forEach(o =>{this.addToMap(o)});
    }

    addToMap(mo){
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        //zuerst wird das img eingefügt, dann die position auf x und y achse und dann höhe und breite.
    }
}