let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
let attack = false;
let levelNumber = 1;
let levelRow = `level${levelNumber}`
let fullscreenState = false;
let gameStarted = false;
let menuOpen = false;
let overlayIsOpen = false;


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
 * Handles clicks outside the menu and the button.
 */
document.addEventListener('click', function (event) {
    let menu = document.getElementById('menuForPages');
    let button = document.getElementById('menuButton');
    // If the menu is open and the click is outside the menu or the button, close the menu
    if (menuOpen && !menu.contains(event.target) && !button.contains(event.target)) {
        closeMenu();
    }
});

/**
 * Handles clicks outside the info and the ? button.
 */
document.addEventListener('click', function (event) {
    let overlay = document.getElementById('helpOverlay');
    let button = document.getElementById('helpButton');
    // If the menu is open and the click is outside the menu or the button, close the menu
    if (overlayIsOpen && !overlay.contains(event.target) && !button.contains(event.target)) {
        closeOverlay();
    }
});

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
 * Toggle menu for display none and flex.
 */
function toggleMenu(){
    let menu = document.getElementById('menuForPages');
    if(menuOpen){
       closeMenu();
    }else{
        menu.style.display= "flex";
        menuOpen = true;
    }
}

function closeMenu(){
    let menu = document.getElementById('menuForPages');
     menu.style.display="none"
        menuOpen = false;
}

/**
 * Toggle the help overlay.
 */
function helpOverlay(){
    let overlay = document.getElementById('helpOverlay');
    if (overlay.style.display == "none") {
        overlay.style.display = "flex";
        overlayIsOpen = true;
      } else {
        closeOverlay();
      }
}

function closeOverlay(){
    let overlay = document.getElementById('helpOverlay');
    overlay.style.display = "none";
    overlayIsOpen = false;
}

/**
 * Mute all Sounds.
 */
function muteSound(){
    isMuted = !isMuted;
    // let muteButton = document.getElementById('muteButton');
    // muteButton.innerText = isMuted ? 'Unmute' : 'Mute';
    let muteIcon = document.getElementById('muteIcon');
    // fullscreenButton.innerText="Fullscreen off";
    if(isMuted){
        muteIcon.outerHTML = `
    <svg id="muteIcon" xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="white">
        <path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/>
    </svg>
    ` 
    }else{
        muteIcon.outerHTML = `
            <svg id="muteIcon" xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="white">
                <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/>
            </svg>
        ` 
    }
   
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
    intervalIds = [],
    gameStarted = false;

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
    levelNumber ++;
    if(levelNumber > 3){
        levelNumber = 1;
    }
    levelRow = `level${levelNumber}`
    gameStarted = false;
    selectLevel();
}

/**
 * Starts the Game.
 */
function start(){ 
    canvasParent = document.getElementById('canvasParent');
    canvas = document.getElementById('canvas');
    // levelRow = `level${levelNumber}`,
    selectLevel();
    gameStarted= true;
    world = new World(canvas, keyboard, levelRow);
    let levelButton = document.getElementById('levelButtonCanvas');
    levelButton.innerText = `Level ${levelNumber}`
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
    // let fullscreenButton = document.getElementById('fullscreenButton');
    let fullscreenIcon = document.getElementById('fullscreenIcon');
    // fullscreenButton.innerText="Fullscreen off";
    fullscreenIcon.outerHTML = `
    <svg id="fullscreenIcon" xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#5f6368">
        <path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z"/>
    </svg>`;
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
    // let fullscreenButton = document.getElementById('fullscreenButton');
    // fullscreenButton.innerText="Fullscreen on";
    let fullscreenIcon = document.getElementById('fullscreenIcon');
    fullscreenIcon.outerHTML = `
        <svg id="fullscreenIcon" xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="white">
            <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/>
        </svg>
    `
}
