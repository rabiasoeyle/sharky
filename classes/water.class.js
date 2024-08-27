class Water extends MovableObject{
    y= 0;
    speed = 0.25;
    constructor(path, x){
        super().loadImage(path);
        this.x = x;
        this.width=720;
        this.height=480;
        this.animate();
    }

    animate(){
        this.moveLeft();
    }
}