import * as THREE from "https://unpkg.com/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const modelConfigs = [
  {
    id: "hero-model",
    path: "../models/soviet_retro_tv.glb",
    scale: 3
  },
  {
    id: "work-model-1",
    path: "../models/work-model-1.glb",
    scale: 2.2
  },
  {
    id: "work-model-2",
    path: "../models/work-model-2.glb",
    scale: 2.2
  },
  {
    id: "work-model-3",
    path: "../models/work-model-3.glb",
    scale: 2.2
  },
  {
    id: "work-model-4",
    path: "../models/work-model-4.glb",
    scale: 2.2
  },
  {
    id: "work-model-5",
    path: "../models/work-model-5.glb",
    scale: 2.2
  },
  {
    id: "work-model-6",
    path: "../models/work-model-6.glb",
    scale: 2.2
  },
  {
    id: "about-model",
    path: "../models/about-model.glb",
    scale: 3
  },
  {
    id: "skills-model",
    path: "../models/html5_logo.glb",
    scale: 3
  }
];

function create3DScene(config) {
  const container = document.getElementById(config.id);
  if (!container) return;

  const scene = new THREE.Scene();

  const width = container.clientWidth;
  const height = container.clientHeight;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 1, 4);

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
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(3, 5, 5);
  scene.add(directionalLight);

  const loader = new GLTFLoader();

  loader.load(
    config.path,
    function (gltf) {
      const model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      model.position.x -= center.x;
      model.position.y -= center.y;
      model.position.z -= center.z;

      const maxAxis = Math.max(size.x, size.y, size.z);
      const finalScale = config.scale / maxAxis;
      model.scale.setScalar(finalScale);

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