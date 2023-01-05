import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ----- 주제: OrbitControls

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

  //   카메라 이동을 부드럽게 해주는 메서드
  //   매번 반복되는 실행을 해줘야해 draw에 update 를 추가해줘야한다.
  controls.enableDamping = true;
  //   zoom in out 불가능 하게
  //   controls.enableZoom = false;
  // 최대, 최소 거리 제한
  //   controls.maxDistance = 10;
  //   controls.minDistance = 2;
  //   각도 제한
  //   controls.minPolarAngle = Math.PI / 4; //45도
  //   controls.minPolarAngle = THREE.MathUtils.degToRad(45);
  // 자동 움직임
  controls.autoRotate = true;
  controls.autoRotateSpeed = 5;

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  let mesh;
  let material;

  for (let i = 0; i < 20; i++) {
    material = new THREE.MeshStandardMaterial({
      color: `rgb(
		${50 + Math.floor(Math.random() * 205)},
		${50 + Math.floor(Math.random() * 205)},
		${50 + Math.floor(Math.random() * 205)}
	  )`,
      side: THREE.DoubleSide,
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 5;
    mesh.position.y = (Math.random() - 0.5) * 5;
    mesh.position.z = (Math.random() - 0.5) * 5;
    scene.add(mesh);
  }

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    // controls를 조작하려면 update를 해줘야한다.
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
