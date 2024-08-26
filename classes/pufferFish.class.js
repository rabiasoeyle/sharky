class Pufferfish extends MovableObject{
    width= 100;
    height= 100;
    constructor(){
        super().loadImage('../img/2.Enemy/1.Pufferfish/1.Swim/1.swim1.png');
        this.x = 220 + Math.random()*500;
        this.y = 480 - this.height-50;
    }
}