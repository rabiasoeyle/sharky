class Pufferfish extends MovableObject{
    width= 60;
    height= 60; 
    x = 220 + Math.random()*2000;
    // y = 480 - this.height-50;
    y = 50 + Math.random()*350;
    swimImages=[
        'img/Enemy/Pufferfish/Swim/1swim1.png',
        'img/Enemy/Pufferfish/Swim/1swim2.png',
        'img/Enemy/Pufferfish/Swim/1swim3.png',
        'img/Enemy/Pufferfish/Swim/1swim4.png',
        'img/Enemy/Pufferfish/Swim/1swim5.png'
    ]
    // currentImage = 0;
    constructor(){
        super().loadImages(this.swimImages);
        this.speed = 0.16 + Math.random() *0.25;//damit die Fische unterschiedlich schnell laufen
        this.animateSwim();
    }
    animateSwim(){
        this.moveLeft();
        setInterval(() =>{
            this.playAnimation(this.swimImages);
        },200)
    }
   
}