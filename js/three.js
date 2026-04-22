import * as THREE from "https://unpkg.com/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const modelConfigs = [
  {
    id: "hero-model",
    path: "../models/scene.glb",
    scale: 2.5,
    floating: true,
    yOffset: 0.1,
    cameraZ: 5.8,
    wobble: true
  },
  {
    id: "work-model-1",
    path: "../models/work-model-1.glb",
    scale: 2.2,
    floating: false,
    yOffset: 0,
    cameraZ: 4,
    wobble: false
  },
  {
    id: "work-model-2",
    path: "../models/work-model-2.glb",
    scale: 2.2,
    floating: false,
    yOffset: 0,
    cameraZ: 4,
    wobble: false
  },
  {
    id: "work-model-3",
    path: "../models/work-model-3.glb",
    scale: 2.2,
    floating: false,
    yOffset: 0,
    cameraZ: 4,
    wobble: false
  },
  {
    id: "work-model-4",
    path: "../models/work-model-4.glb",
    scale: 2.2,
    floating: false,
    yOffset: 0,
    cameraZ: 4,
    wobble: false
  },
  {
    id: "work-model-5",
    path: "../models/work-model-5.glb",
    scale: 2.2,
    floating: false,
    yOffset: 0,
    cameraZ: 4,
    wobble: false
  },
  {
    id: "work-model-6",
    path: "../models/work-model-6.glb",
    scale: 2.2,
    floating: false,
    yOffset: 0,
    cameraZ: 4,
    wobble: false
  },
  {
    id: "about-model",
    path: "../models/gadget_-_player_-_storage_device.glb",
    scale: 6,
    floating: true,
    yOffset: 0.6,
    cameraZ: 4.6,
    wobble: true
  },

  {
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
},
  {
    id: "skills-model-css",
    path: "../models/css_logo_3d_model.glb",
    scale: 2.2,
    floating: true,
    yOffset: 0.1,
    cameraZ: 4.8,
    wobble: false
  },
  {
    id: "skills-model-js",
    path: "../models/react_logo.glb",
    scale: 2.2,
    floating: true,
    yOffset: 0.1,
    cameraZ: 5,
    wobble: false
  },
  {
    id: "skills-model-three",
    path: "../models/javascript_.glb",
    scale: 2.2,
    floating: true,
    yOffset: 0.1,
    cameraZ: 4.8,
    wobble: false
  },
  {
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
  },
  {
    id: "skills-model-github",
    path: "../models/3d_github_logo.glb",
    scale: 2.1,
    floating: true,
    yOffset: 0.08,
    cameraZ: 5.1,
    wobble: false
  }
];

function create3DScene(config) {
  const container = document.getElementById(config.id);
  if (!container) return;

  const scene = new THREE.Scene();

  const width = container.clientWidth;
  const height = container.clientHeight;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0.2, config.cameraZ || 4.5);

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

  let pivot = null;
  let baseY = 0;
  const clock = new THREE.Clock();

  const isSkillModel = config.id.startsWith("skills-model-");
  const card = isSkillModel ? container.closest(".skill-card") : null;
  let isCardHovered = false;

  if (card) {
    card.addEventListener("mouseenter", () => {
      isCardHovered = true;
    });

    card.addEventListener("mouseleave", () => {
      isCardHovered = false;
    });
  }

  loader.load(
    config.path,
    function (gltf) {
      const rawModel = gltf.scene;

      const box = new THREE.Box3().setFromObject(rawModel);
      const size = box.getSize(new THREE.Vector3());
      const maxAxis = Math.max(size.x, size.y, size.z);

      const finalScale = config.scale / maxAxis;
      rawModel.scale.setScalar(finalScale);

      const scaledBox = new THREE.Box3().setFromObject(rawModel);
      const scaledCenter = scaledBox.getCenter(new THREE.Vector3());

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

  function normalizeAngle(angle) {
    while (angle > Math.PI) angle -= Math.PI * 2;
    while (angle < -Math.PI) angle += Math.PI * 2;
    return angle;
  }

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    if (pivot) {
      if (isSkillModel) {
        pivot.position.y = baseY + Math.sin(elapsed * 1.8) * 0.1;
        pivot.rotation.z = 0;

        if (isCardHovered) {
          pivot.rotation.y += 0.04;
        } else {
          const targetRotation = 0;
          const currentRotation = normalizeAngle(pivot.rotation.y);
          pivot.rotation.y += (targetRotation - currentRotation) * 0.08;
        }
      } else if (config.floating) {
        pivot.position.y = baseY + Math.sin(elapsed * 1.6) * 0.12;
        pivot.rotation.y += 0.01;

        if (config.wobble) {
          pivot.rotation.z = Math.sin(elapsed * 1.2) * 0.08;
        } else {
          pivot.rotation.z = 0;
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

  window.addEventListener("resize", () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}

modelConfigs.forEach(create3DScene);