"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var THREE = _interopRequireWildcard(require("https://unpkg.com/three@0.129.0/build/three.module.js"));

var _OrbitControls = require("https://unpkg.com/three@0.129.0/examples/jsm/controls/OrbitControls.js");

var _GLTFLoader = require("https://unpkg.com/three@0.129.0/examples/jsm/loaders/GLTFLoader.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var modelConfigs = [{
  id: "hero-model",
  path: "../models/soviet_retro_tv.glb",
  scale: 3
}, {
  id: "work-model-1",
  path: "../models/work-model-1.glb",
  scale: 2.2
}, {
  id: "work-model-2",
  path: "../models/work-model-2.glb",
  scale: 2.2
}, {
  id: "work-model-3",
  path: "../models/work-model-3.glb",
  scale: 2.2
}, {
  id: "work-model-4",
  path: "../models/work-model-4.glb",
  scale: 2.2
}, {
  id: "work-model-5",
  path: "../models/work-model-5.glb",
  scale: 2.2
}, {
  id: "work-model-6",
  path: "../models/work-model-6.glb",
  scale: 2.2
}, {
  id: "about-model",
  path: "../models/about-model.glb",
  scale: 3
}, {
  id: "skills-model",
  path: "../models/html5_logo.glb",
  scale: 3
}];

function create3DScene(config) {
  var container = document.getElementById(config.id);
  if (!container) return;
  var scene = new THREE.Scene();
  var width = container.clientWidth;
  var height = container.clientHeight;
  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 1, 4);
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
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;
  var ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(3, 5, 5);
  scene.add(directionalLight);
  var loader = new _GLTFLoader.GLTFLoader();
  loader.load(config.path, function (gltf) {
    var model = gltf.scene;
    var box = new THREE.Box3().setFromObject(model);
    var size = box.getSize(new THREE.Vector3());
    var center = box.getCenter(new THREE.Vector3());
    model.position.x -= center.x;
    model.position.y -= center.y;
    model.position.z -= center.z;
    var maxAxis = Math.max(size.x, size.y, size.z);
    var finalScale = config.scale / maxAxis;
    model.scale.setScalar(finalScale);
    scene.add(model);
  }, function (xhr) {
    if (xhr.total) {
      console.log("".concat(config.id, ": ").concat(xhr.loaded / xhr.total * 100, "% loaded"));
    }
  }, function (error) {
    console.error("Error loading model in ".concat(config.id, ":"), error);
  });

  function animate() {
    requestAnimationFrame(animate);
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
//# sourceMappingURL=three.dev.js.map
