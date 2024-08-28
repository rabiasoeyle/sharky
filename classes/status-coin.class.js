class Coins extends Statusbar{
    coinsImage =[
        'img/Marcadores/orange/0_coin.png',
        'img/Marcadores/orange/20_coin.png',
        'img/Marcadores/orange/40_coin.png',
        'img/Marcadores/orange/60_coin.png',
        'img/Marcadores/orange/80_coin.png',
        'img/Marcadores/orange/100_coin.png',
    ]
    coinsPercentage = 0;
    y=90;
    constructor(){
        super();
        this.loadImages(this.coinsImage); 
        this.setAmountCoins();
    }
    setAmountCoins(amount){
        this.coinPercentage = amount * 20;
        if(this.coinPercentage >= 100){
            this.coinPercentage = 100;
        }
        let path = this.coinsImage[this.resolveCoinsImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveCoinsImageIndex(){
        if(this.coinPercentage == 100){
            return 5;
        }else if (this.coinPercentage > 80){
            return 4;
        }else if (this.coinPercentage > 60){
            return 3;
        }else if (this.coinPercentage > 40){
            return 2;
        }else if (this.coinPercentage > 20){
            return 1;
        }else{
            return 0;}
    }
}