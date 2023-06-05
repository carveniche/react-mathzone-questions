import React, { useRef } from "react";
import numberSystemFormat from "../../CommonJSFiles/numberSystemFormat";
import PlaceValueChart from "./PlaceValueChart";
// let obj = {
//   operation: "addition",
//   type: "place_value_chart",
//   rows: "3",
//   cols: "2",
//   chartType: "indian",
//   system: "2",
//   questionName: "Subtract the tens and ones to find the difference.",
//   questionContent: [
//     [
//       {
//         row: 0,
//         col: 0,
//         value: "4",
//         isMissed: "false",
//       },
//       {
//         row: 0,
//         col: 1,
//         value: "2",
//         isMissed: "false",
//       },
//     ],
//     [
//       {
//         row: 1,
//         col: 0,
//         value: "1",
//         isMissed: "false",
//       },
//       {
//         row: 1,
//         col: 1,
//         value: "0",
//         isMissed: "false",
//       },
//     ],
//     [
//       {
//         row: 2,
//         col: 0,
//         value: "3",
//         isMissed: "true",
//       },
//       {
//         row: 2,
//         col: 1,
//         value: "2",
//         isMissed: "false",
//       },
//     ],
//   ],
//   solution: {
//     model: [
//       {
//         val: "42 - 10 = 32",
//       },
//     ],
//     sidebyside: [],
//     srows: null,
//     scols: null,
//   },
//   choices: ["4", "1", "2", "3"],
//   choiceType: "dragdrop",
//   choiceCount: 4,
// };

export default function MainPlaceValueChart({obj,meter}) {
  const numberSystem = useRef(numberSystemFormat());
  obj = { ...obj, numberSystem: numberSystem?.current };
  return (
    <>
      <PlaceValueChart
        state={obj}
        totalRows={obj.rows}
        totalColumns={obj.cols}
        meter={meter}
      />
    </>
  );
}
