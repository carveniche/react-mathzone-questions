import { useEffect, useState } from "react";
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
const recursevelyCall = (data) => {
  if (Array.isArray(data)) {
    let arr = [];
    let i = 0;
    for (let item of data) {
      arr[i] = recursevelyCall(item);
      i++;
    }
    return arr;
  } else if (typeof data === "object") {
    let coordiantes = {
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
    };
    if (data.isMissed) coordiantes = getCoordinate(data?.el || "");

    return coordiantes;
  }
  return {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
  };
};
export default function useDropContainerSizeHook(data) {
  const [coordinate, setCoordiante] = useState([]);
  const calculateDropBoxSize = (dragData) => {
    let arr = recursevelyCall(dragData);
    setCoordiante([...arr]);
  };

  useEffect(() => {
    if (data.length) calculateDropBoxSize(data);
  }, [data?.length]);
  return [coordinate];
}
