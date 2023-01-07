import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";

// ----- 주제: Light 와 그림자 설정

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // 그림자 설정
  renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFShadowMap; //기본값
  // renderer.shadowMap.type = THREE.BasicShadowMap; //픽셀값 보이게 (자글 거리게?)
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap; //부드럽게

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

  const light = new THREE.DirectionalLight("white", 0.5);
  light.position.y = 3;
  scene.add(light);

  // 그림자 설정
  light.castShadow = true;
  // 그림자 선명하게
  light.shadow.mapSize.width = 1024; //기본값 512
  light.shadow.mapSize.height = 1024;
  // 블러처리?부드럽게
  light.shadow.radius = 5;
  // 라이트 최대 거리
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 10;

  //   라이트가 어디에 있는지 확인
  const lightHelper = new THREE.DirectionalLightHelper(light);
  scene.add(lightHelper);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Geometry
  const planeGeoMetry = new THREE.PlaneGeometry(10, 10);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);

  //  Material
  const material1 = new THREE.MeshStandardMaterial({
    color: "white",
  });
  const material2 = new THREE.MeshStandardMaterial({
    color: "royalblue",
  });
  const material3 = new THREE.MeshStandardMaterial({
    color: "gold",
  });

  //   Mesh
  const plane = new THREE.Mesh(planeGeoMetry, material1);
  const box = new THREE.Mesh(boxGeometry, material2);
  const sphere = new THREE.Mesh(sphereGeometry, material3);

  plane.rotation.x = -Math.PI * 0.5;
  box.position.set(1, 1, 0);
  sphere.position.set(-1, 1, 0);

  // 그림자 설정
  plane.receiveShadow = true;
  box.castShadow = true;
  box.receiveShadow = true;
  sphere.castShadow = true;
  sphere.receiveShadow = true;

  scene.add(plane, box, sphere);

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);

  // Dat GUI
  const gui = new dat.GUI();
  gui.add(light.position, "x", -5, 5).name("조명 X");
  gui.add(light.position, "y", -5, 5).name("조명 Y");
  gui.add(light.position, "z", -5, 5).name("조명 Z");

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    // const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // light.position.x = Math.cos(time) * 5;
    // light.position.z = Math.sin(time) * 5;

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
