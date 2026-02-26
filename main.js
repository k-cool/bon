const header = document.querySelector("header");
const brandMenu = document.getElementById("brand");
const changMenu = document.getElementById("chang");
const eventMenu = document.getElementById("event");
const presentMenu = document.getElementById("present");
const serviceMenu = document.getElementById("service");
const hamburgerEl = document.getElementById("ham");
const allMenu = document.querySelector(".all-menu");

const bar = document.getElementById("bar");

const closeCurrentShow = () => {
  const showEl = document.querySelector(".show");
  showEl?.classList.remove("show");
};

const onMouseEnterBrand = () => {
  closeCurrentShow();

  const width = brandMenu.offsetWidth;
  bar.style.width = width + "px";

  const newLeft = brandMenu.offsetLeft + "px";
  bar.style.left = newLeft;

  const target = document.querySelector(".sub-cont-brand");
  target.classList.add("show");
};

const onMouseEnterChang = () => {
  closeCurrentShow();

  const width = changMenu.offsetWidth;
  bar.style.width = width + "px";

  const newLeft = changMenu.offsetLeft + "px";
  bar.style.left = newLeft;

  const target = document.querySelector(".sub-cont-chang");
  target.classList.add("show");
};

const onMouseEnterEvent = () => {
  closeCurrentShow();

  const width = eventMenu.offsetWidth;
  bar.style.width = width + "px";

  const newLeft = eventMenu.offsetLeft + "px";
  bar.style.left = newLeft;

  const target = document.querySelector(".sub-cont-event");
  target.classList.add("show");
};

const onMouseEnterPresent = () => {
  closeCurrentShow();
  const width = presentMenu.offsetWidth;
  bar.style.width = width + "px";

  const newLeft = presentMenu.offsetLeft + "px";
  bar.style.left = newLeft;

  const target = document.querySelector(".sub-cont-present");
  target.classList.add("show");
};

const onMouseEnterService = () => {
  closeCurrentShow();
  const width = serviceMenu.offsetWidth;
  bar.style.width = width + "px";

  const newLeft = serviceMenu.offsetLeft + "px";
  bar.style.left = newLeft;

  const target = document.querySelector(".sub-cont-service");
  target.classList.add("show");
};
const onMouseLeaveHeader = () => {
  const target = document.querySelector(".show");
  target.classList.remove("show");

  bar.style.opacity = 0;

  setTimeout(() => {
    bar.style.transition = "none";
    bar.style.width = 0;
    bar.style.opacity = 1;

    setTimeout(() => {
      bar.style.transition = "all 0.5s ease";
    }, 100);
  }, 600);
};

//top2 선택시 드롭다운
brandMenu.addEventListener("mouseenter", onMouseEnterBrand);
changMenu.addEventListener("mouseenter", onMouseEnterChang);
eventMenu.addEventListener("mouseenter", onMouseEnterEvent);
presentMenu.addEventListener("mouseenter", onMouseEnterPresent);
serviceMenu.addEventListener("mouseenter", onMouseEnterService);
header.addEventListener("mouseleave", onMouseLeaveHeader);

// 헴버거 누르면 페이지 나오도록
hamburgerEl.addEventListener("click", () => {
  //   console.log("hamburgerEl");
  allMenu.classList.add("open");
});

//close 버튼을 누르면 페이지 닫히도록
closeBtn.addEventListener("click", () => {
  allMenu.classList.remove("open");
});
