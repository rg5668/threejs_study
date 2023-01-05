import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ----- 주제: Geometry 기본

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
  camera.position.z = 10;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // OrbitControls
  //   줌인 줌아웃 가능
  const controls = new OrbitControls(camera, renderer.domElement);

  // Mesh
  const geometry = new THREE.SphereGeometry(5, 64, 64);
  //   side를 하면 줌인해도 카메라가 아웃되지 않음
  const material = new THREE.MeshStandardMaterial({
    color: "yellow",
    side: THREE.DoubleSide,
    // wireframe: true,
    flatShading: true, //울퉁불퉁한 질감
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // console.log(geometry.attributes.position.array);
  const positionArray = geometry.attributes.position.array;
  // 랜덤 값 만들기
  const randomArray = [];

  for (let i = 0; i < positionArray.length; i += 3) {
    // 정적(Vertex) 한 개의 x,y,z 좌표를 랜덤으로 조정
    positionArray[i] += (Math.random() - 0.5) * 0.2;
    positionArray[i + 1] += (Math.random() - 0.5) * 0.2;
    positionArray[i + 2] += (Math.random() - 0.5) * 0.2;

    // 랜덤
    randomArray[i] = (Math.random() - 0.5) * 0.2;
    randomArray[i + 1] = (Math.random() - 0.5) * 0.2;
    randomArray[i + 2] = (Math.random() - 0.5) * 0.2;
  }

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    // const delta = clock.getDelta();
    const time = clock.getElapsedTime() * 5;

    for (let i = 0; i < positionArray.length; i += 3) {
      positionArray[i] += Math.sin(time + randomArray[i] * 100) * 0.002;
      positionArray[i + 1] += Math.sin(time + randomArray[i + 1] * 100) * 0.002;
      positionArray[i + 2] += Math.sin(time + randomArray[i + 2] * 100) * 0.002;
    }

    // 위 포문은 한 번만 실행이 되는데 계속 실행되게 하려면 update 를 해줘야지 실행
    geometry.attributes.position.needsUpdate = true;

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
