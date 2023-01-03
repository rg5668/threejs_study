import * as THREE from "three";

const example = () => {
  // js에서 랜더러
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  // html에서 캔버스 가져와서 사용하기
  const canvas = document.querySelector("#three-canvas");
  // antialias는 부드럽게 만들어줌
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Scene
  const scene = new THREE.Scene();

  // Camera (Perspective Camera 원근 카메라)
  // const camera = new THREE.PerspectiveCamera(
  //   75, // 시야각
  //   window.innerWidth / window.innerHeight, // 종횡비(aspect)
  //   0.1, //near
  //   1000 // far
  // );
  // // 카메라 방향
  // camera.position.x = 1;
  // camera.position.y = 2;
  // camera.position.z = 5;

  // Camera (Orthographic Camera 원근 카메라)
  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), //left
    window.innerWidth / window.innerHeight, //right
    1, //top
    -1, //bottom
    0.1,
    1000
  );
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
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
};

export default example;
