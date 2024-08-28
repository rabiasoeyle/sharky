class Poison extends Statusbar{
    poisonImage =[
        'img/Marcadores/orange/0_poison.png',
        'img/Marcadores/orange/20_poison.png',
        'img/Marcadores/orange/40_poison.png',
        'img/Marcadores/orange/60_poison.png',
        'img/Marcadores/orange/80_poison.png',
        'img/Marcadores/orange/100_poison.png',
    ];
    percentage = 0;

    constructor(){
        super();
        this.loadImages(this.poisonImage);
        // this.setPercentage(this.poisonImage, this.percentage);
    }
}