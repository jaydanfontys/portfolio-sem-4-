const container = document.getElementById("threejs-container-ANIMATION_17");

if (container && window.THREE) {
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const group = new THREE.Group();
  group.position.x = 0;
  scene.add(group);

  const coreGeometry = new THREE.IcosahedronGeometry(1.55, 2);
  const coreMaterial = new THREE.MeshPhongMaterial({
    color: 0xbd00ff,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
    emissive: 0x330044
  });

  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  group.add(coreMesh);

  for (let i = 0; i < 85; i++) {
   const spikeGeo = new THREE.ConeGeometry(0.03, Math.random() * 1.0 + 0.4, 8);
    const spikeMat = new THREE.MeshStandardMaterial({
      color: 0xff00ff,
      emissive: 0xff00ff,
      emissiveIntensity: 1.8
    });

    const spike = new THREE.Mesh(spikeGeo, spikeMat);

    const phi = Math.acos(-1 + (2 * i) / 85);
    const theta = Math.sqrt(85 * Math.PI) * phi;

    spike.position.setFromSphericalCoords(1.85 + Math.random() * 0.25, phi, theta);
    spike.lookAt(0, 0, 0);
    spike.rotateX(Math.PI / 2);

    group.add(spike);
  }

  const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xff00ff, 2.4, 60);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const pointLightTwo = new THREE.PointLight(0xbd00ff, 1.2, 40);
  pointLightTwo.position.set(-5, -3, 4);
  scene.add(pointLightTwo);

  const mouse = {
    x: 0,
    y: 0
  };

  window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  function animate() {
    requestAnimationFrame(animate);

    group.rotation.y += 0.002;
    group.rotation.x += 0.001;

    group.rotation.y += mouse.x * 0.006;
    group.rotation.x += -mouse.y * 0.006;

    renderer.render(scene, camera);
  }

  window.addEventListener("resize", () => {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setSize(w, h);
  });

  animate();
}