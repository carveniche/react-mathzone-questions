import React from "react";
import RandomArrangmentDragDrop from "./RandomArrangmentDragDrop";
// let obj = {
//   operation: "addition",
//   type: "randomarrangementdragdrop",
//   questionName:
//     "Count the buses in each group.\u003cdiv\u003eDrag the numbers to match the number of buses.\u003c/div\u003e",
//   row: 1,
//   col: 2,
//   questionContent: [
//     [
//       {
//         row: 0,
//         col: 0,
//         isMissed: "true",
//         img: '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/Vehicles/Bus.png"\u003e',
//         count: "7",
//       },
//       {
//         row: 0,
//         col: 1,
//         isMissed: "false",
//         img: '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/Vehicles/Bus.png"\u003e',
//         count: "6",
//       },
//     ],
//   ],
//   solution: { model: [{ val: "There are 7 and 6 buses" }] },
//   choices: ["7", "6", "8", "9"],
//   choiceType: "selectchoice",
// };

export default function DisabledTeacherMainRandomArrangmentDragDrop({obj,meter}) {
  let totalRows = Number(obj?.row) || 0;
 
  let arr = [];
  for (let i = 0; i < totalRows; i++) {
    obj?.questionContent[i]?.map((item, j) => {
      item?.row == i && item?.col == j && arr.push({ ...item });
     });
  
  }
  
  let temp = { ...obj, questionContent: [...arr] };
  
  return (
    <RandomArrangmentDragDrop
      state={temp}
      totalRows={temp?.row}
      totalCols={temp?.col}
      meter={meter}
    />
   
  );
}
