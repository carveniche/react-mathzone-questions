export const validateCoordiante = (boxes, { x, y }) => {
  let twoDArray = boxes;
  if (!Array.isArray(twoDArray[0])) {
    twoDArray = [boxes];
  }
  for (let i = 0; i < twoDArray.length; i++) {
    for (let j = 0; j < twoDArray[i].length; j++) {
      const { x0, y0, x1, y1 } = twoDArray[i][j];
      console.log(x0, y0, x1, y1);
      if (x >= x0 && x <= x1 && y >= y0 && y <= y1) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
};
