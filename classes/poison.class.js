class CollectablePoison extends MovableObject{
    
    x = 220 + Math.random()*2300;
    y = 50 + Math.random()*350;
    width= 30;
    height= 30;
    poisonImages = [
        'img/Marcadores/Posión/Animada/1.png',
        'img/Marcadores/Posión/Animada/2.png',
        'img/Marcadores/Posión/Animada/3.png',
        'img/Marcadores/Posión/Animada/4.png',
        'img/Marcadores/Posión/Animada/5.png',
        'img/Marcadores/Posión/Animada/6.png',
        'img/Marcadores/Posión/Animada/7.png',
        'img/Marcadores/Posión/Animada/8.png',
    ];

    /**
     * Loads images and starts animation.
     */
    constructor(){
        super().loadImages(this.poisonImages);
        this.animate();
    }

    /**
     * Sets animationinterval.
     */
    animate(){
        setStoppableInterval(() => this.showPoisons(), 200);
    }

    /**
     * Starts animation.
     */
    showPoisons(){
        this.playAnimation(this.poisonImages);
    }
}