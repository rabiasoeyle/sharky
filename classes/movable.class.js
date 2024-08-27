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
}