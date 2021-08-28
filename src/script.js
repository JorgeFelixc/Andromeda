import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { AnimationMenu, AnimationTitle } from "./scripts/animations";
import { particleType } from "./scripts/particles";

// Teture loader
const loader = new THREE.TextureLoader();
const cross = loader.load("./star.png");

// Debug
// const gui = new dat.GUI();

// Consants
const particlesLength = 50000;

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const geometryParticles = new THREE.BufferGeometry();

const postArray = new Float32Array(particlesLength * 3);
// xyz, xyz, xyz

for (let i = 0; i < particlesLength * 3; i++) {
  postArray[i] = (Math.random() - 0.5) * (Math.random() * 5);
  //   postArray[i] = Math.tan(i * 0.00008) + Math.sin(i * 0.8) - 0.9;
  // postArray[i] = Math.tan(i * 0.00008) + Math.sin(i * 0.8) - 0.9;
  //   postArray[i] = Math.tan(i * 0.006) * Math.sin(i * 1.3) - 0.9;
  //   postArray[i] =
  //     Math.tan(i * 0.00008) * Math.sin(i * 1.3) * Math.sinh(i * 0.000004) - 0.9;
}

geometryParticles.setAttribute(
  "position",
  new THREE.BufferAttribute(postArray, 3)
);

// Materials
// const material = new THREE.MeshBasicMaterial();
// material.color = new THREE.Color(0xff0000);

const materialStar = new THREE.PointsMaterial({
  size: 0.005,
  color: "#074552",
  map: cross,
  transparent: true,
});

const material = new THREE.PointsMaterial({
  size: 0.005,
});

// Mesh
const sphere = new THREE.Points(geometry, material);
const particlesMesh = new THREE.Points(geometryParticles, materialStar);
scene.add(particlesMesh);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("black", 1);

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()
  particlesMesh.rotation.y = 0.05 * elapsedTime;
  particlesMesh.rotation.x = 52.9;
  //   particlesMesh.rotation.z = 0.05 * elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

export const updateParticles = (typeParticles) => {
  const bufferArray =
    particleType[typeParticles] && particleType[typeParticles]();
  geometryParticles.setAttribute(
    "position",
    new THREE.BufferAttribute(bufferArray, 3)
  );
};

/** ANIME JS */
AnimationTitle();
AnimationMenu();
