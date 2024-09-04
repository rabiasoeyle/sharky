let intervalIds= [];

function setStoppableInterval(fn,time){
    this.id = setInterval(fn, time);
    intervalIds.push(id);
}