import * as THREE from "three";

// 주제: Fog(안개)

const example = () => {
  // html에서 캔버스 가져와서 사용하기
  const canvas = document.querySelector("#three-canvas");
  // antialias는 부드럽게 만들어줌
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 고화질 선명하게 pixel 늘려주는 방법 (ex: 실제로는 200px인데 화면에는 100px 압축해서 고밀도 이미지)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("black", 3, 7);

  // Camera (Perspective Camera 원근 카메라)
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, //near
    1000 // far
  );
  // 카메라 방향
  //   camera.position.x = 2;
  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  //   빛
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 5;
  scene.add(light);

  // Mesh
  //모양
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  //재질 (MeshBasicMaterial 이 재질은 빛에 반응하지 않는 재질)
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
  });

  const meshes = [];
  let mesh;
  for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }

  // 그리기
  let time = Date.now();
  //   애니메이션 만들기(함수로)
  const draw = () => {
    const newTime = Date.now();
    const deltaTime = newTime - time;
    time = newTime;
    meshes.forEach((item) => {
      item.rotation.y += deltaTime * 0.001;
    });
    renderer.render(scene, camera);
    // window.requestAnimationFrame(draw);

    // setAnimationLoop는 같은 기능을 하지만 VR, AR에 적합하다. (공식문서)
    renderer.setAnimationLoop(draw);
  };
  //   renderer.render(scene, camera);

  const setSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    // updateProjectionMatrix 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야한다.
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };
  //   이벤트 추가 (반응형)
  window.addEventListener("resize", setSize);
  draw();
};

export default example;
