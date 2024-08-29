class Jellyfish extends MovableObject{
    width= 100;
    height= 160;
    x = 600 + Math.random()*500;
    y = 50 + Math.random()*350;
    swimImage = [
        'img/Enemy/Jellyfish/Super-dangerous/Pink1.png',
        'img/Enemy/Jellyfish/Super-dangerous/Pink2.png',
        'img/Enemy/Jellyfish/Super-dangerous/Pink3.png',
        'img/Enemy/Jellyfish/Super-dangerous/Pink4.png'
    ]
    type;
    livePoints = 1;

    constructor(){
        super().loadImages(this.swimImage);
        this.animateSwim();
        this.type ="jellyfish";
        this.livePoints = 1;
    }
    animateSwim(){
        this.moveLeft();
        setInterval(() =>{
            this.playAnimation(this.swimImage);
        },200)
    }
}