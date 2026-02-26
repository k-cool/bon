const href = window.location.href;

const tf = href.slice(href.indexOf("=") + 1).split(".");

const del = document.getElementById("delivery");
const takeOut = document.getElementById("takeOut");
const store = document.getElementById("store");

if (tf[0] === "F") {
  del.style.pointerEvents = "none";
  del.style.opacity = 0.3;
}
if (tf[1] === "F") {
  takeOut.style.pointerEvents = "none";
  takeOut.style.opacity = 0.3;
}
if (tf[2] === "F") {
  store.style.pointerEvents = "none";
  store.style.opacity = 0.3;
}
