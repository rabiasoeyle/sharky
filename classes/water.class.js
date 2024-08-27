class Water extends MovableObject{
    y= 0;
    constructor(){
        super().loadImage('../img/Background/Layers/Water/L1.png');
        this.x = 0;
        this.width=720;
        this.height=480;
        this.animate();
    }

    animate(){
        setInterval(()=>{
            this.x -= 0.16
        },1000/60);
    }
}