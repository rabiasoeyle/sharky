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
    poisonBubbles = [
        'img/Sharkie/Attack/Bubble trap/PoisonedBubble.png',
    ]
    offset={
        right:0,
        left:0,
        top:0,
        bottom:0,
    }
    
    constructor(x,y){
        super();
        this.x = x;
        this.y = y;
        this.loadImages(this.poisonImages);
        this.loadImages(this.poisonBubbles)
        this.animate();
        this.throw();
    }

    animate(){
        setInterval(() =>{
            this.playAnimation(this.poisonBubbles);
        },200)
        
    }

    throw(){
        // this.speedY = 0;
        // this.applyGravity();
        setInterval(()=>{
            this.x +=10; 
        },25);
    }
}