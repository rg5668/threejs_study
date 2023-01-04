import * as THREE from "three";

// 브라우저 창 사이즈 변경에 대응하기 (반응형)

const example = () => {
  // html에서 캔버스 가져와서 사용하기
  const canvas = document.querySelector("#three-canvas");
  // antialias는 부드럽게 만들어줌
  //   alpha 배경색 투명하게
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 고화질 선명하게 pixel 늘려주는 방법 (ex: 실제로는 200px인데 화면에는 100px 압축해서 고밀도 이미지)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // css로 조정된 백그라운컬러 불투명도 조절
  //   renderer.setClearAlpha(0.5);

  //   renderer.setClearColor(0x00ff00);
  //   renderer.setClearAlpha(0.5);

  // Scene
  const scene = new THREE.Scene();
  //   scene에 백그라운드 설정도 할 수 있다 (랜더러보다 우선순위가 높다.)
  scene.background = new THREE.Color("blue");

  // Camera (Perspective Camera 원근 카메라)
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, //near
    1000 // far
  );
  // 카메라 방향
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;

  // Camera (Orthographic Camera 원근 카메라)
  //   const camera = new THREE.OrthographicCamera(
  //     -(window.innerWidth / window.innerHeight), //left
  //     window.innerWidth / window.innerHeight, //right
  //     1, //top
  //     -1, //bottom
  //     0.1,
  //     1000
  //   );
  //   camera.position.x = 1;
  //   camera.position.y = 2;
  //   camera.position.z = 5;

  // lookAt을 사용하면 카메라 이동(원점으로)
  camera.lookAt(0, 0, 0);
  camera.zoom = 0.5;

  // 카메라 설정하면 업데이트를 해줘야한다.
  camera.updateProjectionMatrix();
  scene.add(camera);

  // Mesh
  //모양
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  //재질
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

  const setSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    // updateProjectionMatrix 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야한다.
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };
  //   이벤트 추가 (반응형)
  window.addEventListener("resize", setSize);
};

export default example;
