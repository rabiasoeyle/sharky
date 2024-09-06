let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
let attack = false;
let levelNumber = 1;
let levelRow = `level${levelNumber}`
let fullscreenState = false;


/**
 * These eventlisteners are checking, if one of these keys are pressed down.
 */
document.addEventListener('keydown', (event)=>{
    if(event.keyCode == 37){
        keyboard.left = true;
    }
    if(event.keyCode == 38){
        keyboard.up = true;
    }
    if(event.keyCode == 39){
        keyboard.right = true;
    }
    if(event.keyCode == 40){
        keyboard.down = true;
    }
    if(event.keyCode == 32){//leertaste
        keyboard.space = true;
    }
    if(event.keyCode == 68){
        keyboard.d = true;
    }
}
)

/**
 * These eventlisteners are checking, if one of these keys are released.
 */
document.addEventListener('keyup', (event)=>{
    if(event.keyCode == 37){
        keyboard.left = false;
    }
    if(event.keyCode == 38){
        keyboard.up = false;
    }
    if(event.keyCode == 39){
        keyboard.right = false;
    }
    if(event.keyCode == 40){
        keyboard.down = false;
    }
    if(event.keyCode == 32){
        keyboard.space = false;
    }
    if(event.keyCode == 68){
        keyboard.d = false;
    }
}
)

/**
 * When the page is loaded.
 */
function init(){
    selectLevel();
    addEventListenersToMoveButtons();
}
/**
 * Adds eventListeners to the move and attack Buttons.
 */
function addEventListenersToMoveButtons(){
     //left
    document.getElementById('leftButton').addEventListener('touchstart', (e)=>{
        e.preventDefault();
        keyboard.left = true;
    });
    document.getElementById('leftButton').addEventListener('touchend', (e)=>{
        e.preventDefault();
        keyboard.left = false;
    });
    //right
    document.getElementById('rightButton').addEventListener('touchstart', (e)=>{
        e.preventDefault();
        keyboard.right = true;
    });
    document.getElementById('rightButton').addEventListener('touchend', (e)=>{
        e.preventDefault();
        keyboard.right = false;
    });
    //up
    document.getElementById('upButton').addEventListener('touchstart', (e)=>{
        e.preventDefault();
        keyboard.up = true;
    });
    document.getElementById('upButton').addEventListener('touchend', (e)=>{
        e.preventDefault();
        keyboard.up = false;
    });
    
    document.getElementById('downButton').addEventListener('touchstart', (e)=>{
        e.preventDefault();
        keyboard.down = true;
    });
    document.getElementById('downButton').addEventListener('touchend', (e)=>{
        e.preventDefault();
        keyboard.down = false;
    });
    
    document.getElementById('attackWPoisonButton').addEventListener('touchstart', (e)=>{
        e.preventDefault();
        keyboard.d = true;
    });
    document.getElementById('attackWPoisonButton').addEventListener('touchend', (e)=>{
        e.preventDefault();
        keyboard.d = false;
    });
    
    document.getElementById('spaceButton').addEventListener('touchstart', (e)=>{
        e.preventDefault();
        keyboard.space = true;
    });
    document.getElementById('spaceButton').addEventListener('touchend', (e)=>{
        e.preventDefault();
        keyboard.space = false;
    });
}

/**
 * Toggle the help overlay.
 */
function helpOverlay(){
    let overlay = document.getElementById('helpOverlay');
    if (overlay.style.display == "none") {
        overlay.style.display = "flex";
      } else {
        overlay.style.display = "none";
      }
}

/**
 * Mute all Sounds.
 */
function muteSound(){
    isMuted = !isMuted;
    let muteButton = document.getElementById('muteButton');
    muteButton.innerText = isMuted ? 'Unmute' : 'Mute';
    handleMute();
}

/**
 * Save Sounds in an Array and then stop them.
 */
function handleMute() {
    let allSounds = [
        world.throwSound,
        world.coinSound,
        world.poisonSound,
        world.character.hurtSound,
        world.character.swimmingSound,
        world.character.looseSound,
        world.level.enemies[0].winSound,
        world.level.enemies[0].finalAttack,
        world.level.enemies[0].seeSound,
    ];
    allSounds.forEach(sound => {
        sound.muted = isMuted;
    });
}

/**
 * Sends the user back to Start.
 */
function goToStartpage(){
    let start = document.getElementById('startPage');
    start.classList.remove('d-none');
    let end = document.getElementById('loseGame');
    end.style.display = "none";
    end.classList.add('d-none'); 
    let won = document.getElementById('wonGame');
    won.classList.add('d-none'); 
    won.style.display = "none";
    selectLevel();
}

/**
 * Shows the GameOver div.
 */
function gameOver(){
    canvas = document.getElementById('canvasParent');
    let end = document.getElementById('loseGame');
    setTimeout(()=>{
       end.classList.remove('d-none'); 
       end.style.display = "flex";
    },500)
    canvas.classList.add('d-none');
    intervalIds.forEach((id)=>clearInterval(id));
    intervalIds = []

}

/**
 * Shows the Won div.
 */
function gameEnds(){
    canvas = document.getElementById('canvasParent');
    let end = document.getElementById('wonGame');
    setTimeout(()=>{
        end.classList.remove('d-none'); 
        end.style.display = "flex";
     },500)
    canvas.classList.add('d-none');
    intervalIds.forEach((id)=>clearInterval(id));
    intervalIds = [];
    if(levelNumber >3){
        levelNumber = 0;
    } 
    levelNumber ++;
    levelRow = `level${levelNumber}`
}

/**
 * Starts the Game.
 */
function start(){ 
    canvasParent = document.getElementById('canvasParent');
    canvas = document.getElementById('canvas');
    // levelRow = `level${levelNumber}`,
    selectLevel();
    world = new World(canvas, keyboard, levelRow);
    let start = document.getElementById('startPage');
    start.classList.add('d-none');
    canvasParent.classList.remove('d-none');
    let end = document.getElementById('loseGame');
    end.classList.add('d-none');
    end.style.display = "none";
    let won = document.getElementById('wonGame');
    won.classList.add('d-none');
    won.style.display = "none";
}

/**
 * Selects the current Level.
 */
function selectLevel(){
    let level = document.getElementById('levelButton');
    level.innerHTML ="";
    levelRow = `level${levelNumber}`;
  if(levelRow == "level1"){
        initLevel1();
        levelRow = level1;
        level.innerHTML = `Starte Level ${levelNumber}`;
    }else if(levelRow == "level2"){
        initLevel2();
        levelRow = level2  
        level.innerHTML = `Starte Level ${levelNumber}`;
    }else if(levelRow == "level3"){
        initLevel3();
        levelRow = level3;
        level.innerHTML = `Starte Level ${levelNumber}`;
        // levelNumber = 1;
    }else levelNumber = 1,
    level.innerHTML = `Starte Level ${levelNumber}`;   
}

/**
 * Changes fullscreen on and off.
 */
function changeScreen(){
    fullscreenState = !fullscreenState;
    if(fullscreenState == true){
        fullscreen();
    }else{
        exitFullscreen();
    }
}

/**
 * Opens Fullscreen.
 */
function fullscreen(){
    // let fullscreen = document.getElementById('fullscreen');
    let fullscreenButton = document.getElementById('fullscreenButton');
    fullscreenButton.innerText="Fullscreen on";
    let fullscreenV = document.body;
    enterFullscreen(fullscreenV);
}

/**
 * Enters Fullscreen.
 * @param {body} element 
 */
function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
  }

/**
 * Exits Fullscreen.
 */
function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    let fullscreenButton = document.getElementById('fullscreenButton');
    fullscreenButton.innerText="Fullscreen off";
}
