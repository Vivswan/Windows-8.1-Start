'use strict';

var lockVisible = 0;

function background_LockScreen_JS(){
    var lockScreenWallPaper = 1;
    document.getElementById('lockScreen').style.background = 'url("images/lock_screen/' + lockScreenWallPaper + '.jpg") 50% 50% / cover no-repeat';
    lockScreenWallPaper++;
    setInterval(function (){
        if (lockScreenWallPaper > 6){
            lockScreenWallPaper = 1;
        }
        document.getElementById('lockScreen').style.background = 'url("images/lock_screen/' + lockScreenWallPaper + '.jpg") 50% 50% / cover no-repeat';
        lockScreenWallPaper++;
    }, 5000);
    document.getElementById('lockScreen').style.top = '-' + window.innerHeight + 'px';
    document.getElementById('lockScreen').addEventListener('click', function (){
        WindowLevel = 0;
        lockVisible = 0;
        document.getElementById('lockScreen').style.top = '-' + window.innerHeight + 'px';
    });
    window.addEventListener('keydown', function (){
        if (lockVisible === 1){
            WindowLevel = 0;
            lockVisible = 0;
            document.getElementById('lockScreen').style.top = '-' + window.innerHeight + 'px';
        }
    });
}

window.addEventListener('resize', function (){
    if (lockVisible === 0){
        document.getElementById('lockScreen').style.top = '-' + window.innerHeight + 'px';
    }
});
