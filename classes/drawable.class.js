class DrawableObject{
    x = 100;
    y = 250;
    img;
    height= 100;
    width= 150;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads one image.
     * @param {*} path 
     */
    loadImage(path){
        this.img = new Image();//first a new img tag will be created
        this.img.src = path;
    }

    /**
     * Draws all images on ctx.
     * @param {*} ctx 
     */
    drawP(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        //first img which should be decribed, then the position on x and y and finally he width and height.
    }
    
    /**
     * Creates a new img Tag for all images and saves it in the imageCache.
     * @param {*} array 
     */
    loadImages(array){
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    /**
     * Draws border for precise the collapse Funktion.
     * @param {*} ctx 
     */
    drawBorder(ctx){
        if(this instanceof Character || this instanceof Pufferfish || this instanceof Jellyfish || this instanceof Endboss || this instanceof CollectablePoison || this instanceof CollectableCoins || this instanceof ThrowableObject){
        } 
    }
    
}