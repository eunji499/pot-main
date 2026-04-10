document.addEventListener("DOMContentLoaded", () => {


            const elements = document.querySelectorAll('.fade-in-up');

            const observer = new IntersectionObserver((entries) => {
                
                // 1. 화면에 들어온 요소들 (isIntersecting === true)
                const visibleEntries = entries.filter(entry => entry.isIntersecting);
                visibleEntries.forEach((entry, index) => {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 200); // 0.2초 간격으로 순차적 등장
                });

                // 2. 화면에서 벗어난 요소들 (isIntersecting === false)
                const hiddenEntries = entries.filter(entry => !entry.isIntersecting);
                hiddenEntries.forEach(entry => {
                    // ✨ 핵심: 화면 밖으로 나가면 'visible' 클래스를 제거하여 초기화합니다.
                    entry.target.classList.remove('visible');
                });

            }, {
                // 요소의 10%가 보일 때 감지 시작
                threshold: 0.1 
            });

            elements.forEach(element => {
                observer.observe(element);
            });
 


    // 열쇠 두둥실 애니메이션
        
    const floatingKey = document.querySelector('.key');

        // 위아래 두둥실
        gsap.to(floatingKey, {
            duration: 3, 
            y: "-=20", 
            x: "-=10", 
            repeat: -1, 
            yoyo: true, 
            ease: "sine.inOut" 
            
        });



// 웰컴 버튼 
        const btnConcept = document.getElementById('btnConcept');
        const btnColorsFonts = document.getElementById('btnColorsFonts');
        
        const modalConcept = document.getElementById('modalConcept');
        const modalColorsFonts = document.getElementById('modalColorsFonts');
        
        const closeConcept = document.getElementById('closeConcept');
        const closeColorsFonts = document.getElementById('closeColorsFonts');

        btnConcept.addEventListener('click', () => modalConcept.classList.add('active'));
        btnColorsFonts.addEventListener('click', () => modalColorsFonts.classList.add('active'));
       
        closeConcept.addEventListener('click', () => modalConcept.classList.remove('active'));
        closeColorsFonts.addEventListener('click', () => modalColorsFonts.classList.remove('active'));

        window.addEventListener('click', (event) => {
            if (event.target === modalConcept) modalConcept.classList.remove('active');
            if (event.target === modalColorsFonts) modalColorsFonts.classList.remove('active');
        });




        // 팝업 영역
        const posters = document.querySelectorAll('.clickable-poster');

        posters.forEach(poster => {
            poster.addEventListener('click', function() {
               
                const newTitle = this.getAttribute('data-title');
                const newDesc = this.getAttribute('data-desc');

                const parentBlock = this.closest('.portfolio-block');

                const titleText = parentBlock.querySelector('.info-title-text');
                const descText = parentBlock.querySelector('.info-desc-text');

                titleText.textContent = newTitle;
                descText.innerHTML = newDesc; 

                const siblingPosters = parentBlock.querySelectorAll('.clickable-poster');
                siblingPosters.forEach(p => p.classList.remove('active'));
                
                this.classList.add('active');
            });
        });







        // 탄성 선의 독립적인 동작을 관리하는 클래스
class ElasticLine {
    constructor(container) {
        this.container = container;
        // 자신의 컨테이너 안에 있는 path만 선택
        this.path = container.querySelector('.elastic-path'); 
        
        // 1. 상태 변수 독립화 (this를 통해 인스턴스별로 고유한 값을 가짐)
        this.width = this.container.clientWidth;
        this.height = 100;
        this.centerY = this.height / 2;
        
        this.cx = this.width / 2;
        this.cy = this.centerY;
        
        this.targetX = this.width / 2;
        this.targetY = this.centerY;
        
        this.vY = 0;
        this.spring = 0.05; 
        this.friction = 0.9; 

        // 2. 이벤트 등록 및 애니메이션 시작
        this.initEvents();
        this.animateLine();
    }




    initEvents() {
        // 브라우저 리사이즈 대응
        window.addEventListener('resize', () => {
            this.width = this.container.clientWidth;
        });

        // 마우스 무브 대응
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.targetX = e.clientX - rect.left;
            this.targetY = e.clientY - rect.top;
        });

        // 마우스 리브 대응
        this.container.addEventListener('mouseleave', () => {
            this.targetX = this.width / 2;
            this.targetY = this.centerY;
        });
    }





    // 화살표 함수를 사용하여 this 컨텍스트 유지
    animateLine = () => {
        this.cx += (this.targetX - this.cx) * 0.1;

        let dy = this.targetY - this.cy;
        this.vY += dy * this.spring;
        this.vY *= this.friction;
        this.cy += this.vY;

        const d = `M 0 ${this.centerY} Q ${this.cx} ${this.cy} ${this.width} ${this.centerY}`;
        this.path.setAttribute('d', d);

        // 자신만의 애니메이션 프레임 루프 지속
        requestAnimationFrame(this.animateLine);
    }
}





// 3. 실제 적용 (초기화)
// 페이지 내의 모든 .elastic-container를 찾아 각각 독립된 탄성 선 객체로 만듦
const containers = document.querySelectorAll('.elastic-container');
containers.forEach(container => new ElasticLine(container));



        // 포스터 영역
        
       // 1. Swiper 초기화 및 'Cards' 이펙트 적용
    const swiper = new Swiper(".mySwiper", {
      effect: "cards", // 카드 넘기는 효과
      grabCursor: true,
    });

    // 2. 포스터가 바뀔 때마다 텍스트 정보 업데이트
    const infoTitle = document.getElementById("infoTitle");
    const infoDesc = document.getElementById("infoDesc");

    swiper.on('slideChange', function () {
      // 현재 활성화된 슬라이드 요소를 가져옴
      const activeSlide = swiper.slides[swiper.activeIndex];
      
      // HTML에 적어둔 data-* 속성 값을 가져와서 텍스트 박스에 적용
      infoTitle.innerText = activeSlide.getAttribute('data-title');
      infoDesc.innerText = activeSlide.getAttribute('data-desc');
    });

    // 3. 드래그 앤 드롭 및 이동 제한 구역 설정 로직
    const dragBox = document.getElementById('dragBox');
    const boundary = document.getElementById('boundary');

    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    // 마우스 누를 때 (드래그 시작)
    dragBox.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX; // 마우스의 현재 X 좌표
      startY = e.clientY; // 마우스의 현재 Y 좌표
      
      // 박스의 현재 CSS left, top 값 저장
      initialLeft = dragBox.offsetLeft;
      initialTop = dragBox.offsetTop;
    });

    // 마우스 움직일 때 (드래그 중)
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      // 마우스가 이동한 거리 계산
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // 이동할 새로운 좌표 계산
      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      // 제한 구역 (Bounding Box) 설정: 컨테이너(boundary) 밖으로 나가지 못하게 조건문 추가
      const maxLeft = boundary.clientWidth - dragBox.offsetWidth;
      const maxTop = boundary.clientHeight - dragBox.offsetHeight;

      // 좌우 끝값 제한
      if (newLeft < 0) newLeft = 0;
      if (newLeft > maxLeft) newLeft = maxLeft;

      // 상하 끝값 제한
      if (newTop < 0) newTop = 0;
      if (newTop > maxTop) newTop = maxTop;

      // 계산된 좌표를 실제 요소에 적용
      dragBox.style.left = `${newLeft}px`;
      dragBox.style.top = `${newTop}px`;
    });

    // 마우스를 뗄 때 (드래그 종료)
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });






    const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 
  };

 
  const scrollAnimOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 
  };

  // 변수명 변경: observer -> scrollAnimObserver
  const scrollAnimObserver = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 화면에 나타나면 active 클래스 추가
        entry.target.classList.add('active');
        
        // 요소가 한 번 나타난 후에는 다시 관찰하지 않도록 해제
        currentObserver.unobserve(entry.target);
      }
    });
  }, scrollAnimOptions);

  // 변수명 변경: elements -> scrollAnimTargets
  // HTML에서 .scroll-element 클래스를 가진 모든 요소를 찾아 관찰 시작
  const scrollAnimTargets = document.querySelectorAll('.scroll-element');
  scrollAnimTargets.forEach(target => scrollAnimObserver.observe(target));




// 배너







     
    });



















































































