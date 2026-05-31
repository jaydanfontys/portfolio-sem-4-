"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var THREE = _interopRequireWildcard(require("https://unpkg.com/three@0.129.0/build/three.module.js"));

var _OrbitControls = require("https://unpkg.com/three@0.129.0/examples/jsm/controls/OrbitControls.js");

var _GLTFLoader = require("https://unpkg.com/three@0.129.0/examples/jsm/loaders/GLTFLoader.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

document.body.setAttribute("data-theme", "hero");
var modelConfigs = [{
  id: "hero-model",
  path: "../models/chromed_crown.glb",
  scale: 4.2,
  floating: true,
  yOffset: 0.25,
  cameraZ: 7.2,
  wobble: false
}, {
  id: "work-model-1",
  path: "../models/soviet_retro_tv.glb",
  scale: 2.5,
  floating: false,
  yOffset: 0,
  cameraZ: 5.2,
  wobble: false
}, {
  id: "work-model-2",
  path: "../models/gopro_10.glb",
  scale: 2.5,
  floating: false,
  yOffset: 0,
  cameraZ: 5.2,
  wobble: false
}, {
  id: "work-model-3",
  path: "../models/gadget_-_player_-_storage_device.glb",
  scale: 2.5,
  floating: false,
  yOffset: 0,
  cameraZ: 5.2,
  wobble: false
}, {
  id: "work-model-4",
  path: "../models/work-model-4.glb",
  scale: 2.5,
  floating: false,
  yOffset: 0,
  cameraZ: 5.2,
  wobble: false
}, {
  id: "work-model-5",
  path: "../models/work-model-5.glb",
  scale: 2.5,
  floating: false,
  yOffset: 0,
  cameraZ: 5.2,
  wobble: false
}, {
  id: "work-model-6",
  path: "../models/work-model-6.glb",
  scale: 2.5,
  floating: false,
  yOffset: 0,
  cameraZ: 5.2,
  wobble: false
}, {
  id: "skills-model-html",
  path: "../models/html5_logo.glb",
  scale: 2.2,
  floating: true,
  yOffset: 0.1,
  cameraZ: 4.8,
  wobble: false,
  rotateX: 0,
  rotateY: -1.57,
  rotateZ: 0
}, {
  id: "skills-model-css",
  path: "../models/css_logo_3d_model.glb",
  scale: 2.2,
  floating: true,
  yOffset: 0.1,
  cameraZ: 4.8,
  wobble: false
}, {
  id: "skills-model-js",
  path: "../models/react_logo.glb",
  scale: 2.2,
  floating: true,
  yOffset: 0.1,
  cameraZ: 5,
  wobble: false
}, {
  id: "skills-model-three",
  path: "../models/javascript_.glb",
  scale: 2.2,
  floating: true,
  yOffset: 0.1,
  cameraZ: 4.8,
  wobble: false
}, {
  id: "skills-model-figma",
  path: "../models/figma.glb",
  scale: 2.2,
  floating: true,
  yOffset: 0.1,
  cameraZ: 4.8,
  wobble: false,
  rotateX: 0,
  rotateY: -1.57,
  rotateZ: -5
}, {
  id: "skills-model-github",
  path: "../models/3d_github_logo.glb",
  scale: 2.1,
  floating: true,
  yOffset: 0.08,
  cameraZ: 5.1,
  wobble: false
}];

function create3DScene(config) {
  var container = document.getElementById(config.id);
  if (!container) return;
  var scene = new THREE.Scene();
  var width = container.clientWidth;
  var height = container.clientHeight;
  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0.2, config.cameraZ || 4.5);
  var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  var controls = new _OrbitControls.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableRotate = false;
  var ambientLight = new THREE.AmbientLight(0xffffff, config.id === "hero-model" ? 2.2 : 1.4);
  scene.add(ambientLight);
  var directionalLight = new THREE.DirectionalLight(0xffffff, config.id === "hero-model" ? 2.8 : 1.8);
  directionalLight.position.set(3, 5, 5);
  scene.add(directionalLight);
  var backLight = new THREE.DirectionalLight(0xffffff, config.id === "hero-model" ? 1.4 : 0.8);
  backLight.position.set(-3, 2, -4);
  scene.add(backLight);

  if (config.id === "hero-model") {
    var heroTopLight = new THREE.DirectionalLight(0xffffff, 2.2);
    heroTopLight.position.set(0, 6, 2);
    scene.add(heroTopLight);
    var heroSideLight = new THREE.PointLight(0xb96bff, 2.2, 20);
    heroSideLight.position.set(4, 2, 4);
    scene.add(heroSideLight);
    var heroFillLight = new THREE.PointLight(0xffffff, 1.4, 18);
    heroFillLight.position.set(-4, 1, 3);
    scene.add(heroFillLight);
  }

  var loader = new _GLTFLoader.GLTFLoader();
  var pivot = null;
  var baseY = 0;
  var clock = new THREE.Clock();
  var isSkillModel = config.id.startsWith("skills-model-");
  var isWorkModel = config.id.startsWith("work-model-");
  loader.load(config.path, function (gltf) {
    var rawModel = gltf.scene;
    var box = new THREE.Box3().setFromObject(rawModel);
    var size = box.getSize(new THREE.Vector3());
    var maxAxis = Math.max(size.x, size.y, size.z);
    var finalScale = config.scale / maxAxis;
    rawModel.scale.setScalar(finalScale);
    var scaledBox = new THREE.Box3().setFromObject(rawModel);
    var scaledCenter = scaledBox.getCenter(new THREE.Vector3());
    rawModel.position.x -= scaledCenter.x;
    rawModel.position.y -= scaledCenter.y;
    rawModel.position.z -= scaledCenter.z;
    rawModel.rotation.x = config.rotateX || 0;
    rawModel.rotation.y = config.rotateY || 0;
    rawModel.rotation.z = config.rotateZ || 0;
    pivot = new THREE.Group();
    pivot.position.y = config.yOffset || 0;
    pivot.add(rawModel);
    baseY = pivot.position.y;
    scene.add(pivot);
  }, function (xhr) {
    if (xhr.total) {
      console.log("".concat(config.id, ": ").concat(xhr.loaded / xhr.total * 100, "% loaded"));
    }
  }, function (error) {
    console.error("Error loading model in ".concat(config.id, ":"), error);
  });

  function animate() {
    requestAnimationFrame(animate);
    var elapsed = clock.getElapsedTime();
    var preview = isWorkModel ? container : null;
    var isPreviewActive = preview ? preview.classList.contains("active-preview") : false;
    var isActiveSkillsModel = isSkillModel ? container.classList.contains("is-active") : false;

    if (pivot) {
      if (isSkillModel) {
        pivot.position.y = baseY + Math.sin(elapsed * 1.7) * 0.08;
        pivot.rotation.z = 0;

        if (isActiveSkillsModel) {
          pivot.rotation.y += 0.012;
        }
      } else if (isWorkModel) {
        pivot.position.y = baseY + Math.sin(elapsed * 1.5) * 0.08;

        if (isPreviewActive) {
          pivot.rotation.y += 0.018;
        }

        pivot.rotation.z = 0;
      } else if (config.floating) {
        pivot.position.y = baseY + Math.sin(elapsed * 1.6) * 0.12;

        if (config.id === "hero-model") {
          pivot.rotation.y += 0.012;
          pivot.rotation.z = 0;
        } else {
          pivot.rotation.y += 0.01;
          pivot.rotation.z = config.wobble ? Math.sin(elapsed * 1.2) * 0.08 : 0;
        }
      } else {
        pivot.rotation.y += 0.008;
        pivot.rotation.z = 0;
      }
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();
  window.addEventListener("resize", function () {
    var newWidth = container.clientWidth;
    var newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}

modelConfigs.forEach(create3DScene);
var workItems = document.querySelectorAll(".work-item");
var workPreviews = document.querySelectorAll(".work-preview-model");
var workProgressFill = document.querySelector(".work-progress-fill");
var workPreviewTitle = document.querySelector(".work-preview-title");

function updateWorkProgress(activeItem) {
  if (!workProgressFill || !activeItem) return;
  var listWrap = document.querySelector(".work-list");
  if (!listWrap) return;
  var itemTop = activeItem.offsetTop;
  var itemHeight = activeItem.offsetHeight;
  workProgressFill.style.height = "".concat(itemHeight * 0.72, "px");
  workProgressFill.style.transform = "translateY(".concat(itemTop + itemHeight * 0.14, "px)");
}

function setActiveWorkItem(item) {
  var activeId = item.dataset.model;
  var activeTitle = item.dataset.title || "Project";
  workItems.forEach(function (workItem) {
    workItem.classList.toggle("is-active", workItem === item);
  });
  workPreviews.forEach(function (preview) {
    preview.classList.toggle("active-preview", preview.id === activeId);
  });

  if (workPreviewTitle) {
    workPreviewTitle.style.opacity = "0";
    workPreviewTitle.style.transform = "translateY(8px)";
    setTimeout(function () {
      workPreviewTitle.textContent = activeTitle;
      workPreviewTitle.style.opacity = "1";
      workPreviewTitle.style.transform = "translateY(0)";
    }, 140);
  }

  updateWorkProgress(item);
}

workItems.forEach(function (item) {
  item.addEventListener("mouseenter", function () {
    setActiveWorkItem(item);
  });
  item.addEventListener("focus", function () {
    setActiveWorkItem(item);
  });
});
window.addEventListener("load", function () {
  var firstActive = document.querySelector(".work-item.is-active") || workItems[0];
  if (firstActive) setActiveWorkItem(firstActive);
});
var themedSections = document.querySelectorAll(".section-theme");
var themeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    var theme = entry.target.dataset.theme;

    if (theme) {
      document.body.setAttribute("data-theme", theme);
    }
  });
}, {
  threshold: 0.45
});
themedSections.forEach(function (section) {
  return themeObserver.observe(section);
});
var revealTargets = document.querySelectorAll(".reveal-up, .reveal-scale");
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-visible");
    } else {
      entry.target.classList.remove("reveal-visible");
    }
  });
}, {
  threshold: 0.18,
  rootMargin: "0px 0px -8% 0px"
});
revealTargets.forEach(function (target) {
  return revealObserver.observe(target);
});
/* SKILLS SHOWCASE SWITCHER */

var skillTabs = document.querySelectorAll(".skill-tab");
var skillData = {
  html: {
    label: "Frontend",
    count: "01 / 06",
    title: "HTML",
    text: "Structure, semantics, accessibility and clean page layouts.",
    modelId: "skills-model-html"
  },
  css: {
    label: "Styling",
    count: "02 / 06",
    title: "CSS",
    text: "Responsive layouts, animations, spacing and visual polish.",
    modelId: "skills-model-css"
  },
  js: {
    label: "Interaction",
    count: "03 / 06",
    title: "JavaScript",
    text: "Interactive experiences, logic and dynamic UI behavior.",
    modelId: "skills-model-js"
  },
  three: {
    label: "3D / Web",
    count: "04 / 06",
    title: "Three.js",
    text: "3D scenes, models, motion and immersive portfolio visuals.",
    modelId: "skills-model-three"
  },
  figma: {
    label: "Design",
    count: "05 / 06",
    title: "Figma",
    text: "Wireframes, UI design, layout exploration and iterations.",
    modelId: "skills-model-figma"
  },
  github: {
    label: "Version Control",
    count: "06 / 06",
    title: "GitHub",
    text: "Repositories, version control, backups and structured project workflow.",
    modelId: "skills-model-github"
  }
};
var skillsPanelLabel = document.getElementById("skills-panel-label");
var skillsPanelCount = document.getElementById("skills-panel-count");
var skillsPanelTitle = document.getElementById("skills-panel-title");
var skillsPanelText = document.getElementById("skills-panel-text");
var skillsPanelModels = document.querySelectorAll(".skills-panel-model");
var skillsPanelCopy = document.querySelector(".skills-panel-copy");
var skillsSwitchTimeout = null;

function setActiveSkill(skillKey) {
  var skill = skillData[skillKey];
  if (!skill) return;
  skillTabs.forEach(function (tab) {
    tab.classList.toggle("is-active", tab.dataset.skill === skillKey);
  });
  skillsPanelModels.forEach(function (model) {
    model.classList.toggle("is-active", model.id === skill.modelId);
  });

  if (!skillsPanelCopy) {
    if (skillsPanelLabel) skillsPanelLabel.textContent = skill.label;
    if (skillsPanelCount) skillsPanelCount.textContent = skill.count;
    if (skillsPanelTitle) skillsPanelTitle.textContent = skill.title;
    if (skillsPanelText) skillsPanelText.textContent = skill.text;
    return;
  }

  skillsPanelCopy.classList.add("is-switching");
  clearTimeout(skillsSwitchTimeout);
  skillsSwitchTimeout = setTimeout(function () {
    if (skillsPanelLabel) skillsPanelLabel.textContent = skill.label;
    if (skillsPanelCount) skillsPanelCount.textContent = skill.count;
    if (skillsPanelTitle) skillsPanelTitle.textContent = skill.title;
    if (skillsPanelText) skillsPanelText.textContent = skill.text;
    skillsPanelCopy.classList.remove("is-switching");
  }, 180);
}

skillTabs.forEach(function (tab) {
  tab.addEventListener("mouseenter", function () {
    setActiveSkill(tab.dataset.skill);
  });
  tab.addEventListener("click", function () {
    setActiveSkill(tab.dataset.skill);
  });
  tab.addEventListener("focus", function () {
    setActiveSkill(tab.dataset.skill);
  });
});
setActiveSkill("html");
/* CTA BALLPIT - PREMIUM VERSION */

var ctaBallpitCanvas = document.getElementById("cta-ballpit");

if (ctaBallpitCanvas) {
  var resizeBallpit = function resizeBallpit() {
    var section = ctaBallpitCanvas.parentElement;
    var rect = section.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctaBallpitCanvas.width = rect.width * dpr;
    ctaBallpitCanvas.height = rect.height * dpr;
    ctaBallpitCanvas.style.width = "".concat(rect.width, "px");
    ctaBallpitCanvas.style.height = "".concat(rect.height, "px");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  };

  var createBalls = function createBalls() {
    balls.length = 0;
    var width = ctaBallpitCanvas.clientWidth;
    var height = ctaBallpitCanvas.clientHeight;
    var palette = ["rgba(255,255,255,0.96)", "rgba(232,232,236,0.94)", "rgba(184,184,190,0.88)", "rgba(88,58,255,0.92)", "rgba(66,42,190,0.92)", "rgba(44,34,110,0.92)"];

    for (var i = 0; i < BALL_COUNT; i++) {
      var isLarge = Math.random() > 0.72;
      balls.push({
        x: Math.random() * width,
        y: height * (0.72 + Math.random() * 0.22),
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 1.2,
        r: isLarge ? 28 + Math.random() * 26 : 14 + Math.random() * 20,
        color: palette[Math.floor(Math.random() * palette.length)]
      });
    }
  };

  var drawBall = function drawBall(ball) {
    var outerGlow = ctx.createRadialGradient(ball.x - ball.r * 0.28, ball.y - ball.r * 0.28, ball.r * 0.12, ball.x, ball.y, ball.r);
    outerGlow.addColorStop(0, "rgba(255,255,255,0.85)");
    outerGlow.addColorStop(0.22, "rgba(255,255,255,0.35)");
    outerGlow.addColorStop(0.5, ball.color);
    outerGlow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.beginPath();
    ctx.fillStyle = outerGlow;
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = ball.color;
    ctx.globalAlpha = 0.92;
    ctx.arc(ball.x, ball.y, ball.r * 0.82, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    var highlight = ctx.createRadialGradient(ball.x - ball.r * 0.35, ball.y - ball.r * 0.35, 1, ball.x - ball.r * 0.35, ball.y - ball.r * 0.35, ball.r * 0.5);
    highlight.addColorStop(0, "rgba(255,255,255,0.95)");
    highlight.addColorStop(0.35, "rgba(255,255,255,0.35)");
    highlight.addColorStop(1, "rgba(255,255,255,0)");
    ctx.beginPath();
    ctx.fillStyle = highlight;
    ctx.arc(ball.x - ball.r * 0.18, ball.y - ball.r * 0.18, ball.r * 0.42, 0, Math.PI * 2);
    ctx.fill();
  };

  var updateBall = function updateBall(ball, width, height) {
    ball.vy += GRAVITY * ball.r * 0.03;
    ball.vx *= FRICTION;
    ball.vy *= FRICTION;
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x - ball.r < 0) {
      ball.x = ball.r;
      ball.vx *= -WALL_BOUNCE;
    }

    if (ball.x + ball.r > width) {
      ball.x = width - ball.r;
      ball.vx *= -WALL_BOUNCE;
    }

    if (ball.y - ball.r < 0) {
      ball.y = ball.r;
      ball.vy *= -WALL_BOUNCE;
    }

    if (ball.y + ball.r > height) {
      ball.y = height - ball.r;
      ball.vy *= -WALL_BOUNCE;
    }
  };

  var resolveCollisions = function resolveCollisions() {
    for (var i = 0; i < balls.length; i++) {
      for (var j = i + 1; j < balls.length; j++) {
        var a = balls[i];
        var b = balls[j];
        var dx = b.x - a.x;
        var dy = b.y - a.y;
        var dist = Math.hypot(dx, dy);
        var minDist = a.r + b.r;

        if (dist < minDist && dist > 0) {
          var angle = Math.atan2(dy, dx);
          var overlap = (minDist - dist) * 0.5;
          var ox = Math.cos(angle) * overlap;
          var oy = Math.sin(angle) * overlap;
          a.x -= ox;
          a.y -= oy;
          b.x += ox;
          b.y += oy;
          var ax = a.vx;
          var ay = a.vy;
          a.vx = b.vx * 0.98;
          a.vy = b.vy * 0.98;
          b.vx = ax * 0.98;
          b.vy = ay * 0.98;
        }
      }
    }
  };

  var animateBallpit = function animateBallpit() {
    var width = ctaBallpitCanvas.clientWidth;
    var height = ctaBallpitCanvas.clientHeight;
    ctx.clearRect(0, 0, width, height);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = balls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var ball = _step.value;
        updateBall(ball, width, height);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    resolveCollisions();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = balls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _ball = _step2.value;
        drawBall(_ball);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    requestAnimationFrame(animateBallpit);
  };

  var ctx = ctaBallpitCanvas.getContext("2d");
  var balls = [];
  var BALL_COUNT = 68;
  var GRAVITY = 0.0045;
  var FRICTION = 0.9965;
  var WALL_BOUNCE = 0.9;
  resizeBallpit();
  createBalls();
  animateBallpit();
  window.addEventListener("resize", function () {
    resizeBallpit();
    createBalls();
  });
}
//# sourceMappingURL=three.dev.js.map
