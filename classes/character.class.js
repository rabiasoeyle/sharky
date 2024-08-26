class Character extends MovableObject{
    height= 400;
    width=300;
    constructor(){
        super().loadImage('../img/1.Sharkie/1.IDLE/1.png');
        this.x = 50;
        this.y = 480 - this.height;
    }
    jump(){

    }
    sleep(){

    }
}