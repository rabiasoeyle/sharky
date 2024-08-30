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
        right:0,
        left:0,
        top:0,
        bottom:0,
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
        setInterval(() =>{
            if(this.livePoints == 0){
                 this.playAnimation(this.deadPink);
            }else{
                this.playAnimation(this.swimImage);
            }
        },200)
    }
}