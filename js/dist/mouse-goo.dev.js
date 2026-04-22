"use strict";

var blobs = {
  main: document.querySelector(".blob-main"),
  b2: document.querySelector(".blob-2"),
  b3: document.querySelector(".blob-3"),
  b4: document.querySelector(".blob-4"),
  c1: document.querySelector(".chroma-1"),
  c2: document.querySelector(".chroma-2"),
  c3: document.querySelector(".chroma-3")
};
var mouseX = window.innerWidth * 0.5;
var mouseY = window.innerHeight * 0.3;
var points = {
  main: {
    x: mouseX,
    y: mouseY
  },
  b2: {
    x: mouseX,
    y: mouseY
  },
  b3: {
    x: mouseX,
    y: mouseY
  },
  b4: {
    x: mouseX,
    y: mouseY
  },
  c1: {
    x: mouseX,
    y: mouseY
  },
  c2: {
    x: mouseX,
    y: mouseY
  },
  c3: {
    x: mouseX,
    y: mouseY
  }
};
window.addEventListener("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function lerp(start, end, amt) {
  return start + (end - start) * amt;
}

function setBlob(el, x, y) {
  var rotate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  el.style.transform = "translate(".concat(x, "px, ").concat(y, "px) translate(-50%, -50%) rotate(").concat(rotate, "deg)");
}

function animateMouseGoo() {
  points.main.x = lerp(points.main.x, mouseX, 0.18);
  points.main.y = lerp(points.main.y, mouseY, 0.18);
  points.b2.x = lerp(points.b2.x, mouseX - 65, 0.12);
  points.b2.y = lerp(points.b2.y, mouseY - 10, 0.12);
  points.b3.x = lerp(points.b3.x, mouseX + 58, 0.1);
  points.b3.y = lerp(points.b3.y, mouseY + 18, 0.1);
  points.b4.x = lerp(points.b4.x, mouseX - 95, 0.08);
  points.b4.y = lerp(points.b4.y, mouseY + 22, 0.08);
  points.c1.x = lerp(points.c1.x, mouseX - 8, 0.22);
  points.c1.y = lerp(points.c1.y, mouseY, 0.22);
  points.c2.x = lerp(points.c2.x, mouseX + 42, 0.16);
  points.c2.y = lerp(points.c2.y, mouseY + 8, 0.16);
  points.c3.x = lerp(points.c3.x, mouseX - 48, 0.14);
  points.c3.y = lerp(points.c3.y, mouseY - 8, 0.14);
  var angle = Math.atan2(mouseY - points.main.y, mouseX - points.main.x) * (180 / Math.PI);
  setBlob(blobs.main, points.main.x, points.main.y, angle * 0.2);
  setBlob(blobs.b2, points.b2.x, points.b2.y, angle * 0.4);
  setBlob(blobs.b3, points.b3.x, points.b3.y, angle * 0.35);
  setBlob(blobs.b4, points.b4.x, points.b4.y, angle * 0.45);
  setBlob(blobs.c1, points.c1.x, points.c1.y, angle * 0.35);
  setBlob(blobs.c2, points.c2.x, points.c2.y, angle * 0.25);
  setBlob(blobs.c3, points.c3.x, points.c3.y, angle * 0.4);
  requestAnimationFrame(animateMouseGoo);
}

animateMouseGoo();
//# sourceMappingURL=mouse-goo.dev.js.map
