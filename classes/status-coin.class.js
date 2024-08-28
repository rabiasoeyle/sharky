class Coins extends Statusbar{
    coinsImage =[
        'img/Marcadores/orange/0_coin.png',
        'img/Marcadores/orange/20_coin.png',
        'img/Marcadores/orange/40_coin.png',
        'img/Marcadores/orange/60_coin.png',
        'img/Marcadores/orange/80_coin.png',
        'img/Marcadores/orange/100_coin.png',
    ]
    percentage = 0;
    constructor(){
        super();
        this.loadImages(this.poisonImage); 
        // this.setPercentage(this.coinsImage, this.percentage);
    }
}