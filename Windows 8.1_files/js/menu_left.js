'use strict';

function leftStartJS(){
    var leftTopStartOppener = parallel('leftTopStartOppener'),
        leftBottemStartOppener = parallel('leftBottemStartOppener'),
        leftStart = parallel('leftStart'),
        leftStartLI = parallel('leftStart li'),
        dateAndTime = parallel('dateAndTime'),
        startLogo = document.getElementsByClassName('startLogoLeftStart'),
        backgroundImages = document.getElementById('PersonalizebackgroundImages').children,
        isOpenLeftStart = 0,
        timerToOpenLeftStart = -1,
        timerToIntantOpenLeftStart = 0,
        currentBackgroundColor = 0,
        currentAccentColor = 0,
        day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        arrayOfBackgroundColor = [
            ['#071111', '#1f2627', '#353c3d', '#4b5354', '#636b6c', '#7c8485', '#0a1011', '#1e2223', '#323637', '#454b4c', '#5c6162', '#727878', '#000000', '#1d1d1d', '#252525', '#3c3c3c', '#525252', '#6b6b6b'],
            ['#1b1918', '#363432', '#474342', '#575451', '#696663', '#7b7875', '#0e0e0c', '#1e1e1d', '#312f2e', '#434241', '#565554', '#6b6b6b', '#000000', '#1d1d1d', '#252525', '#3c3c3c', '#525252', '#6a6968'],
            ['#6e0012', '#8d0017', '#ad001d', '#cf0023', '#f10025', '#ff2c37', '#54001d', '#710025', '#8e0032', '#ad2a3f', '#cd484a', '#eb6360', '#43001c', '#5e1129', '#792a38', '#964449', '#b45d59', '#d17670'],
            ['#4f0006', '#6d0004', '#8c0001', '#ac0000', '#cd0000', '#ef0000', '#380003', '#510000', '#6e0000', '#8b1202', '#a9331a', '#c84e31', '#290002', '#3f0200', '#591b0b', '#733220', '#8f4a37', '#ac634e'],
            ['#660003', '#850000', '#a40000', '#c50000', '#e61f00', '#ff4608', '#500000', '#6c0000', '#891700', '#a73511', '#c65129', '#e56b41', '#3c0600', '#561e0a', '#703420', '#8c4c36', '#a8654d', '#c57f65'],
            ['#740000', '#920000', '#b22600', '#d34500', '#f26000', '#ff7c1c', '#5f1300', '#7b2c00', '#984512', '#b65e2b', '#d37742', '#f2925c', '#4f2307', '#69391e', '#845134', '#a06a4c', '#bc8363', '#d99e7d'],
            ['#713400', '#8f4c00', '#ad6500', '#cb7e00', '#eb9900', '#ffb317', '#4d2600', '#683b00', '#835300', '#a06c13', '#bc852f', '#da9f49', '#472900', '#5f3f0b', '#7a5723', '#96703b', '#b18952', '#cea36c'],
            ['#653d00', '#825400', '#a06d00', '#bd8600', '#dca000', '#ffbf00', '#452a00', '#5f4000', '#7a5800', '#977008', '#b38928', '#d0a444', '#412c00', '#5a4206', '#745a20', '#8f7338', '#aa8c50', '#c7a669'],
            ['#002800', '#003c00', '#005500', '#1f6e00', '#418700', '#5ea200', '#002300', '#173800', '#304f00', '#496700', '#638118', '#7d9b34', '#122000', '#273503', '#3d4b1b', '#556332', '#6f7d49', '#889661'],
            ['#003f00', '#005700', '#007200', '#008c00', '#30a700', '#54c300', '#003a00', '#1d5100', '#386a00', '#52841b', '#6c9e36', '#87ba51', '#1f3605', '#354d1c', '#4d6533', '#667f4b', '#7f9863', '#9ab47c'],
            ['#002900', '#004117', '#00592c', '#007443', '#00905b', '#00ab60', '#00270e', '#003c23', '#005338', '#006d4f', '#248768', '#44a177', '#002215', '#0a3829', '#234e3f', '#3b6756', '#54816f', '#6d9b83'],
            ['#002a2f', '#003f45', '#00585c', '#007275', '#008d8f', '#00a8a9', '#002526', '#003a3c', '#005252', '#006b6b', '#258584', '#449f9e', '#002122', '#0a3736', '#244d4d', '#3c6665', '#557f7e', '#6e9998'],
            ['#002568', '#003981', '#00509b', '#0068b7', '#0082d4', '#009bf0', '#002149', '#003661', '#004c7a', '#1e6494', '#407eaf', '#5c97ca', '#001f36', '#12334d', '#2b4964', '#44627e', '#5e7b98', '#7794b3'],
            ['#000079', '#001b95', '#002db0', '#0041cb', '#0058e9', '#006aff', '#00004a', '#001963', '#002d7c', '#234296', '#435ab2', '#596cc7', '#00002e', '#091a45', '#232e5c', '#3b4475', '#555b8f', '#686ea3'],
            ['#00006f', '#000084', '#1e0098', '#3b0dad', '#5424c3', '#6c39d9', '#0f003e', '#180052', '#2f1763', '#422776', '#56398a', '#6b4b9f', '#100025', '#1d1035', '#2e1f47', '#3f2f59', '#52416c', '#655380'],
            ['#2a0075', '#490090', '#6700ab', '#8500c7', '#a400e4', '#bf00ff', '#260048', '#3d0060', '#57007a', '#711993', '#8d37af', '#a74fc8', '#20002d', '#320543', '#491d5b', '#623373', '#7c4c8e', '#9462a6'],
            ['#7f0023', '#9e0038', '#bd004d', '#dd0065', '#ff007f', '#ff3e98', '#5f0023', '#7c0039', '#98204f', '#b53e67', '#d45b81', '#f1759a', '#4a0c24', '#64263a', '#7e3d50', '#995668', '#b77083', '#d1899b'],
            ['#6f0036', '#8d004d', '#ab0064', '#ca007e', '#ea0098', '#ff21b3', '#55002d', '#700043', '#8c005a', '#a92673', '#c6468d', '#e461a7', '#430027', '#5d0d3d', '#762953', '#92426c', '#ae5c86', '#ca75a0']
        ],
        arrayOfAccentColor = [
            ['#2c3030', '#414646', '#595e5e', '#727778', '#8c9091', '#a7abac', '#303030', '#464646', '#5e5e5e', '#777777', '#919191', '#acacac'],
            ['#504e4d', '#636260', '#787674', '#8d8b8b', '#a2a1a0', '#b9b8b7', '#303030', '#464646', '#5e5e5e', '#777777', '#919191', '#acacac'],
            ['#7d0016', '#9e0019', '#be0021', '#e00024', '#ff002a', '#ff4143', '#650021', '#83002a', '#a10d38', '#c13442', '#de4f4f', '#ff6d69'],
            ['#7c0003', '#9c0000', '#bc0000', '#de0000', '#ff1700', '#ff4620', '#620000', '#800000', '#9e1d08', '#bd3c20', '#db5737', '#fb734f'],
            ['#940000', '#b50000', '#d50000', '#f73400', '#ff551a', '#ff7436', '#7e0000', '#9d2100', '#bb3e17', '#da5a2f', '#f97447', '#ff9060'],
            ['#a21200', '#c23600', '#e25200', '#ff6b00', '#ff892b', '#ffa648', '#731900', '#8f3300', '#ad4c10', '#cb652a', '#e67d40', '#ff9a5b'],
            ['#804000', '#9e5900', '#bc7100', '#db8b00', '#ffaa00', '#ffc12c', '#5d2f00', '#784500', '#955e00', '#b1760a', '#cf902c', '#edaa47'],
            ['#734800', '#916000', '#ae7900', '#cc9300', '#eaad00', '#ffc91a', '#543500', '#6f4b00', '#8b6300', '#a77b00', '#c49624', '#e1b040'],
            ['#004900', '#056100', '#317b00', '#4f9400', '#6db000', '#8acb00', '#1b4500', '#365c00', '#507600', '#6a8f00', '#85aa29', '#a0c545'],
            ['#004c00', '#006400', '#007f00', '#169900', '#43b500', '#63d100', '#004800', '#1c5f00', '#3a7900', '#559307', '#70ae2d', '#8bc949'],
            ['#004d22', '#006737', '#00824f', '#009d54', '#00ba57', '#00d55b', '#00492b', '#006241', '#007c59', '#109665', '#3eb271', '#58cc7d'],
            ['#004c51', '#006569', '#007f82', '#009a9c', '#00b6b7', '#00d1d2', '#004849', '#006061', '#007a7a', '#0a9393', '#3bafae', '#5acac9'],
            ['#00458f', '#005ca9', '#0075c6', '#008ee1', '#00abff', '#41c3ff', '#004275', '#00598e', '#1972aa', '#3f8bc4', '#61a7e3', '#7bc0fd'],
            ['#0023a1', '#0037be', '#004dda', '#0064f8', '#3b7cff', '#6496ff', '#00227a', '#003895', '#264eb0', '#4966cc', '#667ee8', '#8498ff'],
            ['#2e00a3', '#4617b4', '#602fce', '#7742e4', '#8e56fb', '#a46aff', '#391b79', '#4b2a89', '#613fa1', '#7651b6', '#8b64cc', '#a077e1'],
            ['#58009d', '#6800b3', '#9400d5', '#a528ed', '#c046ff', '#df64ff', '#4d0077', '#690092', '#841bad', '#a13bc9', '#bd56e5', '#db72ff'],
            ['#ad0042', '#cd0059', '#ee0072', '#ff278b', '#ff52a5', '#ff72c0', '#910043', '#af205a', '#ce4273', '#eb5e8c', '#ff7aa7', '#ff96c1'],
            ['#bb0071', '#da008b', '#f900a5', '#ff3ac1', '#ff5fdc', '#ff81f9', '#860051', '#a20069', '#c02883', '#dd489c', '#fc66b8', '#ff82d3']
        ],
        mouseOverOnColor = 0,
        tickElementOfBackgroundImages = document.createElement('section'),
        tickElementOfBackgroundColor = document.createElement('section'),
        tickElementOfAccentColor = document.createElement('section');
    tickElementOfBackgroundImages.id = 'tickElementOfBackgroundImages';
    tickElementOfBackgroundImages.innerHTML = '';
    tickElementOfBackgroundColor.id = 'tickElementOfBackgroundColor';
    tickElementOfBackgroundColor.innerHTML = '<section class="left"></section><section class="right"></section>';
    tickElementOfAccentColor.id = 'tickElementOfAccentColor';
    tickElementOfAccentColor.innerHTML = '<section class="left"></section><section class="right"></section>';
    closeleftStart();
    leftTopStartOppener.addEvent(['mouseenter', 'mouseover'], function (){
        if (WindowedMouse == 0){
            if (timerToIntantOpenLeftStart == 1){
                launch2leftStart()
            } else if (timerToOpenLeftStart == -1){
                timerToOpenLeftStart = setTimeout(function (){
                    timerToOpenLeftStart = -1;
                    launch1leftStart()
                }, 1000);
            }
            timerToIntantOpenLeftStart = 2;
            setTimeout(function (){
                timerToIntantOpenLeftStart = 0;
            }, 500);
        }
    });
    leftBottemStartOppener.addEvent(['mouseenter', 'mouseover'], function (){
        if (WindowedMouse == 0){
            if (timerToIntantOpenLeftStart == 2){
                launch2leftStart()
            }
            if (timerToOpenLeftStart == -1){
                timerToOpenLeftStart = setTimeout(function (){
                    timerToOpenLeftStart = -1;
                    launch1leftStart()
                }, 1000);
                timerToIntantOpenLeftStart = 1;
                setTimeout(function (){
                    timerToIntantOpenLeftStart = 0;
                }, 500);
            }
        }
    });
    leftTopStartOppener.addEvent(['mouseleave', 'mouseout'], function (){
        clearTimeout(timerToOpenLeftStart);
        timerToOpenLeftStart = -1;
    });
    leftBottemStartOppener.addEvent(['mouseleave', 'mouseout'], function (){
        clearTimeout(timerToOpenLeftStart);
        timerToOpenLeftStart = -1;
    });
    leftStartLI.addEvent(['mouseenter', 'mouseover'], function (){
        if (isOpenLeftStart == 0){
            launch2leftStart()
        }
    });
    leftStart.addEvent('mouseleave', closeleftStart);
    leftStartLI.addEvent('click', function (){
        dateAndTime.css({
            opacity: '0'
        });
        setTimeout(function (){
            dateAndTime.css({
                display: 'none'
            });
        }, 305);
        leftStart.css({
            right: (-1 * (leftStart.width())) + 'px'
        });
        setTimeout(function (){
            leftStart.css({
                background: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)',
                opacity: '1'
            });
            isOpenLeftStart = 0;
        }, 305);
    });
    parallel('.startLeftStart').addEvent('mouseover', function (){
        startLogo[0].style.display = 'none';
        startLogo[1].style.display = 'none';
        startLogo[2].style.display = null;
    });
    parallel('.startLeftStart').addEvent(['mouseleave', 'mouseout'], function (){
        startLogo[0].style.display = 'none';
        startLogo[1].style.display = null;
        startLogo[2].style.display = 'none';
    });
    function launch1leftStart(){
        startLogo[0].style.display = null;
        startLogo[1].style.display = 'none';
        startLogo[2].style.display = 'none';
        leftStart.css({
            right: '0px',
            color: 'rgba(0,0,0,0)'
        });
    }
    function launch2leftStart(){
        dateAndTime.css({
            display: null
        });
        setTimeout(function (){
            dateAndTime.css({
                opacity: '1'
            });
            startLogo[0].style.display = 'none';
            startLogo[1].style.display = null;
            startLogo[2].style.display = 'none';
        }, 5);
        leftStart.css({
            right: '0px',
            background: '#111111',
            color: '#a0a0a0'
        });
        isOpenLeftStart = 1;
    }
    function closeleftStart(){
        dateAndTime.css({
            opacity: '0'
        });
        setTimeout(function (){
            dateAndTime.css({
                display: 'none'
            });
        }, 305);
        leftStart.css({
            opacity: '0'
        });
        setTimeout(function (){
            leftStart.css({
                right: (-1 * (leftStart.width())) + 'px',
                background: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
            });
            setTimeout(function (){
                leftStart.css({
                    opacity: '1'
                });
                isOpenLeftStart = 0;
            }, 305);
        }, 305);
    }
    setInterval(function (){
        var d = new Date();
        document.getElementById('hourDateAndTime').innerHTML = d.getHours() + '';
        document.getElementById('minDateAndTime').innerHTML = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes() + '';
        document.getElementById('dayDateAndTime').innerHTML = day[d.getDay()] + '';
        document.getElementById('monthAndDateDateAndTime').innerHTML = month[d.getMonth()] + ' ' + d.getDate();
        document.getElementById('TimeLockScreen').innerHTML = d.getHours() + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes() + '');
        document.getElementById('DateLockScreen').innerHTML = day[d.getDay()] + ', ' + month[d.getMonth()] + ' ' + d.getDate();
    }, 1000);
    parallel('.leftmenu').add('.subleftmenu').css({
        right: '-346px'
    });
    parallel('.leftmenu').add('.subleftmenu').add('leftStart').add('background.Start header > user > section.search').addEventToElse('click', function (){
        parallel('.leftmenu').add('.subleftmenu').css({
            right: '-346px'
        });
    });
    parallel('.leftmenu li').addEvent('click', function (){
        parallel('.leftmenu').css({
            right: '-346px'
        })
    });
    parallel('.searchLeftStart').addEvent('click', function (){
        document.getElementsByTagName('Search')[0].style.right = '0px';
        document.getElementById('leftmenuSearchTop').value = '';
    });
    parallel('.shareLeftStart').addEvent('click', function (){
        document.getElementsByTagName('Share')[0].style.right = '0px';
    });
    parallel('.devicesLeftStart').addEvent('click', function (){
        document.getElementsByTagName('Devices')[0].style.right = '0px';
    });
    parallel('.settingsLeftStart').addEvent('click', function (){
        document.getElementsByTagName('Settings')[0].style.right = '0px';
    });
    parallel('.PersonalizeLeftStart').addEvent('click', function (){
        document.getElementsByTagName('Personalize')[0].style.right = '0px';
    });
    parallel('.HelpLeftStart').addEvent('click', function (){
        document.getElementsByTagName('Help')[0].style.right = '0px';
    });
    parallel('.CreditsLeftStart').addEvent('click', function (){
        document.getElementsByTagName('Credits')[0].style.right = '0px';
    });
    parallel('.backgroundImages li').addEvent('click', function (){
        timerBackgroundWallpaper = 0;
        if (Number(this.getAttribute('number')) < 19){
            document.getElementById('StartBackground').style.background = 'url("Windows 8.1_files/images/start_screen/' + this.getAttribute('number') + '.jpg") 50% 50% / cover no-repeat';
            document.getElementById('StartBackground').style.backgroundSize = 'cover';
        } else if (Number(this.getAttribute('number')) == 19){
            document.getElementById('StartBackground').style.background = null;
        } else if (Number(this.getAttribute('number')) == 20){
            document.getElementById('StartBackground').style.background = 'url("Windows 8.1_files/images/wallpapers/' + (indexBackgroundWallpaper == 0 ? 13 : (indexBackgroundWallpaper - 1)) + '.jpg") 50% 50% / cover no-repeat';
            timerBackgroundWallpaper = 1;
        }
        this.appendChild(tickElementOfBackgroundImages);
    });
    parallel('.backgroundColor1 li').addEvent('click', function (){
        BackgroundColor = this.style.backgroundColor;
        this.appendChild(tickElementOfBackgroundColor);
        changeCss();
    });
    parallel('.AccentColor1 li').addEvent('click', function (){
        AccentColor = this.style.backgroundColor;
        this.appendChild(tickElementOfAccentColor);
        changeCss();
    });
    parallel('.backgroundColor2 li').addEvent('click', function (){
        var a = document.getElementById('PersonalizebackgroundColor1').children;
        this.parentElement.children[currentBackgroundColor].style.height = null;
        this.parentElement.children[currentBackgroundColor].style.marginLeft = null;
        this.parentElement.children[currentBackgroundColor].style.marginRight = null;
        currentBackgroundColor = Number(this.getAttribute('number'));
        this.style.height = '30px';
        this.style.marginLeft = this.style.marginRight = "3px";
        for (var i = 0; i < 18; i++){
            a[i].style.background = arrayOfBackgroundColor[currentBackgroundColor][i];
        }
        if (document.getElementById('tickElementOfBackgroundColor')){
            document.getElementById('tickElementOfBackgroundColor').parentElement.click();
        }
    });
    parallel('.AccentColor2 li').addEvent('click', function (){
        var a = document.getElementById('PersonalizeAccentColor1').children;
        this.parentElement.children[currentAccentColor].style.height = null;
        this.parentElement.children[currentAccentColor].style.marginLeft = null;
        this.parentElement.children[currentAccentColor].style.marginRight = null;
        currentAccentColor = Number(this.getAttribute('number'));
        this.style.height = '30px';
        this.style.marginLeft = this.style.marginRight = "3px";
        for (var i = 0; i < 12; i++){
            a[i].style.background = arrayOfAccentColor[currentAccentColor][i];
        }
        if (document.getElementById('tickElementOfAccentColor')){
            document.getElementById('tickElementOfAccentColor').parentElement.click();
        }
    });
    parallel('.backgroundColor2 li').addEvent('mousedown', function (){
        mouseOverOnColor = 1;
        this.click()
    });
    parallel('.AccentColor2 li').addEvent('mousedown', function (){
        mouseOverOnColor = 2;
        this.click()
    });
    window.addEventListener('mouseup', function (){
        if (mouseOverOnColor == 1){
            document.getElementById('PersonalizebackgroundColor2').children[currentBackgroundColor].click();
        }
        if (mouseOverOnColor == 2){
            document.getElementById('PersonalizeAccentColor2').children[currentAccentColor].click();
        }
        mouseOverOnColor = 0;
    });
    parallel('.backgroundColor2 li').addEvent('mouseover', function (){
        if (mouseOverOnColor == 1){
            this.click()
        }
    });
    parallel('.AccentColor2 li').addEvent('mouseover', function (){
        if (mouseOverOnColor == 2){
            this.click()
        }
    });
    backgroundImages[0].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[14].click();
        document.getElementById('PersonalizeAccentColor2').children[14].click();
        document.getElementById('PersonalizebackgroundColor1').children[7].click();
        document.getElementById('PersonalizeAccentColor1').children[1].click();
    });
    backgroundImages[1].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[13].click();
        document.getElementById('PersonalizeAccentColor2').children[12].click();
        document.getElementById('PersonalizebackgroundColor1').children[13].click();
        document.getElementById('PersonalizeAccentColor1').children[2].click();
    });
    backgroundImages[2].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[15].click();
        document.getElementById('PersonalizeAccentColor2').children[15].click();
        document.getElementById('PersonalizebackgroundColor1').children[6].click();
        document.getElementById('PersonalizeAccentColor1').children[1].click();
    });
    backgroundImages[3].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[11].click();
        document.getElementById('PersonalizeAccentColor2').children[11].click();
        document.getElementById('PersonalizebackgroundColor1').children[1].click();
        document.getElementById('PersonalizeAccentColor1').children[2].click();
    });
    backgroundImages[4].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[3].click();
        document.getElementById('PersonalizeAccentColor2').children[3].click();
        document.getElementById('PersonalizebackgroundColor1').children[6].click();
        document.getElementById('PersonalizeAccentColor1').children[8].click();
    });
    backgroundImages[5].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[4].click();
        document.getElementById('PersonalizeAccentColor2').children[4].click();
        document.getElementById('PersonalizebackgroundColor1').children[1].click();
        document.getElementById('PersonalizeAccentColor1').children[3].click();
    });
    backgroundImages[6].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[16].click();
        document.getElementById('PersonalizeAccentColor2').children[17].click();
        document.getElementById('PersonalizebackgroundColor1').children[12].click();
        document.getElementById('PersonalizeAccentColor1').children[1].click();
    });
    backgroundImages[7].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[17].click();
        document.getElementById('PersonalizeAccentColor2').children[17].click();
        document.getElementById('PersonalizebackgroundColor1').children[8].click();
        document.getElementById('PersonalizeAccentColor1').children[2].click();
    });
    backgroundImages[8].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[5].click();
        document.getElementById('PersonalizeAccentColor2').children[5].click();
        document.getElementById('PersonalizebackgroundColor1').children[9].click();
        document.getElementById('PersonalizeAccentColor1').children[4].click();
    });
    backgroundImages[9].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[7].click();
        document.getElementById('PersonalizeAccentColor2').children[7].click();
        document.getElementById('PersonalizebackgroundColor1').children[3].click();
        document.getElementById('PersonalizeAccentColor1').children[4].click();
    });
    backgroundImages[10].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[8].click();
        document.getElementById('PersonalizeAccentColor2').children[9].click();
        document.getElementById('PersonalizebackgroundColor1').children[1].click();
        document.getElementById('PersonalizeAccentColor1').children[3].click();
    });
    backgroundImages[11].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[8].click();
        document.getElementById('PersonalizeAccentColor2').children[8].click();
        document.getElementById('PersonalizebackgroundColor1').children[11].click();
        document.getElementById('PersonalizeAccentColor1').children[5].click();
    });
    backgroundImages[12].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[11].click();
        document.getElementById('PersonalizeAccentColor2').children[11].click();
        document.getElementById('PersonalizebackgroundColor1').children[3].click();
        document.getElementById('PersonalizeAccentColor1').children[5].click();
    });
    backgroundImages[13].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[12].click();
        document.getElementById('PersonalizeAccentColor2').children[12].click();
        document.getElementById('PersonalizebackgroundColor1').children[1].click();
        document.getElementById('PersonalizeAccentColor1').children[4].click();
    });
    backgroundImages[14].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[12].click();
        document.getElementById('PersonalizeAccentColor2').children[12].click();
        document.getElementById('PersonalizebackgroundColor1').children[5].click();
        document.getElementById('PersonalizeAccentColor1').children[5].click();
    });
    backgroundImages[15].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[15].click();
        document.getElementById('PersonalizeAccentColor2').children[15].click();
        document.getElementById('PersonalizebackgroundColor1').children[1].click();
        document.getElementById('PersonalizeAccentColor1').children[3].click();
    });
    backgroundImages[16].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[1].click();
        document.getElementById('PersonalizeAccentColor2').children[2].click();
        document.getElementById('PersonalizebackgroundColor1').children[3].click();
        document.getElementById('PersonalizeAccentColor1').children[8].click();
    });
    backgroundImages[17].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[0].click();
        document.getElementById('PersonalizeAccentColor2').children[11].click();
        document.getElementById('PersonalizebackgroundColor1').children[16].click();
        document.getElementById('PersonalizeAccentColor1').children[3].click();
    });
    backgroundImages[18].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[14].click();
        document.getElementById('PersonalizeAccentColor2').children[14].click();
        document.getElementById('PersonalizebackgroundColor1').children[7].click();
        document.getElementById('PersonalizeAccentColor1').children[1].click();
    });
    backgroundImages[19].addEventListener('click', function (){
        document.getElementById('PersonalizebackgroundColor2').children[0].click();
        document.getElementById('PersonalizeAccentColor2').children[0].click();
        document.getElementById('PersonalizebackgroundColor1').children[15].click();
        document.getElementById('PersonalizeAccentColor1').children[9].click();
    });
    backgroundImages[0].children[0].click();
}

function searchSubmit(){
    if (document.getElementById('leftmenuSearchTop').value == document.getElementById('UserNameOfCurrentUser').innerHTML){
        document.getElementById('ActivatedWindows').parentElement.removeChild(document.getElementById('ActivatedWindows'));
        document.getElementById('leftmenuSearchTop').value = 'Windows Activated';
    } else if (document.getElementById('leftmenuSearchTop').value != ''){
        window.location.assign('http://www.google.com/search?q=' + encodeURIComponent(document.getElementById('leftmenuSearchTop').value));
    }
}
