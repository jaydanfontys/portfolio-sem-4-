import * as THREE from "https://unpkg.com/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const video = document.createElement("video");
video.src = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
video.crossOrigin = "anonymous";
video.loop = true;
video.muted = true;
video.playsInline = true;
video.autoplay = true;
video.style.display = "none";
document.body.appendChild(video);
video.load();
video.addEventListener('loadeddata', () => console.log('Video loaded successfully'));
video.addEventListener('error', (e) => console.error('Video load error:', e));
video.play().catch((e) => console.log("Initial video play blocked:", e));

const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBFormat;
videoTexture.wrapS = THREE.ClampToEdgeWrapping;
videoTexture.wrapT = THREE.ClampToEdgeWrapping;
videoTexture.repeat.set(1, 1);
videoTexture.offset.set(0, 0);

// Material for the video plane
const videoMat = new THREE.MeshBasicMaterial({
  map: videoTexture,
  side: THREE.DoubleSide,
});

// Function to create a curved edge plane
function createCurvedEdgePlane(width, height, segments = 16) {
  const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
  const pos = geometry.attributes.position;
  const arr = pos.array;

  // Curve the edges inward
  for (let i = 0; i < arr.length; i += 3) {
    const x = arr[i];
    const y = arr[i + 1];

    // Normalize distance from center (0 at center, 1 at edge)
    const distX = Math.abs(x) / (width / 2);
    const distY = Math.abs(y) / (height / 2);
    const dist = Math.max(distX, distY);

    // Apply curve to outer portions
    if (dist > 0.4) {
      const curveInfluence = Math.pow((dist - 0.4) / 0.6, 2);
      arr[i + 2] = -curveInfluence * 0.15; // curve inward (negative Z)
    }
  }

  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

const modelConfigs = [
  {
  id: "hero-model",
  path: "../models/scene.glb",
  scale: 4.2,
  floating: true,
  yOffset: 0.25,
  cameraZ: 7.2,
  wobble: false
},,
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
    path: "../models/gopro_10.glb",
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

  // For hero-model video play on click
  if (config.id === "hero-model") {
    window.addEventListener(
      "click",
      () => {
        video.play().catch((e) => console.log("video play blocked:", e));
      },
      { once: true }
    );
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

      if (config.id === "hero-model") {
        // Create the curved video plane for the TV screen
        const videoPlane = new THREE.Mesh(createCurvedEdgePlane(1.2, 0.7), videoMat);

        // Position and scale the plane inside the model
        const box = new THREE.Box3().setFromObject(rawModel);
        const size = box.getSize(new THREE.Vector3());
        videoPlane.position.set(0, size.y * 0.63, size.z * 0.38);
        videoPlane.scale.set(size.x * 0.57, size.y * 0.7, 1);
        videoPlane.position.z += 0.01;

        rawModel.add(videoPlane);

        // Start video
        video.play().catch(() => {});

        // Debug: Add a visible debug plane to check if video texture works
        const debugPlane = new THREE.Mesh(
          new THREE.PlaneGeometry(3, 2),
          new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide })
        );
        debugPlane.position.set(0, size.y * 0.8, size.z * 1.5);
        scene.add(debugPlane);

        console.log("Video plane added to model, debug plane at", debugPlane.position);
      } else {
        // For other models, apply texture directly if needed
        rawModel.traverse((child) => {
          if (child.isMesh) {
            const name = child.name.toLowerCase();
            if (name.includes("screen") || name.includes("display") || name.includes("panel") || name.includes("monitor") || name.includes("tv") || name.includes("glass")) {
              child.material = new THREE.MeshBasicMaterial({
                map: videoTexture,
                toneMapped: false,
                side: THREE.FrontSide
              });
              child.material.needsUpdate = true;
            }
          }
        });
      }

      pivot = new THREE.Group();
      pivot.position.y = config.yOffset || 0;
      pivot.add(rawModel);

      baseY = pivot.position.y;
      scene.add(pivot);

      // Adjust camera for large models
      if (config.id === "about-model") {
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let newCameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2));
        newCameraZ *= 2.5; // Extra padding
        camera.position.set(0, maxDim * 0.35, newCameraZ);
        camera.near = maxDim / 100;
        camera.far = maxDim * 100;
        camera.updateProjectionMatrix();
        controls.target.set(0, 0, 0);
        controls.update();
        console.log("Adjusted camera for about-model: z =", newCameraZ, "model size:", size);
      }
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
        if (config.id === "hero-model") {
          pivot.rotation.y = 0;
          pivot.position.x = 0;
          if (config.wobble) {
            pivot.rotation.z = Math.sin(elapsed * 1.2) * 0.08;
          } else {
            pivot.rotation.z = 0;
          }
        } else {
          pivot.rotation.y += 0.01;
          if (config.wobble) {
            pivot.rotation.z = Math.sin(elapsed * 1.2) * 0.08;
          } else {
            pivot.rotation.z = 0;
          }
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
const workItems = document.querySelectorAll(".work-item");
const workPreviews = document.querySelectorAll(".work-preview-model");

const workObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const activeId = entry.target.dataset.model;

      workItems.forEach((item) => {
        item.classList.toggle("is-active", item === entry.target);
      });

      workPreviews.forEach((preview) => {
        preview.classList.toggle("active-preview", preview.id === activeId);
      });
    });
  },
  {
    threshold: 0.6
  }
);

workItems.forEach((item) => workObserver.observe(item));


modelConfigs.forEach(create3DScene);