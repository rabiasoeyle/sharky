class Pufferfish extends MovableObject{
    width= 60;
    height= 60; 
    x = 420 + Math.random()*2000;
    // y = 480 - this.height-50;
    y = 50 + Math.random()*350;
    swimImages=[
        'img/Enemy/Pufferfish/Swim/1swim1.png',
        'img/Enemy/Pufferfish/Swim/1swim2.png',
        'img/Enemy/Pufferfish/Swim/1swim3.png',
        'img/Enemy/Pufferfish/Swim/1swim4.png',
        'img/Enemy/Pufferfish/Swim/1swim5.png'
    ];
    deadPoison = [
        'img/Enemy/Pufferfish/DIE/2.2.png',
        'img/Enemy/Pufferfish/DIE/2.3.png',
        'img/Enemy/Pufferfish/DIE/2.png',
    ]
    type;
    livePoints = 1;
    offset={
        right:5,
        left:5,
        top:5,
        bottom:10,
    }
    
    constructor(){
        super().loadImages(this.swimImages);
        this.loadImages(this.deadPoison);
        this.speed = 0.16 + Math.random() *0.25;//damit die Fische unterschiedlich schnell laufen
        this.animateSwim();
        this.type = "pufferfish"
        this.livePoints = 1;
    }
    animateSwim(){
        this.moveLeft();
        setStoppableInterval(() => this.showSwimmingFish(), 200);
    }

    showSwimmingFish(){
        if(this.livePoints == 0){
            this.playAnimation(this.deadPoison);
        }else{
            this.playAnimation(this.swimImages);
        }
    }
   
}