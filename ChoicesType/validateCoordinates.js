export const validateCoordiante = (boxes, { x, y }) => {
 
  let twoDArray = boxes;
  if (!Array.isArray(twoDArray[0])) {
    twoDArray = [boxes];
  }
  for (let i = 0; i < twoDArray.length; i++) {

    for (let j = 0; j < twoDArray[i].length; j++) {
      const { x0, y0, x1, y1 } = getCoordinate(twoDArray[i][j]?.el || "");

     if (x + 20  >= x0 && x <= x1 + 20 && y + 20 >= y0 && y <= y1 + 20) {

        return [i, j];
        
      }
    }
  }
  return [-1, -1];
};
const getCoordinate = (el) => {
  let coordiantes = {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
  };
  if (el) {
    let dimension = el.getBoundingClientRect();
    coordiantes = {
      x0: dimension.left,
      x1: dimension.right,
      y0: dimension.top,
      y1: dimension.bottom,
    };
  }
  return coordiantes;
};
