"use strict";

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger); // General reveal animations, but skip skill items because they get their own animation

  document.querySelectorAll(".reveal-up:not(.skill-item)").forEach(function (el) {
    gsap.fromTo(el, {
      opacity: 0,
      y: 30
    }, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse"
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    });
  }); // Skill cards reveal

  gsap.fromTo(".skill-item", {
    opacity: 0,
    y: 45,
    scale: 0.96
  }, {
    scrollTrigger: {
      trigger: ".skills-grid",
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.9,
    stagger: 0.12,
    ease: "power3.out"
  }); // Skill progress bars

  document.querySelectorAll(".skill-item").forEach(function (item) {
    var bar = item.querySelector(".progress-bar-inner");
    var percent = item.getAttribute("data-percent");
    if (!bar || !percent) return;
    gsap.fromTo(bar, {
      width: "0%"
    }, {
      scrollTrigger: {
        trigger: item,
        start: "top 88%",
        toggleActions: "play none none reverse"
      },
      width: percent + "%",
      duration: 1.6,
      ease: "power4.inOut"
    });
  }); // About title animation

  gsap.fromTo(".about-name-title", {
    x: 80,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 70%",
      toggleActions: "play none none reverse"
    },
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power4.out"
  }); // About image animation

  gsap.fromTo(".main-profile-card", {
    x: -80,
    opacity: 0,
    rotateY: -8
  }, {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 70%",
      toggleActions: "play none none reverse"
    },
    x: 0,
    opacity: 1,
    rotateY: 0,
    duration: 1.2,
    ease: "power4.out"
  }); // About focus cards animation

  gsap.fromTo(".focus-card", {
    y: 45,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: ".about-focus-grid",
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    y: 0,
    opacity: 1,
    duration: 0.9,
    stagger: 0.15,
    ease: "power3.out"
  }); // About mini terminal animation

  gsap.fromTo(".about-mini-terminal", {
    y: 40,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: ".about-mini-terminal",
      start: "top 90%",
      toggleActions: "play none none reverse"
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out"
  });
} else {
  document.querySelectorAll(".reveal-up, .skill-item").forEach(function (el) {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });
} // Mouse movement parallax


document.addEventListener("mousemove", function (e) {
  var mouseX = e.clientX / window.innerWidth - 0.5;
  var mouseY = e.clientY / window.innerHeight - 0.5;
  document.querySelectorAll(".parallax-target").forEach(function (el) {
    var speed = 15;
    var x = mouseX * speed;
    var y = mouseY * speed;
    el.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
  });
  document.querySelectorAll(".node-card").forEach(function (card) {
    var aura = card.querySelector(".glowing-aura");
    if (!aura) return;
    var rect = card.getBoundingClientRect();
    var x = e.clientX - rect.left - 75;
    var y = e.clientY - rect.top - 75;
    aura.style.left = "".concat(x, "px");
    aura.style.top = "".concat(y, "px");
  });
}); // About image tilt effect

var tiltCard = document.querySelector(".about-tilt-card");

if (tiltCard) {
  tiltCard.addEventListener("mousemove", function (e) {
    var rect = tiltCard.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var middleX = rect.width / 2;
    var middleY = rect.height / 2;
    var rotateX = (y - middleY) / middleY * -5;
    var rotateY = (x - middleX) / middleX * 5;
    tiltCard.style.transform = "perspective(900px) rotateX(".concat(rotateX, "deg) rotateY(").concat(rotateY, "deg) scale(1.015)");
  });
  tiltCard.addEventListener("mouseleave", function () {
    tiltCard.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  });
} // Live clock in ticker


function updateTime() {
  var now = new Date();
  var timeStr = now.toTimeString().split(" ")[0];
  var t1 = document.getElementById("time");
  var t2 = document.getElementById("time-2");
  if (t1) t1.innerText = timeStr;
  if (t2) t2.innerText = timeStr;
}

setInterval(updateTime, 1000);
updateTime();
//# sourceMappingURL=main.dev.js.map
