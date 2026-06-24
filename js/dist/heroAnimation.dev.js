"use strict";

var container = document.getElementById("threejs-container-ANIMATION_17");

if (container && window.THREE) {
  var animate = function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += 0.002;
    group.rotation.x += 0.001;
    group.rotation.y += mouse.x * 0.006;
    group.rotation.x += -mouse.y * 0.006;
    renderer.render(scene, camera);
  };

  var width = container.clientWidth || window.innerWidth;
  var height = container.clientHeight || window.innerHeight;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;
  var renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  var group = new THREE.Group();
  group.position.x = 0;
  scene.add(group);
  var coreGeometry = new THREE.IcosahedronGeometry(1.55, 2);
  var coreMaterial = new THREE.MeshPhongMaterial({
    color: 0xbd00ff,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
    emissive: 0x330044
  });
  var coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  group.add(coreMesh);

  for (var i = 0; i < 85; i++) {
    var spikeGeo = new THREE.ConeGeometry(0.03, Math.random() * 1.0 + 0.4, 8);
    var spikeMat = new THREE.MeshStandardMaterial({
      color: 0xff00ff,
      emissive: 0xff00ff,
      emissiveIntensity: 1.8
    });
    var spike = new THREE.Mesh(spikeGeo, spikeMat);
    var phi = Math.acos(-1 + 2 * i / 85);
    var theta = Math.sqrt(85 * Math.PI) * phi;
    spike.position.setFromSphericalCoords(1.85 + Math.random() * 0.25, phi, theta);
    spike.lookAt(0, 0, 0);
    spike.rotateX(Math.PI / 2);
    group.add(spike);
  }

  var ambientLight = new THREE.AmbientLight(0x404040, 1.5);
  scene.add(ambientLight);
  var pointLight = new THREE.PointLight(0xff00ff, 2.4, 60);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  var pointLightTwo = new THREE.PointLight(0xbd00ff, 1.2, 40);
  pointLightTwo.position.set(-5, -3, 4);
  scene.add(pointLightTwo);
  var mouse = {
    x: 0,
    y: 0
  };
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX / window.innerWidth * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
  window.addEventListener("resize", function () {
    var w = container.clientWidth || window.innerWidth;
    var h = container.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  animate();
}
//# sourceMappingURL=heroAnimation.dev.js.map
