import React from "react";
import DsbMainMatchObjVertEqn from "../../DisabledEqnMatchObjVert/DsbMainMatchObjVertEqn";
import MatchObjectVertical from "./MatchObjectVertical";

export default function DisabledTeacherMainMatchObjectVertical({obj,meter}) {
  let totalRows = Number(obj?.rows) || 0;
 
  let arr = [];
  for (let i = 0; i < totalRows; i++) {
    obj?.questionContent[i]?.map((item, j) => {
      item?.row == i && item?.col == j && arr.push({ ...item });
     });
   
  }
  let temp = { ...obj, questionContent: [...arr] };
  let str=JSON.stringify(obj)
  return !str.includes("mq-selectable")?
    <MatchObjectVertical
      state={temp}
      totalRows={temp?.rows}
      totalCols={temp?.cols}
      meter={meter}
    />:<DsbMainMatchObjVertEqn obj={obj} meter={meter} />
}
