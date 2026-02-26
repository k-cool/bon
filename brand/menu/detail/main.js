// 현재 페이지 URL의 파라미터 가져오기
const params = new URLSearchParams(window.location.search);

// 값 하나 가져오기
const id = +params.get("id");

console.log(id);

async function loadData() {
  try {
    const response = await fetch("./json/menu-data.json");
    const data = await response.json();

    // console.log(typeof id, typeof data[0].id);

    const item = data.find((data) => data.id === id);
    console.log(item);

    renderMenuImg(item);
    renderTextSide(item);
    renderDetialImg(item, "detail");
    renderDetialImg(item, "origin");
    renderDetialImg(item, "al");

    // render
  } catch (error) {
    console.error("에러:", error);
  }
}

loadData();

const renderMenuImg = (data) => {
  const img = document.getElementById("menuImage");
  img.src = data.image;

  if (data.isNew) {
    const menuImgSide = document.querySelector(".menu-img-side");
    const newImg = document.createElement("img");

    newImg.src = "../badge_new.svg";
    newImg.alt = "NEW";
    newImg.classList.add("badge-new");

    menuImgSide.appendChild(newImg);
  }
};

const renderTextSide = (data) => {
  const menuTitle = document.getElementById("menuTitle");
  const menuIngredient = document.getElementById("menuIngredient");
  const optionList = document.getElementById("optionList");
  const menuPrice = document.getElementById("menuPrice");

  menuTitle.innerText = data.name;
  menuIngredient.innerText = data.ingredient;

  const optionLength = data.option.length;

  for (let i = 0; i < optionLength; i++) {
    const targetData = data.option[i];
    const divTag = document.createElement("div");
    const checkbox = document.createElement("input");
    const name = document.createElement("span");
    const price = document.createElement("span");

    checkbox.id = `cb-${targetData.name}`;
    checkbox.type = "checkbox";
    checkbox.name = targetData.name;
    checkbox.checked = targetData.isSelected;
    name.innerText = targetData.name;
    price.innerText = `+ ${targetData.price.toLocaleString()} 원`;

    divTag.appendChild(checkbox);
    divTag.appendChild(name);
    divTag.appendChild(price);

    optionList.appendChild(divTag);

    divTag.addEventListener("click", () => {
      // 체크박스 반전
      const cb = document.getElementById(`cb-${targetData.name}`);
      cb.checked = cb.checked === true ? false : true;
      console.dir(cb.checked);

      // 총계 재계산
      let totalPrice = data.price;
      const checkboxs = document.querySelectorAll("#optionList div input");

      [...checkboxs].forEach((item) => {
        if (!item.checked) return;

        data.option.forEach((op) => {
          if (op.name === item.name) totalPrice += op.price;
        });
      });

      const total = document.getElementById("menuPrice");
      total.innerText = `+ ${totalPrice.toLocaleString()} 원`;
    });
  }

  menuPrice.innerText = `${data.price.toLocaleString()} 원`;
};

const renderDetialImg = (data, type) => {
  const wrapper = document.querySelector(".img-wrapper");
  const detailImg = document.createElement("img");

  detailImg.id = type;
  detailImg.src = data.content[type];
  detailImg.alt = "detailImg";
  detailImg.style.paddingTop = "100px";
  wrapper.appendChild(detailImg);
};

const detailTabs = document.querySelectorAll(".detail-tab");

for (let i = 0; i < detailTabs.length; i++) {
  const item = detailTabs[i];

  item.addEventListener("click", () => {
    detailTabs.forEach((tab) => {
      if (item.innerText === tab.innerText) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  });
}
