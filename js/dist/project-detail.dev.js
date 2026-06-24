"use strict";

// Hero title parallax movement
document.addEventListener("mousemove", function (e) {
  var moveX = (e.clientX - window.innerWidth / 2) / 40;
  var moveY = (e.clientY - window.innerHeight / 2) / 40;
  var title = document.getElementById("hero-title");

  if (title) {
    title.style.transform = "translate(".concat(moveX, "px, ").concat(moveY, "px)");
  }
}); // Scroll reveal animation

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("opacity-100", "translate-y-0");
      entry.target.classList.remove("opacity-0", "translate-y-10");
    }
  });
}, {
  threshold: 0.1
});
document.querySelectorAll(".glass, .container > div").forEach(function (el) {
  el.classList.add("transition-all", "duration-1000", "opacity-0", "translate-y-10");
  observer.observe(el);
});
//# sourceMappingURL=project-detail.dev.js.map
