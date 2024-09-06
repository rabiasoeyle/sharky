// import World from "world.class.js"

class CollectableCoins extends MovableObject{
    
    x = 220 + Math.random()*2000;
    y = 50 + Math.random()*350;
    width= 30;
    height= 30;
    coinImages =[
        'img/Marcadores/Coins/1.png',
        'img/Marcadores/Coins/2.png',
        'img/Marcadores/Coins/3.png',
        'img/Marcadores/Coins/4.png',
    ];
    offset={
        right:0,
        left:0,
        top:0,
        bottom:0,
    }
    
    /**
     * Send images to loadImages().
     * Start Animation.
     */
    constructor(){
        super().loadImages(this.coinImages);
        this.animate();
    }

    /**
     * Set Animation interval.
     */
    animate(){
        setStoppableInterval(() => this.showCoins(), 200);
    }

    /**
     * Play Animation.
     */
    showCoins(){
        this.playAnimation(this.coinImages);
    }
}