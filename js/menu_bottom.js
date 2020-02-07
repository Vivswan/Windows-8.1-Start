'use strict';

function bottomMenuJS(){
    var isEntered = null;
    parallel('bottomMenu li').stopPropagation().addEvent(['mousedown', 'mousewheel', 'DOMMouseScroll'], function (){
        return false;
    });
    parallel('bottomMenu > ul > li').addEvent('mousedown', function (){
        if (this.getElementsByTagName('img')[0].src.indexOf('_h.png') === -1){
            isEntered = this;
            this.getElementsByTagName('img')[0].src = this.getElementsByTagName('img')[0].src.replace('.png', '_h.png');
        }
    });
    parallel('bottomMenu > ul > li').addEvent('mouseenter', function (){
        if (isEntered === this){
            this.getElementsByTagName('img')[0].src = this.getElementsByTagName('img')[0].src.replace('.png', '_h.png');
        }
    });
    parallel('bottomMenu > ul > li').addEvent('mouseleave', function (){
        if (this.getElementsByTagName('img')[0].src.indexOf('_h.png') !== -1){
            this.getElementsByTagName('img')[0].src = this.getElementsByTagName('img')[0].src.replace('_h.png', '.png');
        }
    });
    parallel('bottomMenu > ul > li').addEvent('mouseup', function (){
        if (this.getElementsByTagName('img')[0].src.indexOf('_h.png') !== -1){
            this.getElementsByTagName('img')[0].src = this.getElementsByTagName('img')[0].src.replace('_h.png', '.png');
        }
        if (isEntered === this){
            this.click();
        }
    });
    window.addEventListener('mouseup', function (){
        isEntered = null;
    });
    parallel('bottomMenu > ul > li').forEach(function (i){
        i.setAttribute('disable', '')
    });
    parallel('bottomMenu > ul > li > section').addEventToElse('mouseup', function (){
        this.setAttribute('disable', '');
    });
    parallel('bottomMenu').css('bottom', '-90px');
}
