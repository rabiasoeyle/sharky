class ThrowableObject extends MovableObject{
    // x = 220 + Math.random()*2000;
    // y = 370;
    width= 40;
    height = 40;
    poisonImages = [
        'img/Marcadores/Posión/Animada/1.png',
        'img/Marcadores/Posión/Animada/2.png',
        'img/Marcadores/Posión/Animada/3.png',
        'img/Marcadores/Posión/Animada/4.png',
        'img/Marcadores/Posión/Animada/5.png',
        'img/Marcadores/Posión/Animada/6.png',
        'img/Marcadores/Posión/Animada/7.png',
        'img/Marcadores/Posión/Animada/8.png',
    ]

    constructor(x,y){
        super();
        this.x = x;
        this.y = y;
        this.loadImages(this.poisonImages);
        this.animate();
        this.throw();
    }

    animate(){
        setInterval(() =>{
            this.playAnimation(this.poisonImages);
        },200)
    }

    throw(){
        this.speedY = 30;
        this.applyGravity();
        setInterval(()=>{
            this.x +=10; 
        },25);
        
    }
}