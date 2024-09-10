class HeartBoss extends Statusbar{
    heartImage =[
        'img/Marcadores/orange/0_heart.png',
        'img/Marcadores/orange/20_heart.png',
        'img/Marcadores/orange/60_heart.png',
        'img/Marcadores/orange/100_heart.png',
    ];
    heartPercentage;
    x= 550;

    /**
     * Loads images. Set percentage.
     */
    constructor(){
        super().loadImages(this.heartImage);
        this.setPercentage();
        this.heartPercentage = 100;
        let path = this.heartImage[this.resolveHeartImageIndex()];
        this.img = this.imageCache[path];
        setStoppableInterval(() => this.setPositionOnYAxis(), 200);
    }

    /**
     * sets different y, when the mediaHeight matches.
     */
    setPositionOnYAxis(){
        if(mediaHeight.matches){
            this.y = 45;
        }
        else{
            this.y = 10;
        }
    }

    /**
     * Sets percentage of actual energy.
     * @param {*} energy 
     */
    setPercentage(energy){
        if(energy == 2){
            energy = 60;
        }else if(energy == 1){
            energy = 20;
        }else if (energy == 0){
            energy = 0;
        }
        this.heartPercentage = energy;
        let path = this.heartImage[this.resolveHeartImageIndex()];
        this.img = this.imageCache[path];
    } 

    /**
     * Shows different img for different energy.
     * @returns 
     */
    resolveHeartImageIndex(){
        if (this.heartPercentage >= 100){
            return 3;
        }else if (this.heartPercentage >= 60){
            return 2;
        }else if (this.heartPercentage >= 20){
            return 1 ;
        }else{
            return 0;}
    }
   
}