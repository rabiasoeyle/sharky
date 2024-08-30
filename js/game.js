let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds= [];

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
    if(event.keyCode == 32){
        keyboard.space = true;
    }
    if(event.keyCode == 68){
        keyboard.d = true;
    }
}
)

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

function gameOver(){
    canvas = document.getElementById('canvas');
    let end = document.getElementById('loseGame');
    end.classList.remove('d-none');
    canvas.classList.add('d-none');
    intervalIds.forEach((id)=>clearInterval(id));
}

function init(){
   
}

function start(){ 
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, intervalIds);
    let start = document.getElementById('startPage');
    start.classList.add('d-none');
    canvas.classList.remove('d-none');
}

function restart(){
    location.reload();
}
function setStoppableInterval(fn,time){
    this.id = setInterval(fn, time);
    intervalIds.push(id);
}