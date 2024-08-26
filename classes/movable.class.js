class MovableObject{
    x = 100;
    y = 250;
    img;
    height= 100;
    width= 150;

    loadImage(path){
    this.img = new Image();//new Image ist bereits vordefiniert und beschreibt einen image Tag <img>
    this.img.src = path;
    }
    moveRight(){
        console.log('Moving right');
    }
    moveLeft(){

    }
}