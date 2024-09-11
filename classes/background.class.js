class BackgroundObjects extends NotMovableObject{
    width=720;
    height=480;

    /**
     * Sets the x and y value. 
     * Sends Images to loadImage()
     * @param {*} imgPath 
     * @param {*} x 
     */
    constructor(imgPath, x){
        super().loadImage(imgPath);
        this.x = x;
        this.y = 480-this.height;  
    }
}