class Coins extends Statusbar{
    coinsImage =[
        'img/Marcadores/orange/0_coin.png',
        'img/Marcadores/orange/20_coin.png',
        'img/Marcadores/orange/40_coin.png',
        'img/Marcadores/orange/60_coin.png',
        'img/Marcadores/orange/80_coin.png',
        'img/Marcadores/orange/100_coin.png',
    ]
    coinsAmount = 0;
    y=90;

    /**
     * Loads images. Sets amount of Coins.
     */
    constructor(){
        super();
        this.loadImages(this.coinsImage); 
        this.setAmountCoins();
        this.coinsAmount = 0;
    }

    /**
     * Sets the new amount of coins.
     * @param {*} amount 
     */
    setAmountCoins(amount){
        this.coinsAmount += amount * 10;
        if(this.coinsAmount >= 100){
            this.coinsAmount = 100;
        }
        let path = this.coinsImage[this.resolveCoinsImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Shows differents images for different coin amounts.
     * @returns 
     */
    resolveCoinsImageIndex(){
        if(this.coinsAmount == 100){
            return 5;
        }else if (this.coinsAmount >= 80){
            return 4;
        }else if (this.coinsAmount >= 60){
            return 3;
        }else if (this.coinsAmount >= 40){
            return 2;
        }else if (this.coinsAmount >= 20){
            return 1;
        }else{
            return 0;}
    }
}