class Endboss extends MovableObject{
    introduceEndboss = [
        'img/Enemy/FinalEnemy/Introduce/1.png',
        'img/Enemy/FinalEnemy/Introduce/2.png',
        'img/Enemy/FinalEnemy/Introduce/3.png',
        'img/Enemy/FinalEnemy/Introduce/4.png',
        'img/Enemy/FinalEnemy/Introduce/5.png',
        'img/Enemy/FinalEnemy/Introduce/6.png',
        'img/Enemy/FinalEnemy/Introduce/7.png',
        'img/Enemy/FinalEnemy/Introduce/8.png',
        'img/Enemy/FinalEnemy/Introduce/9.png',
        'img/Enemy/FinalEnemy/Introduce/10.png',
    ]
    floating=[
        'img/Enemy/FinalEnemy/floating/1.png',
        'img/Enemy/FinalEnemy/floating/2.png',
        'img/Enemy/FinalEnemy/floating/3.png',
        'img/Enemy/FinalEnemy/floating/4.png',
        'img/Enemy/FinalEnemy/floating/5.png',
        'img/Enemy/FinalEnemy/floating/6.png',
        'img/Enemy/FinalEnemy/floating/7.png',
        'img/Enemy/FinalEnemy/floating/8.png',
        'img/Enemy/FinalEnemy/floating/9.png',
        'img/Enemy/FinalEnemy/floating/10.png',
        'img/Enemy/FinalEnemy/floating/11.png',
        'img/Enemy/FinalEnemy/floating/12.png',
        'img/Enemy/FinalEnemy/floating/13.png',
    ]
    deadBoss=[
        'img/Enemy/FinalEnemy/Dead/Mesadetrabajo2copia6.png',
        'img/Enemy/FinalEnemy/Dead/Mesadetrabajo2copia7.png',
        'img/Enemy/FinalEnemy/Dead/Mesadetrabajo2copia8.png',
        'img/Enemy/FinalEnemy/Dead/Mesadetrabajo2copia9.png',
        'img/Enemy/FinalEnemy/Dead/Mesadetrabajo2copia10.png',
    ]
    hurtBoss=[
        'img/Enemy/FinalEnemy/Hurt/1.png',
        'img/Enemy/FinalEnemy/Hurt/2.png',
        'img/Enemy/FinalEnemy/Hurt/3.png',
        'img/Enemy/FinalEnemy/Hurt/4.png',
    ]
    attackBoss = [
        'img/Enemy/FinalEnemy/Attack/1.png',
        'img/Enemy/FinalEnemy/Attack/2.png',
        'img/Enemy/FinalEnemy/Attack/3.png',
        'img/Enemy/FinalEnemy/Attack/4.png',
        'img/Enemy/FinalEnemy/Attack/5.png',
        'img/Enemy/FinalEnemy/Attack/6.png',
    ]
    height = 500;
    width= 400;
    y=-20;
    x = 2900;
    hadFirstContact = false;
    type;
    livePoints = 3;
    offset={
        right:0,
        left:50,
        top:0,
        bottom:0,
    }
    i = 0;

    /**
     * Load all images and describes the type of the enemy.
     */
    constructor(){
        super().loadImages(this.introduceEndboss);
        this.loadImages(this.floating);
        this.loadImages(this.deadBoss);
        this.loadImages(this.hurtBoss);
        this.loadImages(this.attackBoss);
        this.animateIntro();
        this.type = "endboss";
        this.livePoints=3;
    }

    /**
     * Animates the endboss.
     */
    animateIntro(){
        setStoppableInterval(() => this.animationInterval(), 200);
    }

    /**
     * animate endboss in different situations
     */
    animationInterval(){
        if(gameStarted){
            if(this.i<=9){
                this.playAnimation(this.introduceEndboss);
            }else 
            if(this.livePoints == 0){
                this.livePointsZero();
            }else if(this.hadFirstContact && this.i>=40){
                this.firstContactOccured()
                this.checkIfHurtedBoss();
            }else if(this.hadFirstContact && this.i>=10){
                this.playAnimation(this.floating)
                this.checkIfHurtedBoss()
            }else{
            }
            if(world.character.x > 2100 && !this.hadFirstContact){
                this.i=0;
                this.firstContactNotOccured();
            }
            this.i++;
        }
            
    }

    /**
     * checks if enemy is hurted
     */
    checkIfHurtedBoss(){
        if(this.hurtBossEnemy()){
            this.playAnimation(this.hurtBoss);
            if(isMuted == false){
                allSounds[2].play();}
        }
    }

    /**
     * animate when dead
     */
    livePointsZero(){
        this.playAnimation(this.deadBoss);
        if(isMuted == false){
        allSounds[3].play();} //win sound
    }

    /**
     * animate when firstContact already happend
     */
    firstContactOccured(){
        if(isMuted == false){
        allSounds[5].play();} //attack
        this.playAnimation(this.attackBoss);
        this.moveLeft();
    }

    /**
     * animate when first contact occures new
     */
    firstContactNotOccured(){
        this.hadFirstContact=true
        setTimeout(()=>{
            if(isMuted == false){
            allSounds[4].play();}
        },400)
    }
}