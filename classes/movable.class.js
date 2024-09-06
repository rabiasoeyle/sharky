class MovableObject extends DrawableObject{
    speed = 0.16;
    speedY =0.04;
    flySpeed = 4;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    acceleration = 4.5;
    lastHitJelly = 0;
    offset={
        right:0,
        left:0,
        top:0,
        bottom:0,
    }
    lastHitAtBoss=0;
    livePointsBoss = 3;
    enemyHurted = false;
    lassHitFromBoss=0;
    
    /**
     * Creates Interval, if Gravity is needed for character.
     */
    applyGravity(){
        setStoppableInterval(() => this.applyGravityAnimation(), 1000/60);
    }

    /**
     * Animates the Gravity.
     */
    applyGravityAnimation(){
        if( this.isAboveGround()|| this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
    }

    /**
     * Checks if character is over y <400.
     * @returns 
     */
    isAboveGround(){
        return this.y <400;
    }

    /**
     * Creates an interval for moving.
     */
    moveLeft(){
        setStoppableInterval(() => this.moveLeftAnimation(), 1000/60);
    }

    /**
     * Animates moving left.
     */
    moveLeftAnimation(){
        this.x -= this.speed;
    }

    /**
     * Sets an interval to push the enemies away.
     */
    flyAway(){
        setStoppableInterval(() => this.flyAwayAnimation(), 1000/60);
    }

    /**
     * Animates flying enemy.
     */
    flyAwayAnimation(){
        this.x += this.flySpeed;
        this.y -= this.flySpeed +2;
    }

    /**
     * Starts an animation with a lot images.
     * @param {*} images 
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
                    let path = images[i];
                    this.img = this.imageCache[path];
                    this.currentImage ++;
    }
    
    /**
     * Checks if something is colliding.
     * @param {*} mo 
     * @returns 
     */
    isColliding(mo){
        return this.x + this.width-this.offset.right > mo.x + mo.offset.left && 
            this.y + this.height - this.offset.bottom > mo.y +mo.offset.top &&
            this.x +this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y +this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
     * Starts when character is hit by Pufferfish.
     */
    hit(){
        this.energy -= 2;
            if(this.energy <= 0){
                this.energy = 0;
                this.isDead();
            }else{
                this.lastHit = new Date().getTime();
            }
    }

    /**
     * Starts when character is hit by Jellyfish.
     */
    hitByJelly(){
        this.energy -= 5;
            if(this.energy <= 0){
                this.energy = 0;
                this.isDead();
            }else{
                this.lastHitJelly = new Date().getTime();
            }
    }

    /**
     * Starts when character is hit by Endboss.
     */
    hitByEndboss(){
        this.energy -=20;
        // console.log('Boss attacks', this.energy);
        if(this.energy <= 0){
            this.energy = 0;
            this.isDead();
        }else{
            this.lastHitFromBoss = new Date().getTime();
        }
    }

    /**
     * Gives back true or false.
     * @returns 
     */
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; //Difference in Miliseconds
        timepassed = timepassed /1000; //change to seconds
        return timepassed < 1; //when 2 seconds are passed, then isHurt() is true
    }

    /**
     * Gives back true or false.
     * @returns 
     */
    isHurtByJelly(){
        let timepassed = new Date().getTime() - this.lastHitJelly; //Difference in Miliseconds
        timepassed = timepassed /1000; //change to seconds
        return timepassed < 1; //when 2 seconds are passed, then isHurt() is true
    }

    /**
     * Gives back true or false.
     * @returns 
     */
    isHurtByBoss(){
        let timepassed = new Date().getTime() - this.lastHitFromBoss; //Difference in Miliseconds
        timepassed = timepassed /1000; //change to seconds
        return timepassed < 1; //when 2 seconds are passed, then isHurt() is true
    }

    /**
     * Sets energy to 0, so it cant be less.
     * @returns 
     */
    isDead(){
        return this.energy == 0;
    }

    /**
     * Sets energy to 0, so it cant be less.
     * @returns 
     */
    jellyIsDead(){
        return this.livePoints = 0;
    }

    /**
     * Sets energy to 0, so it cant be less.
     * @returns 
     */
    pufferIsDead(){
        return this.livePoints = 0;
    }

    /**
     * Sets energy to 0, so it cant be less.
     * @returns 
     */
    endBossIsDead(){
        return this.livePoints = 0;
    }

    /**
     * Saves Time when Boss was hurted.
     * @param {*} time 
     */
    hurtBossEnemy(time){
        this.lastHitAtBoss = time
        // console.log('test'+this.lastHitAtBoss);
        let timepassed = new Date().getTime() - this.lastHitAtBoss;
        timepassed = timepassed/1000;
        if(timepassed < 1){
            this.setLivePointsHurtedEnemy()
        }
    }

    /**
     * Shows if enemy is hurted or not.
     * @returns 
     */
    setLivePointsHurtedEnemy(){
        return this.enemyHurted;
    }

}