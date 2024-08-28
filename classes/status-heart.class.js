class Heart extends Statusbar{
    heartImage =[
        'img/Marcadores/orange/0_heart.png',
        'img/Marcadores/orange/20_heart.png',
        'img/Marcadores/orange/40_heart.png',
        'img/Marcadores/orange/60_heart.png',
        'img/Marcadores/orange/80_heart.png',
        'img/Marcadores/orange/100_heart.png',
    ];
    percentage = 100;

    constructor(){
        super();
        this.loadImages(this.heartImage);
        // this.setPercentageHeart();
    }

    // setPercentageHeart(percentage){
    //     this.percentage = percentage;
    //     // this.coinPercentage = coinPercentage;
    //     // this.poisonPercentage = poisonPercentage;
    //     let path = this.heartImage[this.resolveImageIndex()];
    //     this.img = this.imageCache[path];
    // }
}