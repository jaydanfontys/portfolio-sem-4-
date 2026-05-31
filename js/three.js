import * as THREE from "https://unpkg.com/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

document.body.setAttribute("data-theme", "hero");

const modelConfigs = [
  {
    id: "hero-model",
    path: "../models/chromed_crown.glb",
    scale: 4.2,
    floating: true,
    yOffset: 0.25,
    cameraZ: 7.2,
    wobble: false
  },
  {
    id: "work-model-1",
    path: "../models/soviet_retro_tv.glb",
    scale: 2.5,
    floating: false,
    yOffset: 0,
    cameraZ: 5.2,
    wobble: false
  },
  {
    id: "work-model-2",
    path: "../models/gopro_10.glb",
    scale: 2.5,
    floating: false,
    yOffset: 0,
    cameraZ: 5.2,
    wobble: false
  },
  {
    id: "work-model-3",
    path: "../models/gadget_-_player_-_storage_device.glb",
    scale: 2.5,
    floating: false,
    yOffset: 0,
    cameraZ: 5.2,
    wobble: false
  },
  {
    id: "work-model-4",
    path: "../models/work-model-4.glb",
    scale: 2.5,
    floating: false,
    yOffset: 0,
    cameraZ: 5.2,
    wobble: false
  },
  {
    id: "work-model-5",
    path: "../models/work-model-5.glb",
    scale: 2.5,
    floating: false,
    yOffset: 0,
    cameraZ: 5.2,
    wobble: false
  },
  {
    id: "work-model-6",
    path: "../models/work-model-6.glb",
    scale: 2.5,
    floating: false,
    yOffset: 0,
    cameraZ: 5.2,
    wobble: false
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

  const ambientLight = new THREE.AmbientLight(
    0xffffff,
    config.id === "hero-model" ? 2.2 : 1.4
  );
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    config.id === "hero-model" ? 2.8 : 1.8
  );
  directionalLight.position.set(3, 5, 5);
  scene.add(directionalLight);

  const backLight = new THREE.DirectionalLight(
    0xffffff,
    config.id === "hero-model" ? 1.4 : 0.8
  );
  backLight.position.set(-3, 2, -4);
  scene.add(backLight);

  if (config.id === "hero-model") {
    const heroTopLight = new THREE.DirectionalLight(0xffffff, 2.2);
    heroTopLight.position.set(0, 6, 2);
    scene.add(heroTopLight);

    const heroSideLight = new THREE.PointLight(0xb96bff, 2.2, 20);
    heroSideLight.position.set(4, 2, 4);
    scene.add(heroSideLight);

    const heroFillLight = new THREE.PointLight(0xffffff, 1.4, 18);
    heroFillLight.position.set(-4, 1, 3);
    scene.add(heroFillLight);
  }

  const loader = new GLTFLoader();

  let pivot = null;
  let baseY = 0;
  const clock = new THREE.Clock();

  const isSkillModel = config.id.startsWith("skills-model-");
  const isWorkModel = config.id.startsWith("work-model-");

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

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();
    const preview = isWorkModel ? container : null;
    const isPreviewActive = preview
      ? preview.classList.contains("active-preview")
      : false;
    const isActiveSkillsModel = isSkillModel
      ? container.classList.contains("is-active")
      : false;

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
          pivot.rotation.z = config.wobble
            ? Math.sin(elapsed * 1.2) * 0.08
            : 0;
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

const workItems = document.querySelectorAll(".work-item");
const workPreviews = document.querySelectorAll(".work-preview-model");
const workProgressFill = document.querySelector(".work-progress-fill");
const workPreviewTitle = document.querySelector(".work-preview-title");

function updateWorkProgress(activeItem) {
  if (!workProgressFill || !activeItem) return;

  const listWrap = document.querySelector(".work-list");
  if (!listWrap) return;

  const itemTop = activeItem.offsetTop;
  const itemHeight = activeItem.offsetHeight;

  workProgressFill.style.height = `${itemHeight * 0.72}px`;
  workProgressFill.style.transform = `translateY(${itemTop + itemHeight * 0.14}px)`;
}

function setActiveWorkItem(item) {
  const activeId = item.dataset.model;
  const activeTitle = item.dataset.title || "Project";

  workItems.forEach((workItem) => {
    workItem.classList.toggle("is-active", workItem === item);
  });

  workPreviews.forEach((preview) => {
    preview.classList.toggle("active-preview", preview.id === activeId);
  });

  if (workPreviewTitle) {
    workPreviewTitle.style.opacity = "0";
    workPreviewTitle.style.transform = "translateY(8px)";
    setTimeout(() => {
      workPreviewTitle.textContent = activeTitle;
      workPreviewTitle.style.opacity = "1";
      workPreviewTitle.style.transform = "translateY(0)";
    }, 140);
  }

  updateWorkProgress(item);
}

workItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    setActiveWorkItem(item);
  });

  item.addEventListener("focus", () => {
    setActiveWorkItem(item);
  });
});

window.addEventListener("load", () => {
  const firstActive = document.querySelector(".work-item.is-active") || workItems[0];
  if (firstActive) setActiveWorkItem(firstActive);
});

const themedSections = document.querySelectorAll(".section-theme");

const themeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const theme = entry.target.dataset.theme;
      if (theme) {
        document.body.setAttribute("data-theme", theme);
      }
    });
  },
  {
    threshold: 0.45
  }
);

themedSections.forEach((section) => themeObserver.observe(section));

const revealTargets = document.querySelectorAll(".reveal-up, .reveal-scale");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
      } else {
        entry.target.classList.remove("reveal-visible");
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px"
  }
);

revealTargets.forEach((target) => revealObserver.observe(target));

/* SKILLS SHOWCASE SWITCHER */
const skillTabs = document.querySelectorAll(".skill-tab");

const skillData = {
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

const skillsPanelLabel = document.getElementById("skills-panel-label");
const skillsPanelCount = document.getElementById("skills-panel-count");
const skillsPanelTitle = document.getElementById("skills-panel-title");
const skillsPanelText = document.getElementById("skills-panel-text");
const skillsPanelModels = document.querySelectorAll(".skills-panel-model");
const skillsPanelCopy = document.querySelector(".skills-panel-copy");

let skillsSwitchTimeout = null;

function setActiveSkill(skillKey) {
  const skill = skillData[skillKey];
  if (!skill) return;

  skillTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.skill === skillKey);
  });

  skillsPanelModels.forEach((model) => {
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
  skillsSwitchTimeout = setTimeout(() => {
    if (skillsPanelLabel) skillsPanelLabel.textContent = skill.label;
    if (skillsPanelCount) skillsPanelCount.textContent = skill.count;
    if (skillsPanelTitle) skillsPanelTitle.textContent = skill.title;
    if (skillsPanelText) skillsPanelText.textContent = skill.text;

    skillsPanelCopy.classList.remove("is-switching");
  }, 180);
}

skillTabs.forEach((tab) => {
  tab.addEventListener("mouseenter", () => {
    setActiveSkill(tab.dataset.skill);
  });

  tab.addEventListener("click", () => {
    setActiveSkill(tab.dataset.skill);
  });

  tab.addEventListener("focus", () => {
    setActiveSkill(tab.dataset.skill);
  });
});

setActiveSkill("html");

/* CTA BALLPIT - PREMIUM VERSION */
const ctaBallpitCanvas = document.getElementById("cta-ballpit");

if (ctaBallpitCanvas) {
  const ctx = ctaBallpitCanvas.getContext("2d");
  const balls = [];

  const BALL_COUNT = 68;
  const GRAVITY = 0.0045;
  const FRICTION = 0.9965;
  const WALL_BOUNCE = 0.9;

  function resizeBallpit() {
    const section = ctaBallpitCanvas.parentElement;
    const rect = section.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    ctaBallpitCanvas.width = rect.width * dpr;
    ctaBallpitCanvas.height = rect.height * dpr;
    ctaBallpitCanvas.style.width = `${rect.width}px`;
    ctaBallpitCanvas.style.height = `${rect.height}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  function createBalls() {
    balls.length = 0;
    const width = ctaBallpitCanvas.clientWidth;
    const height = ctaBallpitCanvas.clientHeight;

    const palette = [
      "rgba(255,255,255,0.96)",
      "rgba(232,232,236,0.94)",
      "rgba(184,184,190,0.88)",
      "rgba(88,58,255,0.92)",
      "rgba(66,42,190,0.92)",
      "rgba(44,34,110,0.92)"
    ];

    for (let i = 0; i < BALL_COUNT; i++) {
      const isLarge = Math.random() > 0.72;

      balls.push({
        x: Math.random() * width,
        y: height * (0.72 + Math.random() * 0.22),
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 1.2,
        r: isLarge ? 28 + Math.random() * 26 : 14 + Math.random() * 20,
        color: palette[Math.floor(Math.random() * palette.length)]
      });
    }
  }

  function drawBall(ball) {
    const outerGlow = ctx.createRadialGradient(
      ball.x - ball.r * 0.28,
      ball.y - ball.r * 0.28,
      ball.r * 0.12,
      ball.x,
      ball.y,
      ball.r
    );

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

    const highlight = ctx.createRadialGradient(
      ball.x - ball.r * 0.35,
      ball.y - ball.r * 0.35,
      1,
      ball.x - ball.r * 0.35,
      ball.y - ball.r * 0.35,
      ball.r * 0.5
    );

    highlight.addColorStop(0, "rgba(255,255,255,0.95)");
    highlight.addColorStop(0.35, "rgba(255,255,255,0.35)");
    highlight.addColorStop(1, "rgba(255,255,255,0)");

    ctx.beginPath();
    ctx.fillStyle = highlight;
    ctx.arc(
      ball.x - ball.r * 0.18,
      ball.y - ball.r * 0.18,
      ball.r * 0.42,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  function updateBall(ball, width, height) {
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
  }

  function resolveCollisions() {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i];
        const b = balls[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);
        const minDist = a.r + b.r;

        if (dist < minDist && dist > 0) {
          const angle = Math.atan2(dy, dx);
          const overlap = (minDist - dist) * 0.5;
          const ox = Math.cos(angle) * overlap;
          const oy = Math.sin(angle) * overlap;

          a.x -= ox;
          a.y -= oy;
          b.x += ox;
          b.y += oy;

          const ax = a.vx;
          const ay = a.vy;
          a.vx = b.vx * 0.98;
          a.vy = b.vy * 0.98;
          b.vx = ax * 0.98;
          b.vy = ay * 0.98;
        }
      }
    }
  }

  function animateBallpit() {
    const width = ctaBallpitCanvas.clientWidth;
    const height = ctaBallpitCanvas.clientHeight;

    ctx.clearRect(0, 0, width, height);

    for (const ball of balls) {
      updateBall(ball, width, height);
    }

    resolveCollisions();

    for (const ball of balls) {
      drawBall(ball);
    }

    requestAnimationFrame(animateBallpit);
  }

  resizeBallpit();
  createBalls();
  animateBallpit();

  window.addEventListener("resize", () => {
    resizeBallpit();
    createBalls();
  });
}