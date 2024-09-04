class Jellyfish extends MovableObject{
    width= 100;
    height= 160;
    x = 600 + Math.random()*2400;
    y = 50 + Math.random()*200;

    swimImage = [
        'img/Enemy/Jellyfish/Super-dangerous/Pink1.png',
        'img/Enemy/Jellyfish/Super-dangerous/Pink2.png',
        'img/Enemy/Jellyfish/Super-dangerous/Pink3.png',
        'img/Enemy/Jellyfish/Super-dangerous/Pink4.png'
    ]

    deadPink =[
        'img/Enemy/Jellyfish/Dead/Pink/P1.png',
        'img/Enemy/Jellyfish/Dead/Pink/P2.png',
        'img/Enemy/Jellyfish/Dead/Pink/P3.png',
        'img/Enemy/Jellyfish/Dead/Pink/P4.png',
    ]

    type;
    livePoints = 2;
    offset={
        right:10,
        left:10,
        top:10,
        bottom:10,
    }
    
    constructor(){
        super().loadImages(this.swimImage);
        this.loadImages(this.deadPink);
        this.animate();
        this.type ="jellyfish";
        this.livePoints = 2;
    }

    animate(){
        this.moveLeft();
        setStoppableInterval(() => this.showSwimmingJelly(), 200);
    }
    
    showSwimmingJelly(){
         if(this.livePoints == 0){
                 this.playAnimation(this.deadPink);
                 this.flyAway();
        }else{
                this.playAnimation(this.swimImage);
        }
    }
}