import { touchType } from "./touchEvent";

export function dragdropPointCordinate(e) {
  let pageY = window.scrollY || document.documentElement.scrollTop;
  let pageX = window.scrollX || document.documentElement.scrollLeft;
  if (touchType.includes(e?.type)) {
    let touchPointes = e?.originalEvent ?? e;
    var touch = touchPointes.touches[0] || touchPointes.changedTouches[0];

    var mouseX = touch.pageX - pageX;
    var mouseY = touch.pageY - pageY;
  } else {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  return [mouseX, mouseY];
}
