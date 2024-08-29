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
    height = 500;
    width= 400;
    y=-20;
    x = 2900;
    hadFirstContact = false;
    type;
    livePoints = 3;
    constructor(){
        super().loadImages(this.introduceEndboss);
        this.loadImages(this.floating);
        this.loadImages(this.deadBoss);
        this.animateIntro();
        this.type = "endboss";
        this.livePoints=3;
    }
    animateIntro(){
        let i = 0;
        setInterval(() =>{
            if(i<10){
                this.playAnimation(this.introduceEndboss);
            }else if(this.livePoints == 0){
                this.playAnimation(this.deadBoss);
           }else{
                this.playAnimation(this.floating);
            }
            i++;
            // if(world.character.x > 2400 && !this.hadFirstContact){
            //     i=0;
            //     this.hadFirstContact=true;
            // }
        },200)
    }
}