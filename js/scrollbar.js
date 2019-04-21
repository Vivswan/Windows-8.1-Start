'use strict';

function scrollbarSection(){
    parallel('scrollbar scroll').css('width', (window.innerWidth - 60) + 'px');
    var section = parallel('scrollbar left').add('scrollbar right').add('scrollbar scroller');
    section.addEvent('mousedown', function (){
        this.style.background = 'rgba(0,0,0,0.6)';
        this.style.color = '#ffffff';
    });
    window.addEventListener('mouseup', function (){
        section.css({
            'background': null,
            'color': null
        });
        parallel('scrollbar').css('opacity', null);
    });
    parallel('scrollbar *').addEvent('mousedown', function (){
        parallel('scrollbar').css('opacity', '1');
    });
}

window.addEventListener('resize', function (){
    parallel('scrollbar scroll').css('width', (window.innerWidth - 60) + 'px');
});
