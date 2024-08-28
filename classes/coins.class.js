class CollectableCoins extends MovableObject{
    
    x = 220 + Math.random()*2000;
    y = 50 + Math.random()*350;
    width= 30;
    height= 30;
    coinImages =[
        'img/Marcadores/Coins/1.png',
        'img/Marcadores/Coins/2.png',
        'img/Marcadores/Coins/3.png',
        'img/Marcadores/Coins/4.png',
    ];
    constructor(){
        super().loadImages(this.coinImages);
        this.animate();
    }
    animate(){
        setInterval(() =>{
            this.playAnimation(this.coinImages);
        },200)
    }
}