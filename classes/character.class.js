class Character extends MovableObject{
    world;
    height= 200;
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
    offset={
        right:30,
        left:40,
        top:100,
        bottom:50,
    }
    finAttack = false;// dies ist eine Idee um die atacke auch als Atacke aufnehmen zu lassen

    /**
     * Loads all images, with sending it to the function.
     * Starts Characteranimation.
     */
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

    /**
     * Animates swimming and different Situations.
     */
    animate(){
        setStoppableInterval(() => this.animateSwimmingSound(), 1000/60);
        setStoppableInterval(() => this.animateSituation(), 100);
    }

    /**
     * Animates different swimming situations.
     */
    animateSwimmingSound(){
        if (!this.world.keyboard.right && !this.world.keyboard.left && !this.world.keyboard.up && !this.world.keyboard.down) {
            allSounds[0].pause();
        }
        if(this.world.keyboard.right || this.world.keyboard.left){
            this.swimmingRightAndLeft(); 
        }
        if(this.world.keyboard.up || this.world.keyboard.down){
            this.swimmingUpAndDown();
        }
    }

    /**
     * Animates swimming right and left.
     */
    swimmingRightAndLeft(){
        if(this.world.keyboard.right && this.x < this.world.level.levelEnd_x){
            this.x += this.speed*30;
            this.otherDirection = false;
            if(isMuted == false){
               allSounds[0].play(); //swimming sound
            }
            }
            if(this.world.keyboard.left && this.x > 0){
                this.x -= this.speed*30;
                this.otherDirection = true;
                if(isMuted == false){
                allSounds[0].play();} //swimming sound
            }
            this.world.camera_x = 0 - this.x +50
    }

    /**
     * Animates swimming up and down.
     */
    swimmingUpAndDown(){
        if(this.world.keyboard.up && this.y > -80){
            this.y -= this.speed*30;
            this.otherDirection = false;
            if(isMuted == false){
            allSounds[0].play();}
        }
        if(this.world.keyboard.down && this.y < 300){
            this.y += this.speed *30;
            this.otherDirection = false;
            if(isMuted == false){
            allSounds[0].play();}
        }
    }

    /**
     * Animation when:
     * -dead
     * -hurt
     * -bulbattack
     * -attack
     */
    animateSituation(){
        if(this.world.keyboard.d && this.world.statusbar[2].poisonPercentage > 0){
            this.otherDirection = false;
            this.playAnimation(this.bulbAttack);
        }else
        if(this.isHurt()){
            if(isMuted == false){
            allSounds[2].play();}
            this.playAnimation(this.hurtImagesPoison);
        }else
        if(this.world.keyboard.space){
            this.playAnimation(this.sharkieAttack);
            this.finAttack = true;
        }else 
        if(this.isHurtByJelly()){
            if(isMuted == false){
            allSounds[2].play();}
            this.playAnimation(this.hurtImageElectro);
        }else   
        this.animateSituationSecondPart();
    }

    /**
     * Animation when:
     * -dead
     * -hurt
     * -bulbattack
     * -attack
     */
    animateSituationSecondPart(){
        if(this.isHurtByBoss()){
            if(isMuted == false){
            allSounds[2].play();}//hurt sound
            this.playAnimation(this.hurtImageElectro);
        }else
        if(this.isDead()){
            this.playAnimation(this.deadImagesPoisioned);
            if(isMuted == false){
            allSounds[1].play();}//lose sound
        }else
        if(this.world.keyboard.right||this.world.keyboard.left||this.world.keyboard.up ||this.world.keyboard.down){
            this.playAnimation(this.moveRightImages)
        }else{
            this.playAnimation(this.idleImages)
            this.finAttack = false;
        }
    }
}