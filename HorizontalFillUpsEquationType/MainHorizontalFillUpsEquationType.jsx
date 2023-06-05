import React from "react";
import HorizontalFillUpsEquationType from "./HorizontalFillUpsEquationType";
// let obj2 = {
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

// let obj = {
//   operation: "addition",
//   type: "horizontal_fill_ups",
//   rows: "2",
//   cols: "9",
//   questionName:
//     'this is the test by developer Horizontal fillups Keying&nbsp;<span class="mq-replacable mq-math-mode" id="510"><span class="mq-selectable">$\\sqrt{2}$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="6"><span class="mq-non-leaf" mathquill-command-id="7"><span class="mq-scaled mq-sqrt-prefix">√</span><span class="mq-non-leaf mq-sqrt-stem" mathquill-block-id="9"><span mathquill-command-id="8">2</span></span></span><span class="mq-cursor">​</span></span></span>&nbsp;',
//   questionContent: [
//     { row: 0, col: 0, value: "1+2", isMissed: "false" },
//     {
//       row: 0,
//       col: 1,
//       value:
//         '<span class="mq-replacable mq-math-mode" id="271"><span class="mq-selectable">$\\sqrt{2}$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="16"><span class="mq-non-leaf" mathquill-command-id="17"><span class="mq-scaled mq-sqrt-prefix">√</span><span class="mq-non-leaf mq-sqrt-stem" mathquill-block-id="19"><span mathquill-command-id="18">2</span></span></span><span class="mq-cursor">​</span></span></span>&nbsp;',
//       isMissed: "true",
//     },
//     { row: 0, col: 2, value: "1+3", isMissed: "false" },
//     {
//       row: 0,
//       col: 3,
//       value:
//         '<span class="mq-replacable mq-math-mode" id="475"><span class="mq-selectable">$\\sqrt{3}$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="35"><span class="mq-non-leaf" mathquill-command-id="36"><span class="mq-scaled mq-sqrt-prefix">√</span><span class="mq-non-leaf mq-sqrt-stem" mathquill-block-id="38"><span mathquill-command-id="37">3</span></span></span><span class="mq-cursor">​</span></span></span>&nbsp;',
//       isMissed: "false",
//     },
//     { row: 1, col: 4-4, value: "1+4", isMissed: "false" },
//     { row: 1, col: 5-4, value: "1+4", isMissed: "false" },
//     { row: 1, col: 6-4, value: "1+4", isMissed: "false" },
//     { row: 1, col: 7-4, value: "1+4", isMissed: "false" },
//     { row: 1, col: 8-4, value: "1+4", isMissed: "false" },
//   ],
//   solution: {
//     model: [{ val: "$\\sqrt{2}$" }],
//     sidebyside: [],
//     srows: null,
//     scols: null,
//   },
//   choices: [
//     "1+2",
//     '<span class="mq-replacable mq-math-mode" id="475"><span class="mq-selectable">$\\sqrt{3}$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="35"><span class="mq-non-leaf" mathquill-command-id="36"><span class="mq-scaled mq-sqrt-prefix">√</span><span class="mq-non-leaf mq-sqrt-stem" mathquill-block-id="38"><span mathquill-command-id="37">3</span></span></span><span class="mq-cursor">​</span></span></span>&nbsp;',
//     "1+3",
//     '<span class="mq-replacable mq-math-mode" id="271"><span class="mq-selectable">$\\sqrt{2}$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="16"><span class="mq-non-leaf" mathquill-command-id="17"><span class="mq-scaled mq-sqrt-prefix">√</span><span class="mq-non-leaf mq-sqrt-stem" mathquill-block-id="19"><span mathquill-command-id="18">2</span></span></span><span class="mq-cursor">​</span></span></span>&nbsp;',
//   ],
//   choiceType: "keying",
//   choiceCount: 4,
// };
export default function MainHorizontalFillUpsEquationType({ obj,meter }) {
  return (
    <HorizontalFillUpsEquationType
      state={obj}
      totalRows={obj.rows}
      totalCols={obj.cols}
      meter={meter}
    />
  );
}
