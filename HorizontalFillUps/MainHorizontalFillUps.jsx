import React from "react";
import MainHorizontalFillUpsEquationType from "../HorizontalFillUpsEquationType/MainHorizontalFillUpsEquationType";
import HorizontalFillUps from "./HorizontalFillUps";
// let obj = {
//   operation: "addition",
//   type: "horizontal_fill _ups",
//   rows: "1",
//   cols: "3",
//   questionName: "Choose the two tens between which the number lies.",
//   questionContent: [
//     { row: 0, col: 0, value: "70", isMissed: "false" },
//     { row: 0, col: 1, value: "73", isMissed: "false" },
//     { row: 0, col: 2, value: "80", isMissed: "true" },
//   ],
//   solution: {
//     model: [{ val: "70 and 80 number lies" }],
//     sidebyside: [],
//     srows: null,
//     scols: null,
//   },
//   choices: ["80", "60", "70", "90"],
//   choiceType: "selectchoice",
//   choiceCount: 4,
// };

export default function MainHorizontalFillUps({obj,meter}) {
  let str=JSON.stringify(obj)

  return str.includes("mq-selectable")?<MainHorizontalFillUpsEquationType obj={obj} meter={meter}/>:<HorizontalFillUps state={obj} totalRows={obj.rows} totalCols={obj.cols} meter={meter}/>
  
}
