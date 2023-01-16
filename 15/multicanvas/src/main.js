import * as THREE from "three";
import { CreateScene } from "./CreateScene";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// ----- 주제: 여러개의 캔버스 사용하기

// Renderer
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// GLTFLoader
const gltfLoader = new GLTFLoader();

const scene1 = new CreateScene({
  renderer: renderer,
  placeholder: ".canvas-placeholder.a",
  // cameraPosition: { x: -1, y: 1, z: 2 },
});

scene1.set(() => {
  // 조명 추가, 메쉬 추가
  const light = new THREE.DirectionalLight("white", 1);
  light.position.set(-1, 2, 3);
  // scene1.scene.add(light);
  // 카메라에 라이트 달기
  scene1.camera.add(light);

  scene1.controls = new OrbitControls(scene1.camera, scene1.elem);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "green",
  });
  const mesh = new THREE.Mesh(geometry, material);
  // draw에서 OrbitControls 하기 위해서 배열을 속성으로 추가
  scene1.meshes.push(mesh);
  scene1.meshes.forEach((mesh) => scene1.scene.add(mesh));
  // scene1.scene.add(mesh);
});

const scene2 = new CreateScene({
  renderer: renderer,
  placeholder: ".canvas-placeholder.b",
  // cameraPosition: { x: -1, y: 1, z: 2 },
});

scene2.set(() => {
  // 조명 추가, 메쉬 추가
  const light = new THREE.DirectionalLight("white", 1);
  light.position.set(-1, 2, 3);
  // scene1.scene.add(light);
  // 카메라에 라이트 달기
  scene2.camera.add(light);

  scene2.controls = new OrbitControls(scene2.camera, scene2.elem);

  const geometry = new THREE.BoxGeometry(0.4, 1, 0.7);
  const material = new THREE.MeshStandardMaterial({
    color: "red",
  });
  const mesh = new THREE.Mesh(geometry, material);
  // draw에서 OrbitControls 하기 위해서 배열을 속성으로 추가
  scene2.meshes.push(mesh);
  scene2.meshes.forEach((mesh) => scene2.scene.add(mesh));
  // scene1.scene.add(mesh);
});

const scene3 = new CreateScene({
  renderer: renderer,
  placeholder: ".canvas-placeholder.c",
  // cameraPosition: { x: -1, y: 1, z: 2 },
});

scene3.set(() => {
  // 조명 추가, 메쉬 추가
  const light = new THREE.DirectionalLight("white", 1);
  light.position.set(-1, 2, 3);
  // scene1.scene.add(light);
  // 카메라에 라이트 달기
  scene3.camera.add(light);

  scene3.controls = new OrbitControls(scene3.camera, scene3.elem);

  // GLTFLoader
  gltfLoader.load("./models/ilbuni.glb", (glb) => {
    const mesh = glb.scene.children[0];
    scene3.meshes.push(mesh);
    scene3.scene.add(mesh);
  });
});

// 그리기
const clock = new THREE.Clock();

function draw() {
  const delta = clock.getDelta();

  scene1.meshes.forEach((mesh) => {
    mesh.rotation.y += delta;
  });

  scene2.meshes.forEach((mesh) => {
    mesh.rotation.x += delta;
  });

  //   renderer.render(scene, camera);
  scene1.render();
  scene2.render();
  scene3.render();
  renderer.setAnimationLoop(draw);
}

function setSize() {
  // camera.aspect = window.innerWidth / window.innerHeight;
  // camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   renderer.render(scene, camera);
}

// 이벤트
window.addEventListener("resize", setSize);

draw();
