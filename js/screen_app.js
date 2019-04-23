'use strict';

var AllSElementsRigthClickSelected = new Set(),
    AllSElementsWidth = 0,
    AppsSearchHeaderSectionChangeText,
    AllSElementsMainOffset = 100;
function AppsSearchHeaderSectionChange(){
    if (AppsSearchHeaderSectionChangeText != document.getElementById('AppsSearchHeaderSectionInput').value.toLowerCase()){
        AppsSearchHeaderSectionChangeText = document.getElementById('AppsSearchHeaderSectionInput').value.toLowerCase();
        var a = 0, b = 0;
        parallel('#AllSElements main > section').forEach(function (i){
            if (i.getAttribute('name').toLowerCase().indexOf(document.getElementById('AppsSearchHeaderSectionInput').value.toLowerCase()) == -1){
                i.setAttribute('disable', '');
            } else {
                i.removeAttribute('disable');
            }
            if (!i.hasAttribute('disable')){
                if (b + 60 >= document.getElementById('AllSElementsMain').clientHeight){
                    b = 0;
                    a += 260;
                }
                i.style.left = a + 'px';
                i.style.top = b + 'px';
                b += 60
            }
        });
        AllSElementsWidth = a + 250;
        AllSElementsMainOffset = Math.max(Math.min(-(AllSElementsWidth - window.innerWidth + 100), 100), Math.min(100, document.getElementById('AllSElementsMain').offsetLeft));
        document.getElementById('AllSElementsMain').style.left = AllSElementsMainOffset + 'px';
        setAppsScrollBar();
    }
}
function setAppsScrollBar(){
    document.getElementById('AllSElementsScroller').style.width = Math.min((window.innerWidth - 60) * 0.9, Math.max(100, (window.innerWidth / AllSElementsWidth) * (window.innerWidth - 60))) + 'px';
    if (document.getElementById('AllSElementsScroller').style.width == (window.innerWidth - 60) * 0.9 + 'px'){
        document.getElementById('AllSElementsScrollbar').style.display = 'none';
    } else {
        document.getElementById('AllSElementsScrollbar').style.display = null;
    }
    document.getElementById('AllSElementsScroller').style.left = ((document.getElementById('AllSElementsScroller').parentElement.clientWidth - document.getElementById('AllSElementsScroller').clientWidth) * ((100 - AllSElementsMainOffset) / Math.max(0, AllSElementsWidth - window.innerWidth + 200))) + 'px';
}
function background_apps_JS(){
    var z = 0,
        AllSElementsEnter = null,
        AppsSearchHeaderSectionInputTimer = -1,
        ScrollerEnter = 0,
        extraScrollEnter = 0,
        leftOrRigthTimer1,
        leftOrRigthTimer2,
        leftOrRigthTimer3;
    parallel('#AllSElements main section').forEach(function (i){
        z++;
        var header = document.createElement('header'),
            img = document.createElement('img'),
            sec = document.createElement('section');
        header.innerHTML = i.getAttribute('name');
        img.src = 'images/start/app logo/' + i.getAttribute('name') + '.png';
        sec.appendChild(img);
        i.appendChild(sec);
        i.appendChild(header);
        i.setAttribute('SElementId', '' + z);
        i.setAttribute('class', 'SElement');
        i.addEventListener('mousedown', function (){
            AllSElementsEnter = parallel(this);
            AllSElementsEnter.addClass('focus');
        });
        i.addEventListener('mouseleave', function (){
            if (AllSElementsEnter != null){
                AllSElementsEnter.deleteClass('focus');
            }
        });
        i.addEventListener('mouseenter', function (){
            if (AllSElementsEnter != null){
                AllSElementsEnter.addClass('focus');
            }
        });
        i.addEventListener('contextmenu', function (){
            if (AllSElementsRigthClickSelected.has(this)){
                AllSElementsRigthClickSelected.delete(this);
                this.removeChild(this.getElementsByClassName("tick")[0]);
            } else {
                AllSElementsRigthClickSelected.add(this);
                this.innerHTML = '<article class="tick">\n<article>\n<article class="rigthTick"></article>\n<article class="leftTick"></article>\n</article>\n</article>\n' + this.innerHTML;
            }
            var c1 = 0, c2 = 0;
            AllSElementsRigthClickSelected.forEach(function (i){
                if (i.getAttribute('inStart') == '0'){
                    c1 = 1;
                }
                if (i.getAttribute('inStart') == '1'){
                    c2 = 1;
                }
            });
            if (c1 == 1){
                document.getElementById('AllSElementsBottomMenuPin').removeAttribute('disable');
            } else {
                document.getElementById('AllSElementsBottomMenuPin').setAttribute('disable', '');
            }
            if (c2 == 1){
                document.getElementById('AllSElementsBottomMenuUnpin').removeAttribute('disable');
            } else {
                document.getElementById('AllSElementsBottomMenuUnpin').setAttribute('disable', '');
            }
            document.getElementById('AllSElementsBottomMenu').style.bottom = '0px';
            document.getElementById('AllSElementsBottomMenuChangeColor').removeAttribute('disable');
            document.getElementById('AllSElementsBottomMenuCustomise').removeAttribute('disable');
            if (AllSElementsRigthClickSelected.size == 0){
                document.getElementById('AllSElementsBottomMenu').style.bottom = '-90px';
                document.getElementById('AllSElementsBottomMenuPin').setAttribute('disable', '');
                document.getElementById('AllSElementsBottomMenuUnpin').setAttribute('disable', '');
                document.getElementById('AllSElementsBottomMenuChangeColor').setAttribute('disable', '');
                document.getElementById('AllSElementsBottomMenuClearSelection').setAttribute('disable', '');
                document.getElementById('AllSElementsBottomMenuCustomise').setAttribute('disable', '');
            }
            if (AllSElementsRigthClickSelected.size > 1){
                document.getElementById('AllSElementsBottomMenuClearSelection').removeAttribute('disable');
            } else {
                document.getElementById('AllSElementsBottomMenuClearSelection').setAttribute('disable', '');
            }
        });
        i.addEventListener('click', function (){
            if (document.getElementById('AllSElementsBottomMenu').style.bottom == '0px'){
                if (AllSElementsRigthClickSelected.has(this)){
                    AllSElementsRigthClickSelected.delete(this);
                    this.removeChild(this.getElementsByClassName("tick")[0]);
                } else {
                    AllSElementsRigthClickSelected.add(this);
                    this.innerHTML = '<article class="tick">\n<article>\n<article class="rigthTick"></article>\n<article class="leftTick"></article>\n</article>\n</article>\n' + this.innerHTML;
                }
                var c1 = 0, c2 = 0;
                AllSElementsRigthClickSelected.forEach(function (i){
                    if (i.getAttribute('inStart') == '0'){
                        c1 = 1;
                    }
                    if (i.getAttribute('inStart') == '1'){
                        c2 = 1;
                    }
                });
                if (c1 == 1){
                    document.getElementById('AllSElementsBottomMenuPin').removeAttribute('disable');
                } else {
                    document.getElementById('AllSElementsBottomMenuPin').setAttribute('disable', '');
                }
                if (c2 == 1){
                    document.getElementById('AllSElementsBottomMenuUnpin').removeAttribute('disable');
                } else {
                    document.getElementById('AllSElementsBottomMenuUnpin').setAttribute('disable', '');
                }
                document.getElementById('AllSElementsBottomMenuChangeColor').removeAttribute('disable');
                document.getElementById('AllSElementsBottomMenuCustomise').removeAttribute('disable');
                if (AllSElementsRigthClickSelected.size == 0){
                    document.getElementById('AllSElementsBottomMenu').style.bottom = '-90px';
                    document.getElementById('AllSElementsBottomMenuPin').setAttribute('disable', '');
                    document.getElementById('AllSElementsBottomMenuUnpin').setAttribute('disable', '');
                    document.getElementById('AllSElementsBottomMenuChangeColor').setAttribute('disable', '');
                    document.getElementById('AllSElementsBottomMenuClearSelection').setAttribute('disable', '');
                    document.getElementById('AllSElementsBottomMenuCustomise').setAttribute('disable', '');
                }
                if (AllSElementsRigthClickSelected.size > 1){
                    document.getElementById('AllSElementsBottomMenuClearSelection').removeAttribute('disable');
                } else {
                    document.getElementById('AllSElementsBottomMenuClearSelection').setAttribute('disable', '');
                }
            }
        });
    });
    window.addEventListener('mouseup', function (){
        if (AllSElementsEnter != null){
            AllSElementsEnter.deleteClass('focus');
            AllSElementsEnter = null;
        }
    });
    document.getElementById('AllSElementsMain').style.height = window.innerHeight - 150 - 90 + 'px';
    var a = 0, b = 0;
    parallel('#AllSElements main > section').forEach(function (i){
        if (b + 60 >= document.getElementById('AllSElementsMain').clientHeight){
            b = 0;
            a += 260;
        }
        i.style.left = a + 'px';
        i.style.top = b + 'px';
        b += 60;
    });
    AllSElementsWidth = a + 250;
    setAppsScrollBar();
    document.getElementById('AllSElementsBottomMenuPin').addEventListener('click', function (){
        AllSElementsRigthClickSelected.forEach(function (i){
            i.removeChild(i.getElementsByClassName("tick")[0]);
            SElementPinToStart(i.getAttribute('selementid'));
        });
        AllSElementsRigthClickSelected.clear();
        document.getElementById('AppsSearchHeaderSectionInput').value = '';
        AppsSearchHeaderSectionChange();
        document.getElementById('AllSElements').style.marginTop = document.getElementById('AllSElements').clientHeight + 'px';
        document.getElementById('StartBackground').style.marginTop = null;
        WindowLevel = 0;
        document.getElementById('AllSElementsBottomMenu').style.bottom = '-90px';
        document.getElementById('AllSElementsBottomMenuPin').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuUnpin').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuChangeColor').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuClearSelection').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuCustomise').setAttribute('disable', '');
    });
    document.getElementById('AllSElementsBottomMenuUnpin').addEventListener('click', function (){
        AllSElementsRigthClickSelected.forEach(function (i){
            i.removeChild(i.getElementsByClassName("tick")[0]);
            SElementUnpinToStart(i.getAttribute('selementid'));
        });
        AllSElementsRigthClickSelected.clear();
        document.getElementById('AllSElementsBottomMenu').style.bottom = '-90px';
        document.getElementById('AllSElementsBottomMenuPin').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuUnpin').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuChangeColor').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuClearSelection').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuCustomise').setAttribute('disable', '');
    });
    document.getElementById('AllSElementsBottomMenuChangeColor').addEventListener('click', function (){
        this.getElementsByTagName('section')[0].removeAttribute('disable');
    });
    parallel(document.getElementById('AllSElementsBottomMenuChangeColor').getElementsByTagName('li')).addEvent('click', function (){
        var n = this.getAttribute('name');
        AllSElementsRigthClickSelected.forEach(function (i){
            i.removeChild(i.getElementsByClassName("tick")[0]);
            SElementChangeColor(i.getAttribute('selementid'), n);
        });
        AllSElementsRigthClickSelected.clear();
        document.getElementById('AllSElementsBottomMenu').style.bottom = '-90px';
        document.getElementById('AllSElementsBottomMenuPin').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuUnpin').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuChangeColor').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuClearSelection').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuCustomise').setAttribute('disable', '');
        this.parentElement.setAttribute('disable', '');
    });
    document.getElementById('AllSElementsBottomMenuClearSelection').addEventListener('click', function (){
        AllSElementsRigthClickSelected.forEach(function (i){
            i.removeChild(i.getElementsByClassName("tick")[0]);
        });
        AllSElementsRigthClickSelected.clear();
        document.getElementById('AllSElementsBottomMenuPin').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuUnpin').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuChangeColor').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuClearSelection').setAttribute('disable', '');
    });
    document.getElementById('AllSElementsBottomMenuCustomise').addEventListener('click', function (){
        AllSElementsRigthClickSelected.forEach(function (i){
            i.removeChild(i.getElementsByClassName("tick")[0]);
        });
        AllSElementsRigthClickSelected.clear();
        document.getElementById('AllSElementsBottomMenu').style.bottom = '-90px';
        document.getElementById('AllSElementsBottomMenuPin').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuUnpin').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuChangeColor').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuClearSelection').setAttribute('disable', '');
        document.getElementById('AllSElementsBottomMenuCustomise').setAttribute('disable', '');
    });
    document.getElementById('AllSElements').addEventListener('click', function (e){
        if (e.target == this){
            document.getElementById('AllSElementsBottomMenuCustomise').click();
        }
    });
    document.getElementById('AllSElementsMain').addEventListener('click', function (e){
        if (e.target == this){
            document.getElementById('AllSElementsBottomMenuCustomise').click();
        }
    });
    document.getElementById('AllSElementsHeader').addEventListener('click', function (){
        document.getElementById('AllSElementsBottomMenuCustomise').click();
    });
    document.getElementById('AllSElements').addEventListener('contextmenu', function (e){
        if (e.target == this){
            document.getElementById('AllSElementsBottomMenuClearSelection').click();
        }
    });
    document.getElementById('AllSElementsMain').addEventListener('contextmenu', function (e){
        if (e.target == this){
            document.getElementById('AllSElementsBottomMenuClearSelection').click();
        }
    });
    document.getElementById('AllSElementsHeader').addEventListener('contextmenu', function (){
        document.getElementById('AllSElementsBottomMenuClearSelection').click();
    });
    document.getElementById('AppsSearchHeaderSectionInput').addEventListener('focus', function (){
        AppsSearchHeaderSectionInputTimer = setInterval(AppsSearchHeaderSectionChange, 50);
        document.getElementById('AllSElementsBottomMenuClearSelection').click();
    });
    document.getElementById('AppsSearchHeaderSectionInput').addEventListener('blur', function (){
        clearInterval(AppsSearchHeaderSectionInputTimer);
        isSearchfoucus = 0;
    });
    document.getElementById('AppsSearchHeaderSectionInput').addEventListener('mousemove', function (e){
        if (WindowedMouse == 1){
            document.getElementById('AppsSearchHeaderSectionInput').style.cursor = 'default';
            e.preventDefault();
            return false;
        } else {
            document.getElementById('AppsSearchHeaderSectionInput').style.cursor = 'text';
        }
    });
    document.getElementById('AppsSearchHeaderSectionInput').addEventListener('mouseenter', function (e){
        if (WindowedMouse == 1){
            document.getElementById('AppsSearchHeaderSectionInput').style.cursor = 'default';
            e.preventDefault();
            return false;
        } else {
            document.getElementById('AppsSearchHeaderSectionInput').style.cursor = 'text';
        }
    });
    function AllSElementsMouseWheelEvent(e){
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
//AllSElementsMainOffset = Math.max(Math.min(-(AllSElementsWidth - window.innerWidth + 100), 100), Math.min(100, delta * window.innerWidth * 0.8 + document.getElementById('AllSElementsMain').offsetLeft));
        AllSElementsMainOffset = Math.max(Math.min(-(AllSElementsWidth - window.innerWidth + 100), 100), Math.min(100, delta * window.innerWidth * 0.4 + AllSElementsMainOffset));
        document.getElementById('AllSElementsMain').style.left = AllSElementsMainOffset + 'px';
        setAppsScrollBar();
    }
    document.getElementById('AllSElements').addEventListener('mousewheel', AllSElementsMouseWheelEvent);
    document.getElementById('AllSElements').addEventListener('DOMMouseScroll', AllSElementsMouseWheelEvent);
    document.getElementById('AllSElements').style.marginTop = document.getElementById('AllSElements').clientHeight + 'px';
    document.getElementById('AllSElementsScroller').addEventListener('mousedown', function (e){
        ScrollerEnter = 1;
        extraScrollEnter = e.clientX - 30 - this.clientWidth / 2 - this.offsetLeft;
        document.getElementById('AllSElementsScroller').style.transition = 'left 0s';
        document.getElementById('AllSElementsMain').style.transition = 'left 0s';
    });
    window.addEventListener('mouseup', function (){
        ScrollerEnter = 0;
        extraScrollEnter = 0;
        clearTimeout(leftOrRigthTimer1);
        clearInterval(leftOrRigthTimer2);
        document.getElementById('AllSElementsScroller').style.transition = null;
        document.getElementById('AllSElementsMain').style.transition = null;
    });
    window.addEventListener('mousemove', function (e){
        if (ScrollerEnter == 1){
            var l = Math.min(window.innerWidth - 60 - document.getElementById('AllSElementsScroller').clientWidth, Math.max(0, (e.clientX - 30 - document.getElementById('AllSElementsScroller').clientWidth / 2 - extraScrollEnter)));
            document.getElementById('AllSElementsScroller').style.left = l + 'px';
            document.getElementById('AllSElementsMain').style.left = (100 - (l / (document.getElementById('AllSElementsScroller').parentElement.clientWidth - document.getElementById('AllSElementsScroller').clientWidth)) * (AllSElementsWidth - window.innerWidth + 200)) + 'px';
        }
    });
    document.getElementById('AllSElementsScroller').parentElement.addEventListener('click', function (e){
        var l = Math.min(window.innerWidth - 60 - document.getElementById('AllSElementsScroller').clientWidth, Math.max(0, (e.clientX - 30 - document.getElementById('AllSElementsScroller').clientWidth / 2)));
        document.getElementById('AllSElementsScroller').style.left = l + 'px';
        document.getElementById('AllSElementsMain').style.left = (100 - (l / (document.getElementById('AllSElementsScroller').parentElement.clientWidth - document.getElementById('AllSElementsScroller').clientWidth)) * (AllSElementsWidth - window.innerWidth + 200)) + 'px';
    });
    document.getElementById('AllSElementsScrollbar').getElementsByTagName('left')[0].addEventListener('mousedown', function (){
        AllSElementsMainOffset = Math.max(Math.min(-(AllSElementsWidth - window.innerWidth + 100), 100), Math.min(100, window.innerWidth * 0.4 + document.getElementById('AllSElementsMain').offsetLeft));
        document.getElementById('AllSElementsMain').style.left = AllSElementsMainOffset + 'px';
        setAppsScrollBar();
        leftOrRigthTimer1 = setTimeout(function (){
            document.getElementById('AllSElementsScroller').style.transition = 'left 0s';
            document.getElementById('AllSElementsMain').style.transition = 'left 0s';
            leftOrRigthTimer2 = setInterval(function (){
                AllSElementsMainOffset = Math.max(Math.min(-(AllSElementsWidth - window.innerWidth + 100), 100), Math.min(100, window.innerWidth * 0.05 + document.getElementById('AllSElementsMain').offsetLeft));
                document.getElementById('AllSElementsMain').style.left = AllSElementsMainOffset + 'px';
                setAppsScrollBar();
            }, 10);
        }, 700);
    });
    document.getElementById('AllSElementsScrollbar').getElementsByTagName('right')[0].addEventListener('mousedown', function (){
        AllSElementsMainOffset = Math.max(Math.min(-(AllSElementsWidth - window.innerWidth + 100), 100), Math.min(100, -1 * window.innerWidth * 0.4 + document.getElementById('AllSElementsMain').offsetLeft));
        document.getElementById('AllSElementsMain').style.left = AllSElementsMainOffset + 'px';
        setAppsScrollBar();
        leftOrRigthTimer1 = setTimeout(function (){
            document.getElementById('AllSElementsScroller').style.transition = 'left 0s';
            document.getElementById('AllSElementsMain').style.transition = 'left 0s';
            leftOrRigthTimer2 = setInterval(function (){
                AllSElementsMainOffset = Math.max(Math.min(-(AllSElementsWidth - window.innerWidth + 100), 100), Math.min(100, -1 * window.innerWidth * 0.05 + document.getElementById('AllSElementsMain').offsetLeft));
                document.getElementById('AllSElementsMain').style.left = AllSElementsMainOffset + 'px';
                setAppsScrollBar();
            }, 10);
        }, 700);
    });
    document.getElementById('AllSElementsScrollbar').getElementsByTagName('left')[0].addEventListener('mouseleave', function (){
        clearTimeout(leftOrRigthTimer1);
        clearInterval(leftOrRigthTimer2);
        document.getElementById('AllSElementsScroller').style.transition = null;
        document.getElementById('AllSElementsMain').style.transition = null;
    });
    document.getElementById('AllSElementsScrollbar').getElementsByTagName('right')[0].addEventListener('mouseleave', function (){
        clearTimeout(leftOrRigthTimer1);
        clearInterval(leftOrRigthTimer2);
        document.getElementById('AllSElementsScroller').style.transition = null;
        document.getElementById('AllSElementsMain').style.transition = null;
    });
    document.getElementById('AllSElementsScrollbar').getElementsByTagName('left')[0].addEventListener('mouseout', function (){
        clearTimeout(leftOrRigthTimer1);
        clearInterval(leftOrRigthTimer2);
        document.getElementById('AllSElementsScroller').style.transition = null;
        document.getElementById('AllSElementsMain').style.transition = null;
    });
    document.getElementById('AllSElementsScrollbar').getElementsByTagName('right')[0].addEventListener('mouseout', function (){
        clearTimeout(leftOrRigthTimer1);
        clearInterval(leftOrRigthTimer2);
        document.getElementById('AllSElementsScroller').style.transition = null;
        document.getElementById('AllSElementsMain').style.transition = null;
    });
    document.getElementById('AllSElementsToScrollLeft').addEventListener('mouseenter', function (){
        document.getElementById('AllSElementsScroller').style.transition = 'left 0s';
        document.getElementById('AllSElementsMain').style.transition = 'left 0s';
        leftOrRigthTimer3 = setInterval(function (){
            AllSElementsMainOffset = Math.max(Math.min(-(AllSElementsWidth - window.innerWidth + 100), 100), Math.min(100, window.innerWidth * 0.015 + document.getElementById('AllSElementsMain').offsetLeft));
            document.getElementById('AllSElementsMain').style.left = AllSElementsMainOffset + 'px';
            setAppsScrollBar();
        }, 10);
    });
    document.getElementById('AllSElementsToScrollRight').addEventListener('mouseenter', function (){
        document.getElementById('AllSElementsScroller').style.transition = 'left 0s';
        document.getElementById('AllSElementsMain').style.transition = 'left 0s';
        leftOrRigthTimer3 = setInterval(function (){
            AllSElementsMainOffset = Math.max(Math.min(-(AllSElementsWidth - window.innerWidth + 100), 100), Math.min(100, -1 * window.innerWidth * 0.015 + document.getElementById('AllSElementsMain').offsetLeft));
            document.getElementById('AllSElementsMain').style.left = AllSElementsMainOffset + 'px';
            setAppsScrollBar();
        }, 10);
    });
    document.getElementById('AllSElementsToScrollLeft').addEventListener('mouseleave', function (){
        clearInterval(leftOrRigthTimer3);
        document.getElementById('AllSElementsScroller').style.transition = null;
        document.getElementById('AllSElementsMain').style.transition = null;
    });
    document.getElementById('AllSElementsToScrollLeft').addEventListener('mouseout', function (){
        clearInterval(leftOrRigthTimer3);
        document.getElementById('AllSElementsScroller').style.transition = null;
        document.getElementById('AllSElementsMain').style.transition = null;
    });
    document.getElementById('AllSElementsToScrollRight').addEventListener('mouseleave', function (){
        clearInterval(leftOrRigthTimer3);
        document.getElementById('AllSElementsScroller').style.transition = null;
        document.getElementById('AllSElementsMain').style.transition = null;
    });
    document.getElementById('AllSElementsToScrollRight').addEventListener('mouseout', function (){
        clearInterval(leftOrRigthTimer3);
        document.getElementById('AllSElementsScroller').style.transition = null;
        document.getElementById('AllSElementsMain').style.transition = null;
    });
}
window.addEventListener('resize', function (){
    if (document.getElementById('AllSElements').style.marginTop != ''){
        document.getElementById('AllSElements').style.marginTop = document.getElementById('AllSElements').clientHeight + 'px';
    }
    document.getElementById('AllSElementsMain').style.height = window.innerHeight - 150 - 90 + 'px';
    var a = 0, b = 0;
    parallel('#AllSElements main > section').forEach(function (i){
        if (!i.hasAttribute('disable')){
            if (b + 60 >= document.getElementById('AllSElementsMain').clientHeight){
                b = 0;
                a += 260;
            }
            i.style.left = a + 'px';
            i.style.top = b + 'px';
            b += 60
        }
    });
    AllSElementsWidth = a + 250;
    document.getElementById('AllSElementsMain').style.left = '100px';
    AllSElementsMainOffset = 100;
    setAppsScrollBar();
});
