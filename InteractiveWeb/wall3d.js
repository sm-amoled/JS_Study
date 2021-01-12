(function() {
    const selectCharBtn = document.querySelector('.select-character');  
    const houseElement = document.querySelector('.house');
    const barElement = document.querySelector('.progress-bar');
    const stageElement = document.querySelector('.stage');
    const mousePos = { x: 0, y: 0};
    let pageMaxScrollValue;
    
    
    function resizeHandler() {
        pageMaxScrollValue = document.body.offsetHeight - window.innerHeight-50;
    }
    
    window.addEventListener('scroll', function() {
        const zRatio = pageYOffset/pageMaxScrollValue;
        const zMove = zRatio * 910 - 490;
        houseElement.style.transform = 'translateZ(' + (zMove) + 'vw)';
        
        // progress bar
        barElement.style.width = (zRatio*100) + '%';
    });
    
    window.addEventListener('touchstart', function(e) {
        
        new Character({xPos: e.pageX, speed: Math.random() *0.6 + 0.2});
        
        // 화면 시점 옮기기
        // 아이패드 상에서는 잘 작동하지 않아 주석처리함
    //     mousePos.x = -1 + (e.pageX/window.innerWidth)*2;
    //     mousePos.y = 1 - (e.pageY/window.innerHeight)*2;
    //     console.log(mousePos);
    //     stageElement.style.transform = 'rotateX(' + (mousePos.y * 5) + 'deg) rotateY(' + (mousePos.x * 5) + 'deg)';
    });
    
    window.addEventListener('resize', resizeHandler);
    
    
    // 캐릭터 변경
    selectCharBtn.addEventListener('click', function(e) {
        document.body.setAttribute('data-char', e.target.getAttribute('data-char'));
    });

    resizeHandler();
})();