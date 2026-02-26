// map.js
let map;
let ps; // 장소 검색 객체
let markers = [];
let openedInfoWindow = null; // 얘 옮겼음 2.25

// js 수정 2.25 얘 새로 추가
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
});

function initMap() {
  var mapContainer = document.getElementById("map"); // 지도를 표시할 div
  var mapOption = {
    center: new kakao.maps.LatLng(37.570175, 126.982359), // 종각역 좌표
    level: 3, // 지도 확대 레벨
  };
  // 지도 생성
  map = new kakao.maps.Map(mapContainer, mapOption);

  // 장소 검색 객체 생성
  ps = new kakao.maps.services.Places();
}

// SDK가 로드된 후 initMap 함수를 실행하도록 설정
kakao.maps.load(initMap);

// 지도 검색
// 함수 이름 통일 및 변경 2.25
function searchStore() {
  // id 변경 2.25
  const rawKeyword = document.getElementById("searchStore").value;
  const city = document.getElementById("city").value;
  const district = document.getElementById("district").value;

  if (!city || !district) {
    alert("도시와 구를 선택하세요.");
    return;
  }

  // if (!rawKeyword.trim()) {
  //   alert("검색어를 입력하세요!");
  //   return;
  // }

  const resultDiv = document.getElementById("store-list"); //여기서 부터 2.25
  // console.log(stores);

  const filtered = stores.filter((store) => {
    // console.log(store.city, city);
    const isCityPass = store.city === city;
    const isDistrictPass = store.district === district;
    const isKeywordPass =
      store.name.includes(rawKeyword) || store.address.includes(rawKeyword);

    return isCityPass && isDistrictPass && isKeywordPass;
  });

  if (filtered.length === 0) {
    resultDiv.innerHTML = "검색 결과가 없습니다.";
    return;
  }

  const parseBoolStr = (value) => (value ? "T" : "F");

  resultDiv.innerHTML = filtered
    .map(
      (store) =>
        `
    <div class="store-item-card">
    <div class="store-info-top">
    <div class="title-group">
    <h3 id="title-${store.id}" class="store-name" style="cursor: pointer">${store.name} 〉</h3>
    </div>
    <span class="favorite-star" onclick="openModal('${store.name}')">☆</span>
    </div>
    <div class="store-details">
    <p class="addr">${store.address}</p>
    <p class="tel">${store.phone}</p>
    </div>
    <div class="store-actions">
    <button data-tf="${parseBoolStr(store.services.delivery) + "." + parseBoolStr(store.services.takeout) + "." + parseBoolStr(store.services.dineIn)}" class="action-btn ${store.services.delivery ? "active" : ""}" ><i>🛵</i> 배달</button>
    <button data-tf="${parseBoolStr(store.services.delivery) + "." + parseBoolStr(store.services.takeout) + "." + parseBoolStr(store.services.dineIn)}" class="action-btn ${store.services.takeout ? "active" : ""}"><i>🛍️</i> 포장</button>
    <button data-tf="${parseBoolStr(store.services.delivery) + "." + parseBoolStr(store.services.takeout) + "." + parseBoolStr(store.services.dineIn)}" class="action-btn ${store.services.dineIn ? "active" : ""}"><i>🏰</i> 매장이용</button>
    </div>
    </div>
    `,
    )
    .join(""); // 여기까지 추가 2.25

  const targets = document.querySelectorAll(".action-btn.active");

  [...targets].forEach((item) => {
    item.addEventListener("click", () => {
      console.dir(item);
      window.location = "/bon/order/type/?tf=" + item.attributes[0].value;
    });
  });

  filtered.forEach((store) => {
    // console.log(store.id);

    const title = document.getElementById(`title-${store.id}`);

    const handleClickTitle = () => {
      if (openedInfoWindow) {
        openedInfoWindow.close();
      }

      console.log("wow");

      const targetMarker = markers.find((data) => data.Gb === store.name);
      console.log(targetMarker);

      // 인포윈도우 생성 (가게 이름)
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${store.name}</div>`,
      });

      // 현재 클릭한 마커의 인포윈도우 열기
      infowindow.open(map, targetMarker);

      // 열린 인포윈도우를 현재 것으로 갱신
      openedInfoWindow = infowindow;

      // const placePosition = new kakao.maps.LatLng(
      //   store.position.x,
      //   store.position.y,
      // );

      map.panTo(targetMarker.getPosition());
    };

    title.addEventListener("click", handleClickTitle);
  });

  renderMarker(filtered);
  // const keyword = `${city} ${district} 본도시락 ${rawKeyword}`;
  // ps.keywordSearch(keyword, placesSearchCB);
}

function renderMarker(stores) {
  clearMarkers();

  const bounds = new kakao.maps.LatLngBounds();

  for (let i = 0; i < stores.length; i++) {
    const data = stores[i];

    const placePosition = new kakao.maps.LatLng(
      data.position.x,
      data.position.y,
    );

    const marker = new kakao.maps.Marker({
      title: data.name,
      position: placePosition,
    });

    // 인포윈도우 생성 (가게 이름)
    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;font-size:12px;">${data.name}</div>`,
    });

    // 마커 클릭 시 인포윈도우 열기
    kakao.maps.event.addListener(marker, "click", function () {
      // 이전에 열린 인포윈도우가 있으면 닫기
      if (openedInfoWindow) {
        openedInfoWindow.close();
      }

      // 현재 클릭한 마커의 인포윈도우 열기
      infowindow.open(map, marker);

      // 열린 인포윈도우를 현재 것으로 갱신
      openedInfoWindow = infowindow;
    });

    // console.log(marker.getPosition());
    marker.setMap(map);
    markers.push(marker);
    bounds.extend(marker.getPosition());
  }

  console.log(bounds);
  // 지도 범위 재설정
  map.setBounds(bounds);
}

function clearMarkers() {
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
}

// function placesSearchCB(data, status) {
//   if (status === kakao.maps.services.Status.OK) {
//     clearMarkers();

//     const bounds = new kakao.maps.LatLngBounds();
//     const listEl = document.getElementById("searchResult"); //2.25
//     listEl.innerHTML = ""; // 기존 목록 초기화

//     for (let i = 0; i < data.length; i++) {
//       const targetData = data[i];
//       const placePosition = new kakao.maps.LatLng(targetData.y, targetData.x);

//       const marker = new kakao.maps.Marker({
//         position: placePosition,
//       });

//       console.log(targetData);

//       // 인포윈도우 생성 (가게 이름)
//       const infowindow = new kakao.maps.InfoWindow({
//         content: `<div style="padding:5px;font-size:12px;">${targetData.place_name}</div>`,
//       });

//       // 마커 클릭 시 인포윈도우 열기
//       kakao.maps.event.addListener(marker, "click", function () {
//         // 이전에 열린 인포윈도우가 있으면 닫기
//         if (openedInfoWindow) {
//           openedInfoWindow.close();
//         }

//         // 현재 클릭한 마커의 인포윈도우 열기
//         infowindow.open(map, marker);

//         // 열린 인포윈도우를 현재 것으로 갱신
//         openedInfoWindow = infowindow;
//       });

//       marker.setMap(map);
//       markers.push(marker);

//       bounds.extend(placePosition);
//     }

//     // 지도 범위 재설정
//     map.setBounds(bounds);
//   } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//     alert("검색 결과가 없습니다.");
//   }
// }

let selectedStoreName = "";

// function searchStore() { 애를 주석처리 수정 2.25
// searchPlaces(); 얘를 주석처리 수정 2.25

function openModal(storeName) {
  selectedStoreName = storeName;
  document.getElementById("modalStoreName");
  document.getElementById("favoriteModal").style.display = "block";
}

function confirmFavorite() {
  window.location.href = "https://www.bonif.co.kr/login"; // 모달 확인 클릭 후 로그인 화면 수정 2.25
}

const districts = {
  서울특별시: ["종로구", "마포구", "강남구"],
  부산특별시: ["부산진구", "해운대구"],
};

let stores = [];

async function loadStores() {
  try {
    const response = await fetch("/bon/brand/store/data/store-data.json"); // 제이슨 파일 불러오기 수정 2.25

    stores = await response.json();
    console.log("JSON 로드 완료");
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

loadStores();

document.getElementById("city").addEventListener("change", function () {
  const city = this.value;
  const districtSelect = document.getElementById("district");

  districtSelect.innerHTML = `<option value="">시/군/구 선택</option>`;

  if (districts[city]) {
    districts[city].forEach((d) => {
      districtSelect.innerHTML += `<option value="${d}">${d}</option>`;
    });
  }
});

const searchInput = document.getElementById("searchStore");

searchInput.addEventListener("keydown", function (event) {
  // 눌린 키가 'Enter'인지 확인
  if (event.key === "Enter") {
    // 브라우저의 기본 동작(폼 제출 등) 방지
    event.preventDefault();

    // 기존에 만들어둔 검색 함수 실행
    searchStore();
  }
});
