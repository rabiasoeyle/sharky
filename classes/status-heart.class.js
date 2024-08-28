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
        super().loadImages(this.heartImage);
        this.setPercentage();
    }

    setPercentage(heartPercentage){
        this.heartPercentage = heartPercentage;
        let path = this.heartImage[this.resolveHeartImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveHeartImageIndex(){
        if(this.heartPercentage == 100){
            return 5;
        }else if (this.heartPercentage > 80){
            return 4;
        }else if (this.heartPercentage > 60){
            return 3;
        }else if (this.heartPercentage > 40){
            return 2;
        }else if (this.heartPercentage > 20){
            return 1;
        }else{
            return 0;}
    }
   
}