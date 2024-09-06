class Water extends MovableObject{
    y= 0;
    speed = 0.25;
    
    /**
     * Loads images. Animates.
     * @param {*} path 
     * @param {*} x 
     */
    constructor(path, x){
        super().loadImage(path);
        this.x = x;
        this.width=720;
        this.height=480;
        this.animate();
    }

    /**
     * Animates the background to move left.
     */
    animate(){
        this.moveLeft();
    }
}