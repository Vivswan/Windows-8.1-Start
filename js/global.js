'use strict';

var BackgroundColor = null, AccentColor = null;

var ChangingCss = [
    "body{background:!!}",
    "background.Start .SElement:hover{border:solid !! 3px;margin-top:-2px;margin-left:-2px;}",
    "background.Start .SElement .tick {border:solid @@ 3px;}",
    "background.Start .SElement .tick > article article.tickBackground{background:@@;}",
    "bottomleftStart{background:@@;}",
    ".startLogoLeftStartColor{background:@@;}",
    ".leftmenu{background:!!;}",
    ".textInputImg{background:@@;}",
    ".subleftmenu header{background:!!;}",
    "#tickElementOfBackgroundImages{border:4px solid @@;}",
    "bottomMenu{background:@@;}",
    "background.Start header > user > section:hover{background:!!;}",
    "background.Apps main .SElement article.tick{background:@@;}"
].join('\n');

var StyleElememtOfChangingCss = document.createElement('style');

function changeCss(){
    var a = ChangingCss;
    while (a.indexOf('!!') !== -1){
        a = a.replace('!!', BackgroundColor);
    }
    while (a.indexOf('@@') !== -1){
        a = a.replace('@@', AccentColor);
    }
    StyleElememtOfChangingCss.innerHTML = a;
    document.getElementsByTagName('head')[0].appendChild(StyleElememtOfChangingCss);
}
