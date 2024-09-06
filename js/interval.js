let intervalIds= [];

/**
 * This function creates Intervals and saves the interval id in an Array.
 * @param {function} fn 
 * @param {timespace} time 
 */
function setStoppableInterval(fn,time){
    this.id = setInterval(fn, time);
    intervalIds.push(id);
}