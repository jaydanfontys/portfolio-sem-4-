import * as THREE from "https://unpkg.com/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const modelConfigs = [
  {
    id: "hero-model",
    path: "../models/scene.glb",
    scale: 3,
    floating: true
  },
  {
    id: "work-model-1",
    path: "../models/work-model-1.glb",
    scale: 2.2,
    floating: false
  },
  {
    id: "work-model-2",
    path: "../models/work-model-2.glb",
    scale: 2.2,
    floating: false
  },
  {
    id: "work-model-3",
    path: "../models/work-model-3.glb",
    scale: 2.2,
    floating: false
  },
  {
    id: "work-model-4",
    path: "../models/work-model-4.glb",
    scale: 2.2,
    floating: false
  },
  {
    id: "work-model-5",
    path: "../models/work-model-5.glb",
    scale: 2.2,
    floating: false
  },
  {
    id: "work-model-6",
    path: "../models/work-model-6.glb",
    scale: 2.2,
    floating: false
  },
  {
    id: "about-model",
    path: "../models/about-model.glb",
    scale: 3,
    floating: true
  },

  /* skills cards */
  {
    id: "skills-model-html",
    path: "../models/html5_logo.glb",
    scale: 2.4,
    floating: true
  },
  {
    id: "skills-model-css",
    path: "../models/css_logo_3d_model.glb",
    scale: 2.4,
    floating: true
  },
  {
    id: "skills-model-js",
    path: "../models/react_logo.glb",
    scale: 2.4,
    floating: true
  },
  {
    id: "skills-model-three",
    path: "../models/javascript_.glb",
    scale: 2.4,
    floating: true
  },
  {
    id: "skills-model-figma",
    path: "../models/figma.glb",
    scale: 2.4,
    floating: true
  },
  {
  id: "skills-model-github",
  path: "../models/3d_github_logo.glb",
  scale: 2.4,
  floating: true
}
];

function create3DScene(config) {
  const container = document.getElementById(config.id);
  if (!container) return;

  const scene = new THREE.Scene();

  const width = container.clientWidth;
  const height = container.clientHeight;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0.5, 4);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableRotate = false;

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
  directionalLight.position.set(3, 5, 5);
  scene.add(directionalLight);

  const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
  backLight.position.set(-3, 2, -4);
  scene.add(backLight);

  const loader = new GLTFLoader();

  let model = null;
  let baseY = 0;
  const clock = new THREE.Clock();

  loader.load(
    config.path,
    function (gltf) {
      model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      model.position.x -= center.x;
      model.position.y -= center.y - 1;
      model.position.z -= center.z;

      const maxAxis = Math.max(size.x, size.y, size.z);
      const finalScale = config.scale / maxAxis;
      model.scale.setScalar(finalScale);

      baseY = model.position.y;
      scene.add(model);
    },
    function (xhr) {
      if (xhr.total) {
        console.log(`${config.id}: ${(xhr.loaded / xhr.total) * 100}% loaded`);
      }
    },
    function (error) {
      console.error(`Error loading model in ${config.id}:`, error);
    }
  );

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    if (model) {
      if (config.floating) {
        model.position.y = baseY + Math.sin(elapsed * 1.6) * 0.12;
        model.rotation.y += 0.01;
        model.rotation.z = Math.sin(elapsed * 1.2) * 0.08;
      } else {
        model.rotation.y += 0.008;
      }
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}

modelConfigs.forEach(create3DScene);