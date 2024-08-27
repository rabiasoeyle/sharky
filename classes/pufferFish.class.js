class Pufferfish extends MovableObject{
    width= 100;
    height= 100; 
    x = 220 + Math.random()*500;
    y = 480 - this.height-50;
    swimImages=[
        'img/Enemy/Pufferfish/Swim/1swim1.png',
        'img/Enemy/Pufferfish/Swim/1swim2.png',
        'img/Enemy/Pufferfish/Swim/1swim3.png',
        'img/Enemy/Pufferfish/Swim/1swim4.png',
        'img/Enemy/Pufferfish/Swim/1swim5.png'
    ]
    // currentImage = 0;
    constructor(){
        super().loadImages(this.swimImages);
        this.animateSwim();
    }
    animateSwim(){
        setInterval(() =>{
            let i = this.currentImage % this.swimImages.length;
            let path = this.swimImages[i];
            this.img = this.imageCache[path];
            this.currentImage ++;
        },200)
    }
   
}