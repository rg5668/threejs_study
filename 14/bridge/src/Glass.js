import { Mesh } from "three";
import { cm1, geo, mat, sounds } from "./common";
import { Stuff } from "./Stuff";

export class Glass extends Stuff {
  constructor(info) {
    super(info);

    this.type = info.type;
    this.step = info.step;

    this.geometry = geo.glass;

    switch (this.type) {
      case "normal":
        this.material = mat.glass1;
        this.mass = 1;
        break;
      case "strong":
        this.material = mat.glass2;
        this.mass = 0;
        break;
    }

    this.width = this.geometry.parameters.width;
    this.height = this.geometry.parameters.height;
    this.depth = this.geometry.parameters.depth;

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(this.x, this.y, this.z);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.step = this.step;
    this.mesh.name = this.name;
    this.mesh.type = this.type;

    cm1.scene.add(this.mesh);

    this.setCannonBody();

    this.cannonBody.addEventListener("collide", playSound);

    const sound = sounds[this.type];
    function playSound(e) {
      // 충돌할떄 강도를 알 수 있음.
      const strength = e.contact.getImpactVelocityAlongNormal();
      if (strength > 5) {
        // 임팩트가 있을때마다 재생 플레이 되게 하기
        sound.currentTime = 0;
        sound.play();
      }
    }
  }
}
