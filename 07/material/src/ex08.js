import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ----- 주제: 텍스처 이미지 변환

export default function example() {
  // 텍스쳐 이미지 로드
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onStart = () => {
    console.log("로딩 시작");
  };
  loadingManager.onProgress = (img) => {
    console.log(img + " 로딩");
  };
  loadingManager.onLoad = () => {
    console.log("로딩 완료");
  };
  loadingManager.onError = () => {
    console.log("로딩 에러");
  };

  // 웹팩에서 허용해야됨.
  const textureLoader = new THREE.TextureLoader(loadingManager);
  const texture = textureLoader.load(
    "/textures/skull/Ground Skull_basecolor.jpg"
  );

  // 텍스쳐 번환
  // 늘어난 이미지 같은 배경?느낌으로 채우주는 역활
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // // 이미지 이동
  // texture.offset.x = 0.3;
  // texture.offset.y = 0.3;

  // // 이미지 분할?
  // texture.repeat.x = 2;
  // texture.repeat.y = 2;

  // 이미지 각도
  // texture.rotation = Math.PI * 0.25;
  texture.rotation = THREE.MathUtils.degToRad(60);
  // 회전할때 중심측에서만 회전하게 하는 방법
  texture.center.x = 0.5;
  texture.center.y = 0.5;

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
  scene.background = new THREE.Color("white");

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

  // Mesh
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshStandardMaterial({
    // color: "orangered",
    // 텍스쳐
    map: texture,
  });
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

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
