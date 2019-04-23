'use strict';

var StartRigthClickSelected = new Set(),
    CurrentSElementPosition = [1, 0],
    startSettingStartSElementTimer,
    startSettingStartSElementTimer1,
    StartWidth = 0,
    StartHeight = 0,
    StartMainOffset = 0,
    PreviouslyHoverElement,
    colOfStart = [100],
    secStartOfStart = [],
    indexBackgroundWallpaper = 0,
    timerBackgroundWallpaper = 0;
function SortOfSElement(i, j){
    var ipos = i.getAttribute('startPosition').split(':'),
        jpos = j.getAttribute('startPosition').split(':');
    ipos[0] = Number(ipos[0]);
    ipos[1] = Number(ipos[1]);
    jpos[0] = Number(jpos[0]);
    jpos[1] = Number(jpos[1]);
    if (ipos[0] > jpos[0]){
        return 1;
    }
    if (ipos[0] < jpos[0]){
        return -1;
    }
    if (ipos[1] > jpos[1]){
        return 1;
    }
    if (ipos[1] < jpos[1]){
        return -1;
    }
    return 0;
}
function SElementPinToStart(id){
    var a = parallel('#StartBackground main section[selementid="' + id + '" ]');
    if (a.getAttribute('inStart') == '0'){
        CurrentSElementPosition[1]++;
        a.css({
            'opacity': null,
            'height': null,
            'width': null,
            'border': null,
            'overflow': null
        }).setAttribute('inStart', '1').setAttribute('startPosition', CurrentSElementPosition[0] + ':' + CurrentSElementPosition[1]);
        parallel('#AllSElements main section[selementid="' + id + '" ]').setAttribute('inStart', '1');
        setSElementPositions();
        setTimeout(setSElementPositions, 510);
    }
}
function SElementPinToStartWithSize(name, size, nextcol){
    CurrentSElementPosition[1]++;
    if (nextcol){
        CurrentSElementPosition[0]++;
        CurrentSElementPosition[1] = 0;
    }
    var id = parallel('#StartBackground main section[name="' + name + '" ]').getAttribute('selementid');
    parallel('#StartBackground main section[selementid="' + id + '" ]').css({
        'opacity': null,
        'height': null,
        'width': null,
        'border': null,
        'overflow': null
    }).setAttribute('inStart', '1').setAttribute('size', size).setAttribute('startPosition', CurrentSElementPosition[0] + ':' + CurrentSElementPosition[1]);
    parallel('#AllSElements main section[selementid="' + id + '" ]').setAttribute('inStart', '1');
    setSElementPositions();
}
function SElementUnpinToStart(id){
    parallel('#StartBackground main section[selementid="' + id + '" ]').css({
        'opacity': '0',
        'height': '0',
        'width': '0',
        'border': 'none',
        'overflow': 'hidden'
    }).setAttribute('inStart', '0').deleteAttribute('startPosition');
    parallel('#AllSElements main section[selementid="' + id + '" ]').setAttribute('inStart', '0');
    setSElementPositions();
}
function SElementChangeColor(id, color){
    parallel('#StartBackground main section[selementid="' + id + '" ]').setAttribute('color', color);
    parallel('#AllSElements main section[selementid="' + id + '" ]').setAttribute('color', color);
}
function SElementChangeSize(id, size){
    parallel('#StartBackground main section[selementid="' + id + '" ]').setAttribute('size', size);
    setSElementPositions();
}
function setSElementPositions(){
    clearTimeout(startSettingStartSElementTimer);
    startSettingStartSElementTimer = setTimeout(startSettingStartSElement, 260);
}
function SElementOnMove(This){
    clearTimeout(startSettingStartSElementTimer1);
    startSettingStartSElementTimer1 = setTimeout(startSElementOnMove, 260, This);
}
function startSettingStartSElement(){
    CurrentSElementPosition = [1, 0];
    colOfStart = [100];
    secStartOfStart = [];
    StartWidth = 0;
    StartHeight = 0;
    var pos = {
        top: 150,
        left: 100,
        thisTop: 0,
        thisLeft: 0,
        sec: -1,
        count: 0,
        Tadd: 130,
        Ladd: 260,
        SecLadd: 70,
        maxColWidth: 0,
        T0: 0,
        L0: 0,
        T1: 0,
        L1: 130,
        T25: 0,
        L25: 65,
        T50: 65,
        L50: 0,
        T75: 65,
        L75: 65,
        thisShape: function (s, sc, This){
            if (this.sec == -1){
                this.sec = sc;
            } else if (sc != this.sec){
                this.sec = sc;
                CurrentSElementPosition[0]++;
                CurrentSElementPosition[1] = 0;
                this.count = 0;
                this.top = 150;
                this.left = this.maxColWidth + this.SecLadd;
                this.maxColWidth = 0;
                colOfStart[colOfStart.length] = this.left;
                secStartOfStart[secStartOfStart.length] = this.left - 70;
            }
            if (this.count == 2){
                this.count = 0;
                this.top += this.Tadd;
            }
            if (Math.floor(this.count) != this.count && s == 'medium'){
                this.count = Math.floor(this.count) + 1;
                if (this.count == 2){
                    this.count = 0;
                    this.top += this.Tadd;
                }
            }
            if ((s == 'large' || s == 'wide') && this.count != 0){
                this.top += this.Tadd;
                this.count = 0;
            }
            if (((this.top + 250 > window.innerHeight - 80 && s == 'large') || this.top + 120 > window.innerHeight - 80) && this.count == 0){
                this.top = 150;
                this.left += this.Ladd;
                this.count = 0;
                this.maxColWidth = 0;
                colOfStart[colOfStart.length] = this.left;
            }
            if (this.count == 0){
                this.thisTop = this.top + this.T0;
                this.thisLeft = this.left + this.L0;
            } else if (this.count == 1){
                this.thisTop = this.top + this.T1;
                this.thisLeft = this.left + this.L1;
            } else if (this.count == .25){
                this.thisTop = this.top + this.T25;
                this.thisLeft = this.left + this.L25;
            } else if (this.count == .5){
                this.thisTop = this.top + this.T50;
                this.thisLeft = this.left + this.L50;
            } else if (this.count == .75){
                this.thisTop = this.top + this.T75;
                this.thisLeft = this.left + this.L75;
            } else if (this.count == 1.25){
                this.thisTop = this.top + this.T1 + this.T25;
                this.thisLeft = this.left + this.L1 + this.L25;
            } else if (this.count == 1.5){
                this.thisTop = this.top + this.T1 + this.T50;
                this.thisLeft = this.left + this.L1 + this.L50;
            } else if (this.count == 1.75){
                this.thisTop = this.top + this.T1 + this.T75;
                this.thisLeft = this.left + this.L1 + this.L75;
            }
            This.setAttribute('rPos', this.count);
            if (s == 'small'){
                this.count += .25;
            } else if (s == 'medium'){
                this.count++;
            } else if (s == 'wide'){
                this.top += this.Tadd;
            } else if (s == 'large'){
                this.top += 2 * this.Tadd;
            }
            CurrentSElementPosition[1]++;
            if (this.maxColWidth < this.thisLeft + This.clientWidth){
                this.maxColWidth = this.thisLeft + This.clientWidth;
            }
            if (StartWidth < this.thisLeft + This.clientWidth){
                StartWidth = this.thisLeft + This.clientWidth;
            }
            if (StartHeight < this.thisTop + This.clientHeight){
                StartHeight = this.thisTop + This.clientHeight;
            }
        }
    };
    parallel('#StartBackground main .SElement').forEach(function (i){
        i.removeAttribute('rPos');
    });
    parallel('#StartBackground main section[inStart="1"]').toArray().sort(SortOfSElement).forEach(function (i){
        pos.thisShape(i.getAttribute('size').toLowerCase(), Number(i.getAttribute('startPosition').split(':')[0]), i);
        i.setAttribute('startPosition', CurrentSElementPosition[0] + ':' + CurrentSElementPosition[1]);
        if (i.className.indexOf('focus') != -1){
            i.setAttribute('predictedTop', pos.thisTop + 'px');
            i.setAttribute('predictedLeft', pos.thisLeft + 'px');
        } else {
            i.style.top = pos.thisTop + 'px';
            i.style.left = pos.thisLeft + 'px';
        }
    });
    StartWidth += 150;
    document.getElementById('divForNewSection').style.height = StartHeight - 150 + 'px';
    setStartScrollBar();
}
function innerElements(This, size){
    return parallel('#StartBackground main section[inStart="1"]').delete('.focus').forEach(function (i){
        if (!
                (
                    (
                        i.offsetLeft > This.offsetLeft
                        &&
                        i.offsetLeft < This.offsetLeft + This.clientWidth
                        &&
                        i.offsetLeft + i.clientWidth > This.offsetLeft
                        &&
                        i.offsetLeft + i.clientWidth < This.offsetLeft + This.clientWidth
                        &&
                        i.offsetTop > This.offsetTop
                        &&
                        i.offsetTop < This.offsetTop + This.clientHeight
                        &&
                        i.offsetTop + i.clientHeight > This.offsetTop
                        &&
                        i.offsetTop + i.clientHeight < This.offsetTop + This.clientHeight
                    )
                    ||
                    (
                        size == 'wide'
                        &&
                        i.getAttribute('size') == 'large'
                        &&
                        i.offsetLeft > This.offsetLeft
                        &&
                        i.offsetLeft < This.offsetLeft + This.clientWidth
                        &&
                        i.offsetLeft + i.clientWidth > This.offsetLeft
                        &&
                        i.offsetLeft + i.clientWidth < This.offsetLeft + This.clientWidth
                        &&
                        (
                            i.offsetTop == This.offsetTop + 1
                            ||
                            i.offsetTop + i.clientHeight == This.offsetTop + This.clientHeight - 1
                        )
                    )
                    ||
                    (
                        size == 'medium'
                        &&
                        (
                            (
                                i.getAttribute('size') == 'wide'
                                &&
                                i.offsetTop > This.offsetTop
                                &&
                                i.offsetTop < This.offsetTop + This.clientHeight
                                &&
                                i.offsetTop + i.clientHeight > This.offsetTop
                                &&
                                i.offsetTop + i.clientHeight < This.offsetTop + This.clientHeight
                                &&
                                (
                                    i.offsetLeft == This.offsetLeft + 1
                                    ||
                                    i.offsetLeft + i.clientWidth == This.offsetLeft + This.clientWidth - 1
                                )
                            )
                            ||
                            (
                                i.getAttribute('size') == 'large'
                                &&
                                This.offsetLeft + 1 >= i.offsetLeft
                                &&
                                This.offsetLeft + 1 <= i.offsetLeft + i.clientWidth
                                &&
                                This.offsetLeft + This.clientWidth - 1 >= i.offsetLeft
                                &&
                                This.offsetLeft + This.clientWidth - 1 <= i.offsetLeft + i.clientWidth
                                &&
                                This.offsetTop + 1 >= i.offsetTop
                                &&
                                This.offsetTop + 1 <= i.offsetTop + i.clientHeight
                                &&
                                This.offsetTop + This.clientHeight - 1 >= i.offsetTop
                                &&
                                This.offsetTop + This.clientHeight - 1 <= i.offsetTop + i.clientHeight
                            )
                        )
                    )
                    ||
                    (
                        size == 'small'
                        &&
                        (
                            (
                                i.getAttribute('size') == 'medium'
                                &&
                                This.offsetLeft + 1 >= i.offsetLeft
                                &&
                                This.offsetLeft + 1 <= i.offsetLeft + i.clientWidth
                                &&
                                This.offsetLeft + This.clientWidth - 1 >= i.offsetLeft
                                &&
                                This.offsetLeft + This.clientWidth - 1 <= i.offsetLeft + i.clientWidth
                                &&
                                This.offsetTop + 1 >= i.offsetTop
                                &&
                                This.offsetTop + 1 <= i.offsetTop + i.clientHeight
                                &&
                                This.offsetTop + This.clientHeight - 1 >= i.offsetTop
                                &&
                                This.offsetTop + This.clientHeight - 1 <= i.offsetTop + i.clientHeight
                            )
                            ||
                            (
                                i.getAttribute('size') == 'wide'
                                &&
                                This.offsetLeft + 1 >= i.offsetLeft
                                &&
                                This.offsetLeft + 1 <= i.offsetLeft + i.clientWidth
                                &&
                                This.offsetLeft + This.clientWidth - 1 >= i.offsetLeft
                                &&
                                This.offsetLeft + This.clientWidth - 1 <= i.offsetLeft + i.clientWidth
                                &&
                                This.offsetTop + 1 >= i.offsetTop
                                &&
                                This.offsetTop + 1 <= i.offsetTop + i.clientHeight
                                &&
                                This.offsetTop + This.clientHeight - 1 >= i.offsetTop
                                &&
                                This.offsetTop + This.clientHeight - 1 <= i.offsetTop + i.clientHeight
                            )
                            ||
                            (
                                i.getAttribute('size') == 'large'
                                &&
                                This.offsetLeft + 1 >= i.offsetLeft
                                &&
                                This.offsetLeft + 1 <= i.offsetLeft + i.clientWidth
                                &&
                                This.offsetLeft + This.clientWidth - 1 >= i.offsetLeft
                                &&
                                This.offsetLeft + This.clientWidth - 1 <= i.offsetLeft + i.clientWidth
                                &&
                                This.offsetTop + 1 >= i.offsetTop
                                &&
                                This.offsetTop + 1 <= i.offsetTop + i.clientHeight
                                &&
                                This.offsetTop + This.clientHeight - 1 >= i.offsetTop
                                &&
                                This.offsetTop + This.clientHeight - 1 <= i.offsetTop + i.clientHeight
                            )
                        )
                    )
                )
        ){
            this.delete(i);
        }
    }).toArray();
}
function startSElementOnMove(This){
    if ((This.getAttribute('size') != 'large' && This.offsetTop + This.clientHeight / 2 > 150 && This.offsetTop + This.clientHeight / 2 < StartHeight) || (This.getAttribute('size') == 'large' && This.offsetTop + This.clientHeight / 4 > 150 && This.offsetTop + 3 * This.clientHeight / 4 < StartHeight) && This.getAttribute('predictedTop') && This.getAttribute('predictedLeft')){
        var i;
        if (This.offsetLeft + This.clientWidth / 2 > 25 && This.offsetLeft + This.clientWidth / 2 < 75){
            document.getElementById('divForNewSection').style.left = '35px';
            document.getElementById('divForNewSection').style.opacity = '.5';
            setTimeout(function (){ document.getElementById('divForNewSection').style.opacity = '0' }, 1000);
            This.setAttribute('startPosition', '.5:1');
            startSettingStartSElement();
            return;
        }
        if (This.offsetLeft + This.clientWidth / 2 > StartWidth - 100 && This.offsetLeft + This.clientWidth / 2 < StartWidth - 50){
            document.getElementById('divForNewSection').style.left = StartWidth - 90 + document.getElementById('StartBackgroundMain').offsetLeft + 'px';
            document.getElementById('divForNewSection').style.opacity = '.5';
            setTimeout(function (){ document.getElementById('divForNewSection').style.opacity = '0' }, 1000);
            This.setAttribute('startPosition', (CurrentSElementPosition[0] + 1) + ':1');
            startSettingStartSElement();
            return;
        }
        for (i = 0; i < secStartOfStart.length ; i++){
            if (This.offsetLeft + This.clientWidth / 2 > secStartOfStart[i] + 10 && This.offsetLeft + This.clientWidth / 2 < secStartOfStart[i] + 60){
                document.getElementById('divForNewSection').style.left = secStartOfStart[i] + 20 + document.getElementById('StartBackgroundMain').offsetLeft + 'px';
                document.getElementById('divForNewSection').style.opacity = '.5';
                setTimeout(function (){
                    document.getElementById('divForNewSection').style.opacity = '0';
                }, 1000);
                This.setAttribute('startPosition', i + 1.5 + ':1');
                startSettingStartSElement();
                return;
            }
        }
        var col = 0,
            row = 0,
            c = -1,
            pos = {
                top: 150,
                left: 100,
                thisTop: 0,
                thisLeft: 0,
                sec: -1,
                count: 0,
                Tadd: 130,
                Ladd: 260,
                SecLadd: 70,
                maxColWidth: 0,
                T0: 0,
                L0: 0,
                T1: 0,
                L1: 130,
                T25: 0,
                L25: 65,
                T50: 65,
                L50: 0,
                T75: 65,
                L75: 65,
                thisShape: function (s, sc, ele){
                    if (this.sec == -1){
                        this.sec = sc;
                    } else if (sc != this.sec){
                        this.sec = sc;
                        this.count = 0;
                        this.top = 150;
                        this.left = this.maxColWidth + this.SecLadd;
                        this.maxColWidth = 0;
                    }
                    if (this.count == 2){
                        this.count = 0;
                        this.top += this.Tadd;
                    }
                    if (Math.floor(this.count) != this.count && s == 'medium'){
                        this.count = Math.floor(this.count) + 1;
                        if (this.count == 2){
                            this.count = 0;
                            this.top += this.Tadd;
                        }
                    }
                    if ((s == 'large' || s == 'wide') && this.count != 0){
                        this.top += this.Tadd;
                        this.count = 0;
                    }
                    if (((this.top + 250 > window.innerHeight - 80 && s == 'large') || this.top + 120 > window.innerHeight - 80) && this.count == 0){
                        this.top = 150;
                        this.left += this.Ladd;
                        this.count = 0;
                        this.maxColWidth = 0;
                    }
                    if (this.count == 0){
                        this.thisTop = this.top + this.T0;
                        this.thisLeft = this.left + this.L0;
                    } else if (this.count == 1){
                        this.thisTop = this.top + this.T1;
                        this.thisLeft = this.left + this.L1;
                    } else if (this.count == .25){
                        this.thisTop = this.top + this.T25;
                        this.thisLeft = this.left + this.L25;
                    } else if (this.count == .5){
                        this.thisTop = this.top + this.T50;
                        this.thisLeft = this.left + this.L50;
                    } else if (this.count == .75){
                        this.thisTop = this.top + this.T75;
                        this.thisLeft = this.left + this.L75;
                    } else if (this.count == 1.25){
                        this.thisTop = this.top + this.T1 + this.T25;
                        this.thisLeft = this.left + this.L1 + this.L25;
                    } else if (this.count == 1.5){
                        this.thisTop = this.top + this.T1 + this.T50;
                        this.thisLeft = this.left + this.L1 + this.L50;
                    } else if (this.count == 1.75){
                        this.thisTop = this.top + this.T1 + this.T75;
                        this.thisLeft = this.left + this.L1 + this.L75;
                    }
                    if (s == 'small'){
                        this.count += .25;
                    } else if (s == 'medium'){
                        this.count++;
                    } else if (s == 'wide'){
                        this.top += this.Tadd;
                    } else if (s == 'large'){
                        this.top += 2 * this.Tadd;
                    }
                    if (this.maxColWidth < this.thisLeft + ele.clientWidth){
                        this.maxColWidth = this.thisLeft + ele.clientWidth;
                    }
                }
            },
            a, p, inner, preinner;
        if (This.getAttribute('size') == 'small'){
            var colS = 0;
            for (i = 0; i < colOfStart.length; i++){
                if (This.offsetLeft + This.clientWidth / 2 > colOfStart[i] && This.offsetLeft + This.clientWidth / 2 < colOfStart[i] + 260){
                    col = i + 1;
                }
            }
            row = Math.floor((This.offsetTop + This.clientHeight / 2 - 150) / 130 + 1);
            if (This.offsetLeft + 27.5 - colOfStart[col - 1] < 60){
                colS = 1;
            } else if (This.offsetLeft + 27.5 - colOfStart[col - 1] > 60 && This.offsetLeft + 27.5 - colOfStart[col - 1] < 125){
                colS = 2;
            } else if (This.offsetLeft + 27.5 - colOfStart[col - 1] > 125 && This.offsetLeft + 27.5 - colOfStart[col - 1] < 190){
                colS = 3;
            } else if (This.offsetLeft + 27.5 - colOfStart[col - 1] > 190 && This.offsetLeft + 27.5 - colOfStart[col - 1] < 250){
                colS = 4;
            }
            var rowS = This.offsetTop + This.clientHeight / 2 - ((row - 1) * 130 + 150) < 60 ? 1 : 2;
            var b = innerElements({
                offsetTop: (row - 1) * 130 + 150 - 1,
                offsetLeft: colOfStart[col - 1] - 1 + (This.offsetLeft + 27.5 - colOfStart[col - 1] > 125 ? 130 : 0),
                clientHeight: 122,
                clientWidth: 122
            }, 'medium');
            if (!((b.length == 0 && This.getAttribute('predictedTop') == (row - 1) * 130 + 150 + 'px' && This.getAttribute('predictedLeft') == colOfStart[col - 1] + (This.offsetLeft + 60 - colOfStart[col - 1] > 125 ? 130 : 0) + 'px') || (b.length != 0 && This.getAttribute('predictedTop') == (row - 1) * 130 + 150 + (rowS - 1) * 65 + 'px' && This.getAttribute('predictedLeft') == colOfStart[col - 1] + (colS - 1) * 65 + 'px')) && col != 0 && colS != 0 && This.getAttribute('predictedTop')){
                i = 0;
                while (true){
                    preinner = innerElements({
                        offsetTop: (row - i - 1) * 130 + 150 - 1,
                        offsetLeft: colOfStart[col - 1] - 1,
                        clientHeight: 122,
                        clientWidth: 252
                    }, 'wide');
                    if (preinner.length > 0){
                        break;
                    }
                    i++;
                    if (row - i - 1 < 0){
                        break;
                    }
                }
                inner = innerElements({
                    offsetTop: (row - 1) * 130 + 150 + (rowS - 1) * 65 - 1,
                    offsetLeft: colOfStart[col - 1] + (colS - 1) * 65 - 1,
                    clientHeight: 57,
                    clientWidth: 57
                }, 'small');
                preinner.sort(SortOfSElement);
                inner.sort(SortOfSElement);
                if (preinner.length > 0){
                    if (i > 0 || (inner.length == 0 && i == 0)){
                        This.setAttribute('startPosition', preinner[preinner.length - 1].getAttribute('startPosition') + '.5');
                        startSettingStartSElement();
                        return;
                    }
                    if (inner.length > 0){
                        This.setAttribute('startPosition', inner[0].getAttribute('startPosition').split(':')[0] + ':' + (Number(inner[0].getAttribute('startPosition').split(':')[1]) - .5));
                        c = -1;
                        p = parallel('#StartBackground main section[inStart="1"]').toArray().sort(SortOfSElement);
                        p.forEach(function (i){
                            if (c == -1){
                                pos.thisShape(i.getAttribute('size').toLowerCase(), Number(i.getAttribute('startPosition').split(':')[0]), i);
                            }
                            if (i == This && pos.thisTop == (row - 1) * 130 + 150 + (rowS - 1) * 65 && pos.thisLeft == colOfStart[col - 1] + (colS - 1) * 65){
                                c = 1;
                            } else if (i == This){
                                c = 0;
                            }
                        });
                        a = innerElements({
                            offsetTop: (row - 2) * 130 + 150 - 1,
                            offsetLeft: colOfStart[col - 1] - 1,
                            clientHeight: 122,
                            clientWidth: 252
                        }, 'wide');
                        b = innerElements({
                            offsetTop: (row - 1) * 130 + 150 - 1,
                            offsetLeft: colOfStart[col - 1] - 1,
                            clientHeight: 122,
                            clientWidth: 122
                        }, 'medium');
                        if (c == 0 &&
                            !(
                                (inner[0].getAttribute('size') == 'medium' && b.length != 0)
                                ||
                                (inner[0].getAttribute('size') == 'wide' && a.length != 0)
                                ||
                                (inner[0].getAttribute('size') == 'large' && This.offsetTop + This.clientHeight / 2 < inner[0].offsetTop + inner[0].clientHeight / 2)
                            )
                        ){
                            This.setAttribute('startPosition', inner[inner.length - 1].getAttribute('startPosition') + '.5');
                        }
                        startSettingStartSElement();
                    }
                }
            }
            return;
        }
        if (This.getAttribute('size') == 'medium'){
            for (i = 0; i < colOfStart.length; i++){
                if (This.offsetLeft + This.clientWidth / 2 > colOfStart[i] && This.offsetLeft + This.clientWidth / 2 < colOfStart[i] + 260){
                    col = i + 1;
                }
            }
            row = Math.floor((This.offsetTop + This.clientHeight / 2 - 150) / 130 + 1);
            if (!(This.getAttribute('predictedTop') == (row - 1) * 130 + 150 + 'px' && This.getAttribute('predictedLeft') == colOfStart[col - 1] + (This.offsetLeft + 60 - colOfStart[col - 1] > 125 ? 130 : 0) + 'px') && col != 0){
                i = 0;
                while (true){
                    preinner = innerElements({
                        offsetTop: (row - i - 1) * 130 + 150 - 1,
                        offsetLeft: colOfStart[col - 1] - 1,
                        clientHeight: 122,
                        clientWidth: 252
                    }, 'wide');
                    if (preinner.length > 0){
                        break;
                    }
                    i++;
                    if (row - i - 1 < 0){
                        break;
                    }
                }
                inner = innerElements({
                    offsetTop: (row - i - 1) * 130 + 150 - 1,
                    offsetLeft: colOfStart[col - 1] - 1 + (This.offsetLeft + 60 - colOfStart[col - 1] > 125 ? 130 : 0),
                    clientHeight: 122,
                    clientWidth: 122
                }, 'medium');
                preinner.sort(SortOfSElement);
                inner.sort(SortOfSElement);
                if (preinner.length > 0){
                    if (i > 0 || (inner.length == 0 && i == 0)){
                        This.setAttribute('startPosition', preinner[preinner.length - 1].getAttribute('startPosition') + '.5');
                        startSettingStartSElement();
                        return;
                    }
                    if (inner.length > 0){
                        This.setAttribute('startPosition', inner[0].getAttribute('startPosition').split(':')[0] + ':' + (Number(inner[0].getAttribute('startPosition').split(':')[1]) - .5));
                        c = -1;
                        p = parallel('#StartBackground main section[inStart="1"]').toArray().sort(SortOfSElement);
                        p.forEach(function (i){
                            if (c == -1){
                                pos.thisShape(i.getAttribute('size').toLowerCase(), Number(i.getAttribute('startPosition').split(':')[0]), i);
                            }
                            if (i == This && pos.thisTop == (row - 1) * 130 + 150 && pos.thisLeft == colOfStart[col - 1] + (This.offsetLeft + 60 - colOfStart[col - 1] > 125 ? 130 : 0)){
                                c = 1;
                            } else if (i == This){
                                c = 0;
                            }
                        });
                        a = innerElements({
                            offsetTop: (row - 2) * 130 + 150 - 1,
                            offsetLeft: colOfStart[col - 1] - 1,
                            clientHeight: 122,
                            clientWidth: 252
                        }, 'wide');
                        if (c == 0 && !((inner[0].getAttribute('size') == 'wide' && a.length != 0) || (inner[0].getAttribute('size') == 'large' && This.offsetTop + This.clientHeight / 2 < inner[0].offsetTop + inner[0].clientHeight / 2))){
                            This.setAttribute('startPosition', inner[inner.length - 1].getAttribute('startPosition') + '.5');
                        }
                        startSettingStartSElement();
                    }
                }
            }
            return;
        }
        if (This.getAttribute('size') == 'wide'){
            for (i = 0; i < colOfStart.length; i++){
                if (This.offsetLeft + This.clientWidth / 2 > colOfStart[i] && This.offsetLeft + This.clientWidth / 2 < colOfStart[i] + 260){
                    col = i + 1;
                }
            }
            row = Math.floor((This.offsetTop + This.clientHeight / 2 - 150) / 130 + 1);
            if (!(This.getAttribute('predictedTop') == (row - 1) * 130 + 150 + 'px' && This.getAttribute('predictedLeft') == colOfStart[col - 1] + 'px') && col != 0){
                i = 0;
                while (true){
                    inner = innerElements({
                        offsetTop: (row - i - 1) * 130 + 150 - 1,
                        offsetLeft: colOfStart[col - 1] - 1,
                        clientHeight: 122,
                        clientWidth: 252
                    }, 'wide');
                    if (inner.length > 0){
                        break;
                    }
                    i++;
                    if (row - i - 1 < 0){
                        break;
                    }
                }
                inner.sort(SortOfSElement);
                if (inner.length > 0){
                    if (i > 0){
                        This.setAttribute('startPosition', inner[inner.length - 1].getAttribute('startPosition') + '.5');
                        startSettingStartSElement();
                        return;
                    }
                    This.setAttribute('startPosition', inner[0].getAttribute('startPosition').split(':')[0] + ':' + (Number(inner[0].getAttribute('startPosition').split(':')[1]) - .5));
                    c = -1;
                    p = parallel('#StartBackground main section[inStart="1"]').toArray().sort(SortOfSElement);
                    p.forEach(function (i){
                        if (c == -1){
                            pos.thisShape(i.getAttribute('size').toLowerCase(), Number(i.getAttribute('startPosition').split(':')[0]), i);
                        }
                        if (i == This && pos.thisTop == (row - 1) * 130 + 150 && pos.thisLeft == colOfStart[col - 1]){
                            c = 1;
                        } else if (i == This){
                            c = 0;
                        }
                    });
                    if (c == 0 && !(inner[0].getAttribute('size') == 'large' && This.offsetTop + This.clientHeight / 2 < inner[0].offsetTop + inner[0].clientHeight / 2)){
                        This.setAttribute('startPosition', inner[inner.length - 1].getAttribute('startPosition') + '.5');
                    }
                    startSettingStartSElement();
                }
            }
            return;
        }
        if (This.getAttribute('size') == 'large'){
            for (i = 0; i < colOfStart.length; i++){
                if (This.offsetLeft + This.clientWidth / 2 > colOfStart[i] && This.offsetLeft + This.clientWidth / 2 < colOfStart[i] + 260){
                    col = i + 1;
                }
            }
            row = Math.floor((This.offsetTop + This.clientHeight / 4 - 150) / 130 + 1);
            if (!(This.getAttribute('predictedTop') == (row - 1) * 130 + 150 + 'px' && This.getAttribute('predictedLeft') == colOfStart[col - 1] + 'px') && col != 0){
                i = 0;
                while (true){
                    inner = innerElements({
                        offsetTop: (row - i - 1) * 130 + 150 - 1,
                        offsetLeft: colOfStart[col - 1] - 1,
                        clientHeight: 252,
                        clientWidth: 252
                    }, 'large');
                    if (inner.length > 0){
                        break;
                    }
                    i++;
                    if (row - i - 1 < 0){
                        break;
                    }
                }
                inner.sort(SortOfSElement);
                if (inner.length > 0){
                    if (i > 0){
                        This.setAttribute('startPosition', inner[inner.length - 1].getAttribute('startPosition') + '.5');
                        startSettingStartSElement();
                        return;
                    }
                    This.setAttribute('startPosition', inner[0].getAttribute('startPosition').split(':')[0] + ':' + (Number(inner[0].getAttribute('startPosition').split(':')[1]) - .5));
                    c = -1;
                    p = parallel('#StartBackground main section[inStart="1"]').toArray().sort(SortOfSElement);
                    p.forEach(function (i){
                        if (c == -1){
                            pos.thisShape(i.getAttribute('size').toLowerCase(), Number(i.getAttribute('startPosition').split(':')[0]), i);
                        }
                        if (i == This && pos.thisTop == (row - 1) * 130 + 150 && pos.thisLeft == colOfStart[col - 1]){
                            c = 1;
                        } else if (i == This){
                            c = 0;
                        }
                    });
                    if (c == 0){
                        This.setAttribute('startPosition', inner[inner.length - 1].getAttribute('startPosition') + '.5');
                    }
                    startSettingStartSElement();
                }
            }
        }
    }
}
function setStartScrollBar(){
    if (document.getElementById('StartBackgroundMain').offsetLeft > StartWidth - window.innerWidth){
        document.getElementById('StartBackgroundMain').style.left = Math.min(0, -1 * (StartWidth - window.innerWidth)) + 'px';
    }
    document.getElementById('StartBackgroundScroller').style.width = Math.min((window.innerWidth - 60) * 0.9, Math.max((window.innerWidth - 60) * 0.1, (window.innerWidth / StartWidth) * (window.innerWidth - 60))) + 'px';
    if (document.getElementById('StartBackgroundScroller').style.width == (window.innerWidth - 60) * 0.9 + 'px'){
        document.getElementById('StartScrollbar').style.display = 'none';
    } else {
        document.getElementById('StartScrollbar').style.display = null;
    }
    document.getElementById('StartBackgroundScroller').style.left = ((document.getElementById('StartBackgroundScroller').parentElement.clientWidth - document.getElementById('StartBackgroundScroller').clientWidth) * ((0 - StartMainOffset) / Math.max(0, StartWidth - window.innerWidth))) + 'px';
    parallel('toScrollLeft').add('toScrollRight').css('height', (window.innerHeight - 200) + 'px')
}
function background_Start_JS(){
    var This,
        PreThis,
        SElementMouseDown = 0,
        SElementMouseDownX,
        SElementMouseDownY,
        SElementMouseDownXExtra,
        SElementMouseDownYExtra,
        ScrollerEnter = 0,
        extraScrollEnter = 0,
        leftOrRigthTimer1,
        leftOrRigthTimer2,
        leftOrRigthTimer3,
        timerForZIndex;
    parallel('#StartBackground main section').forEach(function (i){
        var colorsec = document.createElement('article'),
            header = document.createElement('header'),
            img = document.createElement('img'),
            span = document.createElement('span');
        colorsec.className = 'color';
        header.innerHTML = i.getAttribute('name');
        img.src = 'images/start/app logo/' + i.getAttribute('name') + '.png';
        span.className = 'helpCenterImgSElement';
        i.appendChild(colorsec);
        i.appendChild(header);
        i.appendChild(span);
        i.appendChild(img);
        i.setAttribute('SElementId', parallel('#AllSElements main section[name="' + i.getAttribute('name') + '"]').getAttribute('selementid'));
        i.setAttribute('class', 'SElement');
        i.setAttribute('size', 'medium');
        SElementUnpinToStart(i.getAttribute('selementid'));
        i.addEventListener('mousedown', function (e){
            SElementMouseDown = 1;
            SElementMouseDownX = e.clientX;
            SElementMouseDownY = e.clientY;
            SElementMouseDownXExtra = e.clientX - this.offsetLeft - document.getElementById('StartBackgroundMain').offsetLeft;
            SElementMouseDownYExtra = e.clientY - this.offsetTop;
            var XPercent = (SElementMouseDownXExtra / this.clientWidth) * 100,
                YPercent = (SElementMouseDownYExtra / this.clientHeight) * 100;
            This = this;
            this.style.zIndex = '999';
            if (PreThis){
                if (PreThis != This){
                    PreThis.style.zIndex = null;
                }
            }
            if (YPercent < 25 && XPercent >= YPercent && YPercent + XPercent - 100 < 0){
                this.className += ' top';
                this.setAttribute('perspec', 'top');
            }
            if (XPercent < 25 && XPercent < YPercent && YPercent + XPercent - 100 <= 0){
                this.className += ' left';
                this.setAttribute('perspec', 'left');
            }
            if (XPercent >= 25 && XPercent <= 75 && YPercent >= 25 && YPercent <= 75){
                this.className += ' center';
            }
            if (XPercent > 75 && XPercent > YPercent && YPercent + XPercent - 100 >= 0){
                this.className += ' right';
                this.setAttribute('perspec', 'right');
            }
            if (YPercent > 75 && XPercent <= YPercent && YPercent + XPercent - 100 > 0){
                this.className += ' bottom';
                this.setAttribute('perspec', 'bottom');
            }
        });
        i.addEventListener('click', function (){
            if (StartRigthClickSelected.size > 0){
                if (StartRigthClickSelected.has(this)){
                    StartRigthClickSelected.delete(this);
                    this.removeChild(this.getElementsByClassName("tick")[0]);
                } else {
                    StartRigthClickSelected.add(this);
                    this.innerHTML = '<article class="tick">\n<article>\n<article class="tickBackground"></article>\n<article class="rigthTick"></article>\n<article class="leftTick"></article>\n</article>\n</article>\n' + this.innerHTML;
                }
                document.getElementById('StartBackgroundBottomMenu').style.bottom = '0px';
                document.getElementById('StartBackgroundBottomMenuUnpin').removeAttribute('disable');
                document.getElementById('StartBackgroundBottomMenuResize').removeAttribute('disable');
                document.getElementById('StartBackgroundBottomMenuChangeColor').removeAttribute('disable');
                document.getElementById('StartBackgroundBottomMenuCustomise').removeAttribute('disable');
                if (StartRigthClickSelected.size == 0){
                    document.getElementById('StartBackgroundBottomMenu').style.bottom = '-90px';
                    document.getElementById('StartBackgroundBottomMenuUnpin').setAttribute('disable', '');
                    document.getElementById('StartBackgroundBottomMenuResize').setAttribute('disable', '');
                    document.getElementById('StartBackgroundBottomMenuChangeColor').setAttribute('disable', '');
                    document.getElementById('StartBackgroundBottomMenuClearSelection').setAttribute('disable', '');
                    document.getElementById('StartBackgroundBottomMenuCustomise').setAttribute('disable', '');
                }
                if (StartRigthClickSelected.size > 1){
                    document.getElementById('StartBackgroundBottomMenuClearSelection').removeAttribute('disable');
                } else {
                    document.getElementById('StartBackgroundBottomMenuClearSelection').setAttribute('disable', '');
                }
            }
        });
        i.addEventListener('contextmenu', function (){
            if (StartRigthClickSelected.has(this)){
                StartRigthClickSelected.delete(this);
                this.removeChild(this.getElementsByClassName("tick")[0]);
            } else {
                StartRigthClickSelected.add(this);
                this.innerHTML = '<article class="tick">\n<article>\n<article class="tickBackground"></article>\n<article class="rigthTick"></article>\n<article class="leftTick"></article>\n</article>\n</article>\n' + this.innerHTML;
            }
            document.getElementById('StartBackgroundBottomMenu').style.bottom = '0px';
            document.getElementById('StartBackgroundBottomMenuUnpin').removeAttribute('disable');
            document.getElementById('StartBackgroundBottomMenuResize').removeAttribute('disable');
            document.getElementById('StartBackgroundBottomMenuChangeColor').removeAttribute('disable');
            document.getElementById('StartBackgroundBottomMenuCustomise').removeAttribute('disable');
            if (StartRigthClickSelected.size == 0){
                document.getElementById('StartBackgroundBottomMenu').style.bottom = '-90px';
                document.getElementById('StartBackgroundBottomMenuUnpin').setAttribute('disable', '');
                document.getElementById('StartBackgroundBottomMenuResize').setAttribute('disable', '');
                document.getElementById('StartBackgroundBottomMenuChangeColor').setAttribute('disable', '');
                document.getElementById('StartBackgroundBottomMenuClearSelection').setAttribute('disable', '');
                document.getElementById('StartBackgroundBottomMenuCustomise').setAttribute('disable', '');
            }
            if (StartRigthClickSelected.size > 1){
                document.getElementById('StartBackgroundBottomMenuClearSelection').removeAttribute('disable');
            } else {
                document.getElementById('StartBackgroundBottomMenuClearSelection').setAttribute('disable', '');
            }
        });
    });
    parallel('#StartBackground main section[name="desktop"] img').remove();
    parallel('#StartBackground main section[name="desktop"]').forEach(function (i){
        var a = document.createElement('article');
        a.style.height = '100%';
        a.style.width = '100%';
        a.style.position = 'absolute';
        a.style.overflow = 'hidden';
        a.className = 'backgroundArticleDesktop';
        a.innerHTML = '<article class="first img" style="height: 100%;width: 100%;transition: margin-top ease-out 1s;"></article>\n<article class="second img" style="height: 100%;width: 100%;"></article>';
        i.insertBefore(a, i.children[1]);
    });
    parallel('#StartBackground main section[name="desktop"] .img').css('background', 'url("images/wallpapers/0.jpg") 50% 50% / cover no-repeat');
    document.getElementById('minStartBackground').src = 'images/wallpapers/' + indexBackgroundWallpaper + '.jpg';
    indexBackgroundWallpaper++;
    setInterval(function (){
        if (timerBackgroundWallpaper == 1){
            document.getElementById('StartBackground').style.background = 'url("images/wallpapers/' + indexBackgroundWallpaper + '.jpg") 50% 50% / cover no-repeat';
        }
        document.getElementById('minStartBackground').src = 'images/wallpapers/' + indexBackgroundWallpaper + '.jpg';
        parallel('#StartBackground main section[name="desktop"] article.backgroundArticleDesktop').forEach(function (i){
            i.children[1].style.background = 'url("images/wallpapers/' + indexBackgroundWallpaper + '.jpg") 50% 50% / cover no-repeat';
            i.children[0].style.marginTop = -i.clientHeight + 'px';
        });
        setTimeout(function (){
            parallel('#StartBackground main section[name="desktop"] article.backgroundArticleDesktop').forEach(function (i){
                i.appendChild(i.children[0]);
                i.children[0].style.transition = 'margin-top ease-out 1s';
                i.children[1].style.transition = null;
                i.children[1].style.marginTop = null;
            });
        }, 1010);
        indexBackgroundWallpaper++;
        if (indexBackgroundWallpaper > 13){
            indexBackgroundWallpaper = 0;
        }
    }, 3000);
    window.addEventListener('mousemove', function (e){
        if (SElementMouseDown == 1 && (Math.abs(e.clientX - SElementMouseDownX) > 10 || Math.abs(e.clientY - SElementMouseDownY) > 10)){
            SElementMouseDown = 2;
            This.setAttribute('predictedLeft', This.style.left);
            This.setAttribute('predictedTop', This.style.top);
            This.className = This.className.replace(' top', '');
            This.className = This.className.replace(' left', '');
            This.className = This.className.replace(' center', '');
            This.className = This.className.replace(' right', '');
            This.className = This.className.replace(' bottom', '');
            This.className += ' focus';
            This.parentElement.className = This.parentElement.className == '' ? 'focus' : This.parentElement.className + ' focus';
        }
        if (SElementMouseDown == 2){
            This.style.left = e.clientX - SElementMouseDownXExtra - document.getElementById('StartBackgroundMain').offsetLeft + 'px';
            This.style.top = e.clientY - SElementMouseDownYExtra + 'px';
            SElementOnMove(This);
        }
    });
    document.getElementById('StartBackgroundBottomMenuUnpin').addEventListener('click', function (){
        StartRigthClickSelected.forEach(function (i){
            i.removeChild(i.getElementsByClassName("tick")[0]);
            SElementUnpinToStart(i.getAttribute('selementid'));
        });
        StartRigthClickSelected.clear();
        document.getElementById('StartBackgroundBottomMenu').style.bottom = '-90px';
        document.getElementById('StartBackgroundBottomMenuUnpin').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuResize').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuChangeColor').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuClearSelection').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuCustomise').setAttribute('disable', '');
    });
    document.getElementById('StartBackgroundBottomMenuResize').addEventListener('click', function (){
        this.getElementsByTagName('section')[0].removeAttribute('disable');
    });
    parallel(document.getElementById('StartBackgroundBottomMenuResize').getElementsByTagName('li')).addEvent('click', function (){
        var n = this.getAttribute('name');
        StartRigthClickSelected.forEach(function (i){
            i.removeChild(i.getElementsByClassName("tick")[0]);
            SElementChangeSize(i.getAttribute('selementid'), n);
        });
        StartRigthClickSelected.clear();
        document.getElementById('StartBackgroundBottomMenu').style.bottom = '-90px';
        document.getElementById('StartBackgroundBottomMenuUnpin').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuResize').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuChangeColor').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuClearSelection').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuCustomise').setAttribute('disable', '');
        this.parentElement.setAttribute('disable', '');
    });
    document.getElementById('StartBackgroundBottomMenuChangeColor').addEventListener('click', function (){
        this.getElementsByTagName('section')[0].removeAttribute('disable');
    });
    parallel(document.getElementById('StartBackgroundBottomMenuChangeColor').getElementsByTagName('li')).addEvent('click', function (){
        var n = this.getAttribute('name');
        StartRigthClickSelected.forEach(function (i){
            i.removeChild(i.getElementsByClassName("tick")[0]);
            SElementChangeColor(i.getAttribute('selementid'), n);
        });
        StartRigthClickSelected.clear();
        document.getElementById('StartBackgroundBottomMenu').style.bottom = '-90px';
        document.getElementById('StartBackgroundBottomMenuUnpin').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuResize').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuChangeColor').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuClearSelection').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuCustomise').setAttribute('disable', '');
        this.parentElement.setAttribute('disable', '');
    });
    document.getElementById('StartBackgroundBottomMenuClearSelection').addEventListener('click', function (){
        StartRigthClickSelected.forEach(function (i){
            i.removeChild(i.getElementsByClassName("tick")[0]);
        });
        StartRigthClickSelected.clear();
        document.getElementById('StartBackgroundBottomMenuUnpin').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuResize').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuChangeColor').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuClearSelection').setAttribute('disable', '');
    });
    document.getElementById('StartBackgroundBottomMenuCustomise').addEventListener('click', function (){
        StartRigthClickSelected.forEach(function (i){
            i.removeChild(i.getElementsByClassName("tick")[0]);
        });
        StartRigthClickSelected.clear();
        document.getElementById('StartBackgroundBottomMenu').style.bottom = '-90px';
        document.getElementById('StartBackgroundBottomMenuUnpin').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuResize').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuChangeColor').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuClearSelection').setAttribute('disable', '');
        document.getElementById('StartBackgroundBottomMenuCustomise').setAttribute('disable', '');
    });
    document.getElementById('StartBackground').addEventListener('click', function (e){
        if (e.target == this){
            document.getElementById('StartBackgroundBottomMenuCustomise').click();
        }
    });
    document.getElementById('StartBackgroundHeader').addEventListener('click', function (){
        document.getElementById('StartBackgroundBottomMenuCustomise').click();
    });
    document.getElementById('StartBackground').addEventListener('contextmenu', function (e){
        if (e.target == this){
            document.getElementById('StartBackgroundBottomMenuClearSelection').click();
        }
    });
    document.getElementById('StartBackgroundHeader').addEventListener('contextmenu', function (){
        document.getElementById('StartBackgroundBottomMenuClearSelection').click();
    });
    parallel('#StartBackground header user section').addEvent('mousedown', function (){
        this.style.transform = "scale(.9)";
    });
    document.getElementById('SectionOfUserNameStart').addEventListener('mousedown', function (){
        WindowLevel = -2;
        lockVisible = 1;
        document.getElementById('lockScreen').style.top = null;
    });
    window.addEventListener('mouseup', function (){
        SElementMouseDown = 0;
        if (This){
            if (This.getAttribute('predictedLeft')){
                This.style.left = This.getAttribute('predictedLeft');
                This.style.top = This.getAttribute('predictedTop');
            }
            This.removeAttribute('predictedLeft');
            This.removeAttribute('predictedTop');
            This.className = This.className.replace(' top', '');
            This.className = This.className.replace(' left', '');
            This.className = This.className.replace(' center', '');
            This.className = This.className.replace(' right', '');
            This.className = This.className.replace(' bottom', '');
            This.className = This.className.replace(' focus', '');
            This.parentElement.className = This.parentElement.className.replace(' focus', '').replace('focus', '');
            PreThis = This;
            clearTimeout(timerForZIndex);
            timerForZIndex = setTimeout(function (){
                PreThis.style.zIndex = null;
            }, 260);
            This = null;
        }
        parallel('#StartBackground header user section').css('transform', null);
        ScrollerEnter = 0;
        extraScrollEnter = 0;
        clearTimeout(leftOrRigthTimer1);
        clearInterval(leftOrRigthTimer2);
        document.getElementById('StartBackgroundScroller').style.transition = null;
        document.getElementById('StartBackgroundMain').style.transition = null;
        PreviouslyHoverElement = null;
    });
    function StartMouseWheelEvent(e){
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        StartMainOffset = Math.min(0, Math.max(Math.min(-(StartWidth - window.innerWidth), 0), Math.min(0, delta * window.innerWidth * 0.4 + StartMainOffset)));
        document.getElementById('StartBackgroundMain').style.left = StartMainOffset + 'px';
        if (This && SElementMouseDown == 2){
            This.style.left = e.clientX - SElementMouseDownXExtra - document.getElementById('StartBackgroundMain').offsetLeft + 'px';
            This.style.top = e.clientY - SElementMouseDownYExtra + 'px';
            SElementOnMove(This);
        }
        setStartScrollBar();
    }
    document.getElementById('StartBackground').addEventListener('mousewheel', StartMouseWheelEvent);
    document.getElementById('StartBackground').addEventListener('DOMMouseScroll', StartMouseWheelEvent);
    document.getElementById('StartBackgroundScroller').addEventListener('mousedown', function (e){
        ScrollerEnter = 1;
        extraScrollEnter = e.clientX - 30 - this.clientWidth / 2 - this.offsetLeft;
        document.getElementById('StartBackgroundScroller').style.transition = 'left 0s';
        document.getElementById('StartBackgroundMain').style.transition = 'left 0s';
    });
    window.addEventListener('mousemove', function (e){
        if (ScrollerEnter == 1){
            var l = Math.min(window.innerWidth - 60 - document.getElementById('StartBackgroundScroller').clientWidth, Math.max(0, (e.clientX - 30 - document.getElementById('StartBackgroundScroller').clientWidth / 2 - extraScrollEnter)));
            document.getElementById('StartBackgroundScroller').style.left = l + 'px';
            document.getElementById('StartBackgroundMain').style.left = Math.min(0, (-1 * (l / (document.getElementById('StartBackgroundScroller').parentElement.clientWidth - document.getElementById('StartBackgroundScroller').clientWidth)) * (StartWidth - window.innerWidth))) + 'px';
        }
    });
    document.getElementById('StartBackgroundScroller').parentElement.addEventListener('click', function (e){
        var l = Math.min(window.innerWidth - 60 - document.getElementById('StartBackgroundScroller').clientWidth, Math.max(0, (e.clientX - 30 - document.getElementById('StartBackgroundScroller').clientWidth / 2)));
        document.getElementById('StartBackgroundScroller').style.left = l + 'px';
        document.getElementById('StartBackgroundMain').style.left = Math.min(0, (-1 * (l / (document.getElementById('StartBackgroundScroller').parentElement.clientWidth - document.getElementById('StartBackgroundScroller').clientWidth)) * (StartWidth - window.innerWidth))) + 'px';
    });
    document.getElementById('StartScrollbar').getElementsByTagName('left')[0].addEventListener('mousedown', function (){
        StartMainOffset = Math.min(0, Math.max(Math.min(-(StartWidth - window.innerWidth), 0), Math.min(0, window.innerWidth * 0.4 + document.getElementById('StartBackgroundMain').offsetLeft)));
        document.getElementById('StartBackgroundMain').style.left = StartMainOffset + 'px';
        setStartScrollBar();
        leftOrRigthTimer1 = setTimeout(function (){
            document.getElementById('StartBackgroundScroller').style.transition = 'left 0s';
            document.getElementById('StartBackgroundMain').style.transition = 'left 0s';
            leftOrRigthTimer2 = setInterval(function (){
                StartMainOffset = Math.min(0, Math.max(Math.min(-(StartWidth - window.innerWidth), 0), Math.min(0, window.innerWidth * 0.05 + document.getElementById('StartBackgroundMain').offsetLeft)));
                document.getElementById('StartBackgroundMain').style.left = StartMainOffset + 'px';
                setStartScrollBar();
            }, 10);
        }, 700);
    });
    document.getElementById('StartScrollbar').getElementsByTagName('right')[0].addEventListener('mousedown', function (){
        StartMainOffset = Math.min(0, Math.max(Math.min(-(StartWidth - window.innerWidth), 0), Math.min(0, -1 * window.innerWidth * 0.4 + document.getElementById('StartBackgroundMain').offsetLeft)));
        document.getElementById('StartBackgroundMain').style.left = StartMainOffset + 'px';
        setStartScrollBar();
        leftOrRigthTimer1 = setTimeout(function (){
            document.getElementById('StartBackgroundScroller').style.transition = 'left 0s';
            document.getElementById('StartBackgroundMain').style.transition = 'left 0s';
            leftOrRigthTimer2 = setInterval(function (){
                StartMainOffset = Math.min(0, Math.max(Math.min(-(StartWidth - window.innerWidth), 0), Math.min(0, -1 * window.innerWidth * 0.05 + document.getElementById('StartBackgroundMain').offsetLeft)));
                document.getElementById('StartBackgroundMain').style.left = StartMainOffset + 'px';
                setStartScrollBar();
            }, 10);
        }, 700);
    });
    document.getElementById('StartScrollbar').getElementsByTagName('left')[0].addEventListener('mouseleave', function (){
        clearTimeout(leftOrRigthTimer1);
        clearInterval(leftOrRigthTimer2);
        document.getElementById('StartBackgroundScroller').style.transition = null;
        document.getElementById('StartBackgroundMain').style.transition = null;
    });
    document.getElementById('StartScrollbar').getElementsByTagName('right')[0].addEventListener('mouseleave', function (){
        clearTimeout(leftOrRigthTimer1);
        clearInterval(leftOrRigthTimer2);
        document.getElementById('StartBackgroundScroller').style.transition = null;
        document.getElementById('StartBackgroundMain').style.transition = null;
    });
    document.getElementById('StartScrollbar').getElementsByTagName('left')[0].addEventListener('mouseout', function (){
        clearTimeout(leftOrRigthTimer1);
        clearInterval(leftOrRigthTimer2);
        document.getElementById('StartBackgroundScroller').style.transition = null;
        document.getElementById('StartBackgroundMain').style.transition = null;
    });
    document.getElementById('StartScrollbar').getElementsByTagName('right')[0].addEventListener('mouseout', function (){
        clearTimeout(leftOrRigthTimer1);
        clearInterval(leftOrRigthTimer2);
        document.getElementById('StartBackgroundScroller').style.transition = null;
        document.getElementById('StartBackgroundMain').style.transition = null;
    });
    document.getElementById('StartToScrollLeft').addEventListener('mouseenter', function (e){
        document.getElementById('StartBackgroundScroller').style.transition = 'left 0s';
        document.getElementById('StartBackgroundMain').style.transition = 'left 0s';
        leftOrRigthTimer3 = setInterval(function (){
            StartMainOffset = Math.min(0, Math.max(Math.min(-(StartWidth - window.innerWidth), 0), Math.min(0, window.innerWidth * 0.015 + document.getElementById('StartBackgroundMain').offsetLeft)));
            document.getElementById('StartBackgroundMain').style.left = StartMainOffset + 'px';
            setStartScrollBar();
            if (This && SElementMouseDown == 2){
                This.style.left = e.clientX - SElementMouseDownXExtra - document.getElementById('StartBackgroundMain').offsetLeft + 'px';
                This.style.top = e.clientY - SElementMouseDownYExtra + 'px';
                SElementOnMove(This);
            }
        }, 10);
    });
    document.getElementById('StartToScrollRight').addEventListener('mouseenter', function (e){
        document.getElementById('StartBackgroundScroller').style.transition = 'left 0s';
        document.getElementById('StartBackgroundMain').style.transition = 'left 0s';
        leftOrRigthTimer3 = setInterval(function (){
            StartMainOffset = Math.min(0, Math.max(Math.min(-(StartWidth - window.innerWidth), 0), Math.min(0, -1 * window.innerWidth * 0.015 + document.getElementById('StartBackgroundMain').offsetLeft)));
            document.getElementById('StartBackgroundMain').style.left = StartMainOffset + 'px';
            setStartScrollBar();
            if (This && SElementMouseDown == 2){
                This.style.left = e.clientX - SElementMouseDownXExtra - document.getElementById('StartBackgroundMain').offsetLeft + 'px';
                This.style.top = e.clientY - SElementMouseDownYExtra + 'px';
                SElementOnMove(This);
            }
        }, 10);
    });
    document.getElementById('StartToScrollLeft').addEventListener('mouseleave', function (){
        clearInterval(leftOrRigthTimer3);
        document.getElementById('StartBackgroundScroller').style.transition = null;
        document.getElementById('StartBackgroundMain').style.transition = null;
    });
    document.getElementById('StartToScrollLeft').addEventListener('mouseout', function (){
        clearInterval(leftOrRigthTimer3);
        document.getElementById('StartBackgroundScroller').style.transition = null;
        document.getElementById('StartBackgroundMain').style.transition = null;
    });
    document.getElementById('StartToScrollRight').addEventListener('mouseleave', function (){
        clearInterval(leftOrRigthTimer3);
        document.getElementById('StartBackgroundScroller').style.transition = null;
        document.getElementById('StartBackgroundMain').style.transition = null;
    });
    document.getElementById('StartToScrollRight').addEventListener('mouseout', function (){
        clearInterval(leftOrRigthTimer3);
        document.getElementById('StartBackgroundScroller').style.transition = null;
        document.getElementById('StartBackgroundMain').style.transition = null;
    });
    document.getElementById('leftmenuSearchTop').addEventListener('blur', function (){
        isSearchfoucus = 0;
    });
    {
        SElementPinToStartWithSize('mail', 'wide');
        SElementPinToStartWithSize('skype', 'medium');
        SElementPinToStartWithSize('people', 'medium');
        SElementPinToStartWithSize('desktop', 'wide');
        SElementPinToStartWithSize('reading list', 'medium');
        SElementPinToStartWithSize('sky drive', 'medium');
        SElementPinToStartWithSize('calendar', 'wide');
        SElementPinToStartWithSize('finance', 'wide');
        SElementPinToStartWithSize('weather', 'large');
        SElementPinToStartWithSize('photo', 'medium');
        SElementPinToStartWithSize('video', 'small');
        SElementPinToStartWithSize('music', 'small');
        SElementPinToStartWithSize('games', 'small');
        SElementPinToStartWithSize('camera', 'small');
        SElementPinToStartWithSize('internet explorer', 'medium');
        SElementPinToStartWithSize('help and tips', 'medium');
        SElementPinToStartWithSize('news', 'wide');
        SElementPinToStartWithSize('sports', 'wide');
        SElementPinToStartWithSize('store', 'large', true);
        SElementPinToStartWithSize('food and drink', 'wide');
        SElementPinToStartWithSize('health and fitness', 'medium');
        SElementPinToStartWithSize('maps', 'medium');
    }
}
window.addEventListener('resize', function (){
    if (document.getElementById('StartBackground').style.marginTop != ''){
        document.getElementById('StartBackground').style.marginTop = '-' + document.getElementById('StartBackground').clientHeight + 'px';
    }
    setSElementPositions();
    document.getElementById('StartBackgroundMain').style.left = '0px';
    StartMainOffset = 0;
    setStartScrollBar();
});
