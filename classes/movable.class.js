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
    
    applyGravity(){
        setStoppableInterval(() => this.applyGravityAnimation(), 1000/60);
    }

    applyGravityAnimation(){
        if( this.isAboveGround()|| this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
    }

    isAboveGround(){
        return this.y <400;
    }

    moveLeft(){
        setStoppableInterval(() => this.moveLeftAnimation(), 1000/60);
    }

    moveLeftAnimation(){
         this.x -= this.speed;
    }
    flyAway(){
        setStoppableInterval(() => this.flyAwayAnimation(), 1000/60);
    }
    flyAwayAnimation(){
        this.x += this.flySpeed;
        this.y -= this.flySpeed +2;
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
                    let path = images[i];
                    this.img = this.imageCache[path];
                    this.currentImage ++;
    }
    
    isColliding(mo){
        return this.x + this.width-this.offset.right > mo.x + mo.offset.left && 
            this.y + this.height+this.offset.bottom > mo.y +mo.offset.top &&
            this.x +this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y +this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    hit(){
        this.energy -= 2;
        console.log('Alarm Alarm', this.energy)
                    if(this.energy <= 0){
                        this.energy = 0;
                        this.isDead();
                    }else{
                        this.lastHit = new Date().getTime();
                    }
    }
    hitByJelly(){
        this.energy -= 5;
        console.log('Alarm Jelly', this.energy)
                    if(this.energy <= 0){
                        this.energy = 0;
                        this.isDead();
                    }else{
                        this.lastHitJelly = new Date().getTime();
                    }
    }

    hitByEndboss(){
        this.energy -=20;
        console.log('Boss attacks', this.energy);
        if(this.energy <= 0){
            this.energy = 0;
            this.isDead();
        }else{
            this.lastHitFromBoss = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; //Difference in Miliseconds
        timepassed = timepassed /1000; //change to seconds
        return timepassed < 1; //when 2 seconds are passed, then isHurt() is true
    }

    isHurtByJelly(){
        let timepassed = new Date().getTime() - this.lastHitJelly; //Difference in Miliseconds
        timepassed = timepassed /1000; //change to seconds
        return timepassed < 1; //when 2 seconds are passed, then isHurt() is true
    }

    isHurtByBoss(){
        let timepassed = new Date().getTime() - this.lastHitFromBoss; //Difference in Miliseconds
        timepassed = timepassed /1000; //change to seconds
        return timepassed < 1; //when 2 seconds are passed, then isHurt() is true
    }

    isDead(){
        return this.energy == 0;
    }

    jellyIsDead(){
        return this.livePoints = 0;
    }

    pufferIsDead(){
        return this.livePoints = 0;
    }

    endBossIsDead(){
        return this.livePoints = 0;
    }

    hurtBossEnemy(time){
        this.lastHitAtBoss = time
        console.log('test'+this.lastHitAtBoss);
        let timepassed = new Date().getTime() - this.lastHitAtBoss;
        timepassed = timepassed/1000;
        if(timepassed < 1){
            this.setLivePointsHurtedEnemy()
        }
    }
    setLivePointsHurtedEnemy(){
        return this.enemyHurted;
    }

}