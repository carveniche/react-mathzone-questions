import React from "react";
import MatchObjectHorizontal from "./MatchObjectHorizontal";

export default function MainMatchObjectHorizontalEqn({obj,meter}) {
  let totalRows = Number(obj?.rows) || 0;
 
  let arr = [];
  for (let i = 0; i < totalRows; i++) {
    obj?.questionContent[i]?.map((item, j) => {
      item?.row == i && item?.col == j && arr.push({ ...item });
     });
   
  }
  let temp = { ...obj, questionContent: [...arr] };
  return (
    <MatchObjectHorizontal
      state={temp}
      totalRows={temp?.rows}
      totalCols={temp?.cols}
      meter={meter}
    />
   
  );
}
