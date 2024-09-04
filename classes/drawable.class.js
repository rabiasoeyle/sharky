class DrawableObject{
    x = 100;
    y = 250;
    img;
    height= 100;
    width= 150;
    imageCache = {};
    currentImage = 0;

    loadImage(path){
        this.img = new Image();//new Image ist bereits vordefiniert und beschreibt einen image Tag <img>
        this.img.src = path;
        }

        drawP(ctx){
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            //zuerst wird das img eingefügt, dann die position auf x und y achse und dann höhe und breite.
        }

        loadImages(array){
            array.forEach((path) => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            })
        }

        drawBorder(ctx){
            if(this instanceof Character || this instanceof Pufferfish || this instanceof Jellyfish || this instanceof Endboss || this instanceof CollectablePoison || this instanceof CollectableCoins || this instanceof ThrowableObject){
                //es werden nur die border für sharkie und die fische gezeichnet
                ctx.beginPath();
                ctx.lineWidth = "2";
                ctx.strokeStyle = "blue";
                ctx.rect(
                    (this.x + this.offset.right)
                    , (this.y + this.offset.top)
                    , (this.width -(this.offset.left + this.offset.right))
                    , (this.height -(this.offset.top + this.offset.bottom))
                );
                ctx.stroke();
            } 
        }
}