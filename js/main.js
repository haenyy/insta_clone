window.addEventListener('DOMContentLoaded',function (){

    const heart = document.querySelector('.heart_btn'); //하트 요소 부분을 선택해서 가져옴
    const header = document.querySelector('#header');
    const sidebox = document.querySelector('.side_box');
    //SelectorAll 을 활용해 모든 요소를 가져옴
    const variableWidth = document.querySelectorAll(".contents_box .contents");
    const delegation = document.querySelector(".contents_box");

    // heart.addEventListener('click', function (){
    //     //querySelector 라서 하나의 동작에만 반영됨
    //     console.log('hit!');
    //     heart.classList.toggle('on'); //하트를 클릭하면 .on 클래스를 추가
    // })

    //이벤트 위임
    function delegationFunc(e){
        let elem = e.target; //클릭한 요소 가져오기
        console.log(e.target);

        //잘못 클릭한 경우
        while(!elem.getAttribute('data-name')){
            //elem 의 부모를 찾음
            elem = elem.parentNode;
            if(elem.nodeName === 'BODY') { //body 까지 이벤트가 없는 경우
                elem = null;
                return;
            } //data-name 을 가진 속성을 찾을때까지 부모에게 접근을 반복
        }

        if(elem.matches('[data-name="heartbeat"]')){
            console.log('하트!');
        } else if(elem.matches('[data-name="bookmark"]')) {
            console.log('북마크!');
        } else if(elem.matches('[data-name="share"]')) {
            console.log('공유!');
        } else if(elem.matches('[data-name="more"]')) {
            console.log('더보기!');
        }

        elem.classList.toggle('on'); //on 클래스 추가
    }


    //pageYOffset 이 scroll 을 해도 0으로 setting 되는 현상
    //pageYOffset > scrollY 변경 후 issue 해결(구형브라우저까지 반영 > pageXOffset, 신형브라우저만 반영 > scrollY)
    function resizeFunc() {
        if (scrollY  || pageXOffset >= 10) {
            let calcWidth = (window.innerWidth * 0.5) + 167;    //웹페이지 기반으로 위치 재조정
            sidebox.style.left = calcWidth + 'px';
        }

        if(matchMedia('screen and (max-width : 800px').matches) {
            //여러개의 컨텐츠 박스가 있으므로 배열 활용
            for(let i=0; i<variableWidth.length; i++) {
                variableWidth[i].style.width = window.innerWidth -20 + 'px';
            }
        } else {
            for(let i=0; i<variableWidth.length; i++) {
                //width 값 800 이상에서는 style 값이 사라짐
                if(window.innerWidth > 600) {
                    //디폴트 값이 614이므로 614 이상 커지지 않게 하기
                    variableWidth[i].removeAttribute('style');
                }
            }
        }
    }

    function scrollFunc() {
        // console.log('scrollY?', scrollY);
        // console.log('pageXOffset?', pageXOffset);
        if(scrollY || pageXOffset >= 10) { //드래그할 경우
            header.classList.add('on');
            sidebox.classList.add('on');
            resizeFunc();
        } else {
            header.classList.remove('on');
            sidebox.classList.remove('on');
            sidebox.removeAttribute('style');
        }
    }

    setTimeout(function (){
        scrollTo(0,0);
    },100); //새로고침하면 화면이 제일 위로 가도록 한다

    if(delegation) {
        delegation.addEventListener('click',delegationFunc);
    }
    
    window.addEventListener('resize', resizeFunc);
    window.addEventListener('scroll', scrollFunc); //스크롤 이벤트 발생 시 scrollFunc 실행
    // delegation.addEventListener('click', delegationFunc); //클릭 이벤트 발생 시 delegationFunc 실행
})

