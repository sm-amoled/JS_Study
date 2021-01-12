// 캐릭터 생성자
function Character(info) {
    this.mainElement = document.createElement('div');
    this.mainElement.classList.add('character');
    this.mainElement.innerHTML = "" + `
            <div class="character" data-direction="backward"> 
                <div class="character-face-con character-head">
                    <div class="character-face character-head-face face-front"></div>
                    <div class="character-face character-head-face face-back"></div>
                </div>
                <div class="character-face-con character-torso">
                    <div class="character-face character-torso-face face-front"></div>
                    <div class="character-face character-torso-face face-back"></div>
                </div>
                <div class="character-face-con character-arm character-arm-right">
                    <div class="character-face character-arm-face face-front"></div>
                    <div class="character-face character-arm-face face-back"></div>
                </div>
                <div class="character-face-con character-arm character-arm-left">
                    <div class="character-face character-arm-face face-front"></div>
                    <div class="character-face character-arm-face face-back"></div>
                </div>
                <div class="character-face-con character-leg character-leg-right">
                    <div class="character-face character-leg-face face-front"></div>
                    <div class="character-face character-leg-face face-back"></div>
                </div>
                <div class="character-face-con character-leg character-leg-left">
                    <div class="character-face character-leg-face face-front"></div>
                    <div class="character-face character-leg-face face-back"></div>
                </div>
            </div>`; 
            
    document.querySelector('.stage').appendChild(this.mainElement);
    this.mainElement.style.left = (info.xPos / window.innerWidth * 100) + '%';
    
    //마지막 스크롤 위치
    this.lastScrollTop = 0;
    this.speed = info.speed;
    this.xPos = (info.xPos / window.innerWidth * 100);
    this.direction = 0;
    this.rafId;
    this.runningState = false;
    this.init();
};

Character.prototype = {
// Prototype 객체 재정의
    constructor: Character,
    init: function() {  
        const self = this;
        
        window.addEventListener('keydown', function(e) {

            if(self.runningState) {
                return;
            }

            if(e.keyCode == 37) {
                self.mainElement.setAttribute('data-direction', 'left');
                self.direction = 'left';
                self.mainElement.classList.add('running');
                self.runningState = true;
                self.run(self);
            }
            else if (e.keyCode == 39) {
                self.mainElement.setAttribute('data-direction', 'right');
                self.direction = 'right';
                self.mainElement.classList.add('running');
                self.runningState = true;
                self.run(self);    
            }});
        window.addEventListener('keyup', function() {
            self.mainElement.classList.remove('running');
            self.runningState = false;
        });

        window.addEventListener('scroll', function () {
            clearTimeout(self.scrollState);
            
            // scrollState에 값이 없었을 때 한 번 실행!
            if(!self.scrollState) {
                self.mainElement.classList.add('running');
            }
            
            self.scrollState = setTimeout(function() {
                self.scrollState = false;
                self.mainElement.classList.remove('running'); 
            }, 100);
            
            if(self.lastScrollTop < window.pageYOffset) {
                self.direction = 'forward';
                self.mainElement.setAttribute('data-direction', 'forward');
            } 
            else if (self.lastScrollTop > window.pageYOffset) {
                self.direction = 'backward';
                self.mainElement.setAttribute('data-direction', 'backward');

            }
        
            self.lastScrollTop = pageYOffset;
        });
    },
    run: function(self) {
            if(!self.runningState) {
                cancleAnimationFrame(self.rafId);
                return;
            }
        
            if(self.direction == 'left') {
                self.xPos -= self.speed;
            } else if (self.direction == 'right') {
                self.xPos += self.speed;
            }
            
            if(self.xPos < 8) {
                self.xPos = 8;
                cancleAnimationFrame(self.rafId);
            }
            if(self.xPos > 92) {
                self.xPos = 92;
                cancleAnimationFrame(self.rafId);
            }
            
            self.mainElement.style.left = (self.xPos) + '%';    
            
            self.rafId = requestAnimationFrame(function (){
                self.run(self);
            }) 
        
    }
};

const HTMLDebuger = document.querySelector('.debug-bar');