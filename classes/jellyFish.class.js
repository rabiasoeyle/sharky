class Jellyfish extends MovableObject{
    width= 100;
    height= 160;

    constructor(){
        super().loadImage('../img/2.Enemy/2.Jellyfish/Super-dangerous/Pink1.png');
        this.x = 200 + Math.random()*500;
        this.y = 480 - this.height;
    }
}