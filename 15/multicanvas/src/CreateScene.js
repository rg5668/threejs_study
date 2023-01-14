import { Color, PerspectiveCamera, Scene } from "three";

export class CreateScene {
  constructor(info) {
    this.renderer = info.renderer;
    this.elem = document.querySelector(info.placeholder);
    // 위치 크기를 알수 있는 메서드
    const rect = this.elem.getBoundingClientRect();
    // console.log(rect);

    const bgColor = info.bgColor || "white";
    // 시야각
    const fov = info.fov || 75;
    // 화면 비율
    const aspect = rect.width / rect.height;
    const near = info.near || 0.1;
    const far = info.far || 100;

    const cameraPosition = info.cameraPosition || { x: 0, y: 0, z: 3 };

    // scene
    this.scene = new Scene();
    this.scene.background = new Color(bgColor);

    // 카메라
    this.camera = new PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.x = cameraPosition.x;
    this.camera.position.y = cameraPosition.y;
    this.camera.position.z = cameraPosition.z;

    this.scene.add(this.camera);
  }

  set(func) {
    func();
  }

  render() {
    const renderer = this.renderer;
    const rect = this.elem.getBoundingClientRect();

    if (
      rect.bottom < 0 ||
      rect.top > renderer.domElement.clientHeight ||
      rect.left > renderer.domElement.clientWidth ||
      rect.right < 0
    ) {
      return;
    }

    const canvasBottom = renderer.domElement.clientHeight - rect.bottom;
    renderer.setScissor(rect.left, canvasBottom, rect.width, rect.height);
    renderer.setScissorTest(true);
    renderer.setViewport(rect.left, canvasBottom, rect.width, rect.height);

    renderer.render(this.scene, this.camera);
  }
}
