class Jellyfish extends MovableObject{
    width= 100;
    height= 160;
    x = 200 + Math.random()*500;
    y = 480 - this.height;
    swimImage = [
        '../img/Enemy/Jellyfish/Super-dangerous/Pink1.png',
        '../img/Enemy/Jellyfish/Super-dangerous/Pink2.png',
        '../img/Enemy/Jellyfish/Super-dangerous/Pink3.png',
        '../img/Enemy/Jellyfish/Super-dangerous/Pink4.png'
    ]
    // currentImage = 0;

    constructor(){
        super().loadImages(this.swimImage);
        this.animateSwim();
    }
    animateSwim(){
        setInterval(() =>{
            let i = this.currentImage % this.swimImage.length;
            let path = this.swimImage[i];
            this.img = this.imageCache[path];
            this.currentImage ++;
        },200)
    }
}