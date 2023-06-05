import React from "react";

import DisabledMainOptMultPicEqn from "../DisabledOptMultPicEqn/DisabledMainOptMultPicEqn";
import DisabledOptionMultipleChoice from "./DisabledOptionMultipleChoice";
// let obj = {
//   operation: "addition",
//   type: "options_multiple_pictures",
//   questionName:
//     "Find the rate of compound interest for $ 10,000 amounts to $ 11,000 in two years.",
//   row: 1,
//   col: 4,
//   questionContent: [
//     [
//       {
//         row: 1,
//         col: 1,
//         value: "8%",
//         selected: "true",
//       },
//       {
//         row: 1,
//         col: 2,
//         value: "5%",
//         selected: "false",
//       },
//       {
//         row: 1,
//         col: 3,
//         value: "7%",
//         selected: "false",
//       },
//       {
//         row: 1,
//         col: 4,
//         value: "11%",
//         selected: "false",
//       },
//     ],
//   ],
//   solution: {
//     model: [
//       {
//         val: "\u003cdiv\u003eLet the rate of compound interest be r% per annum.\u003c/div\u003e\u003cdiv\u003eA = P(1+r/100)^n\u003c/div\u003e\u003cdiv\u003ethe required rate of compound interest is 8 % per annum.\u003c/div\u003e",
//       },
//       {
//         val: "",
//       },
//     ],
//   },
// };
export default function DisabledOptionMultiplePictureMain({ obj, meter }) {
  let str = JSON.stringify(obj);
  return !str.includes("mq-selectable") ? (
    <>
      <DisabledOptionMultipleChoice
        state={obj}
        totalRows={obj.row}
        meter={meter}
      />
    </>
  ) : (
    <DisabledMainOptMultPicEqn obj={obj} totalRows={obj.row} meter={meter} />
  );
}
