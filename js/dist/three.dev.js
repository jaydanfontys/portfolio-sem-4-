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
  var card = isSkillModel ? container.closest(".skill-card") : null;
  var isCardHovered = false;

  if (card) {
    card.addEventListener("mouseenter", function () {
      isCardHovered = true;
    });
    card.addEventListener("mouseleave", function () {
      isCardHovered = false;
    });
  }

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

  function normalizeAngle(angle) {
    while (angle > Math.PI) {
      angle -= Math.PI * 2;
    }

    while (angle < -Math.PI) {
      angle += Math.PI * 2;
    }

    return angle;
  }

  function animate() {
    requestAnimationFrame(animate);
    var elapsed = clock.getElapsedTime();
    var preview = isWorkModel ? container : null;
    var isPreviewActive = preview ? preview.classList.contains("active-preview") : false;

    if (pivot) {
      if (isSkillModel) {
        pivot.position.y = baseY + Math.sin(elapsed * 1.8) * 0.1;
        pivot.rotation.z = 0;

        if (isCardHovered) {
          pivot.rotation.y += 0.04;
        } else {
          var targetRotation = 0;
          var currentRotation = normalizeAngle(pivot.rotation.y);
          pivot.rotation.y += (targetRotation - currentRotation) * 0.08;
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
//# sourceMappingURL=three.dev.js.map
