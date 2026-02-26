import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";

const progressFill = document.querySelector(".progress-fill");

const swiper = new Swiper(".swiper", {
  loop: true,
  speed: 500,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },

  on: {
    autoplayTimeLeft(s, time, progress) {
      const percentage = (1 - progress) * 100;
      progressFill.style.width = percentage + "%";
    },
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "fraction",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// Tab Menu
const tabButtons = document.querySelectorAll(".tab-btn");
const detailImages = document.querySelectorAll(".detail-img");
let selectedTab = 0;

tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons and images
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    detailImages.forEach((img) => img.classList.remove("active"));

    // Add active class to the clicked button and corresponding image
    button.classList.add("active");
    detailImages[index].classList.add("active");
    selectedTab = index;
  });
});

// Q&A Accordion
const qnaItems = document.querySelectorAll(".qna-item");

qnaItems.forEach((qnaItem) => {
  const aHeader = qnaItem.querySelector(".accordion-header");
  const aWrap = qnaItem.querySelector(".accordion-wrap");
  const chevron = qnaItem.querySelector(".chevron");

  const onClickHeader = () => {
    const isActive = chevron.classList.contains("active");

    // Close all items
    qnaItems.forEach((item) => {
      const chevron = item.querySelector(".chevron");
      const aWrapItem = item.querySelector(".accordion-wrap");

      chevron.classList.remove("active");
      aWrapItem.classList.remove("active");
    });

    // Toggle the clicked item
    if (!isActive) {
      chevron.classList.add("active");
      aWrap.classList.add("active");
    }
  };

  aHeader.addEventListener("click", onClickHeader);
});
