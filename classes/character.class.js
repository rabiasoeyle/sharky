class Character extends MovableObject{
    height= 400;
    width=300;
    idleImages=[
        '../img/Sharkie/IDLE/1.png',
        '../img/Sharkie/IDLE/2.png',
        '../img/Sharkie/IDLE/3.png',
        '../img/Sharkie/IDLE/4.png',
        '../img/Sharkie/IDLE/5.png',
        '../img/Sharkie/IDLE/6.png',
        '../img/Sharkie/IDLE/7.png',
        '../img/Sharkie/IDLE/8.png',
        '../img/Sharkie/IDLE/9.png',
        '../img/Sharkie/IDLE/10.png',
        '../img/Sharkie/IDLE/11.png',
        '../img/Sharkie/IDLE/12.png',
        '../img/Sharkie/IDLE/13.png',
        '../img/Sharkie/IDLE/14.png',
        '../img/Sharkie/IDLE/15.png',
        '../img/Sharkie/IDLE/16.png',
        '../img/Sharkie/IDLE/17.png',
        '../img/Sharkie/IDLE/18.png'
    ]
    // currentImage = 0;
    x = 50;
    y = 480 - this.height;

    constructor(){
        super().loadImages(this.idleImages)
        this.animate();
    }

    animate(){
        setInterval(() =>{
            let i = this.currentImage % this.idleImages.length;
            let path = this.idleImages[i];
            this.img = this.imageCache[path];
            this.currentImage ++;
        },200)
    }

    jump(){

    }

    sleep(){

    }
}