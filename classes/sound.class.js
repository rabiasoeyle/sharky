class Sound extends DrawableObject{
    height = 40;
    width = 40;
    x=600;
    y=10;
    soundImageMute='img/sound/mute.png'
    soundImageMuteOn='img/sound/muteon.png'


    constructor(){
        super();
        this.loadImage(this.soundImageMuteOn)
        this.loadImage(this.soundImageMute)
    }

}