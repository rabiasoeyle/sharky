class Character extends MovableObject{
    height= 400;
    width=300;
    idleImages=[
        '../img/1.Sharkie/1.IDLE/1.png',
        '../img/1.Sharkie/1.IDLE/2.png',
        '../img/1.Sharkie/1.IDLE/3.png',
        '../img/1.Sharkie/1.IDLE/4.png',
        '../img/1.Sharkie/1.IDLE/5.png',
        '../img/1.Sharkie/1.IDLE/6.png',
        '../img/1.Sharkie/1.IDLE/7.png',
        '../img/1.Sharkie/1.IDLE/8.png',
        '../img/1.Sharkie/1.IDLE/9.png',
        '../img/1.Sharkie/1.IDLE/10.png',
        '../img/1.Sharkie/1.IDLE/11.png',
        '../img/1.Sharkie/1.IDLE/12.png',
        '../img/1.Sharkie/1.IDLE/13.png',
        '../img/1.Sharkie/1.IDLE/14.png',
        '../img/1.Sharkie/1.IDLE/15.png',
        '../img/1.Sharkie/1.IDLE/16.png',
        '../img/1.Sharkie/1.IDLE/17.png',
        '../img/1.Sharkie/1.IDLE/18.png'
    ]
    currentImage = 0;
    x = 50;
    y = 480 - this.height;

    constructor(){
        super().loadImages([this.idleImages])
        this.animate();
    }

    animate(){
        setInterval(() =>{
            let i = this.currentImage % this.idleImages.length;
            let path = this.idleImages[i];
            this.img = this.imageCache[path];
            this.currentImage ++;
        },1000)
    }

    jump(){

    }

    sleep(){

    }
}