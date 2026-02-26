document.addEventListener("DOMContentLoaded", function () {
  // AOS 애니메이션 초기화
  AOS.init();

  // Content 1: 썸네일 슬라이드
  const swiperThumbs2 = new Swiper(".content_1 .swiper-container-thumbs_2", {
    spaceBetween: 20,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  // Content 1: 메인 상단 슬라이드
  const swiper1 = new Swiper(".content_1 .swiper-container", {
    // 기본 설정 (모바일)
    slidesPerView: 1, // 한 번에 하나씩 보임
    spaceBetween: 20, // 슬라이드 사이 간격
    centeredSlides: true, // 활성화된 슬라이드 가운데 정렬
    loop: false, // 무한 반복
    watchSlidesProgress: false,
    // 네비게이션 버튼 연결
    navigation: {
      nextEl: ".content_1 .swiper-button-next-j2",
      prevEl: ".content_1 .swiper-button-prev-j2",
    },

    thumbs: {
      swiper: swiperThumbs2,
    },

    // 반응형 설정 (PC/태블릿)
    breakpoints: {
      768: {
        slidesPerView: 1, // 화면이 넓으면 3개가 보임 (가운데 1개 + 양옆 잘린 형태)
        spaceBetween: 30,
      },
    },
  });

  const swiper2 = new Swiper(".ytb .swiper-container", {
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    observer: true, // DOM 변화 감지 (영상 로딩 등)
    observeParents: true, // 부모 요소 변화 감지
  });

  // Content 5: 썸네일 슬라이드
  const swiperThumbs = new Swiper(".content_5 .swiper-container-thumbs", {
    spaceBetween: 20,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
  });

  // Content 5: 하단 메인 슬라이드 (중앙 강조형)
  const swiper5 = new Swiper(".content_5", {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: ".content_5 .swiper-button-next",
      prevEl: ".content_5 .swiper-button-prev",
    },
    thumbs: {
      swiper: swiperThumbs,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
    },
  });
});

// 스크롤이 발생하면 마우스 아이콘 숨기기 추가
window.addEventListener("scroll", function () {
  const mouseIcon = document.querySelector(".mouse");
  // 스크롤 300px 지점까지는 아이콘이 따라오다가(translateY), 그 이후 사라짐
  if (window.scrollY > 300) {
    mouseIcon.classList.add("hidden");
  } else {
    mouseIcon.classList.remove("hidden");
    mouseIcon.style.transform = `translateY(${window.scrollY}px)`;
  }
});
