'use strict';

function bottomleftStartJS(){
    var bottomleftStart = parallel('bottomleftStart');
    bottomleftStart.css({
        opacity: 0,
        display: 'none'
    });
    parallel('bottomleftStartOppener').addEvent('mouseenter', function (){
        if (WindowedMouse === 0){
            var a = bottomleftStart.css({
                display: null
            });
            setTimeout(function (){
                a.css({
                    opacity: 1
                });
            }, 10);
        }
    });
    bottomleftStart.addEvent(['mouseleave', 'mouseout'], function (){
        var a = bottomleftStart.css({
            opacity: 0
        });
        setTimeout(function (){
            a.css({
                display: 'none'
            });
        }, 110);
    });
}
