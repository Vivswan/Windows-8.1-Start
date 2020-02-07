'use strict';

function background_LogIn_JS(){
    var changeOfBackgroundLogin,
        backgroundColorLoginIndex = 2,
        backgroundColorLogin = ['#da0025', '#f01800', '#ff4300', '#fd6c05', '#feab07', '#ffc91e', '#93c900', '#54c300', '#00ab62', '#00c3c4', '#009bf0', '#006afe', '#3f00dd', '#9025ff', '#ff3ec2', '#fe0b6b'];
    document.getElementById('logInForm').submit.addEventListener('click', toMainStartScreen);
    document.getElementById('logInForm').firstName.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            toMainStartScreen();
        }
    });
    document.getElementById('logInForm').lastName.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            toMainStartScreen();
        }
    });
    document.getElementById('logIn').style.background = backgroundColorLogin[backgroundColorLoginIndex];
    backgroundColorLoginIndex++;
    changeOfBackgroundLogin = setInterval(function (){
        if (!document.getElementById('logIn')){
            clearInterval(changeOfBackgroundLogin);
            return;
        }
        if (backgroundColorLoginIndex >= backgroundColorLogin.length){
            backgroundColorLoginIndex = 0;
        }
        document.getElementById('logIn').style.background = backgroundColorLogin[backgroundColorLoginIndex];
        backgroundColorLoginIndex++;
    }, 2000);
}

function toMainStartScreen() {
    if (document.getElementById('logInForm').firstName.value !== ''){
        if (/^[a-z|0-9 ]*$/i.test(document.getElementById('logInForm').firstName.value) && /^[a-z|0-9 ]*$/i.test(document.getElementById('logInForm').lastName.value)){
            document.getElementById('UserNameOfCurrentUser').innerHTML = document.getElementById('logInForm').lastName.value !== '' ? document.getElementById('logInForm').firstName.value + ' ' + document.getElementById('logInForm').lastName.value : document.getElementById('logInForm').firstName.value;
            document.getElementById('logIn').style.top = '-' + window.innerHeight + 'px';
            setTimeout(function (){
                document.getElementById('logIn').parentElement.removeChild(document.getElementById('logIn'));
                WindowLevel = 0;
                parallel('#message5').css({
                    'top':'50%',
                    'left':'50%',
                    'width':'0',
                    'height':'0',
                    'borderRadius':Math.sqrt(window.innerHeight*window.innerHeight + window.innerWidth*window.innerWidth) + 'px'
                });
                setTimeout(function(){
                    document.getElementById('message5').parentElement.removeChild(document.getElementById('message5'));
                },3000);
            }, 1010);
        } else {
            document.getElementById('errorEmpty').style.opacity = '0';
            document.getElementById('errorSymbol').style.opacity = '1';
        }
    } else {
        document.getElementById('errorEmpty').style.opacity = '1';
        document.getElementById('errorSymbol').style.opacity = '0';
    }
}

function loading() {
    parallel('#loading1 section,#loading2 section').forEach(function(i){
        if(i.style.opacity === '0'){
            i.style.opacity = '1'
        }else{
            i.style.opacity = '0'
        }
    });
    // document.getElementById('M3T').style.marginBottom = '-'+(document.getElementById('M3T').clientHeight/2)+'px';
    // document.getElementById('M4T').style.marginTop = '-'+(document.getElementById('M4T').clientHeight/2)+'px';
    // setTimeout(function(){document.getElementById('message3').style.display = document.getElementById('message4').style.display = 'none';},10);
    parallel('#loading1,#loading2').addEvent('click',function(){
        document.getElementById('loading1').style.left = '-50%';
        document.getElementById('loading2').style.right = '-50%';
        setTimeout(function(){
            // document.getElementById('message1').style.left = '0';
            // document.getElementById('message2').style.right = '0';
            // document.getElementById('message1').style.transform = 'rotate(0deg)';
            // document.getElementById('message2').style.transform = 'rotate(0deg)';
            // document.getElementById('M1T').style.top = (document.getElementById('message1').clientHeight - document.getElementById('M1T').clientHeight)/2+'px';
            // document.getElementById('M2T').style.top = (document.getElementById('message2').clientHeight - document.getElementById('M2T').clientHeight)/2+'px';
            setTimeout(function(){
                // document.getElementById('message1').style.display = document.getElementById('message2').style.display = 'none';
                // document.getElementById('message3').style.display = document.getElementById('message4').style.display = null;
                setTimeout(function(){
                    // document.getElementById('message3').style.top = '-200%';
                    // document.getElementById('message4').style.bottom = '-200%';
                    // document.getElementById('message3').style.transform = 'rotate(90deg)';
                    // document.getElementById('message4').style.transform = 'rotate(90deg)';
                    setTimeout(function(){
                        document.getElementById('loading1').parentElement.removeChild(document.getElementById('loading1'));
                        document.getElementById('loading2').parentElement.removeChild(document.getElementById('loading2'));
                        // document.getElementById('message1').parentElement.removeChild(document.getElementById('message1'));
                        // document.getElementById('message2').parentElement.removeChild(document.getElementById('message2'));
                        // document.getElementById('message3').parentElement.removeChild(document.getElementById('message3'));
                        // document.getElementById('message4').parentElement.removeChild(document.getElementById('message4'));
                    },5000);
                },1500);
            },2010);
        },1200);
    },false);
}