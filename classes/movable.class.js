class MovableObject{
    x = 100;
    y = 250;
    img;
    height= 100;
    width= 150;
    imageCache = {};
    currentImage = 0;
    speed = 0.16;
    otherDirection = false;

    loadImage(path){
    this.img = new Image();//new Image ist bereits vordefiniert und beschreibt einen image Tag <img>
    this.img.src = path;
    }

    loadImages(array){
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    moveRight(){
        console.log('Moving right');
    }

    moveLeft(){
        setInterval(()=>{
            this.x -= this.speed;
        },1000/60);
    }
    
    playAnimation(images){
        let i = this.currentImage % images.length;
                    let path = images[i];
                    this.img = this.imageCache[path];
                    this.currentImage ++;
    }

    drawP(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        //zuerst wird das img eingefügt, dann die position auf x und y achse und dann höhe und breite.
    }
    
    drawBorder(ctx){
        if(this instanceof Character || this instanceof Pufferfish || this instanceof Jellyfish){
            //es werden nur die border für sharkie und die fische gezeichnet
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        } 
    }
    
    isColliding(mo){
        return this.x + this.width > mo.x && 
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }
}