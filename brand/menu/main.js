/**
 * 본죽 브랜드 페이지 공통 스크립트
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. 탭 메뉴 클릭 이벤트 (active 클래스 전환)
  const tabs = document.querySelectorAll(".tab-item");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // 모든 탭에서 'active' 클래스 제거
      tabs.forEach((item) => item.classList.remove("active"));
      // 클릭한 탭에만 'active' 추가
      this.classList.add("active");
      console.log(this.innerText + " 메뉴가 선택되었습니다.");
    });
  });

  // 2. 패밀리 사이트 토글 로직
  const familyBtn = document.getElementById("family-btn");
  const familyContainer = document.querySelector(".family-site");
  const closeTrigger = document.querySelector(".close-trcdigger");

  if (familyBtn && familyContainer) {
    // 메인 버튼 클릭 시 열기/닫기
    familyBtn.addEventListener("click", function (e) {
      familyContainer.classList.toggle("is-open");
      e.stopPropagation();
    });

    // 리스트 상단 'FAMILY SITE' 클릭 시 닫기
    if (closeTrigger) {
      closeTrigger.addEventListener("click", function (e) {
        e.preventDefault();
        familyContainer.classList.remove("is-open");
        e.stopPropagation();
      });
    }

    // 바탕화면 클릭 시 메뉴 닫기
    document.addEventListener("click", function () {
      familyContainer.classList.remove("is-open");
    });
  }
});

// 3. 메뉴 이미지에 '찜하기(하트)' 버튼 동적 삽입
window.addEventListener("load", function () {
  const wrappers = document.querySelectorAll(".menu-img-wrapper");

  wrappers.forEach((wrapper) => {
    // 이미 버튼이 있는지 확인 후 삽입 (중복 방지)
    if (!wrapper.querySelector(".wish-icon")) {
      const heartBtn = `
        <div class="wish-icon" onclick="openLoginModal()" style="cursor:pointer;">
          <img src="https://www.bonif.co.kr/assets/web/front/assets/images/icons/heart-off.svg" alt="찜하기" class="heart-img" />
        </div>`;
      wrapper.insertAdjacentHTML("beforeend", heartBtn);
    }
  });

  // 페이지 로드 시 혹시라도 남아있을 수 있는 로딩 레이어 숨기기
  const loadingLayer = document.getElementById("loading-layer");
  if (loadingLayer) {
    loadingLayer.style.display = "none";
  }
});

// 4. 로그인 모달 제어 함수 (전역 스코프)
function openLoginModal() {
  const modal = document.getElementById("login-modal");
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // 배경 스크롤 방지
  }
}

function closeLoginModal() {
  const modal = document.getElementById("login-modal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // 스크롤 다시 허용
  }
}

// 모든 태그 li를 가져오되, 초기화 버튼(#btn-reset)은 제외합니다.
const tags = document.querySelectorAll(".tag-list li:not(#btn-reset)");
const resetBtn = document.getElementById("btn-reset");

tags.forEach((tag) => {
  tag.addEventListener("click", function () {
    // active 클래스가 있으면 제거하고, 없으면 추가함 (Toggle)
    this.classList.toggle("active");
  });
});

// 초기화 버튼 클릭 시 모든 active 클래스 제거
resetBtn.addEventListener("click", () => {
  tags.forEach((tag) => tag.classList.remove("active"));
});
