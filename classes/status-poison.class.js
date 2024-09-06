class Poison extends Statusbar{
    poisonImage =[
        'img/Marcadores/orange/0_poison.png',
        'img/Marcadores/orange/20_poison.png',
        'img/Marcadores/orange/40_poison.png',
        'img/Marcadores/orange/60_poison.png',
        'img/Marcadores/orange/80_poison.png',
        'img/Marcadores/orange/100_poison.png',
    ];
    poisonPercentage = 0;
    y= 45;
    height=55;

    /**
     * Loads images. Sets amount of Poison.
     */
    constructor(){
        super();
        this.loadImages(this.poisonImage);
        this.setAmountPoison();
        this.poisonPercentage = 0;
    }

    /**
     * Sets new amount of poison.
     * @param {*} amount 
     */
    setAmountPoison(amount){
        this.poisonPercentage += amount * 10;
        if(this.poisonPercentage >= 100){
            this.poisonPercentage = 100;
        }
        let path = this.poisonImage[this.resolvePoisonImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Deletes poison amount, if used.
     * @param {*} amount 
     */
    deletePoisonAmount(amount){
        this.poisonPercentage -= amount * 10;
        if(this.poisonPercentage < 0){
            this.poisonPercentage = 0;
        }
        let path = this.poisonImage[this.resolvePoisonImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Shows different img for different amount.
     * @returns 
     */
    resolvePoisonImageIndex(){
        if(this.poisonPercentage == 100){
            return 5;
        }else if (this.poisonPercentage >= 80){
            return 4;
        }else if (this.poisonPercentage >= 60){
            return 3;
        }else if (this.poisonPercentage >= 40){
            return 2;
        }else if (this.poisonPercentage >= 20){
            return 1;
        }else{
            return 0;}
    }

    
}