'use strict';

var isSearchfoucus = 0;

window.addEventListener('keydown', function (e){
    if (!(isSearchfoucus != 0 || e.ctrlKey || e.altKey || (e.shiftKey && e.keyCode == 16) || String.fromCharCode(e.keyCode) == '' || String.fromCharCode(e.keyCode) == '\t' || String.fromCharCode(e.keyCode) == ' ' || e.keyCode == 13)){
        if (WindowLevel == 0){
            isSearchfoucus = 1;
            document.body.click();
            document.getElementsByClassName('searchLeftStart')[0].click();
            document.getElementById('leftmenuSearchTop').focus();
        } else if (WindowLevel == 1){
            isSearchfoucus = 1;
            document.body.click();
            document.getElementById('AppsSearchHeaderSectionInput').focus();
        }
    }
    if (WindowLevel == 0 && isSearchfoucus == 1 && e.keyCode == 13){
        searchSubmit();
    }
});
