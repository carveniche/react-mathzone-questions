import React from "react";
import MainMatchObjectHorizontalEqn from "../MatchObjectHorizontalEquation/MainMatchObjectHorizontalEqn";
import MatchObjectHorizontal from "./MatchObjectHorizontal";
// let obj = {
//   "operation":"addition",
//   "type":"matchobjectshorizontal",
//   "rows":"1",
//   "cols":"2",
//   "questionName":"Classify the triangle by their sides",
//   "questionContent":[
//      [
//         {
//            "row":0,
//            "col":0,
//            "imgvalue":"<img src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/G3-Triangle-by-sides/TS21.png\">",
//            "numvalue":"Isosceles",
//            "isMissed":"true"
//         },
//         {
//            "row":0,
//            "col":1,
//            "imgvalue":"<img src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/G3-Triangle-by-sides/TS42.png\">",
//            "numvalue":"Scalene",
//            "isMissed":"false"
//         }
//      ]
//   ],
//   "solution":{
//      "model":[
//         {
//            "val":"Isosceles and Scalene"
//         }
//      ],
//      "sidebyside":[
        
//      ],
//      "srows":null,
//      "scols":null
//   },
//   "choices":[
//      "Isosceles",
//      "Equilateral",
//      "Scalene"
//   ],
//   "choiceType":"selectchoice",
//   "choiceCount":3
// }
export default function MainMatchObjectHorizontal({obj,meter}) {
  let totalRows = Number(obj?.rows) || 0;
 
  let arr = [];
  for (let i = 0; i < totalRows; i++) {
    obj?.questionContent[i]?.map((item, j) => {
      item?.row == i && item?.col == j && arr.push({ ...item });
     });
   
  }
  let temp = { ...obj, questionContent: [...arr] };
  let str=JSON.stringify(obj)
  return (
    str.includes("mq-selectable")?<MainMatchObjectHorizontalEqn  obj={obj} meter={meter}
    />:<MatchObjectHorizontal
      state={temp}
      totalRows={temp?.rows}
      totalCols={temp?.cols}
      meter={meter}
    />
   
  );
}
