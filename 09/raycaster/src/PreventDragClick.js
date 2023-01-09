export class PreventDragClick {
  constructor(elem) {
    // let mouseMoved; //마우스 드래그 했는지 t/f
    // this를 사용하면 PreventDragClick 인스턴스에 속성으로 사용된다.
    this.mouseMoved;

    let clickStartX;
    let clickStartY;
    let clickStartTime;

    elem.addEventListener("mousedown", (e) => {
      clickStartX = e.clientX;
      clickStartY = e.clientY;
      clickStartTime = Date.now();
    });

    elem.addEventListener("mouseup", (e) => {
      const xGap = Math.abs(e.clientX - clickStartX);
      const yGap = Math.abs(e.clientY - clickStartY);
      const timeGap = Date.now() - clickStartTime;

      console.log(xGap, yGap, timeGap);
      if (xGap > 5 || yGap > 5 || timeGap > 500) {
        this.mouseMoved = true;
      } else {
        this.mouseMoved = false;
      }
    });
  }
}
