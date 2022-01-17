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

        //하트
        if(elem.matches('[data-name="heartbeat"]')){
            //좋아요 count 추가
            let pk = elem.getAttribute('name'); //pk 값을 받아온다
            $.ajax({
                Method:'POST',  //기본적으로 POST 방식. 에러나면 GET 으로 바꿔보기
                url:'data/like.json',
                //TODO data 임시값이므로 backend 구현 시 데이터 수정 필요
                data: {pk},
                dataType:'json',    //어떻게 들어올지 설정
                success: function(response) { //통신에 성공한 데이터가 response 로 들어온다
                    let likeCount = document.querySelector('#like-count-37');
                    likeCount.innerHTML = '좋아요 ' + response.like_count +'개';
                },
                error: function (request, status, error) {
                    alert('로그인이 필요합니다.');
                    window.location.replace('https://www.naver.com'); //TODO 임시 에러 웹 페이지, 수정 필요
                }
            })
        //북마크
        } else if(elem.matches('[data-name="bookmark"]')) { //북마크 클릭 시 실행
            let pk = elem.getAttribute('name'); //pk 값을 받아온다
            $.ajax({
                Method:'POST',  //기본적으로 POST 방식. 에러나면 GET 으로 바꿔보기
                url:'data/bookmark.json',
                //TODO data 임시값이므로 backend 구현 시 데이터 수정 필요
                data: {pk},
                dataType:'json',    //어떻게 들어올지 설정
                success: function(response) { //통신에 성공한 데이터가 response 로 들어온다
                    let bookmarkCount = document.querySelector('#bookmark-count-37');
                    bookmarkCount.innerHTML = '북마크 ' + response.bookmark_count +'개';
                },
                error: function (request,status,error) {
                    alert('로그인이 필요합니다.');
                    window.location.replace('https://www.naver.com'); //TODO 임시 에러 웹 페이지, 수정 필요
                }
            })
        //댓글
        } else if(elem.matches('[data-name="comment"]')) {
            let content = document.querySelector('#add-comment-post-37 > input[type=text]').value;

            console.log('content', content);

            if(content.length > 140) {
                alert('댓글은 최대 140자까지 입력 가능합니다. 현재 글자수 : ' + content.length);
                return;
            }   

            $.ajax({
                Method:'POST',  //기본적으로 POST 방식. 에러나면 GET 으로 바꿔보기
                url:'./comment.html',   // ./는 현재 폴더를 뜻함
                //TODO data 임시값이므로 backend 구현 시 데이터 수정 필요
                data: {
                    'pk': 37,
                    'content': content
                },
                dataType:'html',    //어떻게 들어올지 설정
                success: function(data) { //통신에 성공한 데이터가 response 로 들어온다
                    /**
                     * element.insertAdjacentHTML(position, text) > 태그 자체를 추가. position : 어느부분에다 추가할지 / text : 추가할 데이터
                     */
                    document.querySelector('#comment-list-ajax-post-37').insertAdjacentHTML('afterbegin', data);
                },
                error: function (request, status, error) {
                    alert('문제가 발생했습니다.');
                }
            })
            //게시 후 댓글달기란 초기화
            document.querySelector('#add-comment-post-37 > input[type=text]').value = '';
            
        //댓글삭제
        } else if(elem.matches('[data-name="comment_delete"]')) {
            $.ajax({
                Method:'POST',  //기본적으로 POST 방식. 에러나면 GET 으로 바꿔보기
                url:'/data/delete.json',
                //TODO data 임시값이므로 backend 구현 시 데이터 수정 필요
                data: {
                    'pk': 37
                },
                dataType:'json',    //어떻게 들어올지 설정
                success: function(response) { //통신에 성공한 데이터가 response 로 들어온다
                    if (response.status) {
                        let comt = document.querySelector('.comment-detail');
                        comt.remove();
                    }
                },
                error: function (request, status, error) {
                    alert('문제가 발생했습니다.');
                    window.location.replace('https://www.naver.com');   //임시 에러 웹 페이지
                }
            })
        //팔로우
        } else if(elem.matches('[data-name="follow"]')) {
            $.ajax({
                Method:'POST',  //기본적으로 POST 방식. 에러나면 GET 으로 바꿔보기
                url:'/data/follow.json',
                //TODO data 임시값이므로 backend 구현 시 데이터 수정 필요
                data: {
                    'pk': 37
                },
                dataType:'json',    //어떻게 들어올지 설정
                success: function(response) { //통신에 성공한 데이터가 response 로 들어온다
                    if (response.status) {
                        document.querySelector('input.follow').value = "팔로잉";
                    } else {
                        document.querySelector('input.follow').value = "팔로워";
                    }
                },
                error: function (request,status,error) {
                    alert('문제가 발생했습니다.');
                    window.location.replace('https://www.naver.com');   //임시 에러 웹 페이지
                }
            })
            //공유
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

    // function scrollFunc() {
    //     let scrollHeight = scrollY + window.innerHeight;
    //     let documentHeight = document.body.scrollHeight;
    //
    //     console.log('scrollHeight?', scrollHeight);
    //     console.log('documentHeight?', documentHeight);
    //     if(scrollY || pageXOffset >= 10) { //드래그할 경우
    //         header.classList.add('on');
    //         sidebox.classList.add('on');
    //         resizeFunc();
    //     } else {
    //         header.classList.remove('on');
    //         sidebox.classList.remove('on');
    //         sidebox.removeAttribute('style');
    //     }
    // }

    function scrollFunc() {
        let scrollHeight = scrollY + window.innerHeight;
        let documentHeight = document.body.scrollHeight;

        console.log('scrollHeight?', scrollHeight);
        console.log('documentHeight?', documentHeight);

        if(scrollY || pageXOffset >= 10) { //드래그할 경우
            header.classList.add('on');

            if(sidebox) {
                sidebox.classList.add('on');
            }
            resizeFunc();

        } else {
            header.classList.remove('on');
            if(sidebox) {
                sidebox.classList.remove('on');
                sidebox.removeAttribute('style');
            }
        }

        /** 스크롤을 끝까지 내렸을 때 화면 전체의 스크롤 값보다 같거나 클 때 페이징 시작 */
        if (scrollHeight >= documentHeight) {
            let page = document.querySelector('#page').value;
            document.querySelector('#page').value = parseInt(page) + 1;

            callMorePostAjax(page);
            if (page > 5) {
                return;
            }
        }
    }

    function callMorePostAjax(page) {
        if (page > 5) {
            return;
        }

        $.ajax({
            Method:'POST',  //기본적으로 POST 방식. 에러나면 GET 으로 바꿔보기
            url:'./post.html',
            //TODO data 임시값이므로 backend 구현 시 데이터 수정 필요
            data: {
                'page': page
            },
            dataType:'html',    //어떻게 들어올지 설정
            success: addMorePostAjax,
            error: function (request, status, error) {
                alert('문제가 발생했습니다.');
                window.location.replace('https://www.naver.com');   //임시 에러 웹 페이지
            }
        })
    }

    function addMorePostAjax(data) {
        console.log('data?', data);
        delegation.insertAdjacentHTML('beforeend', data);
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

