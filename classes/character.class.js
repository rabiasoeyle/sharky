class Character extends MovableObject{
    height= 300;
    width=200;
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
    moveRightImages = [
        'img/Sharkie/Swim/1.png',
        'img/Sharkie/Swim/2.png',
        'img/Sharkie/Swim/3.png',
        'img/Sharkie/Swim/4.png',
        'img/Sharkie/Swim/5.png',
        'img/Sharkie/Swim/6.png',
    ]
    moveBackImages = [
        'img/Sharkie/Swim/1.png',
        'img/Sharkie/Swim/2.png',
        'img/Sharkie/Swim/3.png',
        'img/Sharkie/Swim/4.png',
        'img/Sharkie/Swim/5.png',
        'img/Sharkie/Swim/6.png',
    ]
    x = 50;
    y = 480 - this.height;
    world; 
    swimmingSound = new Audio ('./audio/idle.mp3')

    constructor(){
        super().loadImages(this.idleImages);
        this.loadImages(this.moveRightImages); 
        this.loadImages(this.moveBackImages);       
        this.animate();
    }

    animate(){
    
        setInterval(()=>{
            // Stoppe den Sound nur, wenn keine Bewegung erfolgt
            if (!this.world.keyboard.right && !this.world.keyboard.left) {
                this.swimmingSound.pause();
            }
            if(this.world.keyboard.right && this.x < this.world.level.levelEnd_x){
                this.x += this.speed*30;
                this.otherDirection = false;
                this.swimmingSound.play();
            }
            if(this.world.keyboard.left && this.x > 0){
                this.x -= this.speed*30;
                this.otherDirection = true;
                this.swimmingSound.play();
            }
            this.world.camera_x = 0 - this.x +50
            
        },1000/60)
            setInterval(() =>{
                if(this.world.keyboard.right||this.world.keyboard.left){
                    let i = this.currentImage % this.moveRightImages.length;
                    let path = this.moveRightImages[i];
                    this.img = this.imageCache[path];
                    this.currentImage ++;}
                else{
                    let i = this.currentImage % this.idleImages.length;
                    let path = this.idleImages[i];
                    this.img = this.imageCache[path];
                    this.currentImage ++;
                }
            },100)
        
    }

    jump(){

    }

    sleep(){

    }
}