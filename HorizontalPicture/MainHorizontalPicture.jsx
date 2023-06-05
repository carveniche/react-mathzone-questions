import React, { useEffect } from "react";
import HorizontalFillUps from "../HorizontalFillUps/HorizontalFillUps";

// let obj = {
//   operation: "addition",
//   type: "horizontalpicture",
//   rows: "1",
//   cols: "3",
//   questionName:
//     "Arrange the numbers which have 2 in the thousands places from smallest to largest",
//   questionContent: [
//     [
//       { row: 0, col: 0, value: "12456", isMissed: "true" },
//       { row: 0, col: 1, value: "12556", isMissed: "false" },
//       { row: 0, col: 2, value: "12656", isMissed: "false" },
//     ],
//   ],
//   solution: {
//     model: [{ val: "12456 \u0026lt; 12556 \u0026lt; 12656" }],
//     sidebyside: [],
//     srows: null,
//     scols: null,
//   },
//   choices: ["24622", "12656", "12556", "12456", "11455", "21545"],
//   choiceType: "selectchoice",
//   choiceCount: 6,
// };
export default function MainHorizontalPicture({obj,meter}) {
  let temp = {};

  try {
    temp = JSON.parse(obj?.question_text);
  } catch (e) {
    temp = obj;
  }
  let arr = [];
  temp?.questionContent?.map((items) =>
    items?.map((item) => arr.push({ ...item }))
  );
  temp = { ...temp, questionContent: [...arr] };
  return (
    <HorizontalFillUps
      state={temp}
      totalRows={temp.rows}
      totalCols={temp.cols}
      meter={meter}
      questionType="horizontalPicture"
    />
  );
}
