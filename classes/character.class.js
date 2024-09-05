class Character extends MovableObject{
    world;
    height= 100;
    width=150;
    idleImages=[
        'img/Sharkie/IDLE/1.png',
        'img/Sharkie/IDLE/2.png',
        'img/Sharkie/IDLE/3.png',
        'img/Sharkie/IDLE/4.png',
        'img/Sharkie/IDLE/5.png',
        'img/Sharkie/IDLE/6.png',
        'img/Sharkie/IDLE/7.png',
        'img/Sharkie/IDLE/8.png',
        'img/Sharkie/IDLE/9.png',
        'img/Sharkie/IDLE/10.png',
        'img/Sharkie/IDLE/11.png',
        'img/Sharkie/IDLE/12.png',
        'img/Sharkie/IDLE/13.png',
        'img/Sharkie/IDLE/14.png',
        'img/Sharkie/IDLE/15.png',
        'img/Sharkie/IDLE/16.png',
        'img/Sharkie/IDLE/17.png',
        'img/Sharkie/IDLE/18.png',
    ]
    moveRightImages = [
        'img/Sharkie/Swim/1.png',
        'img/Sharkie/Swim/2.png',
        'img/Sharkie/Swim/3.png',
        'img/Sharkie/Swim/4.png',
        'img/Sharkie/Swim/5.png',
        'img/Sharkie/Swim/6.png',
    ]
    deadImagesPoisioned = [
        'img/Sharkie/dead/Poisoned/1.png',
        'img/Sharkie/dead/Poisoned/2.png',
        'img/Sharkie/dead/Poisoned/3.png',
        'img/Sharkie/dead/Poisoned/4.png',
        'img/Sharkie/dead/Poisoned/5.png',
        'img/Sharkie/dead/Poisoned/7.png',
        'img/Sharkie/dead/Poisoned/9.png',
        'img/Sharkie/dead/Poisoned/10.png',
        'img/Sharkie/dead/Poisoned/11.png',
        'img/Sharkie/dead/Poisoned/12.png',
    ]
    deadImagesElectro = [
        'img/Sharkie/dead/Electro_shock/1.png',
        'img/Sharkie/dead/Electro_shock/2.png',
        'img/Sharkie/dead/Electro_shock/3.png',
        'img/Sharkie/dead/Electro_shock/4.png',
        'img/Sharkie/dead/Electro_shock/5.png',
        'img/Sharkie/dead/Electro_shock/6.png',
        'img/Sharkie/dead/Electro_shock/7.png',
        'img/Sharkie/dead/Electro_shock/8.png',
        'img/Sharkie/dead/Electro_shock/9.png',
        'img/Sharkie/dead/Electro_shock/10.png',
    ]
    hurtImagesPoison = [
        'img/Sharkie/Hurt/Poisoned/1.png',
        'img/Sharkie/Hurt/Poisoned/2.png',
        'img/Sharkie/Hurt/Poisoned/3.png',
        'img/Sharkie/Hurt/Poisoned/4.png',
        'img/Sharkie/Hurt/Poisoned/5.png',
    ]
    bulbAttack = [
        'img/Sharkie/Attack/Bubble trap/For Whale/1.png',
        'img/Sharkie/Attack/Bubble trap/For Whale/2.png',
        'img/Sharkie/Attack/Bubble trap/For Whale/3.png',
        'img/Sharkie/Attack/Bubble trap/For Whale/4.png',
        'img/Sharkie/Attack/Bubble trap/For Whale/5.png',
        'img/Sharkie/Attack/Bubble trap/For Whale/6.png',
        'img/Sharkie/Attack/Bubble trap/For Whale/7.png',
        'img/Sharkie/Attack/Bubble trap/For Whale/8.png',
    ]
    hurtImageElectro =[
        'img/Sharkie/Hurt/Electric-shock/1.png',
        'img/Sharkie/Hurt/Electric-shock/2.png',
        'img/Sharkie/Hurt/Electric-shock/3.png',
    ]
    sharkieAttack = [
        'img/Sharkie/Attack/Fin slap/1.png',
        'img/Sharkie/Attack/Fin slap/2.png',
        'img/Sharkie/Attack/Fin slap/3.png',
        'img/Sharkie/Attack/Fin slap/4.png',
        'img/Sharkie/Attack/Fin slap/5.png',
        'img/Sharkie/Attack/Fin slap/6.png',
        'img/Sharkie/Attack/Fin slap/7.png',
    ]

    x = 50;
    y = 480 - (this.height +50);
    world; 
    swimmingSound = new Audio ('audio/idle.mp3');
    looseSound=new Audio('audio/loose.mp3');
    hurtSound = new Audio('audio/hurt.mp3');
    offset={
        right:10,
        left:10,
        top:20,
        bottom:10,
    }
    finAttack = false;// dies ist eine Idee um die atacke auch als Atacke aufnehmen zu lassen

    constructor(){
        super().loadImages(this.idleImages);
        this.loadImages(this.moveRightImages); 
        this.loadImages(this.deadImagesPoisioned); 
        this.loadImages(this.deadImagesElectro);
        this.loadImages(this.hurtImagesPoison); 
        this.loadImages(this.bulbAttack);   
        this.loadImages(this.hurtImageElectro); 
        this.loadImages(this.sharkieAttack);
        this.x = 50;
        this.animate();
    }

    animate(){
        setStoppableInterval(() => this.animateSwimmingSound(), 1000/60);
        setStoppableInterval(() => this.animateSituation(), 100);
    }
    animateSwimmingSound(){
        // Stoppe den Sound nur, wenn keine Bewegung erfolgt
        if (!this.world.keyboard.right && !this.world.keyboard.left && !this.world.keyboard.up && !this.world.keyboard.down) {
            this.swimmingSound.pause();
        }
        if(this.world.keyboard.right || this.world.keyboard.left){
            if(this.world.keyboard.right && this.x < this.world.level.levelEnd_x){
            this.x += this.speed*30;
            this.otherDirection = false;
            if(isMuted == false){
               this.swimmingSound.play(); 
            }
            
            }
            if(this.world.keyboard.left && this.x > 0){
                this.x -= this.speed*30;
                this.otherDirection = true;
                if(isMuted == false){
                this.swimmingSound.play();}
            }
            this.world.camera_x = 0 - this.x +50
        }
        if(this.world.keyboard.up || this.world.keyboard.down){
            if(this.world.keyboard.up && this.y > 0){
                this.y -= this.speed*30;
                this.otherDirection = false;
                if(isMuted == false){
                this.swimmingSound.play();}
            }
            if(this.world.keyboard.down && this.y < 380){
                this.y += this.speed *30;
                this.otherDirection = false;
                if(isMuted == false){
                this.swimmingSound.play();}
            }
        }
    }

    animateSituation(){
        if(this.world.keyboard.d && this.world.statusbar[2].poisonPercentage > 0){
            this.otherDirection = false;
            this.playAnimation(this.bulbAttack);
            // this.finAttack = false;
        }else
        if(this.isHurt()){
            if(isMuted == false){
            this.hurtSound.play();}
            this.playAnimation(this.hurtImagesPoison);
            // this.finAttack = false;
            
        }else
        if(this.world.keyboard.space){
            this.playAnimation(this.sharkieAttack);
            this.finAttack = true;
            
        } else if(this.isHurtByJelly()){
            if(isMuted == false){
            this.hurtSound.play();}
            this.playAnimation(this.hurtImageElectro);
            // this.finAttack = false;
            
        }else if(this.isHurtByBoss()){
            if(isMuted == false){
            this.hurtSound.play();}
            this.playAnimation(this.hurtImageElectro);
            // this.finAttack = false;
            
        }else
        if(this.isDead()){
            this.playAnimation(this.deadImagesPoisioned);
            if(isMuted == false){
            this.looseSound.play();}
            // this.finAttack = false;
        }else
        if(this.world.keyboard.right||this.world.keyboard.left||this.world.keyboard.up ||this.world.keyboard.down){
            this.playAnimation(this.moveRightImages)
            // this.finAttack = false;
        }
        else{
            this.playAnimation(this.idleImages)
            this.finAttack = false;
        }
    }
}