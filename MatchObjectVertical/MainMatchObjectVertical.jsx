import React from "react";
import MainMatchObjVertEqn from "../EqnMatchObjVert/MainMatchObjVertEqn";
import MatchObjectVertical from "./MatchObjectVertical";
// let obj = {
//   operation: "addition",
//   type: "matchobjectsvertical",
//   rows: "3",
//   cols: "1",
//   questionName: "Drag and match&nbsp;<div>&nbsp;</div>",
//   questionContent: [
//     [
//       {
//         row: 0,
//         col: 0,
//         imgvalue: '<span style="text-align: start;">4632 - 10</span>',
//         numvalue: "4622",
//         isMissed: "false",
//       },
//     ],
//     [
//       {
//         row: 1,
//         col: 0,
//         imgvalue: '<span style="text-align: start;">4632 - 100</span>',
//         numvalue: "4532",
//         isMissed: "false",
//       },
//     ],
//     [
//       {
//         row: 2,
//         col: 0,
//         imgvalue: '<span style="text-align: start;">4632 - 1000</span>',
//         numvalue: "3632",
//         isMissed: "true",
//       },
//     ],
//   ],
//   solution: {
//     model: [
//       {
//         val: '<div style="font-size: 20px;">4632 - 10 = 4622</div><div style="font-size: 20px;"><br></div>',
//       },
//       {
//         val: '<div style="font-size: 20px;">4632 - 100 = 4532</div><div style="font-size: 20px;"><br></div>',
//       },
//       { val: '<span style="font-size: 20px;">4632 - 1000 = 3632</span>' },
//     ],
//     sidebyside: [],
//     srows: null,
//     scols: null,
//   },
//   choices: ["4552", "4622", "4532", "3632"],
//   choiceType: "keying",
//   choiceCount: 4,
// };

export default function MainMatchObjectVertical({obj,meter}) {
  let totalRows = Number(obj?.rows) || 0;
 
  let arr = [];
  for (let i = 0; i < totalRows; i++) {
    obj?.questionContent[i]?.map((item, j) => {
      item?.row == i && item?.col == j && arr.push({ ...item });
     });
   
  }
  let temp = { ...obj, questionContent: [...arr] };
  let str=JSON.stringify(obj)

  return !str.includes("mq-selectable")?<MatchObjectVertical
      state={temp}
      totalRows={temp?.rows}
      totalCols={temp?.cols}
      meter={meter}
    />:<MainMatchObjVertEqn obj={obj} meter={meter} />
   
  
}
