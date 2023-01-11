import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ----- 주제: 랜덤 파티클

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Mesh
  const geometry = new THREE.BufferGeometry();
  const count = 1000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < positions.length; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3)); //1개의 Vertex(정점)를 위해 값 3개 필요

  const material = new THREE.PointsMaterial({
    size: 0.03,
    color: "white",
  });
  const particles = new THREE.Points(geometry, material);

  const sphereGeometry = new THREE.SphereGeometry(0.5);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: "green",
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(particles, sphere);

  const sphereGeometry1 = new THREE.SphereGeometry(0.5);
  const sphereMaterial1 = new THREE.MeshStandardMaterial({
    color: "gray",
  });
  const sphere1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1);
  scene.add(particles, sphere1);
  sphere1.position.x = -2;
  sphere1.position.y = -2;

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    particles.rotation.x += delta;
    particles.rotation.y += delta;

    controls.update();

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
