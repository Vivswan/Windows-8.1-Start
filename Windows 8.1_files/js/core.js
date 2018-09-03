'use strict';

document.getElementById('StartBackgroundMain').innerHTML = document.getElementById('AllSElementsMain').innerHTML;

var WindowedMouse = 0,
    WindowLevel = -1;

window.addEventListener('mousedown',function(){
    WindowedMouse = 1;
});
window.addEventListener('mouseup',function(){
    WindowedMouse = 0;
});

window.addEventListener('load',function(){
    parallel('*').preventDefault().addEvent(['contextmenu','dragstart'],function(e){
        return false;
    },false);
    bottomleftStartJS();
    leftStartJS();
    bottomMenuJS();
    scrollbarSection();
    background_apps_JS();
    background_Start_JS();
    background_LockScreen_JS();
    background_LogIn_JS();
    loading();
});
