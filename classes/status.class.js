class Statusbar extends DrawableObject{
    x = 40;
    y = 10;
    width= 140;
    height= 50;
    percentage;

    constructor(){
        super();  
    }

    setPercentage(images, percentage){
        this.percentage = percentage;
        // this.coinPercentage = coinPercentage;
        // this.poisonPercentage = poisonPercentage;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if(this.percentage == 100){
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